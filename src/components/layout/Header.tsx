"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { FiMenu, FiX, FiMoon, FiSun } from 'react-icons/fi';
import styles from './Header.module.css';
import '../../styles/variables.css';
import variables from '../../styles/variables.js';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            setDarkMode(mediaQuery.matches);

            const handleChange = (e: MediaQueryListEvent) => {
                setDarkMode(e.matches);
            };

            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }
    }, []);

    const navLinks = [
        { name: 'الرئيسية', path: '#hero' },
        { name: 'المشاريع', path: '#projects' },
        { name: 'عنّي', path: '#about' },
        { name: 'اتصل بي', path: '#contact' },
    ];

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                <Link href="/">
                    <div className={styles.logo}>
                        <span>مصمم</span> جرافيك
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className={styles.desktopNav}>
                    {navLinks.map((link) => (
                        <Link key={link.path} href={link.path}>
                            <span
                                className={`${styles.navLink} ${pathname === link.path ? styles.active : ''}`}
                            >
                                {link.name}
                            </span>
                        </Link>
                    ))}
                    <button
                        className={styles.themeToggle}
                        aria-label={darkMode ? "تفعيل الوضع النهاري" : "تفعيل الوضع الليلي"}
                    >
                        {darkMode ? <FiSun color={variables.text} /> : <FiMoon color={variables.text} />}
                    </button>
                </nav>

                {/* Mobile Navigation */}
                <div className={styles.mobileNav}>
                    <button className={styles.themeToggle}>
                        {darkMode ? <FiSun color={variables.text} /> : <FiMoon color={variables.text} />}
                    </button>
                    <button className={styles.menuButton} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className={styles.mobileMenu}>
                    <div className={styles.mobileMenuContainer}>
                        {navLinks.map((link) => (
                            <Link key={link.path} href={link.path}>
                                <span
                                    className={`${styles.mobileNavLink} ${pathname === link.path ? styles.active : ''}`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
