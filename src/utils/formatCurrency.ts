export const formatVND = (value: number | string) => {
  if (value === "" || value === null || value === undefined) return "";
  const num =
    typeof value === "string" ? Number(value.replace(/\D/g, "")) : value;
  if (isNaN(num)) return "";
  return num.toLocaleString("vi-VN");
};
