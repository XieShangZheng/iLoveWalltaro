// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
})

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const { userData, userId } = event;
  try {
    const user = await db
      .collection('user')
      .doc(userId)
      .update({
        data: {
          ...userData,
        }
      })

    return { user }
  } catch (err) {
    console.error(`updateUser ERR: ${err}`)
  }
}