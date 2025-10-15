import { useRef } from "react";
import { useWhiteboard } from "../hooks/useWhiteboard";

type Draw = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, tool: string) => void;

export interface CanvasProps {
    draw?: Draw;
    tool: string
}
//React components cant noramlly have fxns as args, it expects single object inside which there can be as many fxn as we want,
//we need to destructure it and then use draw
//

const Canvas = ({ draw, tool }: CanvasProps) => {
    const ref = useRef<HTMLCanvasElement>(null);
    // useWhiteboard()
    return <canvas ref={ref} width={window.innerWidth} height={window.innerHeight} />;
}

export default Canvas;
