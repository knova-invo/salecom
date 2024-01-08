import { QueryClientProvider } from '@tanstack/solid-query';
import { Router } from '@solidjs/router';
import { Toaster } from 'solid-toast';
import 'dayjs/locale/es';
import Routes from './components/utils/Routes';
import queryClient from './utils/queryClient';
import Loading from './pages/Loading';

function App() {
	return (
		<Suspense fallback={Loading}>
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
