import env from "dotenv";
import express from "express";
import userRouter from "./routes/userRouter.js";

const app = express();
const port = 3000;

env.config();
app.use(express.json());
app.use("/", userRouter);

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
