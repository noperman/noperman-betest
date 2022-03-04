'use strict'

require('dotenv').config()
const { default: mongoose } = require("mongoose")

const db = {}
db.mongoose = mongoose
db.url = process.env.MONGGO_DB_URL
db.users = require('./users')(mongoose)

module.exports = db