import slugify from "slugify";
import productSchema from "../models/productModels.js";
import fs from 'fs'
import categoryModel from "../models/categoryModel.js";
export const createProductController = async (req, res)=>{
    try{
        const {name} = req.body;
        const {photo} = req.files;
        if(!photo){
            return res.status(400).send({
                success: false,
                message: "Please upload a photo"
            })
        }
        if(photo.size > 1000000){
            return res.status(400).send({
                success: false,
                message: "Photo size is too large"
            })
        }
        
        const product = new productSchema({...req.body, slug: slugify(name)})
        if(photo){
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }
        await product.save()
        res.status(201).send({
            success: true,
            message: "Product created successfully",
            product
        })
        // await createProduct(req.fields, slug)
        
    }
    catch(error){
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}

export const getAllproductscontroller = async(req, res)=>{
    try{
        const allProducts = await productSchema.find({}).populate("category").select("-photo").limit(12).sort({createdAt: -1})
        res.status(200).send({
            success: true,
            messeage: "all products fetched successfuly",
            totalDate: allProducts.length,
            allProducts,
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

export const getOneProductController = async (req, res)=>{
try{
    const slug = req.params.slug
    const product = await productSchema.findOne({slug}).populate("category").select("-photo").populate("category")
    if(!product){
        res.status(404).send({
            success: false,
            messeage: "Product not found",
         
        })

    }
    res.status(200).send({
        success: true,
        messeage: "product found successfully",
        
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

export const getProductPhotoController = async(req, res)=>{
    try{
      const {id} = req.params
      const product = await productSchema.findById(id).select("photo")
      if(product.photo.data){
        res.set("Content-Type", product.photo.contentType)
        return res.status(200).send(product.photo.data)
      }
    }   
    catch(error){
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}

export const deleteProductController =async(req, res )=>{
    try{
        const {id} = req.params
        const product = await productSchema.findByIdAndDelete(id).select("-photo")
        res.status(200).send({
            success: true,
            message: "product deleted successfully",
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

export const productUpdateController = async(req, res)=>{
    try{
        const {name} = req.body;
        const {photo} = req.files;
        const {slug} = req.params;
        if(!photo){
            return res.status(400).send({
                success: false,
                message: "Please upload a photo"
            })
        }
        if(photo.size > 1000000){
            return res.status(400).send({
                success: false,
                message: "Photo size is too large"
            })
        }
        const product = await productSchema.findOne({slug}).populate("category").select("-photo")
        if(!product){
            res.status(404).send({
                success: false,
                messeage: "Product not found",
             
            })
    
        }
        const updatedProduct = await productSchema.findByIdAndUpdate(product.id, {...req.body, slug: slugify(name)}, {new: true})
        if(photo){
            updatedProduct.photo.data = fs.readFileSync(photo.path);
            updatedProduct.photo.contentType = photo.type;
        }
        await updatedProduct.save()
        res.status(200).send({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct

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

export const getTotalProductCountController = async(req, res)=>{
    try{
        const totalProductCount = await productSchema.find({}).estimatedDocumentCount()
        res.status(200).send({
            success: true,
            message: "Total product count fetched successfully",
            totalProductCount
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

export const getProductByPage = async(req, res)=>{
    try{
        const page = req.params.page ?? 1
        const perPageItems = 10
        const products = await productSchema.find({}).select('-photo').populate('category').skip((page-1)*perPageItems).limit(perPageItems  ).sort({createdAt: -1})
        res.status(200).send({
            success: true,
            message: "Products fetched successfully",
            products,
            totalCount: products.length
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

export const getProductBycategory = async (req, res) =>{
    try{
        const {slug} = req.params
        const category = await categoryModel.findOne({slug})
        if(!category){
            return res.status(404).send({
                success: false,
                message: "Category not found",
            })
        }
        const products = await productSchema.find({category: category._id}).select("-photo")
        res.status(200).send({
            success: true,
            message: "Products fetched successfully",
            totalCount: products.length,
            products
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

export const searchProductrController = async(req, res)=>{
    try{
        const {keyword} = req.query
        const products =await productSchema.find({
            $or:[
                {
                    name:{$regex:keyword?.trim(), $options: 'i' }
                },
                {
                    description:{$regex:keyword?.trim(), $options: 'i' }
                }
            ]
        }).select("-photo").populate('category')
        res.status(200).send({
            success: true,
            message: "Products for ${keyword} fetched successfully",
            totalCount: products.length,
            products
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