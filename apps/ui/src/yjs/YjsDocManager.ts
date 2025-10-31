import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { useWhiteboardContext } from "../context/WhiteboardContext";
import { useEffect } from "react";

export interface drawType {
    id: string,
    type: string,
    x?: number,
    y?: number,
    height?: number,
    width?: number,
    color: string,
    points?: Array<Array<number>>

}
//react hooks cant be in normal ts file hence converted to a custom hook then using the export fxns to initalize the room
export const useYjsManager = () => {
    const { ydoc, websocketObj, yarray, roomId } = useWhiteboardContext();
    useEffect(() => {
        //cleanup existing ydoc instance
        //instantiate new ydoc 
        //fetch ydoc from backend(api call)
        //return ydoc and websocket connection obj
        console.log('useYjsManager effect trying to run. roomId:', roomId);
        if (!roomId) {
            return;
        }
        console.log(`Yjs: Valid roomId found. Connecting to: ${roomId}`);
        const doc = new Y.Doc();
        ydoc.current = doc;
        const arr: Y.Array<any> = doc.getArray('listOfShapes');
        yarray.current = arr;
        const wsProvider = new WebsocketProvider('ws://localhost:3000', roomId, doc);
        websocketObj.current = wsProvider;

        return () => {

            if (websocketObj.current) {
                websocketObj.current.disconnect();
            }
            if (ydoc.current) {
                ydoc.current.destroy();
            }
        }
    }, [roomId])
}
