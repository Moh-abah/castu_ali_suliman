"use client";
import React from 'react';
import Link from 'next/link';
import styles from './Button.module.css';

type ButtonProps = {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    variant?: 'primary' | 'outline';
    className?: string;
    type?: 'button' | 'submit' | 'reset';
};

const Button = ({
    children,
    href,
    onClick,
    variant = 'primary',
    className = '',
    type = 'button'
}: ButtonProps) => {

    const variantClass = variant === 'primary'
        ? styles.primary
        : styles.outline;

    const combinedClasses = `${styles.button} ${variantClass} ${className}`;

    if (href) {
        return (
            <Link href={href} passHref>
                <span className={combinedClasses}>
                    {children}
                </span>
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            className={combinedClasses}
        >
            {children}
        </button>
    );
};

export default Button;