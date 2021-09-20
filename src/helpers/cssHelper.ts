export const cssHelper = (options: any, str: string) => {
  return Object.entries(options.styles).reduce((acc, curr) => {
    const re = new RegExp(`__${curr[0]}__`, "g");
    const rep = curr[1] as string;
    return acc.replace(re, rep);
  }, str);
};
