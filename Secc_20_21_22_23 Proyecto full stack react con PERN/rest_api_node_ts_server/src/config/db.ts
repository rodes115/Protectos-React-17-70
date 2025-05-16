import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config()

console.log(process.env.DATABASE_URL)

const db = new Sequelize(process.env.DATABASE_URL!, {
    models:[__dirname + '/../models/**/*'],
    logging: false, // Set to true to see SQL queries in the console
    dialectOptions:{
        ssl:{
            required: true
        }
    }
})

export default db