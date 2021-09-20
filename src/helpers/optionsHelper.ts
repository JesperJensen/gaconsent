import {
  styleDefaults,
  actionDefaults,
  textDefaults,
  cookieDefaults,
} from "../defaults";
import { IOptions } from "../types";

export const optionsHelper = (options?: IOptions) => {
  const mergedOptions = options || {};
  mergedOptions.styles = { ...styleDefaults, ...options?.styles };
  mergedOptions.actions = { ...actionDefaults, ...options?.actions };
  mergedOptions.texts = { ...textDefaults, ...options?.texts };
  mergedOptions.cookies = { ...cookieDefaults, ...options?.cookies };
  return mergedOptions;
};
