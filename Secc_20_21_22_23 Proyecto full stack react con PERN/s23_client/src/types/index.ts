import {object, string, number, InferOutput as Output, array, boolean} from 'valibot'

export const DraftProductSchema = object ({
    name: string(),
    price: number()
})

export const ProductSchema = object({
    id:number(),
    name: string(),
    price: number(),
    availability: boolean()
})

export const ProductsSchema = array(ProductSchema)

export type Product = Output<typeof ProductSchema>