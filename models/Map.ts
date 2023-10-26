import mongoose, { model } from "mongoose";
import HexChunk from "./HexChunk";  // Ensure you're importing HexChunk 

const MapSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: String,
    hexChunks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HexChunk'
    }]
});

MapSchema.index({ userId: 1 });

// Handle cascading deletes for HexChunks when a Map is removed
MapSchema.pre('deleteOne', async function (next) {
    const map = this as any;

    // Remove all HexChunks associated with this map
    await HexChunk.deleteMany({ _id: { $in: map.hexChunks } });

    next();
});

const Map = mongoose.models.Map || model("Map", MapSchema);
export default Map;