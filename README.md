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

## Contact form and Resend

The contact form sends messages to `landvilleventures@gmail.com` through Resend. The visitor's email is set as the reply-to address, so you can reply directly to the inquiry from Gmail. The sender address must use a domain verified with Resend; do not use the visitor's address as the sender.

### Configure Resend

1. Sign in to [Resend](https://resend.com/) and create an API key with permission to send email.
2. In Resend, add the domain you will send from (recommended: `landvilleventures.com`) and complete its DNS verification using the exact records Resend provides. Add these records at the DNS provider for the domain; do not remove or replace existing records unless Resend's instructions specifically require it.
3. Choose a sender address on that verified domain, for example `website@landvilleventures.com`.
4. Configure the following variables locally in `.env.local` for development:

```env
RESEND_API_KEY=re_your_api_key
RESEND_FROM_EMAIL=LandVille Ventures <website@landvilleventures.com>
```

Use the actual verified sender address you configured, not the example if it differs. Keep the API key private and server-side: do not add it to source control, put it in client code, or prefix it with `NEXT_PUBLIC_`.

### Configure Netlify production

1. Open the LandVille site in the Netlify dashboard.
2. Go to **Site configuration → Environment variables** (or **Project configuration → Environment variables** in the newer UI).
3. Add `RESEND_API_KEY` with the secret API key from Resend and `RESEND_FROM_EMAIL` with the verified sender, including the display name if you want one (for example, `LandVille Ventures <website@landvilleventures.com>`).
4. Make both variables available to the **Production** deploy context. Enable other contexts only if you also want contact submissions sent from deploy previews or branch deploys.
5. Save the variables, then trigger a new production deploy so the Netlify Next.js runtime receives them.

The API route reads those variables only on the server. It sends to `landvilleventures@gmail.com` and sets `reply_to` to the visitor's submitted address. Successful submissions are reported to the visitor only after Resend accepts the request. If configuration is missing or Resend rejects/unavailable, the form displays an error rather than a success message.

### Test delivery

After the production deploy is published, submit the contact form with an email address you can access and a test message. Confirm the message arrives in the `landvilleventures@gmail.com` inbox (check Spam if needed), and use **Reply** to verify the visitor's email is the reply-to. If it fails, inspect the Netlify deploy/function logs and confirm both environment variable names, the Resend API key, the verified domain, and the sender address match exactly. Never paste the API key into logs, source code, or a support message.

## Search engine setup

The production canonical domain is `https://landvilleventures.com`. The App Router generates `/sitemap.xml` and `/robots.txt`; shared metadata and page-specific canonical/social metadata are defined in `app/layout.tsx` and `app/seo.ts`. The organization structured data uses the company contact and social details shown on the site.

After deploying to Netlify and confirming the domain uses HTTPS:

1. Open [Google Search Console](https://search.google.com/search-console/) and add the Domain property `landvilleventures.com`.
2. Verify ownership by adding Google's supplied DNS TXT record at the domain's DNS provider. Add the record without deleting existing DNS records.
3. In Search Console, open **Sitemaps**, submit `sitemap.xml`, and check that it is processed successfully.
4. Use **URL inspection** to test the homepage and request indexing for the homepage, `/about`, `/services`, and `/contact`.
5. Verify that `https://landvilleventures.com/robots.txt` and `https://landvilleventures.com/sitemap.xml` are publicly accessible after each production deploy.

Keep the canonical domain and the matching Netlify redirect consistent. Google decides whether and when to index pages; sitemap submission and indexing requests do not guarantee rankings.
