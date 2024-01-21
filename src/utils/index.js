export const formattedDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const formattedDate = new Date(dateString).toLocaleString("en-US", options);
  return formattedDate;
};
