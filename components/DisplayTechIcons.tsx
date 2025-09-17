"use client";

import React, { useEffect, useState } from "react";
import { getTechLogos, cn } from "@/lib/utils"; 
import Image from "next/image";

// ✅ Define TechIconProps type here
type TechIconProps = {
  techStack: string[];
};

const DisplayTechIcons = ({ techStack }: TechIconProps) => {
  const [techIcons, setTechIcons] = useState<{ tech: string; url: string }[]>([]);

  useEffect(() => {
    const fetchIcons = async () => {
      const logos = await getTechLogos(techStack);
      setTechIcons(logos);
    };
    fetchIcons();
  }, [techStack]);

  return (
    <div className="flex flex-row">
      {techIcons.slice(0, 3).map(({ tech, url }, index) => (
        <div
          key={tech}
          className={cn(
            "relative group bg-dark-300 rounded-full p-2 flex items-center justify-center",
            index >= 1 && "-ml-3"
          )}
        >
          <span className="tech-tooltip absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded">
            {tech}
          </span>
          <Image
            src={url}
            alt={tech}
            width={20}
            height={20}
            className="w-5 h-5"
          />
        </div>
      ))}
    </div>
  );
};

export default DisplayTechIcons;
