import { QueryClientProvider } from '@tanstack/solid-query';
import { Navigate, Route, Router } from '@solidjs/router';
import { Toaster } from 'solid-toast';
import { lazy } from 'solid-js';
import 'dayjs/locale/es';
import ProtectedRoutes from './components/utils/ProtectedRoutes';
import { HOME_PATH, LOGIN_PATH } from './utils/path';
import queryClient from './utils/queryClient';
import Loading from './pages/Loading';

const Login = lazy(() => import('./pages/Login'));

function App() {
	return (
		<Suspense fallback={Loading}>
			<QueryClientProvider client={queryClient}>
				<Router>
					<Route path={HOME_PATH} component={ProtectedRoutes}>
						<Route path={HOME_PATH} component={Aux} />
					</Route>
					<Route path={'/redirect'} component={() => <Navigate href={HOME_PATH} end={true} />} />
					<Route path={LOGIN_PATH} component={Login} />
					<Route path='*404' component={NotFound} />
				</Router>
			</QueryClientProvider>
			<Toaster />
		</Suspense>
	);
}

function Aux() {
	return <div>App</div>;
}

function NotFound() {
	return <div>NotFound</div>;
}

export default App;
