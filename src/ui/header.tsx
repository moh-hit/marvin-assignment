"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const HomeHeader = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const bg = scrollPosition > 20 ? "bgHeader" : "bg-transparent";

  return (
    <div
      className={`fixed top-0 flex justify-center w-screen h-16 z-50 ${bg} transition-all border-b-2`}
    >
      <div className="flex w-full h-full max-w-6xl flex-row justify-between items-center px-8 py-4">
        <Link href="/" className="flex flex-row gap-2 items-center">
          <h1 className="text-2xl font-bold text-black">Marvin Assignment</h1>
        </Link>
      </div>
    </div>
  );
};

export default HomeHeader;
