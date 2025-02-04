const getIdFromUrl = (url: string): string => {
  const urlList = url.split('/').filter((element: string) => element.length > 0);
  return urlList.pop() as string;
};

export default getIdFromUrl;