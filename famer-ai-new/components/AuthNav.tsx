import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import React from "react";
import { Button } from "./ui/button";
import { Leaf } from "lucide-react";

const AuthNav = () => {
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">FarmAI</span>
          </div>

          <div className="flex items-center gap-4">
            <RegisterLink>
              <Button variant="outline" size="sm">
                Sign Up
              </Button>
            </RegisterLink>
            <LoginLink>
              <Button size="sm">Login</Button>
            </LoginLink>
          </div>
        </div>
      </header>
    </>
  );
};

export default AuthNav;
