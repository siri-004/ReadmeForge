import { useEffect } from 'react';

const SITE_NAME = 'READMEForge';
const SITE_URL = 'https://makeareadme.netlify.app';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

function setMeta(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('meta');
    Object.entries(attributes.identity).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
    document.head.appendChild(element);
  }

  Object.entries(attributes.values).forEach(([key, value]) => {
    if (value) element.setAttribute(key, value);
  });
}

function setLink(rel, href) {
  let link = document.head.querySelector(`link[rel="${rel}"]`);

  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    document.head.appendChild(link);
  }

  link.setAttribute('href', href);
}

export default function SEOHead({
  title,
  description,
  path = '/',
  keywords = 'README generator, GitHub README, markdown editor, README templates, open source documentation',
  image = DEFAULT_IMAGE,
  type = 'website',
  structuredData,
}) {
  useEffect(() => {
    const canonicalPath = path.startsWith('/') ? path : `/${path}`;
    const canonicalUrl = `${SITE_URL}${canonicalPath}`;
    const pageTitle = title || `${SITE_NAME} — Professional GitHub README Generator`;
    const pageDescription = description || 'Create professional GitHub READMEs with live preview, smart templates, quality scoring, and one-click Markdown export.';

    document.title = pageTitle;
    document.documentElement.lang = 'en';

    setMeta('meta[name="description"]', {
      identity: { name: 'description' },
      values: { content: pageDescription },
    });
    setMeta('meta[name="keywords"]', {
      identity: { name: 'keywords' },
      values: { content: keywords },
    });
    setMeta('meta[name="robots"]', {
      identity: { name: 'robots' },
      values: { content: 'index, follow' },
    });

    setMeta('meta[property="og:site_name"]', {
      identity: { property: 'og:site_name' },
      values: { content: SITE_NAME },
    });
    setMeta('meta[property="og:title"]', {
      identity: { property: 'og:title' },
      values: { content: pageTitle },
    });
    setMeta('meta[property="og:description"]', {
      identity: { property: 'og:description' },
      values: { content: pageDescription },
    });
    setMeta('meta[property="og:type"]', {
      identity: { property: 'og:type' },
      values: { content: type },
    });
    setMeta('meta[property="og:url"]', {
      identity: { property: 'og:url' },
      values: { content: canonicalUrl },
    });
    setMeta('meta[property="og:image"]', {
      identity: { property: 'og:image' },
      values: { content: image },
    });

    setMeta('meta[name="twitter:card"]', {
      identity: { name: 'twitter:card' },
      values: { content: 'summary_large_image' },
    });
    setMeta('meta[name="twitter:title"]', {
      identity: { name: 'twitter:title' },
      values: { content: pageTitle },
    });
    setMeta('meta[name="twitter:description"]', {
      identity: { name: 'twitter:description' },
      values: { content: pageDescription },
    });
    setMeta('meta[name="twitter:image"]', {
      identity: { name: 'twitter:image' },
      values: { content: image },
    });

    setLink('canonical', canonicalUrl);

    let jsonLd = document.head.querySelector('#readmeforge-jsonld');
    if (!jsonLd) {
      jsonLd = document.createElement('script');
      jsonLd.id = 'readmeforge-jsonld';
      jsonLd.type = 'application/ld+json';
      document.head.appendChild(jsonLd);
    }

    jsonLd.textContent = JSON.stringify(
      structuredData || {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: SITE_NAME,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web',
        url: SITE_URL,
        description: pageDescription,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      }
    );
  }, [description, image, keywords, path, structuredData, title, type]);

  return null;
}
