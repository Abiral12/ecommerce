import express from 'express'
import { requireAuth } from '../middlewares/requireAuth.js'
import { orderPostRequest } from '../request/order.js'
import { changeOrderStatus, createOrderController, getAllordersController, getMyallorders, orderDetailController } from '../controllers/orderController.js'
import {validator} from '../middlewares/validator.js'
import { isAdmin } from '../middlewares/isAdmin.js'
const orderRoutes = express.Router()

orderRoutes.post('/create', orderPostRequest,validator,requireAuth,createOrderController)
orderRoutes.get('/getall',requireAuth,isAdmin,getAllordersController)
orderRoutes.get('/:id', requireAuth, isAdmin,orderDetailController)
orderRoutes.get('', requireAuth,getMyallorders)
orderRoutes.put('/:id', requireAuth,isAdmin,changeOrderStatus)



export default orderRoutes