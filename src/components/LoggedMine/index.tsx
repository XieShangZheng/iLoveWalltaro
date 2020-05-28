import React from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { useSelector } from 'react-redux'
import { AtAvatar } from 'taro-ui'
// import { ClAvatar } from 'mp-colorui';

import './index.scss'

type Props = {
  user: {
    nickName: string
    avatar: string
  }
}

export default function LoggedMine() {
  const nickName = useSelector((state: Props) => state.user.nickName)
  const avatar = useSelector((state: Props) => state.user.avatar)

  function onImageClick() {
    Taro.previewImage({
      urls: [avatar],
    })
  }

  return (
    <View className='logged-mine'>
      {/* {avatar && (
        <Image src={avatar} className='mine-avatar' onClick={onImageClick} />
      )
        //  : (
        // <ClAvatar headerArray={[{ text: '❤', bgColor: 'light-green' }]} size='xlarge' shadow shape='round' />
        // )
      } */}
      {
        avatar ? <Image src={avatar} className='mine-avatar' onClick={onImageClick} /> : <AtAvatar openData={{ type: 'userAvatarUrl' }} size='large' circle ></AtAvatar>
      }

      <View className='mine-username'>{nickName}</View>
    </View>
  )
}