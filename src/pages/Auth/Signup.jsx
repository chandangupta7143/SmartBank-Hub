import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { signupSchema } from '../../validations/authSchemas';
import { useSignup } from '../../hooks/queries/useAuthQueries';
import { useState } from 'react';

const Signup = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    // Use React Query mutation
    const signupMutation = useSignup();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(signupSchema)
    });

    const onSubmit = async (data) => {
        try {
            setError('');
            await signupMutation.mutateAsync({
                name: data.name,
                email: data.email,
                password: data.password
            });
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Signup failed');
        }
    };

    return (
        <div className="w-full">
            <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">Create Account</h2>
                <p className="text-app-text-muted">Join SmartBank Hub today.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="text-sm font-medium mb-1 block">Full Name</label>
                    <Input
                        placeholder="John Doe"
                        error={errors.name?.message}
                        {...register('name')}
                    />
                </div>

                <div>
                    <label className="text-sm font-medium mb-1 block">Email</label>
                    <Input
                        type="email"
                        placeholder="john@example.com"
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

                <div>
                    <label className="text-sm font-medium mb-1 block">Confirm Password</label>
                    <Input
                        type="password"
                        placeholder="••••••••"
                        error={errors.confirmPassword?.message}
                        {...register('confirmPassword')}
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
                    Create Account
                </Button>
            </form>

            <div className="mt-6 text-center text-sm text-app-text-muted">
                Already have an account?{' '}
                <Link to="/login" className="text-brand-primary hover:underline font-medium">
                    Log in
                </Link>
            </div>
        </div>
    );
};

export default Signup;
