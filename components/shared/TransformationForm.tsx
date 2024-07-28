"use client"

import Header from "@/components/shared/Header"
import { transformationTypes, defaultValues } from '@/constants'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CustomField } from "./CustomField"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type TransformationType = keyof typeof transformationTypes;

interface TransformationFormProps {
  action: string;
  data: any | null;
  userId: string;
  type: TransformationType;
  creditBalance: number;
}

export const formSchema = z.object({
  title: z.string(),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string(),
})

const TransformationForm = ({ action, data = null, userId, type, creditBalance }: TransformationFormProps) => {
  const transformationType = transformationTypes[type];
  const [image, setImage] = useState(data);
  const [newTransformation, setNewTransformation] = useState<TransformationType | null>(null);

  const initialValues = data && action === 'Update' ? {
    title: data?.title,
    aspectRatio: data?.aspectRatio,
    color: data?.color,
    prompt: data?.prompt,
    publicId: data?.publicId,
  } : defaultValues

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  const onSelectFieldHandler = (value: string, onChangeField: (value: string) => void) => {
    onChangeField(value);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CustomField
            control={form.control}
            name="title"
            formLabel="Image Title"
            className="w-full"
            render={({ field }) => <Input {...field} className="input-field" />}
          />
          {type === 'fill' && (
            <CustomField
              control={form.control}
              name="aspectRatio"
              formLabel="Aspect Ratio"
              className="w-full"
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select aspect ratio" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(aspectRatioOptions).map
                    ((key) => (
                      <SelectItem key={key} value={key} className="select-item">{aspectRationOptions[key as AspectRatioKey].label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          )}
          {(type === 'remove' || type === 'recolor') && (<div className="prompt-field">
            <CustomField
              control={form.control}
              name="prompt"
              formLabel="prompt"
              className="w-full"
              render={({ field }) => <Input {...field} className="input-field" />}
            />
          </div>)}
        </form>
      </Form>
    </div>
  )
}

export default TransformationForm;