const getList = (author, keyword) => {
  // 先返回格式正确的假3数据
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

module.exports = {
  getList,
  getDetail
}