import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import routeHandler from "./routes";

const app = express();

app
  .use(helmet())
  .use(cors({ origin: "*"}))
  .use(express.json())
  .use(cookieParser())
  .get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "Welcome to TravelFactory API!", success: true });
  })
  .use("/api", routeHandler)
  .use((req: Request, res: Response) => {
    res.status(404).json({ message: "Not Found", success: false });
  });

export default app;
