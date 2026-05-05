import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://viom.global";
  const routes = [
    "",
    "/ai-automation",
    "/llm",
    "/virtual-teams",
    "/products/servicescientist",
    "/book-call",
    "/contact",
  ];
  return routes.map((r) => ({
    url: `${base}${r}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: r === "" ? 1 : 0.7,
  }));
}
