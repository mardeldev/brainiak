import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

const DashboardPage = () => {
    return (
        <div>
            <p className="text-6xl">Dashboard</p>
            <UserButton afterSignOutUrl="/" />
        </div>
    )
}

export default DashboardPage;