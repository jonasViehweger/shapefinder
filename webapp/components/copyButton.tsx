"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy as fasCopy } from "@fortawesome/free-solid-svg-icons";
import { faCopy as farCopy } from "@fortawesome/free-regular-svg-icons";

export default function CopyButton({ message }: { message: string }) {
  const [active, setActive] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(message);
        setActive(true);
      }}
      className="bg-blue-500 text-white shadow-md rounded-full h-14 w-14 text-lg hover:bg-blue-600"
    >
      <FontAwesomeIcon icon={active ? fasCopy : farCopy} />
    </button>
  );
}
