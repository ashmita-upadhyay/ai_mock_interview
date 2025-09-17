"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";
import { getCurrentUser, getInterviewByUserId } from "@/lib/actions/auth.action";
import { dummyInterviews } from "@/constants";
import { getRandomInterviewCover } from "@/lib/utils";



export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [userInterviews, setUserInterviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const currentUser = await getCurrentUser();
        if (!currentUser) return;

        setUser(currentUser);

        const pastInterviews = await getInterviewByUserId(currentUser.id);
        setUserInterviews(pastInterviews || []);
      } catch (err) {
        console.error("Error fetching interviews:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  const hasPastInterviews = userInterviews.length > 0;
  const hasDummyInterviews = dummyInterviews.length > 0;

  return (
    <div className="container mx-auto px-4 py-6 flex flex-col gap-12">

      {/* Hero Section */}
      <section className="card-cta flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2 className="text-2xl font-bold">
            Get Interview-Ready with AI-Powered Practice & Feedback
          </h2>
          <p className="text-lg text-gray-700">
            Practice real interview questions & get instant feedback
          </p>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>

        <Image
          src="/robot.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      {/* Past Interviews from Firebase */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Your Past Interviews</h2>
        {hasPastInterviews ? (
          <div className="flex flex-wrap gap-6">
            {userInterviews.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={interview.userId}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
                level={interview.level}
                coverImage={interview.coverImage || "/adobe.png"}
              />
            ))}
          </div>
        ) : (
          <p>You haven't taken any interviews yet.</p>
        )}
      </section>

      {/* Dummy Interviews */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Take Interviews</h2>
        {hasDummyInterviews ? (
          <div className="flex flex-wrap gap-6">
            {dummyInterviews.map((interview) => (
              <InterviewCard
  key={interview.id}
  userId={interview.userId}
  interviewId={interview.id}
  role={interview.role}
  type={interview.type}
  techstack={interview.techstack}
  createdAt={interview.createdAt}
  coverImage={interview.coverImage || getRandomInterviewCover()}
  level={interview.level}
/>

            ))}
          </div>
        ) : (
          <p>No interviews available to take.</p>
        )}
      </section>
    </div>
  );
}
