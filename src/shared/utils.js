export const getURLParams = (url) => {
  const temp = location.pathname.split("/");
  const type = temp[1];
  const id = temp[2];
  return { type, id };
};
