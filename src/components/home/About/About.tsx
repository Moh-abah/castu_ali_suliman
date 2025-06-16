
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../../ui/SectionTitle/SectionTitle';
import Button from '../../ui/Button/Button';
import styles from './About.module.css';

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
                            title="من أنا"
                            subtitle="مصمم جرافيك محترف"
                            align="right"
                        />

                        <div className={styles.description}>
                            <p>
                                أنا مصمم جرافيك سعودي مقيم في الرياض، أتمتع بأكثر من 7 سنوات من الخبرة في مجال التصميم الجرافيكي والهوية البصرية. تخصصت في إنشاء شعارات مميزة وهوية بصرية متكاملة تعبر عن روح العلامة التجارية.
                            </p>
                            <p>
                                أعمل على تحويل الأفكار إلى تصاميم إبداعية تلهم الجمهور وتترك أثرًا دائمًا. أؤمن بأن التصميم الجيد هو الذي يجمع بين الجماليات والوظيفية لتحقيق أهداف العمل.
                            </p>
                            <p>
                                عملت مع مجموعة متنوعة من العملاء من مختلف القطاعات، وساعدتهم في بناء هوية بصرية قوية ومتماسكة.
                            </p>
                        </div>

                        <div className={styles.buttonContainer}>
                            <Button href="/about">
                                المزيد عنّي
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