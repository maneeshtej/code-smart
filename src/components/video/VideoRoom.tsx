"use client";

import { Camera, CameraOff, Mic, MicOff } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

type VideoRoomProps = {
  roomId: string;
  userId: string;
};

const VideoRoom = ({ roomId, userId }: VideoRoomProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getLocalStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        setLocalStream(stream);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error getting media stream:", error);
        setError("Unable to access camera/microphone");
      }
    };

    getLocalStream();
  }, []);

  useEffect(() => {
    if (!localStream) return;

    localStream.getAudioTracks().forEach((track) => (track.enabled = micOn));
    localStream.getVideoTracks().forEach((track) => (track.enabled = camOn));
  }, [micOn, camOn, localStream]);
  return (
    <div className="flex flex-row">
      <div className="h-full w-80 p-4 bg-background-dark rounded-xl flex flex-col gap-6">
        <div className="h-[80%] w-full flex flex-col overflow-hidden rounded-xl bg-background-dark">
          <video ref={videoRef} autoPlay muted playsInline />
        </div>
        <div className="text-text flex flex-row gap-6">
          <div onClick={() => setMicOn((prev) => !prev)}>
            {micOn ? (
              <Mic size={20} className="cursor-pointer" />
            ) : (
              <MicOff size={20} className="cursor-pointer" />
            )}
          </div>
          <div onClick={() => setCamOn((prev) => !prev)}>
            {camOn ? (
              <Camera size={20} className="cursor-pointer" />
            ) : (
              <CameraOff size={20} className="cursor-pointer" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoRoom;
