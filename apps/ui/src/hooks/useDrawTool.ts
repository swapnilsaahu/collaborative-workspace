import { useWhiteboardContext } from "../context/WhiteboardContext";
export const useDrawTool = () => {
    const { canvasContext } = useWhiteboardContext();
    const { activeTool } = useWhiteboardContext();
    const { htmlCanvasRef } = useWhiteboardContext();
    let mouse = {
        x: 0,
        y: 0,
    }
    let isDrawing = false;

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
        mouse.x = event.offsetX;
        mouse.y = event.offsetY;
        console.log(event.offsetX, event.offsetY);
    }

    const onMouseUp = () => (isDrawing = false)

    //using named fxns such as onMouseDown, onMouseUp.. because if use anon fxn then we will not reference to the event listener which is imporatant while removing the event listener
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
