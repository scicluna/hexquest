import mongoose, { model } from "mongoose";
import HexChunk from "./HexChunk";

const HexSchema = new mongoose.Schema({
    hexChunkId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HexChunk',
        required: true
    },
    history: [String],
    terrainType: {
        type: String,
        enum: ['M', 'F', 'P', 'C', 'O', 'L', 'B', 'H', 'D', 'J', '?'],
        required: true
    },
    feature: String
    // ... Add other fields as needed
})

HexSchema.index({ hexChunkId: 1 });
HexSchema.pre('save', async function (next) {
    const hex = this;
    if (hex.isNew) {
        await HexChunk.findByIdAndUpdate(
            hex.hexChunkId,
            { $push: { hexes: hex._id } }
        );
    }

    next();
});

const Hex = mongoose.models.Hex || model("Hex", HexSchema)
export default Hex