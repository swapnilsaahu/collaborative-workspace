import { useWhiteboardContext } from "../context/WhiteboardContext";
import type { drawType } from "../yjs/YjsDocManager";
export const useDrawTool = () => {
    const { canvasContext } = useWhiteboardContext();
    const { activeTool } = useWhiteboardContext();
    const { htmlCanvasRef } = useWhiteboardContext();
    const { yarray } = useWhiteboardContext();
    let mouse = {
        x: 0,
        y: 0,
    }
    let isDrawing = false;
    const yarrayOfCoordinates = new Array(); //array for points of a freehand stroke, [[10,20],[20,30]...]


    //create fxn for each mouse event this is imporatant because it will help in cleaning the event listener

    const onMouseDown = (event: MouseEvent) => {
        if (activeTool != "brush") return;
        isDrawing = true;
        mouse.x = event.offsetX;
        mouse.y = event.offsetY;
    }

    const onMouseMove = (event: MouseEvent) => {
        if (!isDrawing) return;
        if (activeTool != "brush") return;
        if (!canvasContext) return;
        canvasContext.beginPath();
        canvasContext.moveTo(mouse.x, mouse.y);
        canvasContext.lineTo(event.offsetX, event.offsetY);
        canvasContext.stroke();
        const coordinates = new Array();
        coordinates.push(mouse.x, mouse.y);
        yarrayOfCoordinates.push(coordinates);
        mouse.x = event.offsetX;
        mouse.y = event.offsetY;
        console.log(event.offsetX, event.offsetY);
    }

    const onMouseUp = () => {
        isDrawing = false;
        const strokeDetails: drawType = {
            id: crypto.randomUUID(),
            type: "freehand",
            color: "black",
            points: yarrayOfCoordinates
        }
        if (yarray) yarray.push([strokeDetails]);
    }

    //using named fxns such as onMouseDown, onMouseUp.. because if use anon fxn then we will not reference to the event listener which is important while removing the event listener
    //event listener needs to be removed manually each event listener or else it will still listen to the events 
    //below defined all the events
    const setup = () => {
        if (!htmlCanvasRef) return;
        htmlCanvasRef.addEventListener('mousedown', onMouseDown)
        htmlCanvasRef.addEventListener('mousemove', onMouseMove)
        htmlCanvasRef.addEventListener('mouseup', onMouseUp)

        //removed all the event listener so if user changes tools it no longer listens for brush
        return () => {
            htmlCanvasRef.removeEventListener('mousedown', onMouseDown)
            htmlCanvasRef.removeEventListener('mousemove', onMouseMove)
            htmlCanvasRef.removeEventListener('mouseup', onMouseUp)

        }
    }
    return { setup }
}
