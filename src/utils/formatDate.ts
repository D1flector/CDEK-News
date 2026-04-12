export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const datePart = date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  });

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${datePart} ${hours}:${minutes}`;
};

export const formatMonthYear = (date: Date): string => {
  const month = date.toLocaleDateString("ru-RU", { month: "long" });
  const year = date.getFullYear();

  return `${month.charAt(0).toUpperCase() + month.slice(1)}, ${year}`;
};
