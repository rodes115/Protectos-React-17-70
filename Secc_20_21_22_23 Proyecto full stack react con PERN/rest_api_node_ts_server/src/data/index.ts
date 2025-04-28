import { exit } from 'node:process'
import db from '../config/db'

const clearDB = async() => {
    try{
        await db.sync({force:true})
        console.log('Database cleared')
        exit(0)
    }catch(err){
        console.error('Error clearing database:', err)
        exit(1)
    }
} 

if(process.argv[2] === '--clear'){
    clearDB()
}else{
    console.log('Use --clear to clear the database')
    exit(1)
}