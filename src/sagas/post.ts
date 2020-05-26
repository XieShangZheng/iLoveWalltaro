import Taro from '@tarojs/taro';
import { call, put, take, fork } from 'redux-saga/effects';

import { postApi } from '../api';

import {
	CREATE_POST,
	POSTS_SUCCESS,
	POST_SUCCESS,
	POST_ERROR,
	SET_POSTS,
	GET_POSTS,
	GET_POST,
	SET_POST,
	UPDATE_POSTS,
} from '../constants';

function* createPost(postData, userId) {
	try {
		const post = yield call(postApi.createPost, postData, userId);

		// 发起发帖成功的 action
		yield put({
			type: POST_SUCCESS,
		});

		// 更新 Redux store 数据
		yield put({
			type: SET_POSTS,
			payload: {
				posts: [ post ],
			},
		});

		// 提示发帖成功
		Taro.atMessage({
			message: '发表文章成功',
			type: 'success',
			duration: 700,
		});
	} catch (err) {
		console.log('createPost ERR: ', err);

		// 发帖失败，发起失败的 action
		yield put({ type: POST_ERROR });

		// 提示发帖失败
		Taro.atMessage({
			message: '发表文章失败',
			type: 'error',
		});
	}
}

function* watchCreatePost() {
	while (true) {
		const { payload } = yield take(CREATE_POST);

		console.log('payload', payload);

		yield fork(createPost, payload.postData, payload.userId);
	}
}

function* getPosts() {
	try {
		const posts = yield call(postApi.getPosts);

		// 其实以下三步可以合成一步，但是这里为了讲解清晰，将它们拆分成独立的单元
		// 先清空列表
		if (posts.length) {
			yield put({
				type: UPDATE_POSTS,
				payload: {
					posts: [],
				},
			});
		}

		// 发起获取帖子成功的 action
		yield put({ type: POSTS_SUCCESS });

		// 更新 Redux store 数据
		yield put({
			type: SET_POSTS,
			payload: {
				posts,
			},
		});
	} catch (err) {
		console.log('getPosts ERR: ', err);

		// 获取帖子失败，发起失败的 action
		yield put({ type: POST_ERROR });
	}
}

function* watchGetPosts() {
	while (true) {
		yield take(GET_POSTS);
		yield fork(getPosts);
	}
}

function* getPost(postId) {
	try {
		const post = yield call(postApi.getPost, postId);

		// 其实以下三步可以合成一步，但是这里为了讲解清晰，将它们拆分成独立的单元

		// 发起获取帖子成功的 action
		yield put({ type: POST_SUCCESS });

		// 更新 Redux store 数据
		yield put({
			type: SET_POST,
			payload: {
				post,
			},
		});
	} catch (err) {
		console.log('getPost ERR-saga: ', err);

		// 获取帖子失败，发起失败的 action
		yield put({ type: POST_ERROR });
	}
}
function* watchGetPost() {
	while (true) {
		const { payload } = yield take(GET_POST);

		yield fork(getPost, payload.postId);
	}
}
export { watchCreatePost, watchGetPosts, watchGetPost };
