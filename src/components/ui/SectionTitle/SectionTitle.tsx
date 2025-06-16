"use client";
import React from 'react';
import { motion } from 'framer-motion';
import styles from './SectionTitle.module.css';

type SectionTitleProps = {
    title: string;
    subtitle?: string;
    align?: 'left' | 'center' | 'right';
};

const SectionTitle = ({
    title,
    subtitle,
    align = 'right'
}: SectionTitleProps) => {

    const alignment = {
        left: styles.left,
        center: styles.center,
        right: styles.right
    };

    return (
        <div className={`${styles.container} ${alignment[align]}`}>
            <motion.h2
                className={styles.title}
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                {title}
            </motion.h2>

            {subtitle && (
                <motion.p
                    className={styles.subtitle}
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {subtitle}
                </motion.p>
            )}
        </div>
    );
};

export default SectionTitle;