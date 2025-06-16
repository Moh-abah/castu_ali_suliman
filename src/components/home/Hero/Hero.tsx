"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowDown } from 'react-icons/fi';
import Button from '../..//ui/Button/Button';
import styles from './Hero.module.css';

const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.overlay} />

            <div className={styles.content}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className={styles.contentInner}
                >
                    <motion.h1
                        className={styles.title}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        <span>تصميمات إبداعية</span> تترك أثرًا
                    </motion.h1>

                    <motion.p
                        className={styles.subtitle}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        مصمم جرافيك محترف متخصص في إنشاء هويات بصرية متميزة وتصميمات إبداعية تلهم الجمهور
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9, duration: 0.8 }}
                        className={styles.buttons}
                    >
                        <Button href="/projects" className={styles.primaryButton}>
                            تصفح أعمالي
                        </Button>
                        <Button href="/contact" variant="outline" className={styles.outlineButton}>
                            تواصل معي
                        </Button>
                    </motion.div>
                </motion.div>
            </div>

            <motion.div
                className={styles.scrollIndicator}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
            >
                <FiArrowDown size={24} />
            </motion.div>
        </section>
    );
};

export default Hero;