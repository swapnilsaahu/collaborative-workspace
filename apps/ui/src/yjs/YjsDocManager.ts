import * as Y from "yjs";

let current: { ydoc: Y.Doc | null, websocketObj: WebSocket | null } = {
    ydoc: null,
    websocketObj: null
}

export const initWhiteboard = (roomId: string) => {

    //cleanup existing ydoc instance
    //instantiate new ydoc 
    //fetch ydoc from backend(api call)
    //return ydoc and websocket connection obj
    destroyYdoc();

    const ydoc = new Y.Doc();
    const websocketObj =
        current.ydoc = ydoc;
    current.websocketObj = websocketObj;
    return { ydoc, websocketObj };
}

export const destroyYdoc = () => {
    if (current.websocketObj) current.websocketObj.destroy();
    if (current.ydoc) current.ydoc.destroy();
    return { ydoc: null, websocketObj: null }
}
