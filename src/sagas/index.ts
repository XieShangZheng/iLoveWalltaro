import { fork, all } from 'redux-saga/effects';

import { watchLogin, watchUpdateUser } from './user';
import { watchCreatePost, watchGetPosts, watchGetPost } from './post';
import { watchGetUsers } from './users';

export default function* rootSaga() {
	yield all([
		fork(watchLogin),
		fork(watchCreatePost),
		fork(watchGetPosts),
		fork(watchGetPost),
		fork(watchGetUsers),
		fork(watchUpdateUser),
	]);
}
