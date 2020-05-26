import {
	SET_LOGIN_INFO,
	LOGIN_SUCCESS,
	LOGIN,
	LOGIN_ERROR,
	LOGIN_NORMAL,
	SET_LOGIN_OUT,
	UPDATE_USER,
	UPDATE_SUCCESS,
	UPDATE_ERROR,
} from '../constants/';

const INITIAL_STATE = {
	userId: '',
	avatar: '',
	nickName: '',
	isOpened: false,
	isLogin: false,
	loginStatus: LOGIN_NORMAL,
	roles: [],
	isUser: false,
};

export default function user(state = INITIAL_STATE, action) {
	switch (action.type) {
		case SET_LOGIN_INFO: {
			return { ...state, ...action.payload };
		}

		case SET_LOGIN_OUT: {
			return {
				...state,
				avatar: '',
				nickName: '',
				userId: '',
				loginStatus: LOGIN_NORMAL,
				isLogin: false,
				authority: 1,
				roles: [],
				isUser: false,
			};
		}

		case LOGIN: {
			return { ...state, loginStatus: LOGIN, isLogin: true };
		}

		case LOGIN_SUCCESS: {
			return { ...state, loginStatus: LOGIN_SUCCESS, isLogin: false };
		}

		case LOGIN_ERROR: {
			return { ...state, loginStatus: LOGIN_ERROR, isLogin: false };
		}

		// 更新用户权限
		case UPDATE_USER: {
			return { ...state, isUser: true };
		}

		case UPDATE_SUCCESS: {
			return { ...state, isUser: false };
		}

		case UPDATE_ERROR: {
			return { ...state, isUser: false };
		}

		default:
			return state;
	}
}
