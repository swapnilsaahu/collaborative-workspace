import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { useWhiteboardContext } from "../context/WhiteboardContext";
import { useCallback } from "react";

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

    const { setWebsocketObj, setYdoc, setYarray } = useWhiteboardContext();
    const { ydoc, websocketObj } = useWhiteboardContext();
    const initWhiteboard = useCallback((roomId: string) => {
        //cleanup existing ydoc instance
        //instantiate new ydoc 
        //fetch ydoc from backend(api call)
        //return ydoc and websocket connection obj
        destroyYdoc();
        const doc = new Y.Doc();
        setYdoc(doc);
        const yarray = doc.getArray<drawType>('listOfShapes');
        setYarray(yarray);

        const wsProvider = new WebsocketProvider('ws://localhost:3000', roomId, doc);
        setWebsocketObj(wsProvider);
    }, [setWebsocketObj])

    const destroyYdoc = useCallback(() => {
        if (ydoc) ydoc.destroy();
        if (websocketObj) websocketObj.destroy();
        setYdoc(null);
        setWebsocketObj(null);
    }, [])

    return { initWhiteboard, destroyYdoc }
}
