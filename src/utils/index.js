export const formattedDate = (dateString, options) => {
  const formattedDate = new Date(dateString).toLocaleString("en-US", options);
  return formattedDate;
};
