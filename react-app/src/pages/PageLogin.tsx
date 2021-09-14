import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { rdxLoginUser } from '../redux/ducks/User';
import MainMenu from '../components/MainMenu';

import { serverLoginUser } from '../components/Auth';

const PageLogin = () => {
	const dispatch = useDispatch();
	const [isLogging, setIsLogging] = useState<boolean>(false);
	const formLoginData = { email: 'foo@mail.com', password: '123' };

	const loginUser = () => {
		setIsLogging(true);
		serverLoginUser(formLoginData).then((responseServerLogin) => {
			if (responseServerLogin.data.status === 1) {
				dispatch(rdxLoginUser());
			}
		});
	};
	return (
		<>
			<h1>Page login</h1>
			{!isLogging ? (
				<button type="button" onClick={loginUser}>
					Login foo@mail.com
				</button>
			) : (
				<p>logging...</p>
			)}
			<MainMenu />
		</>
	);
};

export default PageLogin;
