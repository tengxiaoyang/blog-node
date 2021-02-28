const { 
  getList, 
  getDetail, 
  newBlog, 
  updateBlog,
  deleteBlog 
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 定义一个统一的登录验证函数：
const loginCheck = req => {
  if (!req.session.username) {
    return Promise.resolve(
      new ErrorModel('尚未登录')
    )
  }
}

const handleBlogRouter = (req, res) => {
  const method = req.method //GET POST
  const id = req.query.id

  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    // const listData = getList(author, keyword)
    // return new SuccessModel(listData)
    const result = getList(author, keyword)
    return result.then(listData => {
      return new SuccessModel(listData)
    }) // mysql.js里的resolve(result)中的result就是listData；这里返回的也是一个Promise对象
  }

  // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    // const data = getDetail(id)
    // return new SuccessModel(data)
    const result = getDetail(id)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }

  // 新建一篇博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    // const data = newBlog(req.body)
    // return new SuccessModel(data)

    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      // 说明未登录
      return loginCheck
    }
    
    req.body.author = req.session.username
    // req.body.author = 'zhangsan' // 用户先用假数据
    const result = newBlog(req.body)
    return result.then(data => {
      return new SuccessModel(data)
    }) // data就是id的内容
  }

  // 更新一篇博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      // 说明未登录
      return loginCheck
    }

    const result = updateBlog(id, req.body)
    return result.then(val => {
      if (val) {
        return new SuccessModel()
      } else {
        return new ErrorModel('更新博客失败')
      }
    })
  }

  // 删除一篇博客
  if (method === 'POST' && req.path === '/api/blog/delete') {
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      // 说明未登录
      return loginCheck
    }
    
    const author = req.session.username
    // const author = 'zhangsan' // 用户先用假数据
    const result = deleteBlog(id, author)
    return result.then(val => {
      if (val) {
        return new SuccessModel()
      } else {
        // console.log(id, author)
        return new ErrorModel('删除博客失败')
      }
    })
  }
}

module.exports = handleBlogRouter