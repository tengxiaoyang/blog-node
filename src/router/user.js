const { loginCheck } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleUserRouter = (req, res) => {
  const method = req.method //GET POST
  // const url = req.url
  // const path = url.split('?')[0]

  // 用户登录
  if (method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body
    const result = loginCheck(username, password)
    if (result) {
      return new SuccessModel()
    }
    return new ErrorModel('用户登录失败')
  }
}

module.exports = handleUserRouter