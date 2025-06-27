import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Leaf } from "lucide-react";

const NavText = () => {
  return (
    <>
      {/*<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">FarmAI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-medium">
              Dashboard
            </Link>
            <Link href="/crop-recommendation" className="text-sm font-medium">
              Crop Recommendation
            </Link>
            <Link href="/disease-detection" className="text-sm font-medium">
              Disease Detection
            </Link>
            <Link href="/weather" className="text-sm font-medium">
              Weather
            </Link>
          </nav>
          <Button variant="outline" size="sm">
            <LogoutLink>Log out</LogoutLink>
          </Button>
        </div>
      </header>*/}

      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">FarmAI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-medium">
              Dashboard
            </Link>
            <Link href="/crop-recommendation" className="text-sm font-medium">
              Crop Recommendation
            </Link>
            <Link href="/disease-detection" className="text-sm font-medium">
              Disease Detection
            </Link>
            <Link href="/weather" className="text-sm font-medium">
              Weather
            </Link>
          </nav>

          <Button variant="outline" size="sm">
            <LogoutLink>Log out</LogoutLink>
          </Button>
        </div>
      </header>
    </>
  );
};

export default NavText;
