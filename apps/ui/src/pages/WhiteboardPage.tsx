import { useState } from "react";
import Canvas, { brushFunction } from "../components/CanvasComponent";


const WhiteBoardPage = () => {

    const [whichTool, setTool] = useState("");
    const fxnMapping: Record<string, (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, whichTool: string) => void> = {
        "brush": brushFunction
    }
    return (
        <>
            <button onClick={() => setTool("brush")}> brush</button >
            <button onClick={() => setTool("")}>mouse</button>
            <p>
                {whichTool}
            </p>
            <Canvas draw={fxnMapping[whichTool]} tool={whichTool} />
        </>
    )
}

export default WhiteBoardPage;
