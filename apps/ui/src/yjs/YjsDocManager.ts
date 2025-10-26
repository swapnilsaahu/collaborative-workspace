import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { useWhiteboardContext } from "../context/WhiteboardContext";
let { setWebsocketObj, setYdoc, setYarray } = useWhiteboardContext();

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
export const initWhiteboard = (roomId: string) => {
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
}

export const destroyYdoc = () => {
    const { ydoc, websocketObj } = useWhiteboardContext();
    if (ydoc) ydoc.destroy();
    if (websocketObj) websocketObj.destroy();
    setYdoc(null);
    setWebsocketObj(null);
}
