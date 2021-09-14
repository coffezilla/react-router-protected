import { useDispatch } from 'react-redux';

import { rdxLoginUser } from '../redux/ducks/User';
import MainMenu from '../components/MainMenu';

const PageLogin = () => {
	const dispatch = useDispatch();
	const loginUser = () => {
		dispatch(rdxLoginUser());
	};
	return (
		<>
			<h1>Page login</h1>
			<button type="button" onClick={loginUser}>
				Login
			</button>
			<MainMenu />
		</>
	);
};

export default PageLogin;
