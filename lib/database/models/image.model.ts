import {model, models, Schema} from "mongoose"

export interface ImageInterface extends Document {
    title: string;
    publicId: string;
    processType: string;
    url: string; // URL type in TypeScript is generally represented as a string
    color?: string;
    width?: number;
    height?: number;
    aspectRatio?: string;
    processTypeUrl?: string; // Same as above
    config?: object; // Or you can define a more specific type if you know the structure
    prompt?: string;
    user: {
    _id: string;
    firstName: string;
    lastName: string;
  }
    createdAt?: Date;
    updatedAt?: Date;
  }

const ImageSchema=new Schema({
    title:{type:String,required:true},
    publicId:{type:String, required:true},
    processType:{type:String, required:true},
    url:{type:URL, required:true},
    color:{type:String},
    width:{type:Number},
    height:{type:Number},
    aspectRatio:{type:String},
    processTypeUrl:{type:URL},
    config:{type:Object},
    prompt:{type:String},
    user:{type:Schema.Types.ObjectId, ref:"User"},
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date, default:Date.now},

})


const Image=models?.Image || model('Image', ImageSchema)

export default Image