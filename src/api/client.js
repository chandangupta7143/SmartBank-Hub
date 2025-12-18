import axios from 'axios';

const isMock = import.meta.env.VITE_USE_MOCKS === 'true';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Mock Adapter Registry
if (isMock) {
    console.log('SmartBank Hub: Mock Mode Enabled');
    // We will attach interceptors or mock adapters here dynamically
    // For now, we'll handle mocks in the mock/ files that import this client
    // or simply bypass this client in mock hooks.

    // Actually, a better pattern for simple mocks without 'axios-mock-adapter' lib 
    // (which wasn't explicitly requested but is good) is to just intercept.

    api.interceptors.request.use(async (config) => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 600));
        return config;
    });
}

// Attach token if exists
api.interceptors.request.use((config) => {
    const storage = localStorage.getItem('smartbank-storage');
    if (storage) {
        const { state } = JSON.parse(storage);
        if (state?.user?.token) {
            config.headers.Authorization = `Bearer ${state.user.token}`;
        }
    }
    return config;
});
