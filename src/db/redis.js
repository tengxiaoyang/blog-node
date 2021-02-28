const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

// 创建Redis客户端：
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on_connect('error', err => {
  console.error(err)
})

function set(key, val) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val, redis.print)
}

function get(key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      if (val == null) {
        resolve(null)
        return
      }
      try {
        resolve(
          JSON.parse(val)
        ) // 如果是JSON字符串就转成JSON对象
      } catch (ex) {
        resolve(val) // 如果try不成功，说明不是JSON字符串，直接返回
      }

      resolve(val)
    })
  })
  return promise
}

module.exports = {
  set,
  get
}