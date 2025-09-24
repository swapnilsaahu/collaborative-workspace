import express, { Application, Request, Response } from 'express';

const app: Application = express();
const port = 3000;



app.use(express.json());

import userRouter from "./routes/userRoutes.ts"

app.use("/api/v1/users", userRouter);

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'hello from server' });
})

app.listen(port, () => {
    console.log('server listening at port', port);
})

export default app;
