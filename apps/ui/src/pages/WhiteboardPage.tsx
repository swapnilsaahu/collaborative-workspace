import { useState } from "react";
import Canvas, { brushFunction } from "../components/CanvasComponent";
import { useWhiteboard } from "../hooks/useWhiteboard";
//renders canvas component, tools section, navbar, globalcontext for current whiteboard(room), active tool
//update ydoc
const WhiteBoardPage = (roomId: string) => {

    const { ydoc, websocketObj } = useWhiteboard(roomId);


    return (
        <>
            <Canvas draw={fxnMapping[whichTool]} tool={whichTool} />
        </>
    )
}

export default WhiteBoardPage;
