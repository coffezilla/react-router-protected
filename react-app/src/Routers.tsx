/* eslint-disable */
import { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// redux
import { useSelector } from 'react-redux';
import { IRdxUser } from './redux/ducks/User';

// routers
import ProtectedRoute from './ProtectedRoute';
import UnprotectedRoute from './UnprotectedRoute';

// public
import PageIndex from './pages/PageIndex';
import PageAbout from './pages/PageAbout';
import PageContact from './pages/PageContact';
import PageNotFound from './pages/PageNotFound';

// hub - only logged
import PageHub from './pages/PageHub';

// login - only if not logged
import PageLogin from './pages/PageLogin';

function Routers() {
	const rdxUserisAuth = useSelector((state: IRdxUser) => state.isAuth);
	const [loading, setLoading] = useState<any>(true);

	if (loading) {
		if (!rdxUserisAuth) {
			// getAuth().then((responseAuth) => { ... }
			setTimeout(() => {
				setLoading(false);
			}, 3000);
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
