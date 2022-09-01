import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import fs from "fs"
import Pusher from "pusher"
import dbModel from "./dbModel.js"

const connection_uri =
  "mongodb+srv://admin:Ey0bGqnpOFRqnYKZ@cluster0.kx0nmlr.mongodb.net/?retryWrites=true&w=majority";

//App config
const app=express()
const port = process.env.PORT || 8000
const pusher = new Pusher({
  appId: "1471302",
  key: "56a34e88398d459bdf65",
  secret: "40eee6b5dd4c3ab2b1cb",
  cluster: "ap2",
  useTLS: true,
});

//middlewares
app.use(express.json())
app.use(cors())

//DB config
mongoose.connect(connection_uri)
mongoose.connection.once('open',()=>{
    console.log('db is stable')

    const changeStream = mongoose.connection.collection('posts').watch()

    changeStream.on('change',(change)=>{
        console.log('change', change)

        if(change.operationType === "insert"){
            const postDetails = change.fullDocument
            pusher.trigger('posts','inserted',{
                user:postDetails.user,
                caption:postDetails.caption,
                image:postDetails.image
            })
        }
    })
})

//Api Route
app.get('/',(res,req)=>res.status(200).send('hello world'))

app.post('/upload',(req,res)=>{

    const body = req.body

    dbModel.create(body,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})

app.get('/sync',(req,res)=>{
    dbModel.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200  ).send(data)
        }

    })
} )

//listen
app.listen(port,()=>console.log(`listening on port ${port}`))