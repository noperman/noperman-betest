const express = require("express")

const jsonwebtoken = require("jsonwebtoken")
const fs = require('fs')
const path = require('path')
const PRIVATE_KEY = fs.readFileSync(path.join(__dirname, "../", "private.key"), "utf8")

const router = express.Router()

router.get("/token/generator", (req,res)=>{
  try {
    const data = {
      isLogedIn: true
    }

    const token = jsonwebtoken.sign(data, PRIVATE_KEY, {
      algorithm: process.env.JWT_ALGORITHM,
      expiresIn: process.env.JWT_SECURITY_AGE
    });

    return res.send({token: token})
  } catch (err) {
    return res.send("Error : "+ err)
  }
})

module.exports = router