import mongoose, { model } from "mongoose";
import Map from "./Map";

const HexSchema = new mongoose.Schema({
    mapId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Map',
        required: true
    },
    history: [String],
    terrainType: {
        type: String,
        enum: ['M', 'F', 'P', 'C', 'O', 'L', 'B', 'H', 'D', 'J', 'Ma', '?'],
        required: true
    },
    feature: String,
    position: {
        x: { type: Number, required: true },
        y: { type: Number, required: true }
    }
})

HexSchema.index({ hexChunkId: 1 });
HexSchema.pre('save', async function (next) {
    const hex = this;
    if (hex.isNew) {
        await Map.findByIdAndUpdate(
            hex.mapId,
            { $push: { hexes: hex._id } }
        );
    }

    next();
});

const Hex = mongoose.models.Hex || model("Hex", HexSchema)
export default Hex