import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

const NotFound = () => {
    return (
        <div className="min-h-screen gridplace-items-center bg-app-bg text-app-text flex flex-col items-center justify-center p-4">
            <h1 className="text-9xl font-bold text-brand-primary/20">404</h1>
            <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
            <Link to="/">
                <Button>Go Home</Button>
            </Link>
        </div>
    );
};

export default NotFound;
