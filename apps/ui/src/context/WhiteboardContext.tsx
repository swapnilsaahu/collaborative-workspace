import { createContext, useContext, useMemo, useRef, useState, type ReactNode, } from "react";
import * as Y from "yjs";
import type { WebsocketProvider } from "y-websocket";
interface WhiteboardContextType {
    ydoc: React.RefObject<Y.Doc | null>;
    yarray: React.RefObject<Y.Array<any> | null>;
    websocketObj: React.RefObject<WebsocketProvider | null>;
    roomId: string | null;
    activeTool: string | null;
    htmlCanvasRef: React.RefObject<HTMLCanvasElement | null>;
    canvasContext: React.RefObject<CanvasRenderingContext2D | null>;
    setActiveTool: (tool: string | null) => void;
}
//contex which basically defines global context so that any of the children wrapped around it will have access to the values we are passing to the provider
const WhiteboardContext = createContext<WhiteboardContextType | null>(null);

export const WhiteboardProvider = ({ children, roomId }: { children: ReactNode, roomId: string }) => {
    //use useref when you only want data to update which avoids re renders and use usestate when you need ui update because it needs re render
    const ydoc = useRef<Y.Doc | null>(null);
    const yarray = useRef<Y.Array<any> | null>(null)
    const websocketObj = useRef<WebsocketProvider | null>(null);
    const [activeTool, setActiveTool] = useState<string | null>(null);
    const canvasContext = useRef<CanvasRenderingContext2D | null>(null)
    const htmlCanvasRef = useRef<HTMLCanvasElement | null>(null);
    //using usememo to avoid re renders when any variable changes only re render when activeTool or roomId changes
    const value = useMemo(() => ({
        ydoc,
        yarray,
        websocketObj,
        roomId,
        activeTool,
        htmlCanvasRef,
        canvasContext,
        setActiveTool,
    }), [roomId, activeTool])

    return (
        <WhiteboardContext.Provider value={value} >
            {children}
        </WhiteboardContext.Provider>
    );
};


export const useWhiteboardContext = () => {
    const context = useContext(WhiteboardContext);
    if (!context) throw new Error("context must be inside provider")
    return context;
}
