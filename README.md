# LandVille Ventures

LandVille Ventures is a real estate and property experience built with Next.js, React, TypeScript, and Sass. The site uses local imagery and video in `public/` and uses Resend to deliver contact form messages.

## Getting started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available checks

```bash
npm run lint
npm run build
```

## Contact form

The contact form sends messages to `landvilleventures@gmail.com` through the Resend API. Add these variables to `.env.local`:

```env
RESEND_API_KEY=re_your_api_key
RESEND_FROM_EMAIL=LandVille Website <website@your-verified-domain.com>
```

Create an API key in Resend and verify the sending domain used for `RESEND_FROM_EMAIL`. Keep the API key server-side; do not use a `NEXT_PUBLIC_` variable. If delivery is not configured or the provider is unavailable, the form displays an error and directs visitors to the contact email.

## Search engine setup

The production canonical domain is `https://landvilleventures.com`. The App Router generates `/sitemap.xml` and `/robots.txt`; shared metadata and page-specific canonical/social metadata are defined in `app/layout.tsx` and `app/seo.ts`. The organization structured data uses the company contact and social details shown on the site.

After deploying to Netlify and confirming the domain uses HTTPS:

1. Open [Google Search Console](https://search.google.com/search-console/) and add the Domain property `landvilleventures.com`.
2. Verify ownership by adding Google's supplied DNS TXT record at the domain's DNS provider. Add the record without deleting existing DNS records.
3. In Search Console, open **Sitemaps**, submit `sitemap.xml`, and check that it is processed successfully.
4. Use **URL inspection** to test the homepage and request indexing for the homepage, `/about`, `/services`, and `/contact`.
5. Verify that `https://landvilleventures.com/robots.txt` and `https://landvilleventures.com/sitemap.xml` are publicly accessible after each production deploy.

Keep the canonical domain and the matching Netlify redirect consistent. Google decides whether and when to index pages; sitemap submission and indexing requests do not guarantee rankings.
