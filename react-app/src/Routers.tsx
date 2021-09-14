/* eslint-disable */
import { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// auth
import { getAuth } from './components/Auth';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { rdxLoginUser, IRdxUser } from './redux/ducks/User';

// router with requirement to access
import ProtectedRoute from './ProtectedRoute';
import UnprotectedRoute from './UnprotectedRoute';

// page public
import PageIndex from './pages/PageIndex';
import PageAbout from './pages/PageAbout';
import PageContact from './pages/PageContact';
import PageNotFound from './pages/PageNotFound';

// page only logged
import PageHub from './pages/PageHub';

// page only if NOT logged
import PageLogin from './pages/PageLogin';

function Routers() {
	const dispatch = useDispatch();
	const rdxUserisAuth = useSelector((state: IRdxUser) => state.isAuth);
	const [loading, setLoading] = useState<any>(true);

	if (loading) {
		if (!rdxUserisAuth) {
			getAuth().then((responseAuth) => {
				if (responseAuth.data.status === 1) {
					dispatch(rdxLoginUser());
				}
				setLoading(false);
			});
		}
		return <p>Loading...</p>;
	}
	return (
		<>
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={PageIndex} />
					<Route path="/about" component={PageAbout} />
					<Route path="/contact" component={PageContact} />

					<ProtectedRoute path="/hub" component={PageHub} />

					<UnprotectedRoute path="/login" component={PageLogin} />

					<Route path="/404" component={PageNotFound} />

					<Redirect to="/404" />
				</Switch>
			</BrowserRouter>
		</>
	);
}

export default Routers;
