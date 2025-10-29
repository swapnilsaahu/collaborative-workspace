import Canvas from "../components/CanvasComponent";
import { WhiteboardProvider } from "../context/WhiteboardContext";
import ToolBarComponent from "../components/ToolBarComponent";
import { ToolsBarManagement } from "../components/ToolBarManagement";
//renders canvas component, tools section, navbar, globalcontext for current whiteboard(room), active tool
//update ydoc
const WhiteBoardPage = () => {
    return (
        <>
            <WhiteboardProvider >
                <Canvas />
                <ToolsBarManagement />
                <ToolBarComponent />
            </WhiteboardProvider>
        </>
    )
}

export default WhiteBoardPage;
