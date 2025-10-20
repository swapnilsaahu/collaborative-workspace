import { useEffect } from "react"
import { destroyYdoc, initWhiteboard } from "../yjs/YjsDocManager";

//useeffect is generally used for side effects like api calling, websocket connection,yjs ydoc..
export const useWhiteboard = (roomId: string) => {
    useEffect(() => {
        initWhiteboard(roomId);
        return () => { destroyYdoc() }; // this return statement is imp because it calls the funciton using arrow function when  the component unmounts or roomid changes which is essential so that there is no copy of ydoc avoiding memory leakage
    }, [roomId])
}
