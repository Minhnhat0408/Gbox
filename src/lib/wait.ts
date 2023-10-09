export const wait = async (time: number) => {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve(2000);
    }, time);
  });
  return await promise;
};
