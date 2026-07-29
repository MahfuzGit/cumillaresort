import './globals.css';
import { LangProvider } from '../lib/i18n';
import { CmsProvider } from '../lib/cms';
import NextTopLoader from 'nextjs-toploader';

export const metadata = {
  title: 'Cumilla Resort — Kotbari, Cumilla, Bangladesh',
  description:
    'Eco-luxury resort set in the rolling Lalmai Hills near Shalban Vihara, Kotbari, Cumilla, Bangladesh. কুমিল্লা রিসোর্ট — কোটবাড়ি, কুমিল্লা, বাংলাদেশ।',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300&family=Noto+Serif+Bengali:wght@400;500;600;700&family=Hind+Siliguri:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <NextTopLoader
          color="var(--gold, #C9A227)"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px var(--gold, #C9A227),0 0 5px var(--gold, #C9A227)"
        />
        <LangProvider><CmsProvider>{children}</CmsProvider></LangProvider>
      </body>
    </html>
  );
}
