"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import DecibelMeter from "./components/DecibelMeter";
import LoudnessBar from "./components/LoudnessBar";

// Funny random texts for typing animation
const funnyTexts = [
  "Scream louder than your alarm at 7 AM! ⏰😵",
  "Unleash your inner banshee—GO FULL CHAOS MODE! 🔥👹",
  "If you ain't screaming, are you even gaming? 🎮📢",
  "Break the sound barrier, break the simulation! 🔊💥",
  "One scream = One extra life in the Metaverse! 🕶️🌍",
  "Channel your inner NPC getting hit in a game! 💀🎮",
  "Shout like you just got left on read! 📵😭",
  "Louder than a Karen at customer service! 🔥📢",
  "If you don’t hit 100 dB, you owe us V-Bucks! 💰😂",
  "This is your villain arc. Make it LOUD. 👹🔥",
  "Scream like you just stepped on a LEGO! 🧱😭",
  "If your scream is weak, we’re telling your mom! 🤨😂",
  "Make your FBI agent question his job! 🕵️‍♂️🎤",
  "Go louder than your WiFi disconnecting mid-game! 📶😱",
  "Be the main character. Go FERAL! 🦁🔥",
  "Unleash your inner TikTok drama queen! 🎭📢",
  "Shout like Spotify just played an ad! 🎧🤬",
  "Prove to the universe you deserve plot armor! ⚔️💀",
  "Turn your volume up… NO, YOURS! 📢😂",
  "Your voice has power. Break the fourth wall! 🌀🎤"
];


const colors = ["yellow", "cyan", "lightgreen", "pink", "orange"];

export default function Home() {
  const [isTesting, setIsTesting] = useState(false);
  const [loudness, setLoudness] = useState(0);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  // **Lottie Player Ref (Prevents blinking & repositioning)**
  const lottieRef = useRef<HTMLDivElement>(null);

  // Ensure this runs only on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Typing animation effect (Non-blocking approach)
  useEffect(() => {
    if (charIndex < funnyTexts[textIndex].length) {
      const timer = setTimeout(() => {
        setTypedText((prev) => prev + funnyTexts[textIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timer); // Clean up timer
    } else {
      // Reset typing after a delay
      const resetTimer = setTimeout(() => {
        setTypedText("");
        setCharIndex(0);
        setTextIndex((prev) => (prev + 1) % funnyTexts.length);
      }, 2000);
      return () => clearTimeout(resetTimer);
    }
  }, [charIndex, textIndex]);

  // **Render Lottie animation only once inside `useEffect`**
  useEffect(() => {
    if (lottieRef.current && isClient) {
      lottieRef.current.innerHTML = `
        <dotlottie-player
          src="https://lottie.host/3801cf00-7ed7-44ec-95e3-710d28b9b761/5uTFbjL3C5.lottie"
          background="transparent"
          speed="1"
          style="width: 300px; height: 300px;"
          loop
          autoplay
        ></dotlottie-player>
      `;
    }
  }, [isClient]);

  return (
    <div style={{ textAlign: "center", padding: "20px", color: "white", background: "transparent", height: "100vh", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Load Google Font */}
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&display=swap" rel="stylesheet" />

      {/* ✅ Load the Lottie script once */}
      <Script
        src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs"
        type="module"
        strategy="lazyOnload"
      />

      {/* ✅ Lottie Animation (No Blinking & No Left Shift) */}
      <div ref={lottieRef} style={{ margin: "0 auto", width: "300px", height: "300px" }} />

      {/* ✅ Animated Funny Text (Non-blocking typing animation) */}
      <h2 style={{
        fontSize: "24px",
        marginBottom: "20px",
        minHeight: "40px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        borderRight: "2px solid white",
        display: "inline-block",
        color: colors[textIndex] // Dynamic color
      }}>
        {typedText}
      </h2>

      <h1>Test Your Voice Decibel Level</h1>

      {/* Voice Test Button */}
      <button
        onClick={() => setIsTesting(!isTesting)}
        style={{
          padding: "10px 20px",
          fontSize: "18px",
          cursor: "pointer",
          background: isTesting ? "red" : "blue",
          color: "white",
          border: "none",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
      >
        {isTesting ? "Stop Test" : "Start Test"}
      </button>

      {isTesting && (
        <div style={{ marginTop: "20px" }}>
          <DecibelMeter onLoudnessChange={setLoudness} />
          <LoudnessBar level={loudness} />
          <p style={{ fontSize: "18px", fontWeight: "bold" }}>Loudness: {Math.round(loudness)} dB</p>
        </div>
      )}

      {/* Play Game Button */}
      <button
        onClick={() => router.push("/game")}
        style={{
          padding: "12px 24px",
          fontSize: "18px",
          cursor: "pointer",
          background: "green",
          color: "white",
          border: "none",
          borderRadius: "12px",
          marginTop: "30px",
          marginLeft: "10px",
        }}
      >
        Play Game
      </button>

      {/* ✅ Footer Section */}
      <footer style={{ marginTop: "auto", padding: "10px 0", background: "rgba(0, 0, 0, 0.3)", width: "100%", textAlign: "center" }}>
        <p style={{ fontSize: "16px", color: "#bbb" }}>
          Developed by <b style={{ color: "white" }}>Utsav</b> |
          <a href="https://github.com/jhautsav14" target="_blank" style={{ color: "#4DA8DA", textDecoration: "none", marginLeft: "5px" }}>
            GitHub Repo 🚀
          </a>
        </p>
      </footer>
    </div>
  );
}
