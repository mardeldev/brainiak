import { Heading } from "@/components/heading";
import { MessageSquare } from "lucide-react";

const ConversationPage = () => {
    return (

        <div>
            <Heading
                title="Conversation"
                description="Our most advanced conversation model."
                icon={MessageSquare}
                iconColor="text-lime-300"
                bgColor="bg-lime-400/10"
            />
        </div>

    );
}

export default ConversationPage