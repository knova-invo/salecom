import { Navigate, Route } from '@solidjs/router';
import { lazy } from 'solid-js';
import { HOME_REDIRECT_PATH, LOGIN_PATH, ROOT_PATH } from '../../utils/path';
import NavContainer from '../containers/NavContainer';
import ProtectedRoutes from './ProtectedRoutes';

const Login = lazy(() => import('../../pages/Login'));

function Routes() {
	return (
		<>
			<Route path={ROOT_PATH} component={ProtectedRoutes}>
				<Route path={ROOT_PATH} component={NavContainer}>
					<Route path={ROOT_PATH} component={() => <Navigate href={'/cases'} end={true} />} />
					<Route path={'/cases'} component={Aux} />
					<Route path={'/clients'} component={AuxSe} />
					<Route path={'/pay'} component={AuxSi} />
				</Route>

				<Route path='*404' component={NotFound} />
			</Route>
			<Route path={HOME_REDIRECT_PATH} component={() => <Navigate href={ROOT_PATH} end={true} />} />
			<Route path={LOGIN_PATH} component={Login} />
			<Route path='*404' component={NotFound} />
		</>
	);
}

function Aux() {
	return <div>App</div>;
}

function NotFound() {
	return <div>NotFound</div>;
}

function AuxSe() {
	return <div>App2</div>;
}

function AuxSi() {
	return <div>App3</div>;
}

export default Routes;
