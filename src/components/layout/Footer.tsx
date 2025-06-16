"use client";

import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';
import '../../styles/variables.css';


const Footers = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.brand}>
                        <h3 className={styles.logo}>
                            <span>مصمم</span> جرافيك
                        </h3>
                        <p className={styles.tagline}>تصميمات إبداعية تترك أثرًا</p>
                    </div>

                    <div className={styles.socialLinks}>
                        {['twitter', 'instagram', 'behance', 'dribbble'].map((platform) => (
                            <a
                                key={platform}
                                href="#"
                                className={styles.socialLink}
                                aria-label={platform}
                            >
                                <div className={styles.socialIcon} />
                            </a>
                        ))}
                    </div>
                </div>

                <div className={styles.copyright}>
                    <p>© {new Date().getFullYear()} جميع الحقوق محفوظة</p>
                </div>
            </div>
        </footer>
    );
};

export default Footers;