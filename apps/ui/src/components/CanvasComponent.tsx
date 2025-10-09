import { useEffect, useRef } from "react";

type Draw = (context: CanvasRenderingContext2D) => void;

interface CanvasProps {
    draw: Draw;
}
//React components cant noramlly have fxns as args, it expects single object inside which there can be as many fxn as we want,
//we need to destructure it and then use draw
const Canvas = ({ draw }: CanvasProps) => {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return; //check if canvas is reffered or not
        const context = canvas.getContext('2d');
        if (!context) return; //check if ctx is null
        draw(context);


        let mouse = {
            x: 0,
            y: 0,
        }
        let isDrawing = false;

        canvas.addEventListener('mousedown', (event) => {
            isDrawing = true;
            mouse.x = event.offsetX;
            mouse.y = event.offsetY;
        })

        canvas.addEventListener('mousemove', (event) => {
            if (!isDrawing) return;
            context.beginPath();
            context.moveTo(mouse.x, mouse.y);
            context.lineTo(event.offsetX, event.offsetY);
            context.stroke();
            mouse.x = event.offsetX;
            mouse.y = event.offsetY;
        })

        canvas.addEventListener('mouseup', () => (isDrawing = false))

    }, [draw, onmousemove]); //draws when it gets mounted and then every time a draw fxn is triggered

    return <canvas ref={ref} width={window.innerWidth} height={window.innerHeight} />;
}

export default Canvas;
