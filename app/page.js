"use client";
import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function HomePage() {
  const [directory, setDirectory] = useState("");
  const [webhook, setWebhook] = useState("");
  const [links, setLinks] = useState(["", "", "", "", ""]);
  const [status, setStatus] = useState("");

  const handleGenerate = async () => {
    if (!directory || !webhook) {
      setStatus("⚠️ Please fill in all fields.");
      return;
    }

    setStatus("⏳ Generating your site...");

    const { data, error } = await supabase
      .from("websites")
      .insert([{ directory, webhook_url: webhook, links }]);

    if (error) {
      setStatus("❌ Error: " + error.message);
      return;
    }

    // Send webhook
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `✅ Your condo website has been created!\n🔗 https://roblox-condo-games.vercel.app/${directory}`,
      }),
    });

    // Redirect user
    window.location.href = `/${directory}`;
  };

  const updateLink = (index, value) => {
    const newLinks = [...links];
    newLinks[index] = value;
    setLinks(newLinks);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600 flex flex-col items-center justify-center text-white px-4">
      <h1 className="text-4xl font-bold mb-2">Condo Games Website Gen 🩷</h1>
      <p className="text-lg mb-8 opacity-90">Create your own live condo site instantly!</p>

      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 w-full max-w-md shadow-xl">
        <input
          type="text"
          placeholder="Enter Directory Name"
          value={directory}
          onChange={(e) => setDirectory(e.target.value)}
          className="w-full mb-3 p-3 bg-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none"
        />

        <input
          type="url"
          placeholder="Enter Discord Webhook URL"
          value={webhook}
          onChange={(e) => setWebhook(e.target.value)}
          className="w-full mb-5 p-3 bg-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none"
        />

        {links.map((link, index) => (
          <input
            key={index}
            type="url"
            placeholder={`Game Link ${index + 1}`}
            value={link}
            onChange={(e) => updateLink(index, e.target.value)}
            className="w-full mb-3 p-3 bg-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none"
          />
        ))}

        <button
          onClick={handleGenerate}
          className="w-full bg-pink-600 hover:bg-pink-700 transition p-3 rounded-xl font-semibold"
        >
          💖 Generate Website
        </button>

        {status && <p className="mt-4 text-center">{status}</p>}
      </div>

      <footer className="mt-10 opacity-70 text-sm">Created by Mark Yui 💞</footer>
    </div>
  );
        }
