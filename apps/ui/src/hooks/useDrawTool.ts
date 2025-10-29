import { useRef } from "react";
import { useWhiteboardContext } from "../context/WhiteboardContext";
import type { drawType } from "../yjs/YjsDocManager";
export const useDrawTool = () => {
    const { canvasContext } = useWhiteboardContext();
    const { activeTool } = useWhiteboardContext();
    const { htmlCanvasRef } = useWhiteboardContext();
    const { yarray } = useWhiteboardContext();
    const mouse = useRef({ x: 0, y: 0 }); //doesnt causes rerender when value is updated which avoid unecessary rerenders of fxn
    const isDrawing = useRef(false);
    const yarrayOfCoordinates = useRef<Array<Array<number>>>([]); //array for points of a freehand stroke, [[10,20],[20,30]...]


    //create fxn for each mouse event this is imporatant because it will help in cleaning the event listener

    const onMouseDown = (event: MouseEvent) => {
        if (activeTool != "brush") return;
        isDrawing.current = true;
        mouse.current.x = event.offsetX;
        mouse.current.y = event.offsetY;
    }

    const onMouseMove = (event: MouseEvent) => {
        if (!isDrawing.current) return;
        if (activeTool != "brush") return;
        if (!canvasContext) return;
        canvasContext.beginPath();
        canvasContext.moveTo(mouse.current.x, mouse.current.y);
        canvasContext.lineTo(event.offsetX, event.offsetY);
        canvasContext.stroke();
        yarrayOfCoordinates.current.push([mouse.current.x, mouse.current.y]); //stores the pair at that instance
        mouse.current.x = event.offsetX;
        mouse.current.y = event.offsetY;
        console.log(event.offsetX, event.offsetY);
    }

    const onMouseUp = () => {
        isDrawing.current = false;
        //only push change if there is some values inside the array
        if (yarrayOfCoordinates.current.length > 0) {
            const strokeDetails: drawType = {
                id: crypto.randomUUID(),
                type: "freehand",
                color: "black",
                points: yarrayOfCoordinates.current
            }
            if (yarray) yarray.push([strokeDetails]);
        }
        // Clear coordinates for next stroke
        yarrayOfCoordinates.current = [];
    }

    //using named fxns such as onMouseDown, onMouseUp.. because if use anon fxn then we will not reference to the event listener which is important while removing the event listener
    //event listener needs to be removed manually each event listener or else it will still listen to the events 
    //below defined all the events
    const setup = () => {
        if (!htmlCanvasRef)
            return () => { };
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
