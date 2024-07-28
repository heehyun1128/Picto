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
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="border-slate-500 border rounded-lg w-full p-5 px-4 md:px-6 focus-within:shadow-sm "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6 mb-1">
                    <FormControl className="m-0 p-0">
                      <Input
                        disabled={isLoading}
                        placeholder="Start Image Generation Here..."
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent p-2"
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
              <Button
                disabled={isLoading}
                className="col-span-12 lg:col-span-2 bg-slate-500"
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 flex items-center w-full justify-center bg-muted">
              loading...
            </div>
          )}
        
      
          <div>
            {images.map((src) => (
              <Card key={src} className="rounded-lg overflow-hidden">
                <div className="relative aspect-square">
                  <Image src={src} fill alt="Image" />
                </div>
                <CardFooter className="p-2">
                  <Button variant="secondary" className="w-full" onClick={()=>window.open(src)}>
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
};

export default ImagePage;
