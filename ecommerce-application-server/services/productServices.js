import productModels from "../models/productModels.js"

export const createProduct = async (fields,slug)=>{
    const product = await new productModels({...fields, slug}).save()
    return product
}