import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Церковь Эммануил Бельцы",
    short_name: "Emmanuel",
    description: "Официальный сайт церкви Эммануил, Бельцы, Молдова",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1A1A2E",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
