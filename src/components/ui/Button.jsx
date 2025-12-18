import React from 'react';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';

const Button = React.forwardRef(({
    className,
    variant = 'primary',
    size = 'default',
    isLoading,
    children,
    ...props
}, ref) => {

    const variants = {
        primary: 'bg-brand-primary hover:bg-brand-primary/90 text-white shadow-lg shadow-brand-primary/20',
        secondary: 'bg-app-surface-highlight hover:bg-app-surface-highlight/80 text-app-text border border-white/5',
        outline: 'border border-brand-primary text-brand-primary hover:bg-brand-primary/10',
        ghost: 'hover:bg-white/5 text-app-text',
        danger: 'bg-status-error hover:bg-status-error/90 text-white',
    };

    const sizes = {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-12 rounded-md px-8 text-lg',
        icon: 'h-10 w-10',
    };

    return (
        <button
            className={cn(
                'inline-flex items-center justify-center whitespace-nowrap rounded-button text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                variants[variant],
                sizes[size],
                className
            )}
            ref={ref}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </button>
    );
});

Button.displayName = "Button";

export { Button };
