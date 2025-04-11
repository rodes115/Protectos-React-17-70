import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Product from '../models/Product.model';


export const getProducts = async (req: Request, res: Response) => {
    try{
        const products = await Product.findAll({
            order: [
                ['id','DESC']
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'availability']
            }
        })
        res.json({ data: products})
    }catch (error) {
        console.log(error)
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try{
        const { id } = req.params 
        const product = await Product.findByPk(id)

        if(!product){
             res.status(404).json({ message: 'Product not found' })
        }

        res.json({ data: product })
    }catch (error) {
        console.log(error)
    }
}

export const createProduct = async (req: Request, res: Response) => {

    try {
        const product = await Product.create(req.body)
        res.json({ data: product })
    } catch (error) {
        console.log(error)
    }

}

export const updateProduct = async (req: Request, res: Response) => {
    try{
        const {id} = req.params
        const product = await Product.findByPk(id)

        if(!product){
            res.status(404).json({ message: 'Product not found' })
        }

        //Actualizar el producto
        await product.update(req.body)
        await product.save()

        res.json({ data: product})

    }catch(errors){
        console.log(errors)
    }
}

export const updateAvailability = async (req: Request, res: Response) => {
    try{

        const { id } = req.params
        const product = await Product.findByPk(id)

        if(!product){
            res.status(404).json({ message: 'Product not found'})
        }

        product.availability = !product.dataValues.availability
        await product.save()

        res.json({ data: product})

    }catch(errors){
        console.log(errors)
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try{
        const {id} = req.params
        const product = await Product.findByPk(id)

        if(!product){
            res.status(404).json({ message: 'Product not found'})
        }

        //Eliminar el producto
        await product.destroy()
        res.json({ data: 'Producto Eliminado'})

    }catch(errors){
        console.log(errors)
    }
}