import React from "react";
import SearchGroup from "../../components/searchGroup";
import { geomCategories } from "../../lib/geomCategories";

export default function SearchLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    category: string;
  };
}) {
  return (
    <div className={"w-screen flex flex-col items-center mt-40"}>
      <SearchGroup
        geomCategory={geomCategories.find(
          (category) => category.geomCategory === params.category
        )}
      />
      <div className="relative container mx-auto w-3/5 max-h-96 overflow-auto bg-white mt-6 rounded-md shadow-md font-mono font-medium text-sm text-center text-slate-500">
        {children}
      </div>
    </div>
  );
}
