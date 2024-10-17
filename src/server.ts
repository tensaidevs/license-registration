import { cyan } from "colors";
import dotenv from "dotenv";
import { app } from "./app";
dotenv.config();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(
    `Your server is running at: ${cyan(`http://localhost:${port}/`)}`,
  );
});