export const formatDate = (dateString: string): string => {
  const [year, month, day] = dateString.split('-');
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });
};
