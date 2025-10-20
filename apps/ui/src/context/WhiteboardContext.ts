import { createContext, useState, type ReactNode, } from "react";
import * as Y from "yjs";
interface WhiteboardContextType {
    ydoc: Y.Doc | null,
    websocketObj: WebSocket | null,
    roomId: string | null;
    setYdoc: (doc: Y.Doc | null) => void;
    setWebsocketObj: (ws: WebSocket | null) => void;
    setRoomId: (id: string | null) => void;
}

const WhiteboardContext = createContext<WhiteboardContextType | undefined>(undefined);

export const WhiteboardProvider = ({ children }: { children: ReactNode }) => {
    const [ydoc, setYdoc] = useState<Y.Doc | null>(null);
    const [websocketObj, setWebsocketObj] = useState<WebSocket | null>(null);
    const [roomId, setRoomId] = useState<string | null>(null);

    const value = {
        ydoc,
        websocketObj,
        roomId,
        setYdoc,
        setWebsocketObj,
        setRoomId
    }

    return (
        <WhiteboardContext.Provider value= { value } >
        { children }
        </WhiteboardContext.Provider>
    );
};

