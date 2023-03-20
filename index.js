import express from "express"
import {config} from "dotenv"
import db from "mongoose"
import bodyParser from "body-parser"
import routes from "./routes/index.js"

config()
const app = express()

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.json())
app.use(routes)

app.use((err, req, res, next) => {
    res.status(err.status || 400)
    .json({message: err.message || 'there seems to be problem'})
})

app.listen(process.env.API_PORT, process.env.API_HOST, async()=>{
    console.log(`Server started at http://${process.env.API_HOST}:${process.env.API_PORT}`)
    console.log('Press Ctrl+C to stop')
    db.connect(process.env.MONGO_URL)
    console.log('Mongodb Connected')
})