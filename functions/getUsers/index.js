// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
})

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const { data } = await db.collection('user').orderBy('createdAt', 'asc').get();

    return {
      users: data,
    }
  } catch (e) {
    console.log('getUsers ERR -> cloud')
  }
}