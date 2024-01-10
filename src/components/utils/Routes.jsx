import { Navigate, Route } from '@solidjs/router';
import { lazy } from 'solid-js';
import {
	ROOT_REDIRECT_PATH,
	LOGIN_PATH,
	ROOT_PATH,
	LOGOUT_PATH,
	CASES_PATH,
	CLIENTS_PATH,
	PAY_PATH,
} from '../../utils/path';
import NavContainer from '../containers/NavContainer';
import ProtectedRoutes from './ProtectedRoutes';
import NotFound from '../../pages/NotFound';
import Logout from '../../pages/Logout';
import MatchHome from './MatchHome';
import MatchSeller from './MatchSeller';

const Login = lazy(() => import('../../pages/Login'));

function Routes() {
	return (
		<>
			<Route path={ROOT_PATH} component={ProtectedRoutes}>
				<Route path={ROOT_PATH} component={NavContainer}>
					<Route path={ROOT_PATH} component={MatchHome} />
					<Route path={CASES_PATH} component={MatchSeller}>
						<Route path={ROOT_PATH} component={Aux} />
					</Route>
					<Route path={CLIENTS_PATH} component={MatchSeller}>
						<Route path={ROOT_PATH} component={AuxSe} />
					</Route>
					<Route path={PAY_PATH} component={MatchSeller}>
						<Route path={ROOT_PATH} component={AuxSi} />
					</Route>
				</Route>
				<Route path={LOGOUT_PATH} component={Logout} />
				<Route path='*404' component={NotFound} />
			</Route>
			<Route path={ROOT_REDIRECT_PATH} component={() => <Navigate href={ROOT_PATH} end={true} />} />
			<Route path={LOGIN_PATH} component={Login} />
			<Route path='*404' component={NotFound} />
		</>
	);
}

function Aux() {
	return <div>App</div>;
}

function AuxSe() {
	return <div>App2</div>;
}

function AuxSi() {
	return <div>App3</div>;
}

export default Routes;
