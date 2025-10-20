import { LuBrush, LuEraser } from "react-icons/lu";
import { useWhiteboardContext } from "../context/WhiteboardContext";
const ToolBarComponent = () => {

    const { activeTool, setActiveTool } = useWhiteboardContext();
    return (
        <div className="font-bold">
            <h3>{activeTool}</h3>
            <LuBrush onClick={() => setActiveTool("brush")} />
            <LuEraser onClick={() => setActiveTool("eraser")} />
        </div>
    )
}
export default ToolBarComponent;
