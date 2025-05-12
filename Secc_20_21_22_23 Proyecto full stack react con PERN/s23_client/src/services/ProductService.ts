import { safeParse, number, parse, string, transform, pipe } from "valibot"
import axios from 'axios'
import { DraftProductSchema, ProductsSchema, Product, ProductSchema } from "../types"
import { trueBoolean } from "../utils"

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
        //console.log(data)
        if (result.success) {
            return result.output
        } else {
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
        if (result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error ...')
        }
    } catch (error) {
        console.log(error)
    }

}

export async function updateProduct(data: ProductData, id: Product['id']) {
    try {

        const NumberSchema = pipe(string(), transform(Number), number())

        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: parse(NumberSchema, data.price),
            availability: trueBoolean(data.availability.toString())
        })

        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
            await axios.put(url, result.output)
        }

    } catch (error) {
        console.log(error)
    }
}

export async function deletePrduct(id: Product['id']){
    try {
        
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const {data} = await axios.delete(url)

    } catch (error) {
        console.log(error)
        
    }
}

export async function updateProductAvailability(id: Product['id']){
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url)
    } catch (error) {
        console.log(error)
        
    }
}