import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import Footer from '@/components/Footer';

interface Props {
  path: string;
  title: string;
  description: string;
  h1: string;
  date: string;
  children: React.ReactNode;
}

export default function GuideLayout({ path, title, description, h1, date, children }: Props) {
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: h1,
    datePublished: date,
    dateModified: date,
    author: { '@type': 'Person', name: 'Iñigo Hernandez' },
    publisher: { '@type': 'Organization', name: 'Stint', url: 'https://stint.run' },
  };
  return (
    <>
      <Seo title={title} description={description} path={path} type="article" jsonLd={article} />
      <main className="max-w-3xl mx-auto px-6 py-20 font-aspekta text-foreground/80 leading-relaxed">
        <Link to="/guides" className="text-sm text-foreground/70 hover:text-foreground">← All guides</Link>
        <h1 className="text-4xl font-light my-6 text-foreground">{h1}</h1>
        <article className="space-y-5">{children}</article>
      </main>
      <Footer />
    </>
  );
}