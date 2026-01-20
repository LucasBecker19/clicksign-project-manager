'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import DateInput from './DateInput';
import Button from './Button';
import ImageUpload from './ImageUpload';
import FormField from './FormField';
import useProjectStore from '@/store/projectStore';
import { Project } from '@/types/project';
import { readFileAsDataURL } from '@/utils/file';

export const projectFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Por favor, digite ao menos duas palavras')
    .refine((value) => value.trim().split(/\s+/).length >= 2, {
      message: 'Por favor, digite ao menos duas palavras',
    }),
  client: z.string().trim().min(1, 'Por favor, digite ao menos uma palavra'),
  startDate: z.string().min(1, 'Selecione uma data válida'),
  endDate: z.string().min(1, 'Selecione uma data válida'),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

interface ProjectFormProps {
  initialProject?: Project;
  isEditMode?: boolean;
}

export default function ProjectForm({ initialProject, isEditMode = false }: ProjectFormProps) {
  const router = useRouter();
  const addProject = useProjectStore((state) => state.addProject);
  const updateProject = useProjectStore((state) => state.updateProject);

  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [imageRemoved, setImageRemoved] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      name: initialProject?.name ?? '',
      client: initialProject?.client ?? '',
      startDate: initialProject?.startDate ?? '',
      endDate: initialProject?.endDate ?? '',
    },
  });

  const handleImageChange = (file: File | null) => {
    setCoverImage(file);
    setImageRemoved(file === null);
  };

  const onSubmit = async (values: ProjectFormValues) => {
    const saveProject = (imageData?: string) => {
      if (isEditMode && initialProject) {
        updateProject({
          id: initialProject.id,
          name: values.name,
          client: values.client,
          startDate: values.startDate,
          endDate: values.endDate,
          coverImage: imageRemoved ? undefined : imageData ?? initialProject.coverImage,
        });
      } else {
        addProject({
          name: values.name,
          client: values.client,
          startDate: values.startDate,
          endDate: values.endDate,
          coverImage: imageData,
        });
      }
      router.push('/');
    };

    if (coverImage) {
      const imageData = await readFileAsDataURL(coverImage);
      saveProject(imageData);
    } else {
      saveProject();
    }
  };

  return (
    <div className="border border-line-darker rounded-lg mx-4 md:mx-auto">
      <form className="w-full max-w-[700px] m-auto py-[52px] px-4 md:px-0 gap-8 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <FormField label="Nome do projeto" error={errors.name} required>
          <input
            id="name"
            type="text"
            {...register('name')}
            className={`mt-1 border rounded-lg w-full h-[40px] bg-white p-2 ${
              errors.name ? 'border-[var(--color-error-strong)]' : 'border-description'
            }`}
            autoComplete="off"
            required
          />
        </FormField>

        <FormField label="Cliente" error={errors.client} required>
          <input
            id="client"
            type="text"
            {...register('client')}
            className={`mt-1 border rounded-lg w-full h-[40px] bg-white p-2 ${
              errors.client ? 'border-[var(--color-error-strong)]' : 'border-description'
            }`}
            autoComplete="off"
            required
          />
        </FormField>

        <div className="flex flex-col md:flex-row items-center gap-10">
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <DateInput
                id="start-date"
                label="Data de Início"
                iconSrc={errors.startDate ? "/images/red-calendar-day-light.svg" : "/images/calendar-day-light.svg"}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                required
                hasError={!!errors.startDate}
                errorMessage={errors.startDate?.message}
              />
            )}
          />
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <DateInput
                id="end-date"
                label="Data Final"
                iconSrc={errors.endDate ? "/images/red-calendar-check-light.svg" : "/images/calendar-check-light.svg"}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                required
                hasError={!!errors.endDate}
                errorMessage={errors.endDate?.message}
              />
            )}
          />
        </div>

        <div className="form-group">
          <div className="flex gap-2 items-center">
            <span className="form-title">Capa do projeto</span>
          </div>
          <ImageUpload onImageChange={handleImageChange} initialImage={initialProject?.coverImage} />
        </div>

        <div className="form-group">
          <Button
            variant="regular"
            size="large"
            title="Salvar projeto"
            type="submit"
            wfull={true}
            disabled={!isValid || isSubmitting}
          />
        </div>
      </form>
    </div>
  );
}