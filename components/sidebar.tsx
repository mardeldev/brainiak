"use cliient"
import Link from "next/link";
import Image from "next/image";

import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon } from "lucide-react";

const montserrat = Montserrat({
    weight: "600",
    subsets: ["latin"]
});

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-[#e29578]",
    },
    {
        label: "Conversation",
        icon: MessageSquare,
        href: "/conversation",
        color: "text-lime-300",
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        href: "/image",
        color: "text-teal-400",
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        href: "/video",
        color: "text-blue-600",
    },
    {
        label: "Music Generation",
        icon: Music,
        href: "/music",
        color: "text-violet-700",
    },
    {
        label: "Code Generation",
        icon: Code,
        href: "/code",
        color: "text-pink-500",
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/dashboard",
    }
]

const SideBar = () => {
    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#160f29] text-white">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-10 h-10 mr-4">
                        <Image fill alt="logo" src="/logo.png" />
                    </div>
                    <h1 className={cn("text-xl font-bold", montserrat.className)}>
                        Br<span className="text-[#e29578]">ai</span>niak
                    </h1>
                </Link>

                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            href={route.href}
                            key={route.href}
                            className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 hover:scale-105 rounded-lg transition">
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SideBar