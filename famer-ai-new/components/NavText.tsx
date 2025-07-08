"use client";

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Leaf } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const NavText = () => {
  const pathname = usePathname();


  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/crop-recommendation", label: "Crop Recommendation" },
    { href: "/disease-detection", label: "Disease Detection" },
    { href: "/about", label: "About" },
    // { href: "/weather", label: "Weather" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b  backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-green-600" />
          <span className="text-xl font-bold text-green-800">FarmAI</span>
        </div>

        <nav className="hidden md:flex items-center gap-4">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                "text-sm font-medium px-3 py-2 rounded-md transition-colors",
                {
                  "bg-green-600 text-white shadow": pathname === href,
                  "text-gray-700 hover:bg-green-100 hover:text-green-700": pathname !== href,
                }
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        <Button variant="outline" size="sm">
          <LogoutLink>Log out</LogoutLink>
        </Button>
      </div>
    </header>
  );
};

export default NavText;
