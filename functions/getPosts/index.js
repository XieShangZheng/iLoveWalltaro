// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    // 根据更新时间倒序获取文章列表
    const { data } = await db.collection('post').orderBy('createdAt', 'desc').get();

    return {
      posts: data,
    }
  } catch (e) {
    console.error(`getPosts ERR: ${e}`)
  }
}
