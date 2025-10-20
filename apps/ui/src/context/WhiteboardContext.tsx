import { createContext, useContext, useState, type ReactNode, } from "react";
import * as Y from "yjs";
interface WhiteboardContextType {
    ydoc: Y.Doc | null,
    websocketObj: WebSocket | null,
    roomId: string | null;
    activeTool: string | null,
    canvasContext: CanvasRenderingContext2D | null,
    setYdoc: (doc: Y.Doc | null) => void;
    setWebsocketObj: (ws: WebSocket | null) => void;
    setRoomId: (id: string | null) => void;
    setActiveTool: (tool: string | null) => void;
    setCanvasContext: (ctx: CanvasRenderingContext2D | null) => void;
}

//contex which basically defines global context so that any of the children wrapped around it will have access to the values we are passing to the provider
const WhiteboardContext = createContext<WhiteboardContextType | undefined>(undefined);



export const WhiteboardProvider = ({ children }: { children: ReactNode }) => {
    const [ydoc, setYdoc] = useState<Y.Doc | null>(null);
    const [websocketObj, setWebsocketObj] = useState<WebSocket | null>(null);
    const [roomId, setRoomId] = useState<string | null>(null);
    const [activeTool, setActiveTool] = useState<string | null>(null);
    const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D | null>(null)
    const []

    const value = {
        ydoc,
        websocketObj,
        roomId,
        activeTool,
        canvasContext,
        setYdoc,
        setWebsocketObj,
        setRoomId,
        setActiveTool,
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
