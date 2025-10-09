import './App.css'
import Canvas from './components/CanvasComponent';

function App() {
    const drawCircle = (ctx: CanvasRenderingContext2D) => {
        ctx.beginPath();
        ctx.arc(200, 200, 50, 0, 2 * Math.PI);
        ctx.fillStyle = "blue";
        ctx.fill();
    }


    return (
        <>
            <Canvas draw={drawCircle} />
        </>
    )
}

export default App
