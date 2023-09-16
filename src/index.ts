//Importación de dependencias y configuraciones principales.
import express, {json} from 'express'
import db from "./database/movies.json"
import crypto from "node:crypto"
import { writeFile } from 'jsonfile'

const PATH='./src/database/movies.json'
const PORT = 45000
const app=express()
app.use(json())

// ------------------| MIDDLEWARES |------------------- //

// Middleware para poder procesar el body de las request.

// --------------------| ROUTING |--------------------- //

// Armen acá todo el ruteo de los endpoints.
app.get('/api',(req,res)=>{
    res.status(200).json(db.info)
})
app.get('/api/movies',(req,res)=>{
    res.status(200).json(db.movies)
})
app.get('/api/movies/:id',(req,res)=>{
    const id=req.params.id
    const movieSearch=db.movies.find((movie:any)=>movie.id==id)
    if(movieSearch==undefined)res.status(204).send('Movie not found in db')  
    res.status(200).json(movieSearch)
})

app.post('/api/movies',(req,res)=>{
    const data=req.body
    const {name,year,director,cast,rating}=data
    const movieExists=db.movies.find((movie:any)=>movie.name.toLowerCase() == name.toLowerCase())
    if(movieExists!=undefined) {
        res.status(200).send('Movie already in db') 
        return}
    const id=crypto.randomUUID()
    db.movies.push({id,name,year,director,cast,rating})
    writeFile(PATH,db)
    res.status(201).json({id:id})
})
app.patch('/api/movies/:id',(req,res)=>{
    const idParam=req.params.id
    const movieIndex=db.movies.findIndex((movie:any)=>movie.id==idParam)
    if(movieIndex==-1){
        res.status(304).json("Movie not found in db") 
        return
    }
    const data = req.body
    const {id,name,year,director,cast,rating}=data
    const update={
        id:id,
        name:name,
        year:year,
        director:director,
        cast:cast,
        rating:rating
    }
    db.movies.splice(movieIndex,1)
    db.movies.push(update)
    writeFile(PATH,db)
    res.status(200).json({id:id})

})

app.get('*',(res,req)=>{
    req.status(404).json('We could not find the resource you requested.')
})
app.post('*',(res,req)=>{
    req.status(404).json('We could not find the resource you requested.')
})
app.patch('*',(res,req)=>{
    req.status(404).json('We could not find the resource you requested.')
})
// ---------------------| SERVER |--------------------- //

// Poner a la escucha al servidor.

app.listen(PORT,()=>{
    console.log("SERVER LISTENING ON PORT: ",PORT)
})