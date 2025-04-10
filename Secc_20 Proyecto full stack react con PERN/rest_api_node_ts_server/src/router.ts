import { Router } from "express"
import { body } from "express-validator"
import { createProduct } from "./handlers/products"

const router = Router()

//Routing  lo que envio -- lo que recibo
router.get('/', (req, res) => {

    //res.send('Hola desde el servidor')
    res.json('utilizar GET')
})

router.post('/',
    
     //validar datos
     body('name')
     .notEmpty()
     .withMessage('Nombre del producto no puede ir vacio'),
     
 
     body('price')
     .isNumeric().withMessage('Valor no válido')
     .notEmpty().withMessage('El Precio del producto no puede ir vacio')
     .custom((value)=> value > 0).withMessage('El Precio del producto no puede ser menor a 0'),
     
    createProduct

)

router.put('/', (req, res) => {

    //res.send('Hola desde el servidor')
    res.json('utilizar PUT')
})

router.patch('/', (req, res) => {

    //res.send('Hola desde el servidor')
    res.json('utilizar PATCH')
})

router.delete('/', (req, res) => {

    //res.send('Hola desde el servidor')
    res.json('utilizar delete')
})


export default router