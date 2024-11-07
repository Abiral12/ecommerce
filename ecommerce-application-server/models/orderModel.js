import { mongoose, Schema } from 'mongoose';

const orderModel = mongoose.Schema({
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'products',
            required: true
        }
    ],
       customer: 
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
                required: true
            },
        totalAmount: 
            {
                type: Number,
                min: 1,
                max: 1000000,
                required: true
            },
        status: 
            {
                type: String,
                trim: true,
                default: "onprocess",
                enum: ["onprocess", "shipping", "delivered", "rejected"]
            }
        
        
    
},{timestamps:true})





export default mongoose.model("order", orderModel)


