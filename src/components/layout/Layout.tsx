"use client";

import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import styles from './Layout.module.css';

type LayoutProps = {
    children: React.ReactNode;
    title?: string;
};

const Layout = ({ children, title = 'مصمم جرافيك محترفففففففففففففففف' }: LayoutProps) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <div className={styles.layout}>
                <Header />
                <main className={styles.main}>
                    {children}
                </main>
                <Footer />
            </div>
        </>
    );
};

export default Layout;