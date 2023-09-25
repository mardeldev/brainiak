"use client"

import { usePathname } from "next/navigation"
import Image from "next/image";

export const Loader = () => {
    const path = usePathname();
    let pageText = "Brainiak is thinking..."


    if (path == "/music" || path == "/video") {
        pageText = "Brainiak is thinking. Please be patient if this is your first time using this generator. It takes a couple of minutes for the stars and the servers to align..."
    }

    return (
        <div className="h-full flex flex-col gap-y-4 items-center justify-center">
            <div className="w-10 h-10 relative animate-spin">
                <Image
                    alt="logo"
                    fill
                    src="/logo_brand_col.png"
                />
            </div>
            <p className="text-sm text-muted-foreground">
                {pageText}
            </p>
        </div>
    )
}