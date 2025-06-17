"use client"
import { projects } from '../../../utils/constants';
import styles from './ProjectDetails.module.css';
import { useEffect, useState } from 'react';

type Props = {
    params: { id: string };
};

export default function ProjectDetails({ params }: Props) {
    const id = parseInt(params.id);
    const project = projects.find(p => p.id === id);

    // حالة الوضع الداكن (اختياري)
    const [isDark, setIsDark] = useState(false);
    useEffect(() => {
        setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }, []);

    if (!project) {
        return (
            <div className="text-center text-red-500 py-10">
                المشروع غير موجود
            </div>
        );
    }

    return (
        <div className={`${styles.container} ${isDark ? styles.darkContainer : ''}`}>
            <div className={`${styles.card} ${isDark ? styles.darkCard : ''}`}>
                <div className={styles.imageWrapper}>
                    <img
                        src={project.image}
                        alt={project.title}
                        className={styles.image}
                    />
                    <div className={`${styles.categoryLabel} ${isDark ? styles.darkCategoryLabel : ''}`}>
                        {project.category}
                    </div>
                </div>

                <div className={styles.content}>
                    <h1 className={`${styles.title} ${isDark ? styles.darkTitle : ''}`}>
                        {project.title}
                    </h1>
                    <p className={`${styles.description} ${isDark ? styles.darkDescription : ''}`}>
                        {project.description}
                    </p>

                    <div className={`${styles.footer} ${isDark ? styles.darkFooter : ''}`}>
                        <div className={styles.detailsLink}>مشروع رقم: #{project.id}</div>
                        <div className={styles.links}>
                            <a href="#" className={`${styles.link} ${isDark ? styles.darkLink : ''}`}>
                                رابط مباشر
                            </a>
                            <a href="#" className={`${styles.link} ${isDark ? styles.darkLink : ''}`}>
                                GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


