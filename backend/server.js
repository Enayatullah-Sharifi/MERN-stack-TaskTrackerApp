import express from 'express'
import dotenv from 'dotenv'
import color from 'colors'
import connectDB from './server/db/db.js'
import cors from 'cors'
import router from './server/routes/taskRouter.js'


const app = express()
app.use(cors())
dotenv.config('')
app.use(express.json())


connectDB()
app.use('/', router)


const port = process.env.PORT || 1000;
app.listen( port , () => console.log(`Server running on port ${port}`.bold.underline.yellow))