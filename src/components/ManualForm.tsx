"use client";

import { Controller, useFieldArray, useForm } from "react-hook-form";
import { createManual } from "@/app/actions/createManual";
import { Textarea } from "@/components/ui/textarea";
import { rewriteText } from "@/app/actions/rewriteText";
import { useEffect, useState } from "react";
import { getProject } from "@/app/actions/getProject";
import { ImageDropzone } from "@/components/ImageDropzone";
import { listText } from "@/app/actions/ListText";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";

type FormData = {
  projects: string;
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

type Props = {
  defaultValues: FormData
}

type ProjectProps = {
  id: number
  name: string
  content: string
  authorId: string
}

export default function ManualForm({defaultValues}: Props) {
  const { register, control, handleSubmit, getValues, setValue, watch } = useForm<FormData>({defaultValues});
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

  const onClickListText = async (index: number, id: string) => {
    const text = getValues()
    const ManualText = text.content.steps[index].body
    const result = await listText(ManualText)
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
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h1 className="mb-4 text-2xl font-bold">手順書作成</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-5xl space-y-6">
        <select {...register("projects")}className="w-full max-w-48 border rounded-md px-3 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Project選択</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
        <Card>
          <CardHeader>
            <CardTitle>タイトル</CardTitle>
          </CardHeader>

          <CardContent>
            <Textarea
              {...register("title")}
              placeholder="タイトル"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>目的</CardTitle>
          </CardHeader>

          <CardContent>
            <Textarea
              {...register("content.purpose")}
              placeholder="目的"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>適応範囲</CardTitle>
          </CardHeader>
                
          <CardContent>
            <Textarea
              {...register("content.applicableRange")}
              placeholder="適応範囲"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>用語一覧</CardTitle>
            <CardDescription>
              手順書で使用する用語を登録してください
            </CardDescription>
          </CardHeader>

          <CardContent>
            {termFields.map((field, index) => (
              <Card key={field.id} className="mb-4 bg-slate-50">
                <CardContent className="space-y-4 p-4">
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

                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => termRemove(index)}
                    >
                      削除
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() =>
                termAppends({
                  title: "",
                  body: "",
                })
              }
            >
              + 用語を追加
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>必要資材・道具</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {materialFields.map((field, index) => (
              <Card key={field.id} className="bg-slate-50">
                <CardContent className="space-y-4 p-4">
                  <Textarea
                    {...register(`content.materials.${index}.body`)}
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

                  <div className="flex justify-end">
                    <Button
                      variant="destructive"
                      type="button"
                      onClick={() => materialRemove(index)}
                    >
                      削除
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button
              variant="outline"
              className="w-full"
              type="button"
              onClick={() => materialAppends({ body: "" })}
            >
              + 資材を追加
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>注意事項</CardTitle>
          </CardHeader>
                  
          <CardContent className="space-y-4">
            {precautionFields.map((field, index) => (
              <Card key={field.id} className="bg-slate-50">
                <CardContent className="space-y-4 p-4">
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
        
                  <div className="flex justify-end">
                    <Button
                      variant="destructive"
                      type="button"
                      onClick={() => precautionRemove(index)}
                    >
                      削除
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        
            <Button
              variant="outline"
              className="w-full"
              type="button"
              onClick={() => precautionAppends({ body: "" })}
            >
              + 注意事項を追加
            </Button>
          </CardContent>
        </Card>
                
        
        <div>
          {stepFields.map((field, index) => {
            const id = field.id
            console.log(field.body)
            console.log(field.id)
            return (
              <Card key={id}>
                <CardHeader>
                  <CardTitle>
                    手順 {index + 1}
                  </CardTitle>
                  <CardDescription>
                    作業内容を入力してください
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <Textarea
                    {...register(`content.steps.${index}.title`)}
                    placeholder="手順タイトル"
                  />

                  <div className="grid gap-4 lg:grid-cols-[1fr_180px_1fr]">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">
                        作業内容
                      </p>

                      <Textarea
                        className="min-h-[250px]"
                        {...register(`content.steps.${index}.body`)}
                        placeholder="作業内容を入力"
                      />
                    </div>

                    <div className="flex flex-col gap-2 justify-center">
                      <Button
                        type="button"
                        onClick={() => onClickRewriteText(index, id)}
                      >
                        文章修正
                      </Button>

                      <Button
                        variant="secondary"
                        type="button"
                        onClick={() => onClickListText(index, id)}
                      >
                        箇条書き
                      </Button>

                      <Button
                        variant="outline"
                        type="button"
                        onClick={() => onClickMoveText(index, id)}
                      >
                        反映
                      </Button>

                      <Button
                        variant="destructive"
                        type="button"
                        onClick={() => stepRemove(index)}
                      >
                        削除
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">
                        AI提案
                      </p>

                      <Textarea
                        className="min-h-[250px]"
                        value={text[id] ?? ""}
                        readOnly
                      />
                    </div>
                  </div>

                  <Card className="bg-slate-50">
                    <CardContent className="p-4">
                      <p className="mb-2 text-sm font-medium">
                        作業画像
                      </p>

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
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            )
          })}

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => stepAppends({ title: "", body: "" })}
          >
            + 手順を追加
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="published"
            checked={watch("published")}
            onCheckedChange={(checked) =>
              setValue("published", !!checked)
            }
          />
        
          <label
            htmlFor="published"
            className="text-sm font-medium"
          >
            この手順書を公開する
          </label>
        </div>
        
        <div className="sticky bottom-0 border-t bg-white p-4">
          <Button
            size="lg"
            className="w-full text-lg"
            type="submit"
          >
            保存
          </Button>
        </div>
      </form>
    </div>
  );
}
