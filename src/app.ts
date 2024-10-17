import express from "express";
import cors from "cors";
import morganMiddleware from "@/config/morgan-config";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// routes import
import authRoutes from "./routes/auth.routes";
// import uploadFilesRoutes from "./routes/uploadFiles.routes";

// routes decleration
app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/files", uploadFilesRoutes);

app.get("/", (req, res) => {
  res.redirect("http://localhost:5000");
});

export { app };
