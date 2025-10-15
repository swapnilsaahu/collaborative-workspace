import * as Y from "yjs";
import { useEffect, useState } from "react"
import { destroyYdoc, initWhiteboard } from "../yjs/YjsDocManager";

//useeffect is generally used for side effects like api calling, websocket connection,yjs ydoc..
export const useWhiteboard = (roomId: string) => {
    const [ydoc, setYdoc] = useState<Y.Doc | null>(null);
    const [websocketObj, setWebsocketObj] = useState<WebSocket | null>(null)

    useEffect(() => {
        const { ydoc, websocketObj } = initWhiteboard(roomId);
        setYdoc(ydoc);
        setWebsocketObj(websocketObj);

        return () => destroyYdoc(); // this return statement is imp because it calls the funciton using arrow function when  the component unmounts or roomid changes which is essential so that there is no copy of ydoc avoiding memory leakage
    }, [roomId])

    return { ydoc, websocketObj }
}
