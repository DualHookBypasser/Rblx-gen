"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../supabaseClient";

export default function GeneratedSite() {
  const { directory } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchSite() {
      const { data, error } = await supabase
        .from("websites")
        .select("*")
        .eq("directory", directory)
        .single();

      if (!error) setData(data);
    }
    fetchSite();
  }, [directory]);

  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-200 text-pink-800 text-lg font-semibold">
        Loading your condo site 💞...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-pink-400 to-pink-500 text-white flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6">
        💗 {data.directory}'s Condo Game Website 💗
      </h1>
      <p className="mb-10 opacity-90 text-center">
        Choose your favorite condo game and play instantly!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
        {data.links.map((link, idx) => (
          <a
            key={idx}
            href={link}
            target="_blank"
            className="bg-white/20 backdrop-blur-xl p-4 rounded-xl hover:bg-pink-500 transition text-center font-semibold"
          >
            🎮 Game {idx + 1}
          </a>
        ))}
      </div>

      <footer className="mt-16 text-sm opacity-75">
        Created by Mark Yui 💞
      </footer>
    </div>
  );
}
