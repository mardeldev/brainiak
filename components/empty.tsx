import Image from "next/image";

interface EmptyProps {
    label: string;
}

const imgArr = ["/empty.png", "/empty2.png", "/empty3.png", "/empty4.png"]

export const Empty = ({
    label
}: EmptyProps) => {
    return (
        <div className="h-full p-20 flex flex-col items-center justify-center">
            <div className="relative h-72 w-72">
                <Image
                    alt="Empty"
                    fill
                    src={imgArr[Math.floor(Math.random() * imgArr.length)]} />
            </div>
            <p className="text-muted-foreground text-sm text-center mt-6">
                {label}
            </p>
        </div>
    )
}