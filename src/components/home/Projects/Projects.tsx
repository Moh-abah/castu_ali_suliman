"use client";
import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../../ui/SectionTitle/SectionTitle';
import ProjectCard from '../..//ui/ProjectCard/ProjectCard';
import Button from '../../ui/Button/Button';

import styles from './Projects.module.css';
import { projects } from '../../../utils/constants';

const Projects = () => {
    return (
        <section className={styles.projects}>
            <div className={styles.container}>
                <SectionTitle
                    title="أحدث أعمالي"
                    subtitle="تصاميم إبداعية جذابة تلهم الجمهور"
                />

                <motion.div
                    className={styles.projectsGrid}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.2
                            }
                        }
                    }}
                >
                    {projects.slice(0, 3).map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </motion.div>

                <div className={styles.buttonContainer}>
                    <Button href="/projects">
                        تصفح جميع المشاريع
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Projects;