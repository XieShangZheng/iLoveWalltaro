import React, { useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useDispatch, useSelector } from 'react-redux'
import { AtMessage } from 'taro-ui'
import { Header, Footer, MineList } from '@/components/'
import { SET_LOGIN_INFO, LOGIN_SUCCESS } from '@/constants/'

import './mine.scss'

interface User {
  user: {
    loginStatus: string
    roles: string[]
  }
}

export default function Mine() {
  const dispatch = useDispatch()
  const loginStatus = useSelector((state: User) => state.user.loginStatus)
  const isLogged = loginStatus === 'LOGIN_SUCCESS';

  useEffect(() => {
    async function getStorage() {
      try {
        const { data }: any = await Taro.getStorage({ key: 'userInfo' })

        // 更新 Redux Store 数据
        dispatch({
          type: SET_LOGIN_INFO,
          payload: {
            ...data,
            userId: data._id,
            loginStatus: LOGIN_SUCCESS,
          },
        })
      } catch (err) {
        console.log('getStorage ERR-mine: ', err)
      }
    }

    if (!isLogged) {
      getStorage()
    }
  }, [dispatch, isLogged])

  return (
    <View className='mine'>
      <AtMessage />
      <Header />
      <MineList />
      <View className='footerWrap'>
        <Footer />
      </View>
    </View>
  )
}

Mine.config = {
  navigationBarTitleText: '我的',
}
