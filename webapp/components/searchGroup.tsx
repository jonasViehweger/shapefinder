"use client";

import React, { useState } from "react";
import Link from "next/link";
import CountrySelector from "../components/selector";
import { GeomCategory } from "../lib/geomCategories";

export default function SearchGroup({
  geomCategory,
}: {
  geomCategory: GeomCategory;
}) {
  const [isOpen, setIsOpen] = useState(false);
  // Default this to a country's code to preselect it
  const [country, setCountry] = useState(geomCategory.idLookup[0].id);

  return (
    <div className="w-96 px-5">
      <div className="flex flex-row">
        <div className="basis-3/4">
          <CountrySelector
            id={"country-selector"}
            open={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
            onChange={setCountry}
            selectedValue={geomCategory.idLookup.find(
              (option) => option?.id === country
            )}
            lookup={geomCategory.idLookup}
          />
        </div>
        <Link
          href={`/${geomCategory.geomCategory}/${country}`}
          className="relative basis-10 text-center ml-1 mt-1 bg-blue-500 text-white text-xl rounded-md align-bottom shadow-md hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        >
          ›
        </Link>
      </div>
    </div>
  );
}
