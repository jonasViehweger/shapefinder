import { MetadataRoute } from "next";
import { geomCategories } from "../lib/geomCategories";

const root = "localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const urls = geomCategories.flatMap((category) => {
    return category.idLookup.map((item) => {
      return {
        url: `${root}/${category.geomCategory}/${item.id}`,
      };
    });
  });
  return urls;
}
