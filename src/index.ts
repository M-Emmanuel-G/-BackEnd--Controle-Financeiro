import express from "express";
import cors from 'cors'
import { userRouter } from "./routes/userRouter";
import { financeRouter } from "./routes/financeRouter";

const app = express();

app.use(express.json());
app.use(cors())

app.use("/users", userRouter);
app.use('/finances', financeRouter)

app.listen(3003, () => { console.log(`server is running in port 3003`)});
 