const express = require("express")
const router = express.Router()
const { v4 } = require("uuid")
const db = require("../model")
const redis = require("../redis_noperman_betest");

const Users = db.users

router.get("/user/account/:accountNumber", async(req,res)=>{
  return getUserByAccountNumber(req.params.accountNumber, res)
})

router.get("/user/idn/:idNumber", async(req,res)=>{
  return getUserByIndentityNumber(req.params.idNumber, res)
})

router.post("/user", async(req,res)=>{
  try{
    const {body} = req

    const user = new Users({
      id: v4(),
      userName: body.userName,
      accountNumber: body.accountNumber,
      emailAddress: body.emailAddress,
      identityNumber: body.identityNumber,
    })

    await user.save()
    .then(response=>{
      return res.send({success: true, data: response})
    })
    .catch(error=>{
      return res.status(500).send({success: false, msg: error.message || "Something went wrong"})
    })
  }catch(err){
    return res.status(500).send("Error : "+ err)
  }
})

router.patch('/user/:id', async(req,res)=>{
  try{
    const {id} = req.params
    const {body} = req

    const user = await Users.findOne({id: id})
    
    if(user === null){
      return res.send({success: false, data: null})
    }
    
    user.userName = body.userName
    user.accountNumber = body.accountNumber
    user.emailAddress = body.emailAddress
    user.identityNumber = body.identityNumber

    await user.save()
    .then(response=>{
      return res.send({success: true, data: response})
    })
    .catch(error=>{
      return res.status(500).send({success: false, msg: error.message || "Something went wrong"})
    })
  }catch(err){
    return res.status(500).send("Error : "+ err)
  }
})

router.delete("/user/:id", async(req,res)=>{
  try{
    const {id} = req.params

    const user = await Users.findOne({id: id})

    if(user === null){
      return res.send({success: false, data: null})
    }

    await user.remove()
    .then(response=>{
      return res.send({success: true, data: response})
    })
    .catch(error=>{
      return res.status(500).send({success: false, msg: error.message || "Something went wrong"})
    })
  }catch(err){
    return res.status(500).send("Error : "+ err)
  }
})

async function getUserByAccountNumber(accountNumber, res) {
  try{
    const redisCheck = await redis.getter(accountNumber);

    if(redisCheck){
      console.log("redis")
      return res.send(JSON.parse(redisCheck))
    }else{
      console.log("db")
      Users.findOne({accountNumber: accountNumber})
      .then(response=>{
        if(response !== null){
          redis.setter(response.accountNumber, JSON.stringify({success: true, data : response}))
        }
        return res.send({success: true, data : response})
      })
      .catch(error=>{
        return res.status(500).send({success: false, msg: error.message || "Something went wrong"})
      })
    }
  }catch(err){
    return res.status(500).send("Error : "+ err)
  }
}

async function getUserByIndentityNumber(identityNumber, res) {
  try{
    const redisCheck = await redis.getter(identityNumber);

    if(redisCheck){
      console.log("redis")
      return res.send(JSON.parse(redisCheck))
    }else{
      console.log("db")
      Users.find({identityNumber: identityNumber})
        .then(response=>{
          if(response !== null && response[0]){
            redis.setter(response[0].identityNumber, JSON.stringify({success: true, data : response}))
          }
          return res.send({success: true, data: response})
        })
        .catch(error=>{
          return res.status(500).send({success: false, msg: error.message || "Something went wrong"})
        })
    }
  }catch(err){
    return res.status(500).send("Error : "+ err)
  }
}

module.exports = router