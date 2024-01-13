import { Navigate, Route } from '@solidjs/router';
import { lazy } from 'solid-js';
import {
	ROOT_REDIRECT_PATH,
	LOGIN_PATH,
	ROOT_PATH,
	LOGOUT_PATH,
	CASES_PATH,
	CLIENTS_PATH,
	PAYMENTS_PATH,
	NEW,
} from '../../utils/path';
import NavContainer from '../containers/NavContainer';
import ProtectedRoutes from './ProtectedRoutes';
import MatchHome from './MatchHome';
import MatchSeller from './MatchSeller';

const Login = lazy(() => import('../../pages/Login'));
const Payments = lazy(() => import('../../pages/Payments'));
const Clients = lazy(() => import('../../pages/Clients'));
const CreateClient = lazy(() => import('../../pages/CreateClient'));
const Cases = lazy(() => import('../../pages/Cases'));
const CreateCase = lazy(() => import('../../pages/CreateCase'));
const NotFound = lazy(() => import('../../pages/NotFound'));
const Logout = lazy(() => import('../../pages/Logout'));

function Routes() {
	return (
		<>
			<Route path={ROOT_PATH} component={ProtectedRoutes}>
				<Route path={ROOT_PATH} component={NavContainer}>
					<Route path={ROOT_PATH} component={MatchHome} />
					<Route path={CASES_PATH} component={MatchSeller}>
						<Route path={ROOT_PATH} component={Cases} />
						<Route path={NEW} component={CreateCase} />
					</Route>
					<Route path={CLIENTS_PATH} component={MatchSeller}>
						<Route path={ROOT_PATH} component={Clients} />
						<Route path={NEW} component={CreateClient} />
					</Route>
					<Route path={PAYMENTS_PATH} component={MatchSeller}>
						<Route path={ROOT_PATH} component={Payments} />
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

export default Routes;
