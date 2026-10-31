import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "./globals.css";

export const metadata: Metadata = {
  title: "Michael Feleke Sahle | Software Engineering",
  description: "Software engineering student at Addis Ababa University. Building thoughtful web applications and exploring machine learning and computer vision.",
  openGraph: {
    title: "Michael Feleke Sahle | Software Engineering",
    description: "Thoughtful code. Real-world impact. Selected work in web development and applied AI.",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#1c1d1b" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
