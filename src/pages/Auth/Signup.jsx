import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useStore } from '../../store/useStore';
import { mockAuth } from '../../api/mock/auth';
import { useState } from 'react';

const signupSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

const Signup = () => {
    const navigate = useNavigate();
    const { login } = useStore();
    const [error, setError] = useState('');

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(signupSchema)
    });

    const onSubmit = async (data) => {
        try {
            setError('');
            const user = await mockAuth.signup(data.name, data.email, data.password);
            login(user);
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
