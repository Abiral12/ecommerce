import { check,param,query} from "express-validator"

 export const productCreateRequest = [
    check('name').trim().notEmpty().withMessage(' name is required').withMessage('description is not required').isLength({min: 2}).withMessage(' at least 2 character').isLength({max: 20}).withMessage(' max 20 character'),
    check('price').trim().notEmpty().withMessage(' price is required').isFloat({min: 1, max: 1000000000}).withMessage(' price must be number'),
    check('description').trim().notEmpty().withMessage(' description is required').isLength({min: 2}).withMessage('at least 2 character of description').isLength({max: 1000}).withMessage('max 1000 character of description'),
    check('category').trim().notEmpty().withMessage('category is required '),
    check('quantity').trim().notEmpty(). withMessage('quantity is required').isInt({min:1, max:1000}).withMessage('Quantity must be between 1 and 10000 '),
    check('shipping').optional().isBoolean().withMessage('Shipping is required ')

]

export const productGetBySlug = [
    param('slug').trim().notEmpty(). withMessage('slug is required'). isSlug().withMessage('Valid slug as params is required')
]

export const productphotoGetRequest = [
    param('id').trim().notEmpty(). withMessage('id is required'). isMongoId().withMessage('Valid slug as params is required')
]

export const productDeleteRequest = [
    param('id').trim().notEmpty(). withMessage('id is required'). isMongoId().withMessage('Valid slug as params is required')
]

export const productUpdateRequest = [
    check('name').trim().notEmpty().withMessage(' name is required').withMessage('description is not required').isLength({min: 2}).withMessage(' at least 2 character').isLength({max: 20}).withMessage(' max 20 character'),
    check('price').trim().notEmpty().withMessage(' price is required').isFloat({min: 1, max: 1000000000}).withMessage(' price must be number'),
    check('description').trim().notEmpty().withMessage(' description is required').isLength({min: 2}).withMessage('at least 2 character of description').isLength({max: 1000}).withMessage('max 1000 character of description'),
    check('category').trim().notEmpty().withMessage('category is required '),
    check('quantity').trim().notEmpty(). withMessage('quantity is required').isInt({min:1, max:1000}).withMessage('Quantity must be between 1 and 10000 '),
    check('shipping').optional().isBoolean().withMessage('Shipping is required ')

]

export const productByPageRequest = [
    check('page').trim().notEmpty().withMessage('page is required').isInt({min:1, max:10000}).withMessage('page must be between 1 and 10000 '),
]

export const productByCategoryGetRequest = [
    param('slug').trim().notEmpty().withMessage('Slug as pram is required').isSlug().withMessage('Valid slug is required')
]

export const productSearchGetRequest = [
    query('keyword').trim().notEmpty().withMessage('search keyword is required').isLength({min:2}).withMessage('Name must be at least 2 characters long').isLength({min:2}).withMessage('Name cannot exceed 50 characters')
]
