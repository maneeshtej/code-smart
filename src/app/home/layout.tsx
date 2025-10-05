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
  ];

  return (
    <div className="h-screen w-screen fixed bg-background text-white font-inter flex flex-row">
      {/* Sidebar */}
      <aside className="flex flex-col gap-4 min-w-[140px] max-w-[220px] w-56 bg-background-dark border-r border-borderc p-4 h-full">
        <h2 className="font-bold text-base mb-2 text-text-light">Sidebar</h2>
        {/* Navigation links */}
        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`py-2 px-2 rounded-lg font-medium transition-all duration-200
                ${
                  isActive(link.href)
                    ? "text-white text-base font-bold"
                    : "text-gray-400 text-sm"
                }
                hover:shadow-lg hover:-translate-x-1 hover:bg-background hover:text-white
              `}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        {/* Add more sidebar content here if needed */}
      </aside>
      {/* Main Content */}
      <main className="flex-1 h-full w-full">{children}</main>
    </div>
  );
}
