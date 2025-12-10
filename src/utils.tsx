export const formatNumber = (value: number | string) => {
  const num = Number(value);
  if (Number.isNaN(num)) return "";
  return new Intl.NumberFormat("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};
