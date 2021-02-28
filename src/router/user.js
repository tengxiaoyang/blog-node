const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 获取cookie的过期时间：
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  console.log('d.toGMTString() is', d.toGMTString())
  return d.toGMTString()
}

const handleUserRouter = (req, res) => {
  const method = req.method //GET POST
  // const url = req.url
  // const path = url.split('?')[0]

  // 用户登录
  if (method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body
    // const { username, password } = req.query
    
    const result = login(username, password)
    return result.then(data => {
      if (data.username) {
        // 操作cookie：
        // res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`)

        // 设置session：
        req.session.username = data.username
        req.session.realname = data.realname
        console.log('req.session is', req.session)
        console.log('req.session.username is', req.session.username)

        return new SuccessModel('用户登录成功')
      }
      console.log('username, password is', username, password)
      return new ErrorModel('用户登录失败')
    })
  }

  // // 登录验证的测试
  // if (method === 'GET' && req.path === '/api/user/login-test') {
  //   console.log('req.session is', req.session)
  //   console.log('req.session.username is', req.session.username)
  //   if (req.session.username) {
  //     return Promise.resolve(
  //       new SuccessModel(
  //         {
  //           session: req.session
  //         }
  //       )
  //     ) 
  //   }
  //   return Promise.resolve(new ErrorModel('尚未登录')) 

    // if (req.cookie.username) {
    //   return Promise.resolve(
    //     new SuccessModel(
    //       {
    //         username: req.cookie.username
    //       }
    //     )
    //   ) 
    // }
  }
}

module.exports = handleUserRouter