import { Router } from "express";
import NFTRouter from "./NFTRouter";

class MasterRouter {
  private _router = Router();
  private _nftrouter = NFTRouter;

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  /**
   * Connect routes to their matching routers.
   */
  private _configure() {
    this._router.use("/nft", this._nftrouter);
  }
}

export = new MasterRouter().router;
