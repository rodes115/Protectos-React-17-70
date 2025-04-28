import { safeParse } from "valibot"
import  axios  from 'axios'
import { DraftProductSchema } from "../types"

type ProductData = {
    [k:string] : FormDataEntryValue
}

export async function addProduct(data : ProductData) {


    try {

        const parsedData = safeParse(DraftProductSchema,{
            name: data.name,
            price: +data.price
        })
        if(parsedData.success){
            
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            const {data} = await axios.post(url,{
                name: parsedData.output.name,
                price: parsedData.output.price
            })

        }else{
            throw new Error('Datos no  validos')
        }
    
    } catch (error) {
    
        console.log(error)
    
    }

    


}