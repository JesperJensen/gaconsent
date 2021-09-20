import { cookieTypes } from "../defaults";
import { htmlCookieInfoFragment } from "../templates/htmlCookieInfoFragment";
import { htmlHelper } from "./htmlHelper";
import { IOptions } from "../types";

export const htmlBuilder = (options: IOptions, str: string) => {
  let html = htmlHelper({ ...options?.texts, ...options?.styles }, str);
  if (options?.cookies) {
    html = Object.keys(cookieTypes).reduce((acc, curr) => {
      const re = new RegExp(`__${curr}__`, "g");
      const rep = options?.cookies[curr]?.used?.length || 0;
      return acc.replace(re, rep);
    }, html);
    html = Object.entries(options.cookies).reduce((acc, curr) => {
      let fragment: string = "";
      (curr[1] as any).used.forEach((cookie: any) => {
        cookie.name = cookie.name || "";
        cookie.purpose = cookie.purpose || "";
        cookie.functions = cookie.functions || "";
        cookie.privacyLink =
          cookie.privacyLink ||
          "http://google.com?q=" + cookie.name + " privacy policy";
        fragment += htmlHelper(cookie, htmlCookieInfoFragment);
      });
      const re = new RegExp(`__${curr[0]}Placeholder__`, "g");
      return acc.replace(re, fragment);
    }, html);
  }
  return html;
};
