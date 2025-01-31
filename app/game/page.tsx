"use client";

import { useState } from "react";
import DecibelMeter from "../components/DecibelMeter";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useRouter } from "next/navigation";

export default function Game() {
    const [loudness, setLoudness] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const maxLoudness = 18; // Max loudness to fully open shutter
    const { width, height } = useWindowSize(); // Confetti effect dimensions
    const router = useRouter();

    // Calculate shutter opening percentage
    const shutterOpenPercent = Math.min((loudness / maxLoudness) * 100, 100);

    // Stop game when max loudness is reached
    if (shutterOpenPercent >= 100 && !gameOver) {
        setGameOver(true);
    }

    // Restart Game
    const restartGame = () => {
        setLoudness(0);
        setGameOver(false);
        router.push("/");
    };

    return (
        <div
            style={{
                position: "relative",
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                background: gameOver ? "#ffcc00" : "#222", // Party mode when max loudness is reached
                color: "white",
            }}
        >
            {/* Celebration Confetti when fully open */}
            {gameOver && <Confetti width={width} height={height} />}

            <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>
                {gameOver ? "🎉 Congrats! You Did It! 🎉" : "Shout to Open the Shutter!"}
            </h1>

            {/* Voice Meter (Only show when game is running) */}
            {!gameOver && <DecibelMeter onLoudnessChange={setLoudness} />}
            {!gameOver && (
                <p style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>
                    Loudness: {Math.round(loudness)} dB
                </p>
            )}

            {/* Shutter Container */}
            <div
                style={{
                    position: "relative",
                    width: "350px",
                    height: "400px",
                    margin: "auto",
                    borderRadius: "10px",
                    overflow: "hidden",
                    border: "5px solid white",
                    boxShadow: "0px 0px 10px rgba(255,255,255,0.5)",
                }}
            >
                {/* Hidden Image Behind Shutter */}
                <img
                    src="/dp.jpg"
                    alt="Surprise"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />

                {/* Shutter Cover (Only show when game is running) */}
                {!gameOver && (
                    <div
                        className="shutter"
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: `${100 - shutterOpenPercent}%`, // Controls opening effect
                            // backgroundImage: "url('/sut.png')", // Use your shutter image
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            transition: "height 0.2s ease-in-out",
                        }}
                    />

                )}
            </div>

            {/* Funny Congratulatory Message */}
            {gameOver && (
                <p style={{ fontSize: "24px", fontWeight: "bold", marginTop: "20px" }}>
                    🎤 "You broke the sound barrier! NASA is calling you!" 🚀
                </p>
            )}

            {/* Restart Button (Only show when game is over) */}
            {gameOver && (
                <button
                    onClick={restartGame}
                    style={{
                        padding: "12px 24px",
                        fontSize: "18px",
                        cursor: "pointer",
                        background: "red",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        marginTop: "20px",
                    }}
                >
                    Restart Game
                </button>
            )}
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


// updated 1