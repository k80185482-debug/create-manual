"use client";

import { useForm, useFieldArray } from "react-hook-form";

const defaultValues = {
  title: "",
  content: {
    purpose: "",
    applicableRange: "",
    term: "",
    materials: "",
    precaution: "",
    steps: [{ title: "", body: "" }],
  },
  published: false,
};


type FormData = typeof defaultValues;

export default function ManualForm() {
  const { register, control, handleSubmit } = useForm<FormData>({
    defaultValues,
  });

  const {
    fields: stepFields,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({
    control,
    name: "content.steps",
  });

  const onSubmit = (data: FormData) => {
    console.log(JSON.stringify(data, null, 2));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container mx-auto flex flex-col items-center">
      <input
        className="bg-blue-200 w-4/6 my-10"
        placeholder="タイトル"
        {...register("title")}
      />

      <textarea
        className="bg-blue-200 w-4/6 my-10"
        placeholder="目的"
        {...register("content.purpose")}
      />
  
      <textarea
        className="bg-blue-200 w-4/6 my-10"
        placeholder="適用範囲"
        {...register("content.applicableRange")}
      />

      <textarea
        className="bg-blue-200 w-4/6 my-10"
        placeholder="用語の定義"
        {...register("content.term")}
      />

      <textarea
        className="bg-blue-200 w-4/6 my-10"
        placeholder="必要な資材・工具"
        {...register("content.materials")}
      />

      <textarea
        className="bg-blue-200 w-4/6 my-10"
        placeholder="注意事項"
        {...register("content.precaution")}
      />

      <h3>手順</h3>
      {stepFields.map((field, index) => (
        <div key={field.id} className="flex justify-between w-4/6">
          <div className="flex flex-col w-5/6">
            <input
              className="bg-blue-200 my-5"
              placeholder="手順タイトル"
              {...register(`content.steps.${index}.title`)}
            />
            <textarea
              className="bg-blue-200 my-5"
              placeholder="手順内容"
              {...register(`content.steps.${index}.body`)}
            />
          </div>
          <div>
            <button
              className="py-1 px-2 bg-sky-500 rounded-2xl text-white font-black"
              type="button"
              onClick={() => removeStep(index)}
            >
              削除
            </button>
            <button
              className="py-1 px-2 bg-sky-500 rounded-2xl text-white font-black"
              type="button"
              onClick={() => removeStep(index)}
            >
              AI修正
            </button>
          </div>
          <div className="flex flex-col w-5/6">
            <input
              className="bg-blue-200 my-5"
              placeholder="手順タイトル(修正版)"
              
            />
            <textarea
              className="bg-blue-200 my-5"
              placeholder="手順内容(修正版)"
              
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => appendStep({ title: "", body: "" })}
      >
        手順を追加
      </button>

      <label>
        <input
          type="checkbox"
          {...register("published")}
        />
        公開する
      </label>

      <button type="submit">作成</button>
    </form>
  );
}
