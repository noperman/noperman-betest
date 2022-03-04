const {createClient} = require('redis')
require('dotenv').config()
const redisClient = createClient({
  url: process.env.REDIS_URL
})
redisClient.on('error', (err) => {
  console.log('Redis Client Error', err)
  process.exit()
});
redisClient.connect();

module.exports = {
  getter: (key) =>{
    return redisClient.get(key, (err, res)=>{
      if(err) return err
      return res
    })
  },
  setter: (key, value) =>{
    redisClient.set(key, value, {EX: process.env.REDIS_EXPIRED, NX: true})
  }
}