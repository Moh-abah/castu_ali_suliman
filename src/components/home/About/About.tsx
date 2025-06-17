'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../../ui/SectionTitle/SectionTitle';
import Button from '../../ui/Button/Button';
import styles from './About.module.css';
import { aboutData } from '../../../data/content';

const About = () => {
    return (
        <section className={styles.about}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className={styles.content}
                    >
                        <SectionTitle
                            title={aboutData.title}
                            subtitle={aboutData.subtitle}
                            align="right"
                        />

                        <div className={styles.description}>
                            {aboutData.description.map((para, i) => (
                                <p key={i}>{para}</p>
                            ))}
                        </div>

                        <div className={styles.buttonContainer}>
                            <Button href={aboutData.buttonLink}>
                                {aboutData.buttonText}
                            </Button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className={styles.imageContainer}
                    >
                        <div className={styles.imageWrapper}>
                            <div className={styles.image} />
                            <div className={styles.imageBorder} />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
