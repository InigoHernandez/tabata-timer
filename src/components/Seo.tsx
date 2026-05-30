import { Helmet } from 'react-helmet-async';

const SITE = 'https://stint.run';

interface SeoProps {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  type?: 'website' | 'article';
}

export default function Seo({
  title,
  description,
  path,
  ogImage = '/og-image.png',
  jsonLd,
  type = 'website',
}: SeoProps) {
  const url = `${SITE}${path}`;
  const image = ogImage.startsWith('http') ? ogImage : `${SITE}${ogImage}`;
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {blocks.map((b, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(b)}</script>
      ))}
    </Helmet>
  );
}