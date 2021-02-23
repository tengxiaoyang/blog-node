const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
  // 定义sql语句
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc;`

  return exec(sql) // 返回的是一个Promise对象

  // 先返回格式正确的假数据
  return [
    {
      id: 1,
      title: '标题123456789',
      content: '内容123456789123456789',
      createTime: 184397548395,
      author: 'zhangsan'
    },
    {
      id: 1,
      title: '1标题123456789',
      content: '1内容123456789123456789',
      createTime: 1613723656773,
      author: 'zhangsan'
    },
    {
      id: 2,
      title: '2标题123456789',
      content: '2内容123456789123456789',
      createTime: 1613723676899,
      author: 'lisi'
    },
  ]
}

const getDetail = id => {
  // 先返回假数据
  return {
    id: 1,
    title: '1标题123456789',
    content: '1内容123456789123456789',
    createTime: 1613723656773,
    author: 'zhangsan'
  }
}

const newBlog = (blogData = {}) => {
  // blogData是一个博客对象，包含title content属性
  // console.log('newBlog blogData', blogData)
  return {
    id: 3 // 表示新建博客插入到数据表里面的id
  }
}

const updateBlog = (id, blogData = {}) => {
  // id就是要更新博客的id
  // blogData是一个博客对象，包含title content属性
  // console.log('updateBlog blogData', id, blogData)
  return true
}

const deleteBlog = id => {
  // id就是要删除博客的id
  return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}