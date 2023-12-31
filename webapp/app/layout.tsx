import "./globals.css";
import Link from "next/link";

import { Metadata } from "next";
import { geomCategories } from "../lib/geomCategories";

export const metadata: Metadata = {
  title: "Shapefinder | Shapefiles and geometries of country borders",
  description: "Find nice geometries",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen w-screen bg-gradient-to-r from-indigo-50 to-rose-100 flex flex-col">
        <div className="flex flex-row items-center mt-5 justify-center space-x-5">
          <p className="font-sans font-light text-4xl absolute left-10 text-slate-700">
            <Link href="/">shapefinder</Link>
          </p>
          {geomCategories.map((category) => {
            return (
              <Link
                key={category.geomCategory}
                href={`/${category.geomCategory}`}
              >
                <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-40 mt-5 rounded-full mx-auto text-center shadow-md">
                  {category.name}
                </div>
              </Link>
            );
          })}
        </div>
        <section className="grow">{children}</section>
        <div className="flex flex-row justify-center items-center h-20">
          <p className="font-bold font-sans text-blue-500">ATTRIBUTION</p>
          <div className="bg-blue-500 w-0.5 h-16 m-5"></div>
          <p className="mb-3 text-slate-700 w-1/3">
            The data is provided by{" "}
            <a href="https://www.geoboundaries.org/" className="hyperlink">
              geoBoundaries
            </a>{" "}
            under the{" "}
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              className="hyperlink"
            >
              CC BY 4.0
            </a>{" "}
            license. See{" "}
            <a
              href="https://www.geoboundaries.org/#tabs1-js"
              className="hyperlink"
            >
              here
            </a>{" "}
            for details on how to properly acknowledge geoBoundaries when using
            these files.
          </p>
        </div>
      </body>
    </html>
  );
}
