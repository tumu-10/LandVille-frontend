import type { MetadataRoute } from "next";
import { SITE_URL } from "./seo";

const publicPaths = ["/", "/about", "/services", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPaths.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
  }));
}
