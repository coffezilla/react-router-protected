import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { IRdxUser } from './redux/ducks/User';

function ProtectedRoute({ component: Component, ...rest }: any) {
	const rdxUserisAuth = useSelector((state: IRdxUser) => state.isAuth);

	return (
		<Route
			{...rest}
			render={(props) => {
				if (!rdxUserisAuth) {
					return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
				}
				return <Component {...props} {...rest} />;
			}}
		/>
	);
}

export default ProtectedRoute;
