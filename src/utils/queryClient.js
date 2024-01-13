import { QueryClient } from '@tanstack/solid-query';

const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } });

export default queryClient;
