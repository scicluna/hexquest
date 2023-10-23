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
        enum: ['M', 'F', 'P', 'C', 'O', 'L', 'B', 'H', 'D', 'J', '?'],
        required: true
    },
    feature: String
    // ... Add other fields as needed
})

HexSchema.index({ mapId: 1 });
HexSchema.pre('save', async function (next) {
    // This refers to the Hex document being saved
    const hex = this;

    if (hex.isNew) { // Check if the Hex is a new document
        await Map.findByIdAndUpdate(
            hex.mapId,
            { $push: { hexes: hex._id } }
        );
    }

    next();
});

const Hex = mongoose.models.Hex || model("Hex", HexSchema)
export default Hex