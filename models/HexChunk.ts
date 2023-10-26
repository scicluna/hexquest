import mongoose, { model } from "mongoose";
import Hex from "./Hex";
import Map from "./Map";

const HexChunkSchema = new mongoose.Schema({
    mapId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Map',
        required: true
    },
    position: {
        x: { type: Number, required: true },
        y: { type: Number, required: true }
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
HexChunkSchema.pre('save', async function (next) {
    const hexChunk = this;
    if (hexChunk.isNew) {
        await Map.findByIdAndUpdate(
            hexChunk.mapId,
            { $push: { hexChunks: hexChunk._id } }
        );
    }

    next();
});

const HexChunk = mongoose.models.HexChunk || model("HexChunk", HexChunkSchema);
export default HexChunk;