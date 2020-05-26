import Taro from '@tarojs/taro';

async function getUsers() {
	const isWeApp = Taro.getEnv() === Taro.ENV_TYPE.WEAPP;

	try {
		if (isWeApp) {
			const { result }: any = await Taro.cloud.callFunction({
				name: 'getUsers',
			});
			return result.users;
		}
	} catch (err) {
		console.log('getUsers ERR -> api/getUsers', err);
	}
}

const usersApi = {
	getUsers,
};
export default usersApi;
