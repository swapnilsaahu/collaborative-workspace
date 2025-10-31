import { useCallback } from "react";
import { useWhiteboardContext } from "../context/WhiteboardContext";
//type Draw = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, tool: string) => void;
//React components cant noramlly have fxns as args, it expects single object inside which there can be as many fxn as we want,
//we need to destructure it and then use draw
//

const Canvas = () => {
    const { canvasContext, htmlCanvasRef } = useWhiteboardContext();
    const setCanvasRef = useCallback((canvas: HTMLCanvasElement | null) => {
        if (canvas) {
            htmlCanvasRef.current = canvas;
            const ctx = canvas.getContext("2d");
            if (ctx) {
                canvasContext.current = ctx;
            }
            else {
                htmlCanvasRef.current = null;
                canvasContext.current = null;
            }
        }
    }, [])
    return <canvas ref={setCanvasRef} width={window.innerWidth} height={window.innerHeight} />;
}

export default Canvas;
