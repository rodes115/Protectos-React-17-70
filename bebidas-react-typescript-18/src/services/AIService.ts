import {streamText} from 'ai';
import { openrouter } from '../lib/ai';

export default {
    async generateRecipe(prompt:string) {
        
        const result = streamText({
            model: openrouter('meta-llama/llama-3.3-70b-instruct:free'),
            prompt: prompt,
            //system: 'Eres un bartender que tiene 50 años de experiencia y le sirvio una bebida a james bond',
            system: 'Eres un niño de 5 años', // en esta parte se le puede dar un contexto al modelo, por ejemplo: Eres un bartender que tiene 50 años de experiencia y le sirvio una bebida a james bond',
            temperature: 1 // en esta parte le puedes decir al IA que de respuestas muy consistentes o muy variadas, 0.1 es muy consistente y 1 es muy variado
        })
       return result.textStream
    }
}