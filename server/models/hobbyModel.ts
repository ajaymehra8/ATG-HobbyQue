import mongoose, { Document, Schema, Model } from "mongoose";

// Interface for User Document
export interface IHobby extends Document {
  name:string;
  user:mongoose.Types.ObjectId;
}

const hobbySchema: Schema<IHobby> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
    }
  },
  { timestamps: true }
);



// User Model
const Hobby: Model<IHobby> = mongoose.model<IHobby>("Hobby", hobbySchema);
export default Hobby;
