import { MetadataRoute } from "next";

const BASE_URL = "https://www.emmanuel.md";
const STREAMS = ["ro", "ru"] as const;

const STATIC_PAGES = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" },
  { path: "/schedule", priority: 0.9, changeFrequency: "weekly" },
  { path: "/events", priority: 0.8, changeFrequency: "weekly" },
  { path: "/news", priority: 0.8, changeFrequency: "weekly" },
  { path: "/sermons", priority: 0.8, changeFrequency: "weekly" },
  { path: "/gallery", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contacts", priority: 0.9, changeFrequency: "monthly" },
  { path: "/ministries", priority: 0.7, changeFrequency: "monthly" },
  { path: "/first-visit", priority: 0.6, changeFrequency: "yearly" },
  { path: "/mission", priority: 0.6, changeFrequency: "yearly" },
  { path: "/history", priority: 0.5, changeFrequency: "yearly" },
  { path: "/faq", priority: 0.5, changeFrequency: "monthly" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return STREAMS.flatMap((stream) =>
    STATIC_PAGES.map(({ path, priority, changeFrequency }) => ({
      url: `${BASE_URL}/${stream}${path}`,
      lastModified: new Date(),
      changeFrequency: changeFrequency as MetadataRoute.Sitemap[number]["changeFrequency"],
      priority,
    }))
  );
}
