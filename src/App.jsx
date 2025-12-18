import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useStore } from './store/useStore'
import { useCurrencyStore } from './store/useCurrencyStore'
import { useEffect } from 'react'
import { Toaster } from 'sonner'

// Layouts
import AuthLayout from './layouts/AuthLayout'
import DashboardLayout from './layouts/DashboardLayout'
import AdminLayout from './admin/layouts/AdminLayout'

// Pages
import Landing from './pages/Landing'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Overview from './pages/Overview'
import Wallet from './pages/Wallet'
import Notifications from './pages/Notifications'
import Transactions from './pages/Transactions'
import QR from './pages/QR'
import Contacts from './pages/Contacts'
import Delegation from './pages/Delegation'
// import Admin from './pages/Admin' // Removed
import Settings from './pages/Settings'
import Analytics from './pages/Analytics'
import NotFound from './pages/NotFound'

// Admin Pages
import AdminLogin from './admin/pages/AdminLogin'
import AdminDashboard from './admin/pages/AdminDashboard'
import AdminUsers from './admin/pages/AdminUsers'
import AdminWallets from './admin/pages/AdminWallets'
import AdminKYC from './admin/pages/AdminKYC'
import AdminAudit from './admin/pages/AdminAudit'
import AdminActivity from './admin/pages/AdminActivity'
import AdminSettings from './admin/pages/AdminSettings'
import { useAdminStore } from './admin/store/useAdminStore'

// Protected Route Wrapper for Users
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useStore();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
};

// Protected Route Wrapper for Admin
const ProtectedAdminRoute = ({ children }) => {
    const { isAdminAuthenticated } = useAdminStore();
    const location = useLocation();

    if (!isAdminAuthenticated) {
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }
    return children;
};

function App() {
    const { theme } = useStore();
    const fetchRates = useCurrencyStore((state) => state.fetchRates);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        fetchRates(); // Force fresh rates on load
    }, [theme, fetchRates]);

    return (
        <>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Landing />} />

                {/* Auth Routes */}
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Route>

                {/* --- ADMIN PORTAL ROUTES (Isolated) --- */}
                <Route path="/admin/login" element={<AdminLogin />} />

                <Route path="/admin" element={
                    <ProtectedAdminRoute>
                        <AdminLayout />
                    </ProtectedAdminRoute>
                }>
                    <Route index element={<Navigate to="/admin/dashboard" replace />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="wallets" element={<AdminWallets />} />
                    <Route path="kyc" element={<AdminKYC />} />
                    <Route path="audit" element={<AdminAudit />} />
                    <Route path="activity" element={<AdminActivity />} />
                    <Route path="settings" element={<AdminSettings />} />
                </Route>

                {/* Protected Dashboard Routes */}
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }>
                    <Route index element={<Overview />} />
                    <Route path="wallet" element={<Wallet />} />
                    <Route path="notifications" element={<Notifications />} />
                    <Route path="transactions" element={<Transactions />} />
                    <Route path="qr" element={<QR />} />
                    <Route path="contacts" element={<Contacts />} />
                    <Route path="delegation" element={<Delegation />} />

                    {/* Admin removed from User Dashboard */}

                    <Route path="analytics" element={<Analytics />} />
                    <Route path="settings" element={<Settings />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster position="top-right" theme="dark" richColors />
        </>
    )
}

export default App
