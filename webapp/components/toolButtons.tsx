"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy as fasCopy } from "@fortawesome/free-solid-svg-icons";
import { faCopy as farCopy } from "@fortawesome/free-regular-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";

export function DownloadButton({ message }: { message: string }) {
  const file = new Blob([message], { type: "text/plain" });

  const [active, setActive] = useState(false);
  return (
    <a
      onClick={() => {
        setActive(true);
      }}
      download={`${usePathname().slice(1).toUpperCase()}.geojson`}
      target="_blank"
      rel="noreferrer"
      href={URL.createObjectURL(file)}
    >
      <button
        onClick={() => {
          setActive(true);
        }}
        className="btn-tool"
      >
        <FontAwesomeIcon icon={active ? faDownload : faDownload} />
      </button>
    </a>
  );
}

export function CopyButton({ message }: { message: string }) {
  const [active, setActive] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(message);
        setActive(true);
      }}
      className="btn-tool"
    >
      <FontAwesomeIcon icon={active ? fasCopy : farCopy} />
    </button>
  );
}
