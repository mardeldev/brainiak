"use client"

import SideBar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { checkSubscription } from "@/lib/subscription";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

interface mobileSidebarProps {
  isPro: boolean;
  apiLimitCount: number;
}

const MobileSidebar = ({
  isPro = false,
  apiLimitCount = 0,
}: mobileSidebarProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return false;
  }

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 text-white">
        <SideBar isPro={isPro} apiLimitCount={apiLimitCount} />
      </SheetContent>
    </Sheet>
  );
};


export default MobileSidebar