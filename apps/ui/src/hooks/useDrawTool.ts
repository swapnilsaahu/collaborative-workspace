import { useWhiteboardContext } from "../context/WhiteboardContext";
export const useBrushFunction = () => {
    const { }
    let mouse = {
        x: 0,
        y: 0,
    }
    let isDrawing = false;

    //create fxn for each mouse event this is imporatant because it will help in cleaning the event listener

    const onMouseDown = (event: MouseEvent) => {
        if (whichTool != "brush") return;
        isDrawing = true;
        mouse.x = event.offsetX;
        mouse.y = event.offsetY;
    }

    const onMouseMove = (event: MouseEvent) => {
        if (!isDrawing) return;
        if (whichTool != "brush") return;
        context.beginPath();
        context.moveTo(mouse.x, mouse.y);
        context.lineTo(event.offsetX, event.offsetY);
        context.stroke();
        mouse.x = event.offsetX;
        mouse.y = event.offsetY;
        console.log(event.offsetX, event.offsetY);
    }

    const onMouseUp = () => (isDrawing = false)

    //using named fxns such as onMouseDown, onMouseUp.. because if use anon fxn then we will not reference to the event listener which is imporatant while removing the event listener
    //event listener needs to be removed manually each event listener or else it will still listen to the events 
    //below defined all the events
    canvas.addEventListener('mousedown', onMouseDown)
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseup', onMouseUp)

    return () => {
        //removed all the event listener so if user changes tools it no longer listens for brush
        canvas.removeEventListener('mousedown', onMouseDown)
        canvas.removeEventListener('mousemove', onMouseMove)
        canvas.removeEventListener('mouseup', onMouseUp)
    }
}
