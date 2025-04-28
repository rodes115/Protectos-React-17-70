import { Router } from "express"
import { body, param } from "express-validator"
import { createProduct, getProducts, getProductById, updateProduct, updateAvailability, deleteProduct } from "./handlers/product"
import { handleInputErrors } from "./middleware"

const router = Router()

/**
 * @swagger
 * components:
 *    schemas:
 *      Product:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            description: The Product ID
 *          name:
 *            type: string
 *            description: The Product name
 *            example: The Product name
 *          price:
 *            type: number
 *            description: The Product price
 *            example: 300
 *          availability:
 *            type: boolean
 *            description: The Product availability
 *            example: true
 */

/**
 * @swagger
 * /api/products:
 *     get:
 *      summary: Get a list of products
 *      tags:
 *          - Products
 *      description: return a list of products
 *      responses:
 *          200:
 *              description: successful response
 *              content:
 *                  application/json:
 *                       schema:
 *                          type: array
 *                          items:                
 *                              $ref: '#/components/schemas/Product'
 * 
 */


//Routing  lo que envio -- lo que recibo
router.get('/', getProducts)


/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Get a product by ID
 *      tags:
 *          - Products
 *      description: return a product based on its unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the rpoduct to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                         type: array
 *                         items:
 *                             $ref: '#/components/schemas/Product'
 *          404:
 *              description: Not Found
 *          400:
 *              description: Bad Request - Invalid ID
 * 
 */



router.get('/:id',

    param('id')
        .isInt()
        .withMessage('El id no es valido'),
    handleInputErrors,
    getProductById
)

/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Create a new product
 *      tags:
 *          - Products
 *      description: Returns a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                 schema:
 *                    type: object
 *                    properties:
 *                       name:
 *                           type: string
 *                           example: "Monitor curvo de 60 pulgadas"
 *                       price:
 *                           type: number
 *                           example: 300
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                 application/json:
 *                      schema:
 *                        $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid input data
 * 
 */

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

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *       summary: Update a product with user input
 *       tags:
 *          - Products
 *       description: Return the updated product
 *       parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *       requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                 schema:
 *                    type: object
 *                    properties:
 *                       name:
 *                           type: string
 *                           example: "Monitor curvo de 60 pulgadas"
 *                       price:
 *                           type: number
 *                           example: 300
 *                       availability:
 *                           type: boolean
 *                           example: true
 *       responses:
 *           200:
 *               description: Successful response
 *               content:
 *                  application/json:
 *                      schema:
 *                         $ref: '#/components/schemas/Product'
 *           400:
 *               description: Bad Request - Invalid ID or Invalid input data
 *           404:
 *               description: Product not found
 * 
 */


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

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *        summary: Update Product availability
 *        tags:
 *            - Products
 *        description: Return the updated availability
 *        parameters:
 *           - in: path
 *             name: id
 *             description: The ID of the product to retrieve
 *             required: true
 *             schema:
 *                type: integer
 *        responses:
 *            200:
 *                description: Successful response
 *                content:
 *                   application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/Product'
 *            400:
 *                description: Bad Request - Invalid ID
 *            404:
 *                description: Product not found
 *             
 * 
 */

router.patch('/:id',

    param('id')
        .isInt()
        .withMessage('El id no es valido'),
    handleInputErrors,
    updateAvailability
)

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *        summary: Delete a product by ID
 *        tags:
 *            - Products
 *        description: Delete a product based on its unique ID
 *        parameters:
 *           - in: path
 *             name: id
 *             description: The ID of the product to retrieve
 *             required: true
 *             schema:
 *                type: integer
 *        responses:
 *           200:
 *              description: Successful response
 *              content:
 *                 application/json:
 *                    schema:
 *                       type: string
 *                       value: 'Producto Eliminado'
 *           400:
 *              description: Bad Request - Invalid ID
 *           404:
 *              description: Product not found 
 */

router.delete('/:id', 
param('id')
.isInt()
.withMessage('El id no es valido'),
handleInputErrors,
deleteProduct
)


export default router