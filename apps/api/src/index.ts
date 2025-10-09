import express, { Application, Request, Response } from 'express';
import dotenv from "dotenv";
import http from "node:http";
import { WebSocketServer, Server, WebSocket } from "ws";
dotenv.config();




const app: Application = express();
const port = 3000;

const httpServer = http.createServer(app);

app.use(express.json());

import userRouter from "./routes/userRoutes.ts"

app.use("/api/v1/users", userRouter);

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'hello from server' });
})

app.listen(port, () => {
    console.log('server listening at port', port);
})
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

    wss.on('connection', (ws) => {
        ws.on('error', console.error);

        const connectionMapping = {
            "join": joinWhtieboard,
            "sendMessage": sendMessage,
        }
        ws.on('error', console.error);


        // Handle messages from the user
        ws.on("message", (data) => {
            try {
                const msg = JSON.parse(data);
                const { type } = msg;
                console.log(type, "on message");
                const handler = connectionMapping[type]
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
    })
}

export default app;
