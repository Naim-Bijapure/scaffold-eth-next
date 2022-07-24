export const Sleep = async (time: number): Promise<any> =>
  new Promise((resolve, reject) => setTimeout(() => resolve(true), time));
