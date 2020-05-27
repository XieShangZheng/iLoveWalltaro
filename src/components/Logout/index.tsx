import React, { useState } from 'react'
import Taro from '@tarojs/taro'
import { useDispatch } from 'react-redux'
import { View } from '@tarojs/components'
// import { ClButton } from 'mp-colorui'

import { SET_LOGIN_OUT } from '../../constants'

export default function LogoutButton() {
  const [isLogout, setIsLogout] = useState(false)
  const dispatch = useDispatch()

  async function handleLogout() {
    setIsLogout(true)

    try {
      await Taro.removeStorage({ key: 'userInfo' })

      dispatch({
        type: SET_LOGIN_OUT,
      })
    } catch (err) {
      console.log('removeStorage ERR: ', err)
    }
    setIsLogout(false)
  }

  return (
    <View>退出登录</View>
    // <ClButton plain shape='round' long shadow bgColor='green' size='large' loading={isLogout} onClick={handleLogout} >退出登录</ClButton>
  )
}
