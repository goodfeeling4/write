import mongoose, {Schema} from "mongoose";

const messageSchema = new Schema({
    title: String,
    description: String,
},
{
    timestamps: true,
    versionKey: false

})
const message = mongoose.models.message|| mongoose.model("Topic", messageSchema);
export default message;