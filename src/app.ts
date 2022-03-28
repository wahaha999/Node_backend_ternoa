import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import MasterRouter from "./routers/MasterRouter";
import ErrorHandler from "./models/ErrorHandler";
import mongoose from "mongoose";
import cors from "cors";

// load the environment variables from the .env file
dotenv.config({
  path: ".env",
});

/**
 * Express server application class.
 * @description Will later contain the routing system.
 */
class Server {
  public app = express();
  public router = MasterRouter;
}

// initialize server app
const server = new Server();

server.app.use(cors());
server.app.use("/nfts", express.static(`public/nfts`));
server.app.use("/api", server.router);

server.app.use(
  (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).json({
      status: "error",
      statusCode: err.statusCode,
      message: err.message,
    });
  }
);

mongoose.connect(process.env.MONGODB_URL || "", () => {
  console.log("connected to database");
});

// make server listen on some port
((port = process.env.APP_PORT || 5000) => {
  server.app.listen(port, () => console.log(`> Listening on port ${port}`));
})();
