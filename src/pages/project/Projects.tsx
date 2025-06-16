"use client";
import React from 'react';
import Layout from '../../components/layout/Layout';
import SectionTitle from '../../components/ui/SectionTitle/SectionTitle';
import ProjectCard from '../../components/ui/ProjectCard/ProjectCard';
import { projects } from '../../utils/constants';
import styles from './Projects.module.css';

const ProjectsPage = () => {
    return (
        <Layout title="معرض أعمالي">
            <section className={styles.projects}>
                <div className={styles.container}>
                    <SectionTitle
                        title="معرض أعمالي"
                        subtitle="مجموعة من أبرز أعمالي في التصميم الجرافيكي"
                        align="center"
                    />

                    <div className={styles.grid}>
                        {projects.map(project => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default ProjectsPage;