import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "./globals.css";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: site.metadata.title,
  description: site.metadata.description,
  openGraph: {
    title: site.metadata.title,
    description: site.metadata.description,
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#1c1d1b" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
