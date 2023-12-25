import { MetadataRoute } from "next";
import { COUNTRIES } from "../lib/countries";

const root = "localhost:3000/";

export default function sitemap(): MetadataRoute.Sitemap {
  const adm0 = COUNTRIES.map((country) => {
    return {
      url: `${root}adm0/${country.value}`,
    };
  });
  return [...adm0, { url: `${root}adm0/` }];
}
