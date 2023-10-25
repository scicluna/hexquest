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
})

MapSchema.index({ userId: 1 });

//handle cascading deletes
MapSchema.pre('deleteOne', async function (next) {
    const map = this as any;
    await Hex.deleteMany({ mapId: map._id });

    next();
});

const Map = mongoose.models.Map || model("Map", MapSchema)
export default Map