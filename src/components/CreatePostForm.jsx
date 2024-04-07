"use client"

import Image from "next/image"
import {useFormState, useFormStatus} from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import React, {useEffect, useState} from "react";
import {Textarea} from "@/components/ui/textarea";
import {UploadButton} from "@/utils/uploadthing";
import {createPost} from "@/actions/posts";
import {cn} from "@/lib/utils";
import {useRouter} from "next/navigation";

const postFormSchema = z.object({
  title: z
    .string({required_error: "Title must not be empty."}).min(1, "Title must not be empty."),
  content: z
    .string()
})

function SubmitButton({isValid, imgUploaded}) {
  const {pending} = useFormStatus();
  const ok = isValid && imgUploaded
  return (
    <Button type='submit' disabled={!ok || pending }>
      {(pending)? "Posting..." : "Post"}
    </Button>
  )
}

export default function CreatePostForm() {
  const router = useRouter();
  const [imgUploaded, setImageUploaded] = useState(false);
  const [imgUrl, setImgUrl] = useState("https://placehold.co/500x500/png");
  const [imgName, setImgName] = useState("No file uploaded");



  // TODO
  const [state, formAction] = useFormState(createPost, {});

  const form= useForm({
    resolver: zodResolver(postFormSchema),
    mode: "onChange",
  })
  const {formState} = form;
  const {isValid} = formState;

  const onClientUploadComplete = (res) => {
    const {url, name} = res[0];
    document.getElementById("imageUrl").value = url;
    setImgUrl(url);
    setImgName(name);
    setImageUploaded(true);
  }

  const onUploadError = (error) => {
    alert(`ERROR! ${error.message}`);
  }

  const onUploadBegin = (name) => {
    // Do something once upload begins
    console.log("Uploading: ", name);
  }

  useEffect(() => {
    if (state?.message) {
      toast({
        variant: state?.success ? "default" : "destructive",
        title:  state?.message
      })
    }

    if (state.success) {
      router.push('/')
    }
  }, [state]);

  return (
      <Form {...form}>
        <form className="" action={formAction}>
          <div className="w-full flex flex-col gap-5">
            <div className='w-full flex gap-3 items-center justify-between'>
              <div className='w-[200px] h-[200px]'>
                <Image
                  src={imgUrl}
                  alt="uploadedImage"
                  width={200}
                  height={200}
                  className={cn(
                    "h-[200px] w-[200px] object-cover transition-all hover:scale-105",
                    "aspect-square"
                  )}
                />
              </div>
              <div className="flex flex-col flex-1 justify-around h-[200px]">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className='flex justify-center items-center gap-2'>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} className="max-w-md"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='flex items-center justify-center gap-6'>
                  <input hidden id='imageUrl' name='imageUrl'/>
                  <UploadButton
                    className='ut-button:text-sm ut-button:hover:cursor-pointer ut-button:bg-secondary ut-button:text-secondary-foreground ut-button:hover:bg-secondary/80 ut-label:text-sm  ut-label:text-muted-foreground'
                    endpoint="imageUploader"
                    onClientUploadComplete={onClientUploadComplete}
                    onUploadError={onUploadError}
                    onUploadBegin={onUploadBegin}
                  />
                  <div className="text-sm">{imgName}</div>
                </div>
              </div>
            </div>
            <div className='flex gap-3 items-center justify-center'>
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem className='flex justify-center items-center gap-2 flex-1'>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about this adventure!"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SubmitButton isValid={isValid} imgUploaded={imgUploaded}/>
            </div>
          </div>
        </form>
      </Form>
  )
}