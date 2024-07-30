"use client";
import React from "react";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { useToast } from "../ui/use-toast";
import { dataUrl, getImageSize } from "@/lib/utils";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

type ImageUploaderProps = {
  onValueChange: (value: string) => void;
  setImage: React.Dispatch<any>;
  publicId: string;
  image: any;
  type: string;
};

const ImageUploader = ({
  onValueChange,
  setImage,
  image,
  publicId,
  type,
}: ImageUploaderProps) => {
  const { toast } = useToast();
  const onSuccessUpload = (result: any) => {

    setImage((prevState: any) => ({
      ...prevState,
      publicId: result?.info?.public_id,
      url: result?.info?.secure_url,
      width: result?.info?.width,
      height: result?.info?.height,
    }));

    onValueChange(result?.info?.public_id);

    toast({
      title: "Successfully Uploaded an Image!",
      description: "",
      duration: 5000,
      className: "success-toast",
    });
  };
  const onError = () => {
    toast({
      title: "Image failed to upload",
      description: "Please try again later",
      duration: 5000,
      className: "error-toast",
    });
  };
  return (
    <CldUploadWidget
      uploadPreset="picto_project"
      options={{
        multiple: false,
        resourceType: "image",
      }}
      onSuccess={onSuccessUpload}
      onError={onError}
    >
      {({ open }) => (
        <div className="flex flex-col gap-4">
          <h3 className="h3-bold text-dark-600">
            Original
          </h3>

          {publicId ? (
            <>
              <div className="cursor-pointer overflow-hidden rounded-[10px]">
                <CldImage 
                  width={getImageSize(type, image, "width")}
                  height={getImageSize(type, image, "height")}
                  src={publicId}
                  alt="image"
                  sizes={"(max-width: 767px) 100vw, 50vw"}
                  placeholder={dataUrl as PlaceholderValue}
                  className="media-uploader_cldImage"
                />
              </div>
            </>
          ): (
            <div className="media-uploader_cta" onClick={() => open()}>
              <div className="media-uploader_cta-image">
              <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
              </div>
                <p className="p-14-medium">upload image</p>
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  )
};

export default ImageUploader;
