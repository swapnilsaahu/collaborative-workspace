import { useEffect, useRef } from "react";
import { useDrawTool } from "../hooks/useDrawTool";
import { useWhiteboardContext } from "../context/WhiteboardContext";

//not inside WhiteboardContext becaue it was creating circular dependency where WhiteboardContext->useDrawTool->WhiteboardContext
export const ToolsBarManagement = () => {
    const { htmlCanvasRef, activeTool, canvasContext } = useWhiteboardContext();
    const prevTool = useRef<{ cleanup?: () => void }>({}); //stores prevtool for cleanup fxn , { } object type contains optional cleanup  if present it is fxn which takes no args and ret void
    const { setup: brushSetup } = useDrawTool(); //setup fxn of drawtool alias name brushSetup

    const toolsRegistry: Record<string, () => () => void> = { //key: string value: a fxn which returns a fxns which returns nothing void
        brush: brushSetup,
    };

    useEffect(() => {
        if (!htmlCanvasRef) return;

        // cleanup previous tool if exists
        prevTool.current?.cleanup?.();

        // run setup for the active tool
        const runActiveTool = activeTool ? toolsRegistry[activeTool] : undefined; //runs the the specific tool fxn
        const cleanup = runActiveTool?.(); //stores the return value which is setup which helps in removing the listeners when the tool changes

        // store cleanup helps when changing tool
        prevTool.current = { cleanup };

        // cleanup on unmount
        return () => prevTool.current?.cleanup?.();
    }, [activeTool, canvasContext, htmlCanvasRef]);

    return null;
};
