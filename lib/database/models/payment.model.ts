import { model, models, Schema } from "mongoose";

const PaymentSchema=new Schema({
    stripeId:{
        type:String,
        unique: true,
        required: true,
    },
    payAmount:{
        type:Number,
        required:true
    },
    credits:{
        type:Number,
    },
    plan:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})

const Payment = models?.Payment || model("Payment", PaymentSchema);

export default Payment;