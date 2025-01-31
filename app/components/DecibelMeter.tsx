"use client";

import { useState, useEffect } from "react";

const DecibelMeter = ({ onLoudnessChange }: { onLoudnessChange: (level: number) => void }) => {
    const [permissionGranted, setPermissionGranted] = useState(false);

    useEffect(() => {
        const getMicrophoneAccess = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                setPermissionGranted(true);

                const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
                const analyser = audioContext.createAnalyser();
                const microphone = audioContext.createMediaStreamSource(stream);
                const dataArray = new Uint8Array(analyser.frequencyBinCount);

                analyser.fftSize = 256;
                microphone.connect(analyser);

                const updateLoudness = () => {
                    analyser.getByteFrequencyData(dataArray);
                    const avgLoudness = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
                    onLoudnessChange(avgLoudness);
                    requestAnimationFrame(updateLoudness);
                };

                updateLoudness();
            } catch (error) {
                console.error("Microphone access denied:", error);
            }
        };

        getMicrophoneAccess();
    }, [onLoudnessChange]);

    return (
        <div>
            {!permissionGranted && <p>Allow microphone access to test voice loudness.</p>}
        </div>
    );
};

export default DecibelMeter;
