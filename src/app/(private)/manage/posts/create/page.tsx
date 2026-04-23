import ManualForm from "@/components/ManualForm";

type FormData = {
  Project: string;
  title: string;
  content: {
    purpose: string;
    applicableRange: string;
    term: {
      title: string;
      body: string;
      image?: File[];
      image_path?: string;
    }[];
    materials: {
      body: string;
      image?: File[];
      image_path?: string;
    }[];
    precaution: {
      body: string;
      image?: File[];
      image_path?: string;
    }[];
    steps: {
      title: string;
      body: string;
      image?: File[];
      image_path?: string;
    }[];
  };
  published: boolean;
};

export default function CreateManualForm () {

  const defaultValues: FormData = {
    Project: "",
    title: "",
    content: {
      purpose: "",
      applicableRange: "",
      term: [
        {
          title: "",
          body: "",
          image: undefined,
          image_path: "",
        },
      ],
      materials: [
        {
          body: "",
          image: undefined,
          image_path: "",
        },
      ],
      precaution: [
        {
          body: "",
          image: undefined,
          image_path: "",
        },
      ],
      steps: [
        {
          title: "",
          body: "",
          image: undefined,
          image_path: "",
        },
      ],
    },
    published: false,
  };
  
  return <ManualForm defaultValues={defaultValues}/>
}