export interface IOptions {
  styles?: IDefault;
  texts?: IDefault;
  actions?: IDefault;
  cookies?: any;
}
export interface IDefault {
  /* tslint:disable:ban-types */
  [key: string]: string | Function;
  /* tslint:enable:ban-types */
}
export interface IConsent {
  analytics: boolean;
  functional: boolean;
  commercial: boolean;
}
