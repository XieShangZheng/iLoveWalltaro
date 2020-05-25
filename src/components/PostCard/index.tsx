import React from 'react'
import Taro from '@tarojs/taro';
import { useSelector } from 'react-redux'
import { View } from '@tarojs/components';
import classNames from 'classnames';
// import { ClAvatar } from 'mp-colorui';

import './index.scss';

interface Props {
	postId?: string
	post: {
		content?: string
		user?: {
			avatar: string
			nickName: string
		}
	}
	isList?: boolean
}

interface User {
	user: {
		loginStatus: string
		roles: string[]
	}
}

export default function PostCard(props: Props) {
	const { content = '', user } = props.post;
	// const { avatar, nickName } = user || {};
	// const headerArray = [{ url: avatar }]
	const roles = useSelector((state: User) => state.user.roles)

	const handleClick = () => {
		const postId = props.postId;
		if (props.isList) {
			Taro.navigateTo({
				url: `/pages/post/post?postId=${postId}`,
			})
		}
	}
	const slicedContent = props.isList && content.length > 66
		? `${content.slice(0, 66)}...` : content

	return (
		<View className={classNames('at-article', { 'postcard__isList': props.isList })} onClick={handleClick}>
			<View className='post-header'>
				{
					roles.includes('0') &&
					<View className='profile-box'>
						{/* <ClAvatar shape='round' shadow size='normal' headerArray={headerArray} /> */}
						{/* <View className='at-article__info post-nickName'>{nickName}</View> */}
					</View>
				}
			</View>
			<View className='at-article__content'>
				<View className='at-article__section'>
					<View className='at-article__p'>{slicedContent}</View>
				</View>
			</View>
		</View>
	)
}

PostCard.defaultProps = {
	isList: false,
	post: {}
}