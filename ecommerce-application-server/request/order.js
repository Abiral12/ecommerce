import {check} from "express-validator"

export const orderPostRequest = [
    check("products").notEmpty().withMessage("cart-item is required").isArray().withMessage("Valid cart-item is required").isLength({min: 1}).withMessage("There must be one item in orders").isLength({max: 100}).withMessage("cart cannot have more than 100 items"),
    check("customer").notEmpty().withMessage("customer is required").isMongoId().withMessage("Valid customer is required"),
    check("totalAmount").notEmpty().withMessage("totalAmount is required").isFloat({min:1, max:1000000}).withMessage("Price must be betwee 1 and 1000000")

]