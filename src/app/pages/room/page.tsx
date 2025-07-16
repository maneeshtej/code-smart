"use client";

import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import { useState } from "react";

const CreateRoomPage = () => {
  const router = useRouter();
  const [question, setQuestion] = useState("");

  const handleCreateRoom = () => {
    if (!question.trim()) return alert("Please enter a question.");

    const roomId = nanoid(6);
    localStorage.setItem(`room-${roomId}-question`, question); // basic storage for now
    router.push(`/pages/room/${roomId}`);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-xl w-full space-y-4">
        <h1 className="text-2xl font-bold text-center">Create a New Room</h1>

        <textarea
          className="w-full h-40 p-4 border rounded resize-none"
          placeholder="Enter your DSA question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button
          onClick={handleCreateRoom}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Start Room
        </button>
      </div>
    </main>
  );
};

export default CreateRoomPage;
