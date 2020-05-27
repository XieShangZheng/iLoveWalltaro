import React, { ReactNode, useEffect, useState } from 'react'
import Taro, { pxTransform } from '@tarojs/taro'
import { View } from '@tarojs/components'
// import { ClText, ClAvatar, ClModal, ClTitleBar, ClLayout, ClFlex, ClButton } from 'mp-colorui'
import { useDispatch, useSelector } from 'react-redux'
import { AtMessage, AtCheckbox } from 'taro-ui'
import { isEqual, isEmpty } from 'lodash'
import { GET_USERS, ROLES, UPDATE_USER, LOGIN_SUCCESS, SET_LOGIN_INFO, LOGIN } from '@/constants/'

import './users.scss'

interface User {
  avatar: string
  nickName: string
  _id: string
  updateAt: Date
  roles: string[]
  isUser: boolean
}

type Users = {
  users: {
    users: [User]
    isUsers: boolean
  }
}

interface UpdateUser {
  user: User
}

interface State {
  user: {
    loginStatus: string
    roles: string[]
    _id: string
    nickName: string
    avatar: string
  }
}

export default function Users() {
  const dispatch = useDispatch()
  const users = useSelector((state: Users) => state.users.users)
  const isUsers = useSelector((state: Users) => state.users.isUsers)
  const isUser = useSelector((state: UpdateUser) => state.user.isUser)
  const roles = useSelector((state: State) => state.user.roles)
  const userId = useSelector((state: State) => state.user._id)
  const user = useSelector((state: State) => state.user)
  const loginStatus = useSelector((state: State) => state.user.loginStatus)
  const isLogged = loginStatus === LOGIN_SUCCESS;

  const [userInfo, setUserInfo] = useState({ _id: '', roles: [], nickName: '', })
  const [checkedList, setCheckedList] = useState([])
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    async function getStorage() {
      try {
        const { data } = await Taro.getStorage({ key: 'userInfo' })
        dispatch({
          type: SET_LOGIN_INFO,
          payload:
          {
            ...data,
            userId: data._id,
            loginStatus: LOGIN_SUCCESS,
          }
        })
      } catch (err) {
        console.log('getStorage ERR-index: ', err)
      }
    }
    if (!isLogged) {
      getStorage();
    }
  }, [isLogged, dispatch])

  useEffect(() => {
    isUsers && Taro.showLoading({ title: '加载中' })
    !isUsers && Taro.hideLoading();
  }, [isUsers])

  useEffect(() => {
    try {
      dispatch({
        type: GET_USERS,
      })
    } catch (err) {
      console.log('getUsers ERR -> pages/users', err)
    }
  }, [dispatch])

  const onImageClick = (avatar) => {
    Taro.previewImage({
      urls: [avatar],
    })
  }

  const handleOp = userDetail => {
    const roleList = userDetail.roles ? userDetail.roles : [];
    setCheckedList(roleList) // 权限勾选状态
    setIsShow(true) // 显示 modal
    setUserInfo(userDetail) // 当前选中的用户信息
  }

  const handleChange = (value) => {
    setCheckedList(value)
  }

  const handleClose = () => {
    if (!isEmpty(checkedList)) {
      setCheckedList([])
    }
    setIsShow(false)
  }

  const onGetUserInfo = () => {
    dispatch({
      type: LOGIN,
      payload: {
        userInfo: { nickName: user.nickName, avatar: user.avatar },
      },
    })
  }

  const handleConfirm = index => {
    if (index) {
      const roleList = userInfo.roles ? userInfo.roles : [];
      if (!isEqual(roleList, checkedList)) {
        // 修改权限后进行更新
        try {
          // 更新用户权限
          dispatch({
            type: UPDATE_USER,
            payload: {
              userData: { roles: checkedList },
              userId: userInfo._id,
            }
          })
          if (userId === userInfo._id) {
            // 若改了自己的账号权限，重新登录一下
            onGetUserInfo()
          }
        } catch (err) {
          throw new Error(`updateUser ERR -> handleConfirm ${err}`)
        }
      }
    }

    handleClose()
  }

  return (
    <View className='list'>
      {
        users.length && users.map((item: User, index): ReactNode => {
          return (
            <View className='item' key={item._id}>
              <View className='angle'>{index}</View>

              {/* {item.avatar && (
                <ClAvatar headerArray={[{ url: item.avatar, bgColor: 'light-green' }]} shape='round' onClick={() => onImageClick(item.avatar)} />
              )}

              <View className='name' style={{ width: pxTransform(500) }}>
                <ClText textColor='brown' cut align='left'>{item.nickName}</ClText>
              </View>
              {roles.includes('2') &&
                <View style={{ width: '150rpx' }}>
                  <ClButton plain long shadow bgColor='green' onClick={() => handleOp(item)}>操作</ClButton>
                </View>
              } */}
            </View>
          )
        })
      }
      {/* <ClModal
        show={isShow}
        closeWithShadow
        close
        custom
        onCancel={handleClose}
        renderTitle={
          <ClTitleBar
            title='权限操作'
            textColor='black'
            type='sub-title'
            subTitle={userInfo.nickName ? userInfo.nickName : ''}
            subTitleColor='cyan'
          />
        }
        renderAction={
          <ClLayout>
            <ClFlex justify='around'>
              <View className='flex-sub'>
                <ClButton
                  bgColor='gray'
                  long
                  size='large'
                  onClick={handleClose}
                >
                  取消
                </ClButton>
              </View>
              <View className='flex-sub'>
                <ClButton
                  bgColor='green'
                  long
                  size='large'
                  onClick={handleConfirm}
                  loading={isUser}
                >
                  确认
                </ClButton>
              </View>
            </ClFlex>
          </ClLayout>
        }
      >
        <AtCheckbox
          options={ROLES}
          selectedList={checkedList}
          onChange={handleChange}
        ></AtCheckbox>
      </ClModal> */}
      <AtMessage />
    </View>
  )
}
Users.config = {
  navigationBarTitleText: '用户列表',
}