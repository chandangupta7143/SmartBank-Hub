import { useStore } from '../store/useStore';

export const useAuth = () => {
    const user = useStore((state) => state.user);
    const isAuthenticated = useStore((state) => state.isAuthenticated);
    const login = useStore((state) => state.login);
    const logout = useStore((state) => state.logout);

    return { user, isAuthenticated, login, logout };
};
