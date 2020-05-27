import React, { useEffect } from 'react'
import Taro, { useRouter } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux';

import { PostCard, } from '@/components/'
import { GET_POST, SET_POST } from '@/constants/'
import './post.scss'

type State = {
  post: {
    post: {}
    isPost: boolean
  }
}

export default function Post() {
  const router = useRouter();
  const { postId } = router.params;

  const dispatch = useDispatch()
  const post = useSelector((state: State) => state.post.post)
  const isPost = useSelector((state: State) => state.post.isPost)

  useEffect(() => {
    isPost && Taro.showLoading({ title: '加载中' })
    !isPost && Taro.hideLoading();
  }, [isPost])

  useEffect(() => {
    try {
      dispatch({
        type: GET_POST,
        payload: {
          postId,
        },
      })
    } catch (err) {
      console.log('getPost ERR-pages-post: ', err)
    }

    return () => {
      dispatch({ type: SET_POST, payload: { post: {} } })
    }
  }, [dispatch, postId])

  return (
    <View className='post'>
      <PostCard post={post}></PostCard>
    </View>
  )
}

Post.config = {
  navigationBarTitleText: '帖子详情'
}