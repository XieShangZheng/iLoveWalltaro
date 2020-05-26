import Taro from '@tarojs/taro';

async function login(userInfo) {
	const isWeApp = Taro.getEnv() === Taro.ENV_TYPE.WEAPP;

	// 针对微信小程序使用小程序云函数，其他使用小程序 RESTful API
	try {
		if (isWeApp) {
			const { result }: any = await Taro.cloud.callFunction({
				name: 'login',
				data: {
					userInfo,
				},
			});
			return result.user;
		}
	} catch (err) {
		console.error('login ERR: ', err);
	}
}

async function updateUser(userData, userId) {
	const isWeApp = Taro.getEnv() === Taro.ENV_TYPE.WEAPP;
	try {
		if (isWeApp) {
			if (!userId) {
				console.log('userId 为空');
				return;
			}
			const { result }: any = await Taro.cloud.callFunction({
				name: 'updateUser',
				data: {
					userData,
					userId,
				},
			});
			return result.user;
		}
	} catch (err) {
		console.log('updateUser ERR -> api/user.ts', err);
	}
}

const userApi = {
	login,
	updateUser,
};

export default userApi;
