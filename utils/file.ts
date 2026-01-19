const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png'];

export function isValidImageFile(file: File | null | undefined): file is File {
  return !!file && ALLOWED_IMAGE_TYPES.includes(file.type);
}

export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        resolve(result);
      } else {
        reject(new Error('Erro ao ler o arquivo como base64'));
      }
    };

    reader.onerror = () => reject(new Error('Erro ao ler o arquivo'));
    reader.readAsDataURL(file);
  });
}
