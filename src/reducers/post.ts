import {
	SET_POST,
	SET_POSTS,
	POST_ERROR,
	CREATE_POST,
	POST_NORMAL,
	POST_SUCCESS,
	POSTS_SUCCESS,
	GET_POSTS,
	GET_POST,
	UPDATE_POSTS,
} from '../constants/';

const INITIAL_STATE = {
	posts: [],
	post: {},
	isOpened: false, // 发帖 modal 框 (默认关闭)
	isPosts: false, // 文章列表 loading 状态
	isPost: false, // 文章详情 loading 加载状态
	postStatus: POST_NORMAL,
};

export default function post(state = INITIAL_STATE, action) {
	switch (action.type) {
		case SET_POST: {
			const { post: asPost } = action.payload;
			return { ...state, post: asPost, isPost: false };
		}

		case CREATE_POST: {
			return { ...state, postStatus: CREATE_POST, isPost: true };
		}

		case POST_SUCCESS: {
			return { ...state, postStatus: POST_SUCCESS, isPost: false };
		}


		case POST_ERROR: {
			return { ...state, postStatus: POST_ERROR, isPost: false };
		}

		case GET_POST: {
			return { ...state, postStatus: GET_POST, isPost: true };
		}

		case GET_POSTS: {
			return { ...state, postsStatus: GET_POSTS, isPosts: true };
		}

		case POSTS_SUCCESS: {
			return { ...state, postsStatus: POSTS_SUCCESS, isPosts: false };
		}

		case UPDATE_POSTS: {
			return { ...state, posts: action.payload.posts };
		}

		case SET_POSTS: {
			const { posts } = action.payload;
			const newPosts = [ ...posts, ...state.posts ];
			return { ...state, posts: newPosts };
		}

		default:
			return state;
	}
}
