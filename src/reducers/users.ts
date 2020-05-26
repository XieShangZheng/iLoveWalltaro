import { GET_USERS, USERS_NORMAL, UPDATE_USERS, USERS_SUCCESS, SET_USERS } from '../constants/';

const INITIAL_STATE = {
	users: [],
	isUsers: false,
	usersStatus: USERS_NORMAL,
};

export default function users(state = INITIAL_STATE, action) {
	switch (action.type) {
		case GET_USERS: {
			return { ...state, usersStatus: GET_USERS, isUsers: true };
		}

		case UPDATE_USERS: {
			return { ...state, users: action.payload.users };
		}

		case USERS_SUCCESS: {
			return { ...state, usersStatus: USERS_SUCCESS, isUsers: false };
		}

		case SET_USERS: {
			return { ...state, users: state.users.concat(...action.payload.users) };
		}

		default:
			return state;
	}
}
