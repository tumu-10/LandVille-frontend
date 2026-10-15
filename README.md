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
