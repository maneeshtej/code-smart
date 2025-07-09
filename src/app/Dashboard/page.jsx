"use client";

import HeaderBar from "@/components/Dashboard/Header/Header";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaWandMagicSparkles } from "react-icons/fa6";
import GeneralDialog from "@/components/Dialogs/GeneralDialog";

function Dashboard() {
  const [dialogType, setDialogType] = useState(null);
  const [topics, setTopics] = useState([]);
  const [topicInput, setTopicInput] = useState("");
  const [playlistInput, setPlaylistInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddTopic = () => {
    if (!topicInput.trim()) return;
    setTopics((prev) => [...prev, topicInput.trim()]);
    setTopicInput("");
  };

  const handleCloseDialog = () => {
    setDialogType(null);
  };

  const generateDialogContent = (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-lg font-bold">Generate Playlist</h2>
      <p>This will use AI to generate a playlist.</p>
      <div className="flex flex-row gap-4 w-full">
        <input
          name="topic"
          type="text"
          className="bg-bg-dark outline-none p-2 w-full rounded-lg"
          placeholder="Enter topic"
          value={topicInput}
          onChange={(e) => setTopicInput(e.target.value)}
        />
        <button className="full-button">Add</button>
      </div>
      <div className="w-full flex flex-wrap gap-2">
        {topics.map((topic, index) => (
          <span
            key={index}
            className="bg-accent text-sm px-3 py-1 rounded-lg text-white"
          >
            {topic}
          </span>
        ))}
      </div>
      <button
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        onClick={handleCloseDialog}
      >
        Close
      </button>
    </div>
  );

  const addDialogContent = (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-lg font-bold">Add Playlist</h2>
      <p>This will add a new Playlist.</p>
      <div className="flex flex-row gap-4 w-full">
        <input
          name="playlist"
          type="text"
          className="bg-bg-dark outline-none p-2 w-full rounded-lg"
          placeholder="Enter name"
          value={playlistInput}
          onChange={(e) => setPlaylistInput(e.target.value)}
        />
        <button className="full-button">Add</button>
      </div>
      <button
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        onClick={handleCloseDialog}
      >
        Close
      </button>
    </div>
  );

  return (
    <div className="h-screen w-screen bg-bg">
      <HeaderBar />
      <div className="p-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <h1 className="heading text-2xl font-bold">Playlists</h1>
        <div className="flex flex-row gap-8 flex-1 justify-start sm:justify-end">
          <div
            className="flex flex-col gap-2 justify-between items-center cursor-pointer"
            onClick={() => setDialogType("add")}
          >
            <IoMdAdd size={20} />
            <span className="text-xs">Add</span>
          </div>
          <div
            className="flex flex-col gap-2 justify-between items-center cursor-pointer"
            onClick={() => setDialogType("generate")}
          >
            <FaWandMagicSparkles size={20} />
            <span className="text-xs">Generate</span>
          </div>
        </div>
      </div>
      {loading ? <h1>Loading</h1> : <></>}
      {error ? <h1>{error}</h1> : <></>}

      <GeneralDialog
        content={
          dialogType === "generate"
            ? generateDialogContent
            : dialogType === "add"
            ? addDialogContent
            : null
        }
        onClose={handleCloseDialog}
      />
    </div>
  );
}

export default Dashboard;
