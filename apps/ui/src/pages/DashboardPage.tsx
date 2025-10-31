import { useState, type ChangeEvent } from "react";
import { useWhiteboardContext, WhiteboardProvider } from "../context/WhiteboardContext";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Whiteboard } from "../components/Whiteboard";
const DashboardPage = () => {
    const createWhiteboardAPI = 'http://localhost:3000/api/v1/whiteboard/createwhiteboard/'
    const [roomname, setRoomname] = useState("");
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setRoomname(event.target.value);
    }

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await axios.post(createWhiteboardAPI, {
                roomname: roomname
            })
            if (!res.data?.whiteboardCode) {
                throw new Error("room not found")
            }
            const roomId = res.data.whiteboardCode;
            navigate(`/whiteboardpage/${roomId}`)
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message)
                setError(error);
            }
            else {
                console.error("unknown error")
            }
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <>
            <textarea value={roomname} onChange={handleChange}>enter room name</textarea>
            <button onClick={fetchData}>Create Room</button>
            <button>Join Room</button>
        </>
    )
}

export default DashboardPage;
