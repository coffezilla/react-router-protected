import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { clearLocalStorageAuth } from '../helpers/handleStorage';
import { rdxLogoutUser, IRdxUser } from '../redux/ducks/User';

const MainMenu = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const rdxUser = useSelector((state: IRdxUser) => state);
	const rdxUserisAuth = useSelector((state: IRdxUser) => state.isAuth);
	const logoutUser = () => {
		clearLocalStorageAuth();
		dispatch(rdxLogoutUser());
		history.push('/login');
	};

	return (
		<>
			<h1>Menu</h1>
			<pre>{JSON.stringify(rdxUser, null, 1)}</pre>
			{rdxUserisAuth && (
				<button type="button" onClick={logoutUser}>
					Logout
				</button>
			)}

			<ul>
				<li>
					<Link to="/">Index</Link>
				</li>
				<li>
					<Link to="/contact">Contact</Link>
				</li>
				<li>
					<Link to="/about">About</Link>
				</li>
				<li>
					<Link to="/hub">Hub (only if logged)</Link>
				</li>
				<li>
					<Link to="/login">Login (only if not logged)</Link>
				</li>
			</ul>
		</>
	);
};

export default MainMenu;
