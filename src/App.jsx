import { QueryClientProvider } from '@tanstack/solid-query';
import { Suspense, lazy } from 'solid-js';
import { Router } from '@solidjs/router';
import { Toaster } from 'solid-toast';
import 'dayjs/locale/es';
import queryClient from './utils/queryClient';
import Loading from './pages/Loading';

const Routes = lazy(() => import('./components/utils/Routes'));

function App() {
	return (
		<Suspense fallback={() => <Loading />}>
			<QueryClientProvider client={queryClient}>
				<Router>
					<Routes />
				</Router>
			</QueryClientProvider>
			<Toaster />
		</Suspense>
	);
}

export default App;
