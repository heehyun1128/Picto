"use client";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Download, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { amountOptions, formSchema, resolutionOptions } from "./constants";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { cn } from "@/lib/utils";

import {
  ChatCompletionMessageParam,
  ChatCompletionContentPart,
  ChatCompletionContentPartText,
} from "openai/resources/chat/completions";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";

const ImagePage = () => {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]);
      //   Call the api and get a response
      const res = await axios.post("/api/image", values);
      const urls = res.data.map((image: { url: string }) => image.url);
      setImages(urls);
      form.reset();
    } catch (error: any) {
    } finally {
      router.refresh();
    }
  };

  const renderPart = (part: ChatCompletionContentPart): React.ReactNode => {
    if (part.type == "text") {
      return <span>{part.text}</span>;
    } else {
      return null;
    }
  };

  const renderContent = (
    content: string | ChatCompletionContentPart[] | null | undefined
  ): React.ReactNode => {
    if (typeof content === "string") {
      return <span>{content}</span>;
    } else if (Array.isArray(content)) {
      // Handle array content
      return content.map((part, partIndex) => (
        <span key={partIndex}>{renderPart(part)}</span>
      ));
    } else {
      return null; // Handle other types or null/undefined
    }
  };

  return (
    // add header for chat page
    <div>
      {/* form/input fields */}
      <div className="px-4 lg:px-8">
        <div className="flex justify-center mb-10">
          <h1 className="text-4xl">Picto AI Image Generator</h1>
        </div>
        <div style={{height:"75vh"}}  className="flex justify-between align-middle">
          {/* <div> */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="border-slate-500 border rounded-lg w-full p-5 px-4 md:px-6 focus-within:shadow-sm "
            >
              <p className="font-semibold text-xl mb-3 mt-5">Image Information</p>
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6 mb-1">
                    <FormControl className="m-0 p-0">
                      <Input
                        disabled={isLoading}
                        placeholder="Describe the image to generate..."
                        className="border-dotted  focus-visible:ring-0 focus-visible:ring-transparent p-2"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <p className="font-semibold text-xl mb-3 mt-5">Select Number of Pictures</p>
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2 mb-1">
                    <Select
                      disabled={isLoading}
                      value={field.value}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {amountOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <div>
                <p className="font-semibold text-xl mb-3 mt-5">Resolution</p>
                <FormField
                  control={form.control}
                  name="resolution"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-2 mb-1">
                      <Select
                        disabled={isLoading}
                        value={field.value}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue defaultValue={field.value} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {resolutionOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <Button style={{backgroundColor:"#4EF4D8"}} disabled={isLoading} className=" w-full  mt-5">
                Generate
              </Button>
            </form>
          </Form>
          {/* </div> */}
          <div className="ml-6">
            {isLoading && (
              <div className="flex items-center w-full justify-center fixed top-0 left-0 right-0 bottom-0 z-50">
                loading...
              </div>
            )}

            <div className="min-w-60 h-full">
              {images.length ? (
                images.map((src) => (
                  <Card
                    key={src}
                    className="rounded-lg overflow-hidden w-full mb-4"
                  >
                    <div className="relative aspect-square">
                      <Image src={src} fill alt="Image" />
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
                ))
              ) : (
                <div style={{border:"1px dotted #4EF4D8", borderRadius:"1rem", minWidth:"40vw"}} className="w-full h-full border-dotted border-2  flex items-center justify-center">
                  <span>No images available</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePage;
