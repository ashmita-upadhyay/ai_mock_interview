
"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { vapi } from "@/lib/vapi.sdk";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface AgentProps {
  userName: string;
  userId: string;
  type: string;
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

const Agent: React.FC<AgentProps> = ({ userName, userId, type }) => {
  const router = useRouter();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);

  // 🔹 Setup event listeners
  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);
    const onMessage = (message: any) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        setMessages((prev) => [...prev, { role: message.role, content: message.transcript }]);
      }
    };
    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);
    const onError = (error: Error) => console.error("VAPI Error:", error);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  // 🔹 Redirect to home after call
  useEffect(() => {
    if (callStatus === CallStatus.FINISHED) {
      router.push("/");
    }
  }, [callStatus, router]);

  // 🔹 Start call
  const handleStartCall = async () => {
    setCallStatus(CallStatus.CONNECTING);
    try {
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
        variableValues: { userName, userId, type },
      });
    } catch (error) {
      console.error("Error starting call:", error);
      setCallStatus(CallStatus.INACTIVE);
    }
  };

  // 🔹 End call
  const handleEndCall = async () => {
    try {
      await vapi.stop();
    } catch (error) {
      console.error("Error ending call:", error);
    } finally {
      setCallStatus(CallStatus.FINISHED);
    }
  };

  const lastMessage = messages[messages.length - 1]?.content;

  return (
    <>
      {/* Call View */}
      <div className="call-view">
        <div className="card-interviewer">
          <div className="avatar relative">
            <Image
            
              src="/ai-avatar.png"
              alt="AI Interviewer"
              width={65}
              height={65}
              className="object-cover rounded-full"
            />
            {isSpeaking && <span className="animate-ping absolute inset-0" />}
          </div>
          <h3 className="mt-2 text-center">AI Interviewer</h3>
        </div>

        <div className="card-border">
          <div className="card-content flex flex-col items-center">
            <Image
              src="/user-avatar.png" // ✅ Fixed path
              alt="User Avatar"
              width={120}
              height={120}
              className="rounded-full object-cover"
            />
            <h3 className="mt-2">{userName}</h3>
          </div>
        </div>
      </div>

      {/* Messages */}
      {lastMessage && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              key={lastMessage}
              className={clsx(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}

      {/* Call Controls */}
      <div className="w-full flex justify-center mt-4">
        {callStatus !== CallStatus.ACTIVE ? (
          <button
            onClick={handleStartCall}
            className="relative btn-call px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition"
          >
            <span
              className={clsx(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== CallStatus.CONNECTING && "hidden"
              )}
            />
            <span>
              {callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED
                ? "Call"
                : "..."}
            </span>
          </button>
        ) : (
          <button
            onClick={handleEndCall}
            className="btn-disconnected px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
          >
            End
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;
