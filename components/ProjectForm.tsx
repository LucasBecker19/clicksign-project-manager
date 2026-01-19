
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DateInput from './DateInput';
import Button from './Button';
import ImageUpload from './ImageUpload';
import useProjectStore from '@/store/projectStore';

interface Errors {
  projectName?: string;
  client?: string;
  startDate?: string;
  endDate?: string;
}

export default function ProjectForm() {
  const router = useRouter();
  const addProject = useProjectStore((state) => state.addProject);
  
  const [projectName, setProjectName] = useState('');
  const [client, setClient] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState({
    projectName: false,
    client: false,
    startDate: false,
    endDate: false
  });

  const validateField = (fieldName: keyof Errors, value: string) => {
    switch (fieldName) {
      case 'projectName':
        if (!value.trim()) {
          return 'Por favor, digite ao menos duas palavras';
        } else if (value.trim().split(/\s+/).length < 2) {
          return 'Por favor, digite ao menos duas palavras';
        }
        return undefined;
      
      case 'client':
        if (!value.trim()) {
          return 'Por favor, digite ao menos uma palavra';
        }
        return undefined;
      
      case 'startDate':
      case 'endDate':
        if (!value) {
          return 'Selecione uma data válida';
        }
        return undefined;
      
      default:
        return undefined;
    }
  };

  const isFormValid = () => {
    return (
      projectName.trim() !== '' &&
      projectName.trim().split(/\s+/).length >= 2 &&
      client.trim() !== '' &&
      startDate !== '' &&
      endDate !== ''
    );
  };

  const handleProjectNameBlur = () => {
    setTouched(prev => ({ ...prev, projectName: true }));
    const error = validateField('projectName', projectName);
    setErrors(prev => ({
      ...prev,
      projectName: error
    }));
  };

  const handleClientBlur = () => {
    setTouched(prev => ({ ...prev, client: true }));
    const error = validateField('client', client);
    setErrors(prev => ({
      ...prev,
      client: error
    }));
  };

  const handleStartDateBlur = () => {
    setTouched(prev => ({ ...prev, startDate: true }));
    const error = validateField('startDate', startDate);
    setErrors(prev => ({
      ...prev,
      startDate: error
    }));
  };

  const handleEndDateBlur = () => {
    setTouched(prev => ({ ...prev, endDate: true }));
    const error = validateField('endDate', endDate);
    setErrors(prev => ({
      ...prev,
      endDate: error
    }));
  };

  const handleSaveProject = () => {
    if (isFormValid()) {
      const saveProject = (imageData?: string) => {
        addProject({
          name: projectName,
          client: client,
          startDate: startDate,
          endDate: endDate,
          coverImage: imageData
        });
        router.push('/');
      };

      if (coverImage) {
        const reader = new FileReader();
        reader.onloadend = () => saveProject(reader.result as string);
        reader.readAsDataURL(coverImage);
      } else {
        saveProject();
      }
    }
  };

  const isButtonDisabled = !isFormValid();

  return (
    <div className="border border-line-darker rounded-lg">
        <div className="w-[700px] m-auto py-[52px] gap-8 flex flex-col">
            <div className="form-group">
                <div className="flex gap-2 items-center">
                    <span className={`font-medium text-lg leading-[22px] align-bottom ${touched.projectName && errors.projectName ? 'text-[#9F0000]' : 'text-accent'}`}>
                      Nome do projeto
                    </span>
                    <span className="form-required-label">(Obrigatório)</span>
                </div>

                <input 
                    id="name"
                    type="text" 
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    onBlur={handleProjectNameBlur}
                    className={`mt-1 border rounded-lg w-full h-[40px] bg-white p-2 ${
                      touched.projectName && errors.projectName ? 'border-[#C40000]' : 'border-description'
                    }`}
                    autoComplete="off"
                    required
                />
                {touched.projectName && errors.projectName && (
                  <p className="mt-1 text-sm text-[#C40000] font-normal leading-[22px]">
                    {errors.projectName}
                  </p>
                )}
            </div>

            <div className="form-group">
                <div className="flex gap-2 items-center">
                    <span className={`font-medium text-lg leading-[22px] align-bottom ${touched.client && errors.client ? 'text-[#9F0000]' : 'text-accent'}`}>
                      Cliente
                    </span>
                    <span className="form-required-label">(Obrigatório)</span>
                </div>

                <input 
                    id="client"
                    type="text" 
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    onBlur={handleClientBlur}
                    className={`mt-1 border rounded-lg w-full h-[40px] bg-white p-2 ${
                      touched.client && errors.client ? 'border-[#C40000]' : 'border-description'
                    }`}
                    autoComplete="off"
                    required
                />
                {touched.client && errors.client && (
                  <p className="mt-1 text-sm text-[#C40000] font-normal leading-[22px]">
                    {errors.client}
                  </p>
                )}
            </div>

            <div className="flex items-center gap-10">
                <DateInput
                    id="start-date"
                    label="Data de Início"
                    iconSrc="/images/calendar-day-light.svg"
                    value={startDate}
                    onChange={setStartDate}
                    onBlur={handleStartDateBlur}
                    required
                    hasError={touched.startDate && !!errors.startDate}
                    errorMessage={errors.startDate}
                />
                <DateInput
                    id="end-date"
                    label="Data Final"
                    iconSrc="/images/calendar-check-light.svg"
                    value={endDate}
                    onChange={setEndDate}
                    onBlur={handleEndDateBlur}
                    required
                    hasError={touched.endDate && !!errors.endDate}
                    errorMessage={errors.endDate}
                />
            </div>

            <div className="form-group">
                <div className="flex gap-2 items-center">
                    <span className="form-title">Capa do projeto</span>
                </div>
                <ImageUpload 
                    onImageChange={setCoverImage}
                />
            </div>

            <div className="form-group">
                <Button 
                    variant='regular'
                    size='large'
                    title="Salvar projeto"
                    action={handleSaveProject}
                    wfull={true}
                    disabled={isButtonDisabled}
                />
            </div>
        </div>
    </div>
  );
}