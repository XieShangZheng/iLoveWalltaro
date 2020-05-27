import React from 'react'
import { View } from '@tarojs/components'
import { useSelector } from 'react-redux'
import { LOGIN_SUCCESS } from '@/constants/'
import { Logout } from '@/components/'

import './index.scss'

interface User {
  user: {
    loginStatus: string
    authority: number
  }
}

export default function Footer() {
  const authority = useSelector((state: User) => state.user.authority)
  const loginStatus = useSelector((state: User) => state.user.loginStatus)
  const isLogged = loginStatus === LOGIN_SUCCESS;
  // 双取反来构造字符串对应的布尔值，用于标志此时是否用户已经登录

  return (
    <View className='mine-footer'>
      {isLogged && !authority && (
        <Logout />
      )}
      <View className='tuture-motto'>
        {isLogged ? 'From AT with Love ❤' : '您还未登录'}
      </View>
    </View>
  )
}