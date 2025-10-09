import { useState } from "react";
import Canvas, { brushFunction } from "../components/CanvasComponent";


const WhiteBoardPage = () => {

    const [whichTool, setTool] = useState("");
    const fxnMapping: Record<string, (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => void> = {
        "brush": brushFunction
    }
    return (
        <>
            <button onClick={() => setTool("brush")}>brush</button>
            <Canvas draw={fxnMapping[whichTool]} />
        </>
    )
}

export default WhiteBoardPage;
