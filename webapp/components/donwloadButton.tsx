"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";

export default function DownloadButton({ message }: { message: string }) {
  const file = new Blob([message], { type: "text/plain" });

  const [active, setActive] = useState(false);
  return (
    <button
      onClick={() => {
        setActive(true);
      }}
      className="bg-blue-500 text-white shadow-md rounded-full h-14 w-14 text-lg hover:bg-blue-600"
    >
      <a
        download={`${usePathname().slice(1).toUpperCase()}.geojson`}
        target="_blank"
        rel="noreferrer"
        href={URL.createObjectURL(file)}
      >
        <FontAwesomeIcon icon={active ? faDownload : faDownload} />
      </a>
    </button>
  );
}
