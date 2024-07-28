export const navLinks = [
    {
      label: "Home",
      route: "/",
      icon: "/assets/icons/home.svg",
    },
   
    {
      label: "Generate Image",
      route: "/image",
      icon: "/assets/icons/stars.svg",
    },
   
    // {
    //   label: "Profile",
    //   route: "/profile",
    //   icon: "/assets/icons/profile.svg",
    // },
    {
      label: "Upgrade Plan",
      route: "/credits",
      icon: "/assets/icons/bag.svg",
    },
  ];
  
  export const plans = [
    {
      _id: 1,
      name: "Free",
     
      price: 0,
      credits: 10,
      inclusions: [
        {
          label: "10 Free Credits",
          isIncluded: true,
        },
        {
          label: "Limit Access to Services",
          isIncluded: true,
        },
        {
          label: "Timely Customer Support",
          isIncluded: false,
        },
     
      ],
    },
    {
      _id: 2,
      name: "Pro Plan",
     
      price: 39,
      credits: 150,
      inclusions: [
        {
          label: "150 Credits",
          isIncluded: true,
        },
        {
          label: "Access to Services",
          isIncluded: true,
        },
        {
          label: "Timely Customer Support",
          isIncluded: true,
        },
        {
          label: "...and much more",
          isIncluded: true,
        },
       
      ],
    },
  
  ];
  
  export const transformationTypes = {
    restore: {
      type: "restore",
      title: "Restore Image",
      subTitle: "Refine images by removing noise and imperfections",
      config: { restore: true },
      icon: "image.svg",
    },
    removeBackground: {
      type: "removeBackground",
      title: "Background Remove",
      subTitle: "Removes the background of the image using AI",
      config: { removeBackground: true },
      icon: "camera.svg",
    },
    fill: {
      type: "fill",
      title: "Generative Fill",
      subTitle: "Enhance an image's dimensions using AI outpainting",
      config: { fillBackground: true },
      icon: "stars.svg",
    },
    remove: {
      type: "remove",
      title: "Object Remove",
      subTitle: "Identify and eliminate objects from images",
      config: {
        remove: { prompt: "", removeShadow: true, multiple: true },
      },
      icon: "scan.svg",
    },
    recolor: {
      type: "recolor",
      title: "Object Recolor",
      subTitle: "Identify and recolor objects from the image",
      config: {
        recolor: { prompt: "", to: "", multiple: true },
      },
      icon: "filter.svg",
    },
  };
  
  export const aspectRatioOptions = {
    "1:1": {
      aspectRatio: "1:1",
      label: "Square (1:1)",
      width: 1000,
      height: 1000,
    },
    "3:4": {
      aspectRatio: "3:4",
      label: "Standard Portrait (3:4)",
      width: 1000,
      height: 1334,
    },
    "9:16": {
      aspectRatio: "9:16",
      label: "Phone Portrait (9:16)",
      width: 1000,
      height: 1778,
    },
  };
  
  export const defaultValues = {
    title: "",
    aspectRatio: "",
    color: "",
    prompt: "",
    publicId: "",
  };
  
  export const creditFee = -1;