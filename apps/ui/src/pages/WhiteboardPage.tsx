import { useState } from "react";
import Canvas, { brushFunction } from "../components/CanvasComponent";
import { WhiteboardProvider } from "../context/WhiteboardContext";
import ToolBarComponent from "../components/ToolBarComponent";
//renders canvas component, tools section, navbar, globalcontext for current whiteboard(room), active tool
//update ydoc
const WhiteBoardPage = (roomId: string) => {



    return (
        <>
            <WhiteboardProvider >
                <Canvas />
                <ToolBarComponent />
            </WhiteboardProvider>
        </>
    )
}

export default WhiteBoardPage;
