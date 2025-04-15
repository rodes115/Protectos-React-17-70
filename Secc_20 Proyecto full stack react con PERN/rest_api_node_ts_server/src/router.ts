import { Router } from "express"
import { body, param } from "express-validator"
import { createProduct, getProducts, getProductById, updateProduct, updateAvailability, deleteProduct } from "./handlers/product"
import { handleInputErrors } from "./middleware"

const router = Router()

//Routing  lo que envio -- lo que recibo
router.get('/', getProducts)
router.get('/:id',

    param('id')
        .isInt()
        .withMessage('El id no es valido'),
    handleInputErrors,
    getProductById
)

router.post('/',

    //validar datos
    body('name')
        .notEmpty()
        .withMessage('Nombre del producto no puede ir vacio'),


    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El Precio del producto no puede ir vacio')
        .custom((value) => value > 0).withMessage('El Precio del producto no puede ser menor a 0'),
    handleInputErrors,
    createProduct

)

router.put('/:id',
    
    //validar datos
    body('name')
        .notEmpty()
        .withMessage('Nombre del producto no puede ir vacio'),


    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El Precio del producto no puede ir vacio')
        .custom((value) => value > 0).withMessage('El Precio del producto no puede ser menor a 0'),
    body('availability')
        .isBoolean()
        .withMessage('El valor de disponibilidad no es válido'),
        handleInputErrors,
        updateProduct
)

router.patch('/:id',

    param('id')
        .isInt()
        .withMessage('El id no es valido'),
    handleInputErrors,
    updateAvailability
)

router.delete('/:id', 
param('id')
.isInt()
.withMessage('El id no es valido'),
handleInputErrors,
deleteProduct
)


export default router