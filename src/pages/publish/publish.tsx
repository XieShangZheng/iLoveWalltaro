import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
// import { ClTextarea, ClLayout, ClButton } from 'mp-colorui'
import { useDispatch, useSelector } from 'react-redux'
import { CREATE_POST, POST_SUCCESS } from '@/constants/'
import { AtMessage } from 'taro-ui'

import './publish.scss'

interface State {
  user: {
    userId: string
  }
}
interface Post {
  post: {
    isPost: boolean
    postStatus: string
  }
}
export default function Publish() {
  const [height, setHeight] = useState(400)
  const [content, setContent] = useState('')
  const userId = useSelector((state: State) => state.user.userId)
  const isPost = useSelector((state: Post) => state.post.isPost)
  const postStatus = useSelector((state: Post) => state.post.postStatus)
  const dispatch = useDispatch()

  const onLineChange = event => {
    const { heightRpx, lineCount } = event;
    setHeight(heightRpx)

    if (heightRpx < 400 || !lineCount) {
      setHeight(400)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!userId) {
      Taro.atMessage({
        message: '请先登录',
        type: 'warning'
      })
      return
    }
    if (!content) {
      Taro.atMessage({
        message: '您的内容还没有填写哦',
        type: 'warning',
        duration: 900,
      })
      return
    }
    dispatch({
      type: CREATE_POST,
      payload: {
        postData: {
          content,
        },
        userId,
      },
    })
    setContent('')
  }

  useEffect(() => {
    if (postStatus === POST_SUCCESS) {
      // 发布成功，跳转首页
      setTimeout(() => {
        Taro.switchTab({ url: '/pages/index/index' })
      }, 1000);
    }
  }, [postStatus])

  return (
    <View></View>
    // <ClLayout margin='small'>
    //   <AtMessage />
    //   <View className='textareaWrap'>
    //     <ClTextarea
    //       showLengthTip
    //       height={height}
    //       bgColor='white'
    //       placeholder='请输入...'
    //       autoFocus
    //       showConfirmBar
    //       onLineChange={onLineChange}
    //       onChange={value => setContent(value)}
    //     />
    //     <View className='footer'>
    //       <View className='picBtn'>+ 添加图片（最多9张）</View>
    //       <View className='release'>
    //         <ClButton bgColor='white' shadow={false} loading={isPost} onClick={handleSubmit} >确认发布</ClButton>
    //       </View>
    //     </View>
    //   </View>
    // </ClLayout>
  )
}
Publish.config = {
  navigationBarTitleText: '发布'
}