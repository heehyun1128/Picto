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
      width: result?.info?.width,
      height: result?.info?.height,
      url: result?.info?.secure_url,
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
      description: "Please try again",
      duration: 5000,
      className: "error-toast",
    });
  };
  return (
    <CldUploadWidget
      uploadPreset="picto"
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
                <Image 
                  src="/assets/icons/add.svg"
                  alt="Add Image"
                  width={24}
                  height={24}
                />
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
