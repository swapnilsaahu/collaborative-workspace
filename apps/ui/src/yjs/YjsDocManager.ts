import * as Y from "yjs";
import { useWhiteboardContext } from "../context/WhiteboardContext";

export const initWhiteboard = (roomId: string) => {

    let { setWebsocketObj, setYdoc } = useWhiteboardContext();
    //cleanup existing ydoc instance
    //instantiate new ydoc 
    //fetch ydoc from backend(api call)
    //return ydoc and websocket connection obj
    destroyYdoc();

    setYdoc(new Y.Doc());
    // setWebsocketObj();
}

export const destroyYdoc = () => {
    const { ydoc, websocketObj } = useWhiteboardContext();
    //if (websocketObj) websocketObj.destroy();
    if (ydoc) ydoc.destroy();
    return { ydoc: null, websocketObj: null }
}
