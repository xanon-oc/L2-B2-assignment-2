import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRouter } from './app/modules/user/user.routes';
const app: Application = express();

//parser

app.use(express.json());
app.use(cors());

// user router

app.use('/api/users', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Server Is Running Fine',
  });
});
export default app;
