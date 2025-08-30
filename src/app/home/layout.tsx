"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Helper to check if a link is active
  const isActive = (href: string) =>
    pathname === href || (href === "/home/" && pathname === "/home");

  const navLinks = [
    { href: "/home/generate", label: "Generate" },
    { href: "/home/", label: "Dashboard" },
    { href: "/home/playlists", label: "Playlists" },
    { href: "/home/questions", label: "Questions" },
    { href: "/home/progress", label: "Progress" },
  ];

  return (
    <div className="h-screen w-screen fixed bg-background text-white font-inter flex flex-col">
      <nav className="w-full flex flex-col sm:flex-row text-xl border-b-[0.5px] border-border">
        <div className="hidden sm:flex flex-row gap-6 p-4 font-bold">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                isActive(link.href)
                  ? "text-brightPurple "
                  : "hover:text-matteTeal transition"
              }
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
      <main className="flex-1 h-full">{children}</main>
    </div>
  );
}
