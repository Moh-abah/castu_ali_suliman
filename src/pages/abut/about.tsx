"use client";
import React from 'react';
import styles from './About.module.css';
import Layout from '../../components/layout/Layout';
import SectionTitle from '../../components/ui/SectionTitle/SectionTitle';


const AboutPage = () => {
    return (
        <Layout title="عنّي">
            <section className={styles.about}>
                <div className={styles.container}>
                    <SectionTitle
                        title="من أنا"
                        subtitle="تعرف عليّ أكثر"
                        align="center"
                    />

                    <div className={styles.content}>
                        <p>
                            أنا مصمم جرافيك سعودي مقيم في الرياض، أتمتع بأكثر من 7 سنوات من الخبرة في مجال التصميم الجرافيكي والهوية البصرية. بدأت رحلتي في عالم التصميم منذ الصغر، حيث كنت شغوفًا بالرسم والفنون البصرية.
                        </p>
                        <p>
                            درست التصميم الجرافيكي في جامعة الملك سعود، وتخرجت بمرتبة الشرف. خلال مسيرتي المهنية، عملت مع العديد من الشركات المحلية والدولية، وساعدتهم في بناء هوياتهم البصرية وتصميم موادهم التسويقية.
                        </p>
                        <h3>نهجي في التصميم</h3>
                        <p>
                            أؤمن بأن التصميم الجيد يجب أن يكون جميلاً وعملياً في نفس الوقت. لذلك، أركز دائمًا على فهم احتياجات العميل وأهدافه التجارية قبل البدء في أي مشروع.
                        </p>
                        <p>
                            أبدأ كل مشروع بالبحث والتحليل، ثم أنتقل إلى مرحلة التصميم الأولي، وأخيرًا التطوير النهائي. هذا النهج المنظم يضمن تحقيق النتائج التي تتجاوز توقعات العملاء.
                        </p>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default AboutPage;