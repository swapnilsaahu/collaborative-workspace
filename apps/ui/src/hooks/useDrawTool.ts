import { useRef } from "react";
import { useWhiteboardContext } from "../context/WhiteboardContext";
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
        if (!canvasContext.current) return;
        canvasContext.current.beginPath();
        canvasContext.current.moveTo(mouse.current.x, mouse.current.y);
        canvasContext.current.lineTo(event.offsetX, event.offsetY);
        canvasContext.current.stroke();
        yarrayOfCoordinates.current.push([mouse.current.x, mouse.current.y]); //stores the pair at that instance
        mouse.current.x = event.offsetX;
        mouse.current.y = event.offsetY;
        // console.log(event.offsetX, event.offsetY);
    }

    const onMouseUp = () => {
        isDrawing.current = false;
        //only push change if there is some values inside the array
        if (!yarray.current) {
            console.log("yarray not initalized")
            return;

        }
        if (yarrayOfCoordinates.current.length > 0) {
            const strokeDetails = {
                id: crypto.randomUUID(),
                type: "freehand",
                color: "black",
                points: yarrayOfCoordinates.current
            }

            yarray.current.push([strokeDetails]);
            const item = yarray.current.get(yarray.current.length - 1);
            console.log('Item:', item);
            console.log('Keys:', Array.from(item.keys()));
        }
        yarrayOfCoordinates.current = [];
        // Clear coordinates for next stroke
    }



    //using named fxns such as onMouseDown, onMouseUp.. because if use anon fxn then we will not reference to the event listener which is important while removing the event listener
    //event listener needs to be removed manually each event listener or else it will still listen to the events 
    //below defined all the events
    const setup = () => {
        const canvasref = htmlCanvasRef.current; //this captures the value here itself which refers to this specific instance whenever the canvas get unmounted or something changes it make sure it removes this specific ref not the global ref which might be null
        if (!canvasref) return () => { };
        canvasref.addEventListener('mousedown', onMouseDown)
        canvasref.addEventListener('mousemove', onMouseMove)
        canvasref.addEventListener('mouseup', onMouseUp)

        //removed all the event listener so if user changes tools it no longer listens for brush
        return () => {
            canvasref.removeEventListener('mousedown', onMouseDown)
            canvasref.removeEventListener('mousemove', onMouseMove)
            canvasref.removeEventListener('mouseup', onMouseUp)

        }
    }
    return { setup }
}
