"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../..//ui/SectionTitle/SectionTitle';
import Button from '../..//ui/Button/Button';
import styles from './Contact.module.css';
import { contactData } from '../../../data/content';

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
                            {contactData.contactInfo.map((item, index) => (
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
                                {contactData.socialLinks.map((platform) => (
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