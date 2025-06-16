"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../..//ui/SectionTitle/SectionTitle';
import Button from '../..//ui/Button/Button';
import styles from './Contact.module.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });

            // Reset success message after 5 seconds
            setTimeout(() => setSubmitStatus(null), 5000);
        }, 1500);
    };

    const contactInfo = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            title: 'البريد الإلكتروني',
            value: 'info@designer.com'
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            ),
            title: 'الهاتف',
            value: '+966 55 123 4567'
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            title: 'الموقع',
            value: 'الرياض، المملكة العربية السعودية'
        }
    ];

    return (
        <section className={styles.contact} id="contact">
            <div className={styles.container}>
                <SectionTitle
                    title="تواصل معي"
                    subtitle="هل لديك مشروع أو فكرة؟ دعنا نناقشها معًا"
                />

                <div className={styles.grid}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className={styles.info}
                    >
                        <h3 className={styles.infoTitle}>
                            معلومات التواصل
                        </h3>

                        <div className={styles.contactList}>
                            {contactInfo.map((item, index) => (
                                <div key={index} className={styles.contactItem}>
                                    <div className={styles.contactIcon}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className={styles.contactTitle}>{item.title}</h4>
                                        <p className={styles.contactValue}>{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.socialSection}>
                            <h4 className={styles.socialTitle}>وسائل التواصل الاجتماعي</h4>
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
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className={styles.formContainer}
                    >
                        <h3 className={styles.formTitle}>
                            أرسل لي رسالة
                        </h3>

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formGrid}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="name" className={styles.label}>
                                        الاسم الكامل
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className={styles.input}
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="email" className={styles.label}>
                                        البريد الإلكتروني
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className={styles.input}
                                    />
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="subject" className={styles.label}>
                                    الموضوع
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="message" className={styles.label}>
                                    الرسالة
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className={styles.textarea}
                                />
                            </div>

                            <Button
                                type="submit"
                                className={styles.submitButton}
                                
                            >
                                {isSubmitting ? 'جاري الإرسال...' : 'أرسل الرسالة'}
                            </Button>

                            {submitStatus === 'success' && (
                                <div className={styles.successMessage}>
                                    تم إرسال رسالتك بنجاح! سأتواصل معك قريبًا.
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className={styles.errorMessage}>
                                    حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.
                                </div>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;