import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { loginSchema } from '../../validations/authSchemas';
import { useLogin, useLoginDemo } from '../../hooks/queries/useAuthQueries';
import { useState } from 'react';

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    // Use React Query mutations
    const loginMutation = useLogin();
    const loginDemoMutation = useLoginDemo();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data) => {
        try {
            setError('');
            await loginMutation.mutateAsync({
                email: data.email,
                password: data.password
            });
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

            <div className="mt-4">
                <Button
                    variant="outline"
                    className="w-full h-12 text-base border-white/10 hover:bg-white/5 text-app-text-muted hover:text-white transition-colors"
                    onClick={async () => {
                        try {
                            await loginDemoMutation.mutateAsync();
                            navigate('/dashboard');
                        } catch (err) {
                            setError('Demo login failed');
                        }
                    }}
                    isLoading={loginDemoMutation.isPending}
                >
                    Login as Demo User
                </Button>
            </div>

            <div className="mt-6 text-center text-sm text-app-text-muted">
                Don't have an account?{' '}
                <Link to="/signup" className="text-brand-primary hover:underline font-medium">
                    Create account
                </Link>
            </div>


        </div>
    );
};

export default Login;
