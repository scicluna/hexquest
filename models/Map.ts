import mongoose, { model } from "mongoose";
import Hex from "./Hex";

const MapSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: String,
    hexes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hex'
    }]
});

MapSchema.index({ userId: 1 });

// Handle cascading deletes for HexChunks when a Map is removed
MapSchema.pre('deleteOne', async function (next) {
    const map = this as any;

    // Remove all HexChunks associated with this map
    await Hex.deleteMany({ _id: { $in: map.hexes } });

    next();
});

const Map = mongoose.models.Map || model("Map", MapSchema);
export default Map;