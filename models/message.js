import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
    {
        title: String,
        description: String,
    },
    {
        timestamps: true,

    })
const message = mongoose.models.message || mongoose.model("message", messageSchema);
export default message;