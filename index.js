const express = require("express");
const app = express()

const JWTCheker = require("./helper");

require('dotenv').config()
const port = process.env.PORT

/** Mongo INIT */
const db = require('./model')
db.mongoose.connect(db.url, {useNewUrlParser:true})
.then(()=>console.log("Database is connected!"))
.catch((err)=>{console.log("Unable to connect into database!", err);process.exit()})
/** Mongo INIT */

app.use(express.json())

/** Middleware token check */
app.use((req,res,next)=>{
  try{
    const {headers} = req 
    if(headers.authorization){
      const token = headers.authorization.split(" ")[1]
      
      const tokenValidator = JWTCheker(token)
      
      if(!tokenValidator.valid){
        return res.status(400).json(tokenValidator.msg)
      }else{
        next()
      }
    }else{
      const path = req.originalUrl.split("?")[0]

      if(path !== "/v1/token/generator"){
        return res.status(401).json({msg: "Unauthorized!"})
      }

      next()
    }
  }catch(err){
    return res.send('Error : '+err)
  }
})
/** Middleware token check */

const index = require('./router/')
app.use('/v1',index)

app.listen(port, ()=>{
  console.log("Server started at http://localhost:"+port)
})