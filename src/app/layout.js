import './globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { seoData } from '../data/content'; // استيراد بيانات SEO

export const metadata = {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords, // إضافة الكلمات المفتاحية
};

export default function RootLayout({ children }) {
    return (
        <html lang="ar">
            <head>
                {/* إضافة الكلمات المفتاحية لتحسين SEO */}
                <meta name="keywords" content={seoData.keywords.join(', ')} />
            </head>
            <body>
                <Header />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}