import './globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export const metadata = {
    title: 'مصمم جرافيك محترف',
    description: 'موقع تعريفي',
};

export default function RootLayout({ children }) {
    return (
        <html lang="ar">
            <body>
                <Header />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
