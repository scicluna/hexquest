import mongoose, { model } from "mongoose";

const MapSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    hexes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hex'
    }]
})

MapSchema.index({ userId: 1 });
const Map = mongoose.models.Map || model("Map", MapSchema)
export default Map