import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const DashboardLayout = () => {
    return (
        <div className="min-h-screen bg-app-bg text-app-text">
            <Sidebar />

            {/* Main Content Area */}
            <main className="pl-64 min-h-screen flex flex-col">
                <Header toggleSidebar={() => { }} />

                {/* Page Content */}
                <div className="flex-1 p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
