import { safeParse } from "valibot"
import axios from 'axios'
import { DraftProductSchema, ProductsSchema, Product, ProductSchema} from "../types"

type ProductData = {
    [k: string]: FormDataEntryValue
}

export async function addProduct(data: ProductData) {


    try {

        const parsedData = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        })
        if (parsedData.success) {

            const url = `${import.meta.env.VITE_API_URL}/api/products`
            await axios.post(url, {
                name: parsedData.output.name,
                price: parsedData.output.price
            })

        } else {
            throw new Error('Datos no  validos')
        }

    } catch (error) {

        console.log(error)

    }

}

export async function getProducts() {
    
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const { data } = await axios.get(url)
        const result = safeParse(ProductsSchema, data.data)
        console.log(data)
        if(result.success){
            return result.output
        }else{
            throw new Error('Hubo un error ...')
        }
    } catch (error) {
        console.log(error)
    }

}

export async function getProductById(id: Product['id']) {
    
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const { data } = await axios.get(url)
        const result = safeParse(ProductSchema, data.data)
        if(result.success){
            return result.output
        }else{
            throw new Error('Hubo un error ...')
        }
    } catch (error) {
        console.log(error)
    }

}