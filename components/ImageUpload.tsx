'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from './Button';
import { isValidImageFile, readFileAsDataURL } from '@/utils/file';

type ImageUploadProps = {
  onImageChange?: (file: File | null) => void;
  initialImage?: string;
};

export default function ImageUpload({ onImageChange, initialImage }: ImageUploadProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(initialImage || null);
  const [isDragging, setIsDragging] = useState(false);

  const updatePreview = async (file: File) => {
    try {
      const dataUrl = await readFileAsDataURL(file);
      setImagePreview(dataUrl);
      onImageChange?.(file);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (isValidImageFile(file)) {
      updatePreview(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (isValidImageFile(file)) {
      updatePreview(file);
    }
  };

  const handleSelectClick = () => {
    document.getElementById('image-upload')?.click();
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    const input = document.getElementById('image-upload') as HTMLInputElement;
    if (input) input.value = '';
    onImageChange?.(null);
  };

  return (
    <>
      <input
        id="image-upload"
        type="file"
        accept="image/jpeg,image/png"
        onChange={handleFileChange}
        className="hidden"
      />

      {imagePreview ? (
        <div className="mt-1 relative">
          <Image
            src={imagePreview}
            alt="Preview"
            className="w-full h-auto rounded border border-line-darker"
            width={0}
            height={0}
          />
          <div
            className="absolute top-6 right-6 flex justify-center items-center rounded-full bg-white w-8 h-8 shadow-[var(--shadow-strong)] cursor-pointer hover-zoom"
            onClick={handleRemoveImage}
          >
            <Image src="/images/trash.svg" alt="Remover" width={20} height={20} />
          </div>
        </div>
      ) : (
        <div
          className={`mt-1 rounded border border-dashed py-6 text-center gap-4 flex flex-col cursor-pointer transition-colors ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-description'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleSelectClick}
        >
          <Image src="/images/upload-light.svg" alt="upload icon" width={24} height={24} className="m-auto flex" />
          <span className="font-normal text-base leading-[22px] text-center text-description">
            Escolha uma imagem .jpg ou .png no seu dispositivo
          </span>
          <div className="w-[126px] m-auto flex" onClick={(e) => e.stopPropagation()}>
            <Button
              variant="outline"
              size="medium"
              title="Selecionar"
              action={handleSelectClick}
            />
          </div>
        </div>
      )}
    </>
  );
}
