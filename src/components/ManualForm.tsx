"use client";

import { Controller, useFieldArray, useForm } from "react-hook-form";
import { createManual } from "@/app/actions/createManual";
import { Textarea } from "@/components/ui/textarea";
import { rewriteText } from "@/app/actions/rewriteText";
import { useEffect, useState } from "react";
import { getProject } from "@/app/actions/getProject";
import { ImageDropzone } from "@/components/ImageDropzone";

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

type ProjectProps = {
  id: number
  name: string
  content: string
  authorId: string
}

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


export default function ManualForm() {
  const { register, control, handleSubmit, getValues, setValue } = useForm<FormData>({defaultValues});
  const {
    fields: stepFields,
    append: stepAppends,
    remove: stepRemove
  } = useFieldArray({
    control,
    name: "content.steps",
  });
  const {
    fields: termFields,
    append: termAppends,
    remove: termRemove
  } = useFieldArray({
    control,
    name: "content.term",
  });
  const {
    fields: materialFields,
    append: materialAppends,
    remove: materialRemove
  } = useFieldArray({
    control,
    name: "content.materials",
  });
  const {
    fields: precautionFields,
    append: precautionAppends,
    remove: precautionRemove
  } = useFieldArray({
    control,
    name: "content.precaution",
  });
  const [text, setText] = useState<Record<string, string>>({})
  const [projects, setProjects] = useState<ProjectProps[]>([])

  useEffect(() => {
    const load = async () => {
      const data = await getProject()
      setProjects(data)
    }

    load()
  }, [])


  const onSubmit = async (data: FormData) => {
    await createManual(data);
  };

  const onClickRewriteText = async (index: number, id: string) => {
    const text = getValues()
    const ManualText = text.content.steps[index].body
    const result = await rewriteText(ManualText)
    setText(prev => ({
      ...prev,
      [id]: result ?? ""
    }))
  }

  const onClickMoveText = (index: number, id: string) => {
    const value = text[id]
    setValue(`content.steps.${index}.body`, value, {shouldDirty: true, shouldTouch: true, shouldValidate: true})
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <select {...register("Project")}className="w-full max-w-48 border rounded-md px-3 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="">Project選択</option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>
      <Textarea {...register("title")} placeholder="タイトル"/>
      <Textarea {...register("content.purpose")} placeholder="目的"/>
      <Textarea {...register("content.applicableRange")} placeholder="適応範囲"/>
      <div>
        {termFields.map((field, index) => (
          <div key={field.id}>
            <Textarea {...register(`content.term.${index}.title`)} placeholder="用語"/>
            <Textarea {...register(`content.term.${index}.body`)} placeholder="用語の意味"/>
            <Controller
              name={`content.term.${index}.image`}
              control={control}
              render={({ field }) => (
                <ImageDropzone
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <button type="button" onClick={() => termRemove(index)}>削除</button>
          </div>
        ))}
        <button type="button" onClick={() => termAppends({ title: "", body: "" })}>追加</button>
      </div>
      <div>
        {materialFields.map((field, index) => (
          <div key={field.id}>
            <Textarea
              {...register(`content.term.${index}.body`)}
              placeholder="必要な資材・道具"
            />
            <Controller
              name={`content.materials.${index}.image`}
              control={control}
              render={({ field }) => (
                <ImageDropzone
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <button type="button" onClick={() => materialRemove(index)}>削除</button>
          </div>
        ))}
        <button type="button" onClick={() => materialAppends({ body: "" })}>追加</button>
      </div>
      <div>
        {precautionFields.map((field, index) => (
          <div key={field.id}>
            <Textarea
              {...register(`content.precaution.${index}.body`)}
              placeholder="注意事項"
            />
            <Controller
              name={`content.precaution.${index}.image`}
              control={control}
              render={({ field }) => (
                <ImageDropzone
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <button type="button" onClick={() => precautionRemove(index)}>削除</button>
          </div>
        ))}
        <button type="button" onClick={() => precautionAppends({ body: "" })}>追加</button>
      </div>
      
      
      <div>
        {stepFields.map((field, index) => {
          const id = field.id
          console.log(field.body)
          console.log(field.id)
          return (
          <div key={id}>
            <Textarea {...register(`content.steps.${index}.title`)} />
            <div className="flex">
              <Textarea {...register(`content.steps.${index}.body`)} />
              <div className="flex flex-col ">
                <button type="button" onClick={() => onClickRewriteText(index, id)}>
                  文章修正
                </button>
                <button type="button" onClick={() => onClickMoveText(index, id)}>
                  文章移動
                </button>
                <button type="button" onClick={() => stepRemove(index)}>
                  削除
                </button>
              </div>
              <Textarea value={text[id] ?? ""} readOnly/>
              <Controller
                name={`content.steps.${index}.image`}
                control={control}
                render={({ field }) => (
                  <ImageDropzone
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>
          )
        })}

        <button
          type="button"
          onClick={() => stepAppends({ title: "", body: "" })}
        >
          追加
        </button>
      </div>
      <label>
        <input
          type="checkbox"
          {...register("published")}
        />
      </label>
      
      <button type="submit">保存</button>
    </form>
  );
}
