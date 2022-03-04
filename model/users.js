'use strict'

module.exports = (mongoose) => {
  const schema = mongoose.Schema({
    id: {
      type: String,
      required: true,
      unique: true
    },
    userName: {
      type: String,
      required: true,
      unique: true
    },
    accountNumber: {
      type: String,
      required: true,
      unique: true
    },
    emailAddress: {
      type: String,
      required: true
    },
    identityNumber: {
      type: String,
      required: true
    }
  },{timestammps: true})

  const User = mongoose.model("users", schema)
  return User
}