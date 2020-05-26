import { put, take, fork, call } from 'redux-saga/effects';
import { GET_USERS, UPDATE_USERS, USERS_SUCCESS, SET_USERS, USERS_ERROR } from '../constants';
import { usersApi } from '../api';

function* getUsers() {
	try {
		const users = yield call(usersApi.getUsers);
		if (users.length) {
			yield put({
				type: UPDATE_USERS,
				payload: { users: [] },
			});
		}
		yield put({ type: USERS_SUCCESS });
		yield put({ type: SET_USERS, payload: { users } });
	} catch (err) {
		console.log('getUsers ERR -> sagas', err);
		yield put({ type: USERS_ERROR });
	}
}

function* watchGetUsers() {
	while (true) {
		yield take(GET_USERS);
		yield fork(getUsers);
	}
}

// eslint-disable-next-line import/prefer-default-export
export { watchGetUsers };
