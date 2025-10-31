import { WhiteboardProvider } from "../context/WhiteboardContext";
import { Whiteboard } from "../components/Whiteboard";
import { useParams } from "react-router-dom";
//renders canvas component, tools section, navbar, globalcontext for current whiteboard(room), active tool
//update ydoc
const WhiteBoardPage = () => {
    const { roomId } = useParams();
    if (!roomId) {
        return <div>roomId not found error</div>
    }
    return (
        <>
            <WhiteboardProvider roomId={roomId}>
                <Whiteboard />
            </WhiteboardProvider>
        </>
    )
}

export default WhiteBoardPage;
