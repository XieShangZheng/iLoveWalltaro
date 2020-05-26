// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { userInfo } = event

  try {
    const { data } = await db
      .collection('user')
      .where({
        nickName: userInfo.nickName,
      })
      .get()

    if (data.length > 0) {
      return {
        user: data[0],
      }
    } else {
      const { _id } = await db.collection('user').add({
        data: {
          ...userInfo,
          createdAt: db.serverDate(),
          updatedAt: db.serverDate(),
          roles: [],
        },
      })

      const res = await db.collection('user').where({ _id }).get();
      const [user] = res.data;

      return {
        user,
      }
    }
  } catch (err) {
    console.error(`login ERR: ${err}`)
  }
}
