"use client"

import axios from "axios";
import * as z from "zod";
import { amountOptions, formSchema, resolutionOptions } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";

import { Heading } from "@/components/heading";
import { Download, Image as LucideImage } from "lucide-react";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image"

import OpenAI from "openai"
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";

const ImagePage = () => {
    const router = useRouter();
    const [images, setImages] = useState<string[]>([])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution: "512x512"
        }
    });

    const isLoading = form.formState.isSubmitting;


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setImages([]);
            const response = await axios.post("/api/image", values);

            const urls = response.data.map((image: { url: string }) => image.url)

            setImages(urls)
            form.reset();
        } catch (error: any) {
            //TODO: OPEN PRO MODAL
            console.log(error);
        } finally {
            router.refresh();
        }
    }

    return (
        <div>
            <Heading
                title="Image Generation"
                description="Dream of an image and we'll make it for you."
                icon={LucideImage}
                iconColor="text-teal-300"
                bgColor="bg-teal-400/10"
            />

            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                        >
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-6" >
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent text-center lg:text-left"
                                                disabled={isLoading}
                                                placeholder={images.length <= 0 ? "Ask Brainiak to create an image for you..." : "Ask Brainiak for some more..."}
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-2">
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Size" />
                                                </SelectTrigger>
                                            </FormControl>

                                            <SelectContent>
                                                {amountOptions.map((option) => (
                                                    <SelectItem value={option.value} key={option.label}> {option.label} </SelectItem>
                                                ))

                                                }
                                            </SelectContent>
                                        </Select>

                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="resolution"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-2">
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Size" />
                                                </SelectTrigger>
                                            </FormControl>

                                            <SelectContent>
                                                {resolutionOptions.map((option) => (
                                                    <SelectItem value={option.value} key={option.label}> {option.label} </SelectItem>
                                                ))

                                                }
                                            </SelectContent>
                                        </Select>

                                    </FormItem>
                                )}
                            />

                            <Button
                                className="col-span-12 lg:col-span-2 w-full"
                                disabled={isLoading}
                            >
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>

                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-20">
                            <Loader />
                        </div>
                    )}
                    {images.length === 0 && !isLoading && (
                        <Empty label="Enter a prompt to generate some images." />
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                        {images.map((src) => (
                            <Card
                                key={src}
                                className="rounded-lg overflow-hidden"
                            >
                                <div className="relative aspect-square">
                                    <Image
                                        alt="Image"
                                        fill
                                        src={src}
                                    />
                                </div>

                                <CardFooter className="p-2">
                                    <Button
                                        variant="secondary"
                                        className="w-full"
                                        onClick={() => window.open(src)}
                                    >
                                        <Download className="h-4 w-4 mr-2" />
                                        Download
                                    </Button>

                                </CardFooter>

                            </Card>
                        ))}
                    </div>
                </div>

            </div>

        </div>


    );
}

export default ImagePage