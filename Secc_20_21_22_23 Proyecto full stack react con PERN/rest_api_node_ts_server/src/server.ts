//se utilizara la arquitectura handlers
import express from 'express'
import colors from 'colors'
import cors , { CorsOptions } from 'cors'
import morgan from 'morgan'
import swaggerUI from 'swagger-ui-express'
import swaggerSpec, { swaggerUiOption } from './config/swagger'
import router from './router'
import db from './config/db'

// conextar a la base de datos
export async function connectDB() {
    try{
        await db.authenticate()
        db.sync()
        //console.log(colors.blue('Database connected'))
    }catch (error) {
        console.log(colors.red.bold('Error connecting to the database'))
    }
}
connectDB()

//instancia de express
const server = express()

//permitir conecciones 
const corsOptions: CorsOptions ={
    origin: function(origin, callback){
        if(origin === process.env.ORIGIN_URL){
            callback(null, true)
        }else{
            callback(new Error('No permitido por CORS'))
        }
    }
}

server.use(cors(corsOptions))


//Leer datos de formulario
server.use(express.json())

server.use(morgan('dev'))

server.use('/api/products', router)

//Docs
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec,  swaggerUiOption))


export default server