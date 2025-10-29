import { useEffect } from "react"
import { useYjsManager } from "../yjs/YjsDocManager";

//useeffect is generally used for side effects like api calling, websocket connection,yjs ydoc..
export const useWhiteboard = (roomId: string) => {
    const { initWhiteboard, destroyYdoc } = useYjsManager();
    useEffect(() => {
        if (!roomId) return;
        initWhiteboard(roomId);
        return () => { destroyYdoc() }; // this return statement is imp because it calls the funciton using arrow function when  the component unmounts or roomid changes which is essential so that there is no copy of ydoc avoiding memory leakage
    }, [roomId, initWhiteboard])
}
