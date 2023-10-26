import mongoose, { model } from "mongoose";
import Hex from "./Hex";

const HexChunkSchema = new mongoose.Schema({
    mapId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Map',
        required: true
    },
    hexes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hex'
    }]
})

HexChunkSchema.pre('deleteOne', async function (next) {
    const hexChunk = this as any;
    await Hex.deleteMany({ hexChunkId: hexChunk._id });  // Ensure your Hex schema has a reference to its HexChunk

    next();
});


const HexChunk = mongoose.models.HexChunk || model("HexChunk", HexChunkSchema);
export default HexChunk;