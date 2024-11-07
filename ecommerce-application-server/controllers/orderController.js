import orderModel from "../models/orderModel.js";

export const createOrderController = async(req,res)=>{
    try{
        const {products, customer, totalAmount} = req.body;
        const order = await new orderModel({products, customer, totalAmount}).save();
        res.status(201).send({
            success: true,
            message: "Order created successfully",
            order
        })

    }
    catch(error){
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}

export const getAllordersController = async(req, res)=>{
    try{
        const orders = await orderModel.find({}).populate("customer","name").populate("products","name").sort({created:-1});
        res.status(200).send({
            success: true,
            message: "Orders retrieved successfully",
            allOrders: orders.length,
            orders
        })
    }
    catch(error){
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}

export const orderDetailController = async(req, res)=>{
    try{
        const {id} = req.params.id;
        const order = await orderModel.findById(id).populate({path: 'products', select: '-photo'}).populate({path: 'customer', select: '-password'}).sort({created: -1})
        res.status(200).send({
            success: true,
            message: "Order details retrieved successfully",
            order
        })
 }
 catch(error){
    res.status(500).send({
        success: false,
        message: "Something went wrong",
        error
    })
}
}

export const getMyallorders = async(req, res)=>{
    try{
        const orders = await orderModel.find({customer:req.user._id}).populate({path: 'products', select: '-photo'}).populate({path: 'customer', select: '-password'}).sort({created: -1})
        res.status(200).send({
            success: true,
            totalorders:orders.length,
            message: "Orders retrieved successfully",
            orders
        })
    }
    catch(error){
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}

export const changeOrderStatus = async(req, res)=>{
    try{
       const {orderId} = req.params
       const {status} = req.body
       const order = await orderModel.findByIdAndUpdate(orderId,{...req.body}, {new: true})
       res.status(200).send({
        success: true,
        message: "Order status updated successfully",
        order
       })

    }
    catch(error){
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}