import { createContext, useContext, useState, type ReactNode, } from "react";
import * as Y from "yjs";
import type { drawType } from "../yjs/YjsDocManager";
import type { WebsocketProvider } from "y-websocket";
interface WhiteboardContextType {
    ydoc: Y.Doc | null,
    yarray: Y.Array<drawType> | null,
    websocketObj: WebsocketProvider | null,
    roomId: string | null;
    activeTool: string | null,
    htmlCanvasRef: HTMLCanvasElement | null;
    canvasContext: CanvasRenderingContext2D | null,
    setYdoc: (doc: Y.Doc | null) => void;
    setYarray: (yarray: Y.Array<drawType> | null) => void;
    setWebsocketObj: (ws: WebsocketProvider | null) => void;
    setRoomId: (id: string | null) => void;
    setActiveTool: (tool: string | null) => void;
    setHtmlCanvasRef: (htmlRef: HTMLCanvasElement | null) => void;
    setCanvasContext: (ctx: CanvasRenderingContext2D | null) => void;
}

//contex which basically defines global context so that any of the children wrapped around it will have access to the values we are passing to the provider
const WhiteboardContext = createContext<WhiteboardContextType | undefined>(undefined);



export const WhiteboardProvider = ({ children }: { children: ReactNode }) => {
    const [ydoc, setYdoc] = useState<Y.Doc | null>(null);
    const [yarray, setYarray] = useState<Y.Array<drawType> | null>(null)
    const [websocketObj, setWebsocketObj] = useState<WebsocketProvider | null>(null);
    const [roomId, setRoomId] = useState<string | null>(null);
    const [activeTool, setActiveTool] = useState<string | null>(null);
    const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D | null>(null)
    const [htmlCanvasRef, setHtmlCanvasRef] = useState<HTMLCanvasElement | null>(null);

    const value = {
        ydoc,
        yarray,
        websocketObj,
        roomId,
        activeTool,
        htmlCanvasRef,
        canvasContext,
        setYdoc,
        setYarray,
        setWebsocketObj,
        setRoomId,
        setActiveTool,
        setHtmlCanvasRef,
        setCanvasContext
    }

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
