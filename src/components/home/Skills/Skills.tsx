"use client";
import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../../ui/SectionTitle/SectionTitle';
import styles from './Skills.module.css';
import { skillsData } from '../../../data/content'; // ✅ استيراد البيانات من الملف الخارجي

const Skills = () => {
    return (
        <section className={styles.skills}>
            <div className={styles.container}>
                <SectionTitle
                    title="مهاراتي الاحترافية"
                    subtitle="أدوات وخبرات أتقنها لتحقيق أفضل النتائج"
                />

                <div className={styles.grid}>
                    <div className={styles.skillsColumn}>
                        <h3 className={styles.columnTitle}>
                            مهارات تقنية
                        </h3>

                        <div className={styles.skillsList}>
                            {skillsData.technicalSkills.map((skill, index) => (
                                <div key={index} className={styles.skillItem}>
                                    <div className={styles.skillHeader}>
                                        <span className={styles.skillName}>{skill.name}</span>
                                        <span className={styles.skillLevel}>{skill.level}%</span>
                                    </div>
                                    <div className={styles.progressBar}>
                                        <motion.div
                                            className={styles.progressFill}
                                            style={{ backgroundColor: skill.color }}
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.level}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, delay: index * 0.1 }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.experienceColumn}>
                        <h3 className={styles.columnTitle}>
                            خبرات إبداعية
                        </h3>

                        <div className={styles.experienceGrid}>
                            {skillsData.experienceItems.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className={styles.experienceItem}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <div className={styles.experienceIcon}>{item.icon}</div>
                                    <h4 className={styles.experienceTitle}>{item.title}</h4>
                                    <p className={styles.experienceCount}>{item.count}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
