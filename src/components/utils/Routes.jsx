import { Navigate, Route } from '@solidjs/router';
import { lazy } from 'solid-js';
import {
	ROOT_REDIRECT_PATH,
	LOGIN_PATH,
	ROOT_PATH,
	LOGOUT_PATH,
	CASES_PATH,
	VEHICLES_PATH,
	PAYMENTS_PATH,
	NEW,
	PAYOUTS_PATH,
	REVIEWS_PATH,
} from '../../utils/path';
import NavContainer from '../containers/NavContainer';
import ProtectedRoutes from './ProtectedRoutes';
import MatchSeller from './MatchSeller';
import MatchHome from './MatchHome';
import MathcTreasurer from './MathcTreasurer';
import MatchReviewer from './MatchReviewer';

const NotFound = lazy(() => import('../../pages/NotFound'));
const Logout = lazy(() => import('../../pages/Logout'));
const Login = lazy(() => import('../../pages/Login'));

const Payments = lazy(() => import('../../pages/Payments'));
const Payment = lazy(() => import('../../pages/Payment'));

const CreateVehicle = lazy(() => import('../../pages/CreateVehicle'));
const Vehicles = lazy(() => import('../../pages/Vehicles'));
const Vehicle = lazy(() => import('../../pages/Vehicle'));

const CreateCase = lazy(() => import('../../pages/CreateCase'));
const Cases = lazy(() => import('../../pages/Cases'));
const Case = lazy(() => import('../../pages/Case'));

const Payouts = lazy(() => import('../../pages/Payouts'));
const Payout = lazy(() => import('../../pages/Payout'));

const Reviews = lazy(() => import('../../pages/Reviews'));
const Review = lazy(() => import('../../pages/Review'));

function Routes() {
	return (
		<>
			<Route path={ROOT_PATH} component={ProtectedRoutes}>
				<Route path={ROOT_PATH} component={NavContainer}>
					<Route path={ROOT_PATH} component={MatchHome} />
					<Route path={CASES_PATH} component={MatchSeller}>
						<Route path={ROOT_PATH} component={Cases} />
						<Route path='/:id' component={Case} />
						<Route path={NEW} component={CreateCase} />
					</Route>
					<Route path={VEHICLES_PATH} component={MatchSeller}>
						<Route path={ROOT_PATH} component={Vehicles} />
						<Route path='/:id' component={Vehicle} />
						<Route path={NEW} component={CreateVehicle} />
					</Route>
					<Route path={PAYMENTS_PATH} component={MatchSeller}>
						<Route path='/:id' component={Payment} />
						<Route path={ROOT_PATH} component={Payments} />
					</Route>
					<Route path={PAYOUTS_PATH} component={MathcTreasurer}>
						<Route path='/:id' component={Payout} />
						<Route path={ROOT_PATH} component={Payouts} />
					</Route>
					<Route path={REVIEWS_PATH} component={MatchReviewer}>
						<Route path='/:id' component={Reviews} />
						<Route path={ROOT_PATH} component={Review} />
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
