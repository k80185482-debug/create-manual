"use client";

import { useDropzone } from "react-dropzone";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

type Props = {
  value?: File[];
  onChange: (files: File[]) => void;
};

export function ImageDropzone({ value, onChange }: Props) {
  const onDrop = (imageFiles: File[]) => {
    if (imageFiles.length === 0) return;
    onChange(imageFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/*": [],
    },
  });

  const file = value?.[0];

  return (
    <div className="space-y-2">
      <Card
        {...getRootProps()}
        className="p-6 border-dashed cursor-pointer text-center"
      >
        <input {...getInputProps()} />

        {isDragActive ? (
          <p>ここにドロップ</p>
        ) : (
          <p>クリック or ドラッグで画像アップロード</p>
        )}
      </Card>

      {file && (
        <div className="relative w-fit">
          <img
            src={URL.createObjectURL(file)}
            alt="preview"
            className="h-32 rounded object-cover"
          />

          <button
            type="button"
            onClick={() => onChange([])}
            className="absolute top-1 right-1 bg-black text-white rounded-full p-1"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
