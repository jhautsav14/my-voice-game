// app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "Voice Decibel Tester",
  description: "A Next.js app to measure voice loudness using a decibel meter.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
