// TYPE
export interface IRdxUser {
	isAuth: boolean;
}

interface IActLogin {
	type: 'LOGIN';
}

interface IActLogout {
	type: 'LOGOUT';
}

type Action = IActLogin | IActLogout;

// CONSTRAIN
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

// ACTION
// login
export const rdxLoginUser = () => {
	return {
		type: LOGIN,
	};
};

// logout
export const rdxLogoutUser = () => {
	return {
		type: LOGOUT,
	};
};

// REDUCERS
const INITIAL_STATE: IRdxUser = {
	isAuth: false,
};
const User = (state = INITIAL_STATE, action: Action) => {
	switch (action.type) {
		case LOGIN: {
			return { isAuth: true };
		}
		case LOGOUT: {
			return { isAuth: false };
		}
		default:
			return state;
	}
};

export default User;
