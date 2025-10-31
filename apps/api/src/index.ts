import express, { Application, Request, Response } from 'express';
import dotenv from "dotenv";
import http from "node:http";
import { WebSocketServer, Server, WebSocket } from "ws";
//@ts-ignore
import { setupWSConnection } from "../node_modules/y-websocket/bin/utils.js";
import * as Y from "yjs";
import { fetchYdocFromDB, saveYdocToDB } from './controllers/whiteboardController.ts';
import userRouter from "./routes/userRoutes.ts"
import whiteboardRouter from "./routes/whiteboardRoutes.ts"
import cors from "cors"
dotenv.config();
const app: Application = express();
const port = 3000;
const httpServer = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/whiteboard", whiteboardRouter);
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'hello from server' });
})

httpServer.listen(port, () => {
    console.log('server listening at port', port);
})

const mapRoomsAndYdoc = new Map();
const handleUnkownError = (ws: WebSocket) => {
    ws.send(JSON.stringify(
        {
            type: 'error',
            message: "not a valid request for websocket"
        }
    ));
}
const webSocketServer = () => {
    const wss = new WebSocketServer({ server: httpServer });

    wss.on('connection', async (ws, req) => {
        ws.on('error', console.error);
        console.log(`new connection in websocket ${ws}`)
        const roomId = req.url?.slice(1);
        if (!roomId) {
            ws.close();
            return;
        };
        /* if (!roomId) {
             ws.send(JSON.stringify({
                 msg: "room not found"
             }))
         }
         */
        let metaData = mapRoomsAndYdoc.get(roomId); //get room from in memory if not exists it goes inside if stmt
        if (!metaData) {
            //create instance of ydoc and populate from db
            const ydoc = new Y.Doc();
            metaData = {
                ydoc,
                conns: new Set()
            }
            mapRoomsAndYdoc.set(roomId, metaData);
            const encodedBytesYdocFromDBObj = await fetchYdocFromDB(roomId);//roomId! makes sure that the value is not undefined or null (non null assertion)
            const encodedBytesYdocFromDB = encodedBytesYdocFromDBObj?.ydocEncoded;
            if (encodedBytesYdocFromDB) {
                Y.applyUpdate(ydoc, encodedBytesYdocFromDB); //populating ydoc
            }

            //save to db when an update is recived
            ydoc.on('update', async (update: Uint8Array) => {
                const state = Y.encodeStateAsUpdate(ydoc);
                const isSave = await saveYdocToDB(roomId, state);
                if (isSave) {
                    console.log(`saved room doc to db ${roomId}`)
                }
            })

        }
        metaData.conns.add(ws); //adding ws obj for tracking of users in a room

        setupWSConnection(ws, req, { docName: roomId }); //ydoc utility fxn

        ws.on('error', console.error);

        ws.on('close', () => {
            metaData.conns.delete(ws);
            //clean up of rooms if no active users present
            if (metaData.conns.size === 0) {
                mapRoomsAndYdoc.get(roomId).ydoc.destroy();
                mapRoomsAndYdoc.delete(roomId);
            }

        })
        // Handle messages from the user
        /*
        ws.on("message", (data) => {
            try {
                const msg = JSON.parse(data);
                const { type } = msg;
                console.log(type, "on message");
                if (handler) {
                    handler(ws, msg);
                }
                else {
                    handleUnkownError(ws);
                }
            }
            catch (error) {
                handleUnkownError(ws);
            }
        });
        */
    })
}
webSocketServer();
export default app;
