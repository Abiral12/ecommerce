import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 20


    },
    slug: {
        type: String,
        required: true,
        trim: true,
        lowercase:true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000

    },
    price: {
        type: Number,
        required: true,
        trim: true,
        min: 1,

    },

    category: {
        type: Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref: "category",

    },

    quantity: {
        type: Number,
        required: true,
        trim: true,
        min: 1,
        max:10000,

    },

    shipping: {
        type: Boolean,
    },

    photo: {
        data: Buffer,
        contentType: String

    },
}, {timestamps: true})

export default mongoose.model("products",productSchema)