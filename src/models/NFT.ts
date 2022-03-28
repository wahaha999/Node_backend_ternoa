import mongoose from "mongoose";

const nftSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const NFT = mongoose.model("NFT", nftSchema);

export { NFT };
