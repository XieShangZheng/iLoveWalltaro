import React from 'react'
import { View } from '@tarojs/components';
import { UserList } from '@/components/';
import { useSelector } from 'react-redux';

import './index.scss';

interface User {
  user: {
    loginStatus: string
    roles: string[]
  }
}
export default function MineList() {
  const loginStatus = useSelector((state: User) => state.user.loginStatus)
	const isLogged = loginStatus === 'LOGIN_SUCCESS';

  const roles = useSelector((state: User) => state.user.roles)
	return <View>{isLogged && roles.includes('1') && <UserList />}</View>;
}
