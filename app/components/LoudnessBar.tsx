"use client";

const LoudnessBar = ({ level }: { level: number }) => {
    const maxWidth = 300; // Maximum width of the bar
    const barWidth = Math.min((level / 255) * maxWidth, maxWidth); // Normalize to width

    return (
        <div style={{ width: maxWidth, height: 20, background: "#ccc", borderRadius: 5 }}>
            <div
                style={{
                    width: barWidth,
                    height: "100%",
                    background: level > 150 ? "red" : level > 80 ? "orange" : "green",
                    transition: "width 0.2s",
                    borderRadius: 5,
                }}
            ></div>
        </div>
    );
};

export default LoudnessBar;
