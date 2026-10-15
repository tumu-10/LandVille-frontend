import type { Metadata } from "next";

export const SITE_URL = "https://landvilleventures.com";

const socialImage = "/The%20Hills%20Project%20-%20Nii%20Ofoe.jpg";

export function createPageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const fullTitle = `${title} | LandVille Ventures`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      url: path,
      siteName: "LandVille Ventures",
      title: fullTitle,
      description,
      images: [
        {
          url: socialImage,
          alt: "A contemporary property featured by LandVille Ventures",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [socialImage],
    },
  };
}
