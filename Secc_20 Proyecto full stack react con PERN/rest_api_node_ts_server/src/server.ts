//se utilizara la arquitectura handlers
import express from 'express'
import colors from 'colors'
import router from './router'
import db from './config/db'

// conextar a la base de datos
async function connectDB() {
    try{
        await db.authenticate()
        db.sync()
        console.log(colors.blue('Database connected'))
    }catch (error) {
        console.log(colors.red.bold('Error connecting to the database: ' + error))
    }
}
connectDB()

//instancia de express
const server = express()

//Leer datos de formulario
server.use(express.json())


server.use('/api/products', router)


export default server