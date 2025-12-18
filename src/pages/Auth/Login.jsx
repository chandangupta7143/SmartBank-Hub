import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useStore } from '../../store/useStore';
import { mockAuth } from '../../api/mock/auth';
import { useState } from 'react';

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

const Login = () => {
    const navigate = useNavigate();
    const { login } = useStore();
    const [error, setError] = useState('');

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data) => {
        try {
            setError('');
            const user = await mockAuth.login(data.email, data.password);
            login(user); // Update global store
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Login failed');
        }
    };

    return (
        <div className="w-full">
            <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">Welcome back</h2>
                <p className="text-app-text-muted">Enter your details to access your account.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="text-sm font-medium mb-1 block">Email</label>
                    <Input
                        type="email"
                        placeholder="admin@smartbank.com"
                        error={errors.email?.message}
                        {...register('email')}
                    />
                </div>

                <div>
                    <label className="text-sm font-medium mb-1 block">Password</label>
                    <Input
                        type="password"
                        placeholder="••••••••"
                        error={errors.password?.message}
                        {...register('password')}
                    />
                </div>

                {error && (
                    <div className="p-3 bg-status-error/10 border border-status-error/20 rounded-lg text-status-error text-sm">
                        {error}
                    </div>
                )}

                <Button
                    type="submit"
                    className="w-full h-12 text-base"
                    isLoading={isSubmitting}
                >
                    Sign In
                </Button>
            </form>

            <div className="mt-6 text-center text-sm text-app-text-muted">
                Don't have an account?{' '}
                <Link to="/signup" className="text-brand-primary hover:underline font-medium">
                    Create account
                </Link>
            </div>

            <div className="mt-4 text-xs text-center text-app-text-muted">
                Tip: Use <b>admin@smartbank.com</b> / <b>admin123</b>
            </div>
        </div>
    );
};

export default Login;
