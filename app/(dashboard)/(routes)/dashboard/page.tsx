"use client";

import { ArrowRight, Code, MessageSquare, Music, Video } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";



const tools = [
    {
        label: "Conversation",
        icon: MessageSquare,
        color: "text-lime-300",
        bgColor: "bg-lime-500/10",
        href: "/conversation"
    },
    {
        label: "Image Generation",
        icon: Music,
        color: "text-teal-400",
        bgColor: "bg-teal-500/10",
        href: "/image"
    },
    {
        label: "Video Generation",
        icon: Video,
        color: "text-blue-400",
        bgColor: "bg-blue-500/10",
        href: "/video"
    },
    {
        label: "Music Generation",
        icon: Music,
        color: "text-violet-400",
        bgColor: "bg-violet-700/10",
        href: "/music"
    },
    {
        label: "Code Generation",
        icon: Code,
        color: "text-pink-400",
        bgColor: "bg-pink-500/10",
        href: "/code"
    }
]

const DashboardPage = () => {
    const router = useRouter();


    return (
        <div>

            <div className="mb-8 space-y-4">
                <div className="flex justify-center">
                    <h2 className="text-2xl md:text-4xl font-bold text-center ">
                        Unleash the <span className="text-[#E29578]">power</span> of <span className="text-[#E29578]">AI</span>
                    </h2>
                    <Image src="/logo_black.png" width={40} height={40} alt="logo" className="mx-4"></Image>
                </div>

                <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
                    Become productive with your very own AI hub
                </p>

            </div>



            <div className="px-4 md:px-20 lg:px-32 space-y-4 ">
                {tools.map((tool) => (
                    <Card
                        key={tool.href}
                        className={cn("p-4 border-black/5 flex items-center justify-between  hover:shadow-md transition cursor-pointer")}
                        onClick={() => router.push(tool.href)}
                    >
                        <div className="flex items-center gap-x-4">
                            <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                <tool.icon className={cn("w-8 h-8", tool.color)} />
                            </div>
                            <div className="font-semibold">
                                {tool.label}
                            </div>
                        </div>
                        <ArrowRight className={cn("w-8 h-8")} />
                    </Card>
                ))}
            </div>



        </div >
    )
}

export default DashboardPage;