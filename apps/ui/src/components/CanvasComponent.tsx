import { useEffect, useRef } from "react";
import { useWhiteboardContext } from "../context/WhiteboardContext";
//type Draw = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, tool: string) => void;
//React components cant noramlly have fxns as args, it expects single object inside which there can be as many fxn as we want,
//we need to destructure it and then use draw
//

const Canvas = () => {
    const ref = useRef<HTMLCanvasElement | null>(null);
    const { setCanvasContext } = useWhiteboardContext();
    const { setHtmlCanvasRef } = useWhiteboardContext();
    useEffect(() => {
        if (!ref.current) return;
        setHtmlCanvasRef(ref.current);
        const ctx = ref.current.getContext("2d");
        if (ctx) setCanvasContext(ctx);


    }, [])
    return <canvas ref={ref} width={window.innerWidth} height={window.innerHeight} />;
}

export default Canvas;
