import { productByCategoryGetRequest, productByPageRequest, productCreateRequest, productDeleteRequest, productGetBySlug, productphotoGetRequest, productSearchGetRequest, productUpdateRequest } from "../request/product.js"
import express from 'express'
import {validator} from "../middlewares/validator.js"
import { requireAuth } from "../middlewares/requireAuth.js"
import { isAdmin } from "../middlewares/isAdmin.js"
import formidable from "express-formidable"
import { createProductController, deleteProductController, getAllproductscontroller, getOneProductController, getProductBycategory, getProductByPage, getProductPhotoController, getTotalProductCountController, productUpdateController, searchProductrController } from "../controllers/productController.js"
import { formidableParser } from "../middlewares/formidableparser.js"
const productRoutes= express.Router()

productRoutes.post('/create',formidableParser,productCreateRequest,validator,requireAuth,isAdmin, createProductController)
productRoutes.get('',requireAuth, getAllproductscontroller)
productRoutes.get('/:slug',productGetBySlug,validator,requireAuth, getOneProductController )
productRoutes.get('/photo/:id',productphotoGetRequest,validator,requireAuth, getProductPhotoController)
productRoutes.delete('/:id', productDeleteRequest,validator,requireAuth,isAdmin,deleteProductController)
productRoutes.put('/:slug',formidableParser,productUpdateRequest,validator,requireAuth,isAdmin,productUpdateController)
productRoutes.get('/total/count', requireAuth,getTotalProductCountController)
productRoutes.get('/pages/:page',productByPageRequest, validator, requireAuth,getProductByPage)
productRoutes.get('/category/:slug',productByCategoryGetRequest, validator, requireAuth,getProductBycategory)
productRoutes.get('/products/search',productSearchGetRequest, validator,requireAuth,searchProductrController )
export default productRoutes