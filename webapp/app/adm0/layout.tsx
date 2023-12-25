"use client";

import React, { useState } from "react";
import Link from "next/link";
import CountrySelector from "../../components/selector";
import { COUNTRIES, Country, Countries } from "../../lib/countries";

export default function SearchLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  // Default this to a country's code to preselect it
  const [country, setCountry] = useState<Country["value"]>("BEL");

  return (
    <div className={"w-screen flex flex-col items-center mt-40"}>
      <div className="w-96 px-5">
        <div className="flex flex-row">
          <div className="basis-3/4">
            <CountrySelector
              id={"country-selector"}
              open={isOpen}
              onToggle={() => setIsOpen(!isOpen)}
              onChange={setCountry}
              selectedValue={COUNTRIES.find(
                (option) => option?.value === country
              )}
            />
          </div>
          <Link
            href={`/adm0/${country}`}
            className="relative basis-10 text-center ml-1 mt-1 bg-blue-500 text-white text-xl rounded-md align-bottom shadow-md hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            ›
          </Link>
        </div>
      </div>
      <div className="relative container mx-auto w-3/5 max-h-96 overflow-auto bg-white mt-6 rounded-md shadow-md font-mono font-medium text-sm text-center text-slate-500">
        {children}
      </div>
    </div>
  );
}
