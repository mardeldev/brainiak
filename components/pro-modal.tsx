"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";
import { useState } from "react";

import { useProModal } from "@/hooks/use-pro-modal";
import { cn } from "@/lib/utils";

import { Check, Code, MessageSquare, Music, Video, Zap } from "lucide-react";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-lime-300",
    bgColor: "bg-lime-500/10",
    href: "/conversation",
  },
  {
    label: "Image Generation",
    icon: Music,
    color: "text-teal-400",
    bgColor: "bg-teal-500/10",
    href: "/image",
  },
  {
    label: "Video Generation",
    icon: Video,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    href: "/video",
  },
  {
    label: "Music Generation",
    icon: Music,
    color: "text-violet-400",
    bgColor: "bg-violet-700/10",
    href: "/music",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-pink-400",
    bgColor: "bg-pink-500/10",
    href: "/code",
  },
];

export const ProModal = () => {
  const proModal = useProModal();
  const [Loading, setLoading] = useState(false);

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = axios.get("/api/stripe");
      window.location.href = (await response).data.url;
    } catch (error) {
      console.log(error, "STRIPE_CLIENT_ERROR");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
              <div className="flex items-center gap-x-2 font-bold py-1">
                Upgrade to Brainiak
                <Badge className="uppercase text-sm py-1" variant="premium">
                  pro
                </Badge>
              </div>
            </DialogTitle>
            <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
              {tools.map((tool) => (
                <Card
                  key={tool.label}
                  className="p-3 bd-black/5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-x-4">
                    <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                      <tool.icon className={cn("w-6 h-6", tool.color)} />
                    </div>
                    <div className="font-semibold text-sm">{tool.label}</div>
                  </div>
                  <Check className="text-primary w-5 h-5" />
                </Card>
              ))}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={onSubscribe}
              size="lg"
              variant="premium"
              className="w-full"
            >
              Upgrade
              <Zap className="w-4 h-4 ml-2 fill-white" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
