import { NextFunction, Request, Response, Router } from "express";
import { NFT } from "../models/NFT";
import multer = require("multer");

const upload = multer({ dest: "./public/nfts/" });

class NFTRouter {
  private _router = Router();

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  /**
   * Connect routes to their matching controller endpoints.
   */
  private _configure() {
    // @route   GET api/nft/get
    // @desc    Get all nfts
    // @access  Public
    this._router.get(
      "/get",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const nfts = await NFT.find({});
          res.status(200).json(nfts);
        } catch (error) {
          next(error);
        }
      }
    );

    // @route   GET api/nft/create
    // @desc    Create a nft
    // @access  Public
    this._router.post(
      "/create",
      upload.array("files"),
      (req: Request, res: Response, next: NextFunction) => {
        try {
          const image = req.files?.length ? req.files[0].filename : "";

          const nft = new NFT({
            image: `${process.env.APP_HOST}/nfts/${image}`,
            title: req.body.title,
            description: req.body.description,
          });

          nft.save(function (err, doc) {
            console.log(doc._id);
          });

          res.send("New nft is created successfully");
        } catch (error) {
          next(error);
        }
      }
    );

    // @route   GET api/nft/edit
    // @desc    Create a nft
    // @access  Public
    this._router.post(
      "/edit",
      upload.array("files"),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const filter = { _id: req.body._id };
          const image = req.files?.length ? req.files[0].filename : "";

          if (req.files?.length !== 0) {
            const update = {
              image: `${process.env.APP_HOST}/nfts/${image}`,
              title: req.body.title,
              description: req.body.description,
            };

            let nft = await NFT.findOneAndUpdate(filter, update, {
              returnOriginal: false,
            });
          } else {
            const update = {
              title: req.body.title,
              description: req.body.description,
            };

            let nft = await NFT.findOneAndUpdate(filter, update, {
              returnOriginal: false,
            });
          }

          res.send("The nft is updated successfully");
        } catch (error) {
          next(error);
        }
      }
    );

    // @route   GET api/nft/edit
    // @desc    Create a nft
    // @access  Public
    this._router.delete(
      "/delete/:id",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const id = req.params.id;

          await NFT.deleteOne({ _id: id });
          res.send("The nft is deleted successfully");
        } catch (error) {
          next(error);
        }
      }
    );
  }
}

export = new NFTRouter().router;
