export const scriptHelper = (gaId: string, options: any, str: string) => {
    const script = str.replace(/__gaId__/g, gaId)
    return Object.entries(options.actions).reduce((acc, curr) => {
        const re = new RegExp(`__${curr[0]}__`, "g");
        const rep = `(${curr[1]})`;
        return acc.replace(re, rep);
    }, script);
}
