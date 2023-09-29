"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { GithubIcon, Linkedin } from "lucide-react";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { LandingContent } from "./landing-content";

export const LandingHero = () => {
  const { isSignedIn } = useAuth();
  return (
    <div className="text-white font-bold pt-24 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>
          The ultimate{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e29578] to-purple-500 animate-pulse ">
            AI
          </span>{" "}
          tool for your productivity
        </h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#e29578] to-purple-500 pt-28 pb-2">
          <TypewriterComponent
            options={{
              strings: [
                "AI Assistant...",
                "Photo Generation...",
                "Image Generation...",
                "Video Generation...",
                "Music Generation...",
                "Code Generation...",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
        <div className="text-sm md:text-xl font-light text-zinc-400">
          Create content faster with AI and get inspired.
        </div>
        <div>
          <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
            <Button
              variant="branded"
              className="rounded-full md:text-lg p-4 md:p-6 hover:scale-110 cursor-pointer shadow-md shadow-slate-100 hover:animate-pulse"
              size="lg"
            >
              {isSignedIn
                ? "Go to your dashboard"
                : "Start Generating For Free"}
            </Button>
          </Link>
        </div>
        <div className="text-zinc-400 text-xs md:text-sm font-normal">
          No credit card required.
        </div>
      </div>

      <LandingContent />

      <div className="pt-12 text-muted-foreground text-xs">
        © 2023 Aimable Mardel
      </div>
      <div className="flex justify-center gap-4 text-muted-foreground pb-2">
        <div>
          <Link href="https://www.linkedin.com/in/aimable-mardel">
            <Linkedin />
          </Link>
        </div>
        <div>
          <Link href="https://github.com/mardeldev">
            <GithubIcon />
          </Link>
        </div>
      </div>
    </div>
  );
};
