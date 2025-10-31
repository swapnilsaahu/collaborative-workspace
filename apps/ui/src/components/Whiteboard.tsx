import { useYjsManager } from "../yjs/YjsDocManager";
import Canvas from "./CanvasComponent";
import ToolBarComponent from "./ToolBarComponent";
import { ToolsBarManagement } from "./ToolBarManagement";

export const Whiteboard = () => {

    // 1. Call your hook ONCE, right here.
    // This component is *inside* WhiteboardProvider, 
    // so it can safely access the context.
    useYjsManager();
    // 2. Render all the child components.
    // They will now share the single connection managed by the hook above.
    return (
        <>
            <Canvas />
            <ToolBarComponent />
            <ToolsBarManagement />
        </>
    );
}
