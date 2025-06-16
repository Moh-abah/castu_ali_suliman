"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import styles from './ProjectCard.module.css';

type Project = {
    id: number;
    title: string;
    category: string;
    description: string;
    image: string;
};

type ProjectCardProps = {
    project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 }
            }}
            className={styles.card}
        >
            <div className={styles.imageContainer}>
                <div className={styles.image} />
                <div className={styles.overlay}>
                    <div className={styles.overlayContent}>
                        <span className={styles.category}>{project.category}</span>
                        <h3 className={styles.title}>{project.title}</h3>
                    </div>
                </div>
            </div>

            <div className={styles.content}>
                <p className={styles.description}>{project.description}</p>

                <div className={styles.footer}>
                    <Link href={`/projects/${project.id}`}>
                        <span className={styles.detailsLink}>عرض التفاصيل</span>
                    </Link>

                    <div className={styles.links}>
                        <a href="#" className={styles.link}>
                            <FiExternalLink size={20} />
                        </a>
                        <a href="#" className={styles.link}>
                            <FiGithub size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;