"use client";

import React from "react";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import DisplayTechIcons from "./DisplayTechIcons";

type InterviewCardProps = {
  interviewId: string;
  userId?: string;
  role: string;
  type: string;
  techstack: string[];
  createdAt?: string | Date;
  coverImage?: string; // ✅ optional cover image
  level?: string; // ✅ optional level


};

const InterviewCard = ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
  coverImage = "/default.png", // fallback image
  level = "N/A", // fallback level
}: InterviewCardProps) => {
  const formattedDate = dayjs(createdAt || Date.now()).format("MMM D, YYYY");

  return (
    <div className="card-border w-[360px] max-sm:w-full min-h-[320px] p-4 flex flex-col gap-4 bg-white shadow-md rounded-lg">
      <div className="flex items-center gap-4">
        <Image
          src={coverImage}
          alt={`${role} Cover`}
          width={90}
          height={90}
          className="rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">{role} Interview</h3>
          <p className="text-sm text-gray-500">{formattedDate}</p>
          <p className="text-sm font-medium">Level: {level}</p>
        </div>
      </div>

      <DisplayTechIcons techStack={techstack} />

      <Link
        href={`/interview/${interviewId}`}
        className="mt-2 text-blue-600 hover:underline"
      >
        View Interview
      </Link>
    </div>
  );
};

export default InterviewCard;
