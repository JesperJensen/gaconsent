export const htmlHelper = (options: any, str: string) => {
  const html = Object.entries(options).reduce((acc, curr) => {
    const re = new RegExp(`__${curr[0]}__`, "g");
    const rep = curr[1] as string;
    return acc.replace(re, rep);
  }, str);
  return html;
};
