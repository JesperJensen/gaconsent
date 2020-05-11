declare module "helpers/scriptHelper" {
    export const scriptHelper: (gaId: string, options: any, str: string) => string;
}
declare module "helpers/cssHelper" {
    export const cssHelper: (options: any, str: string) => string;
}
declare module "templates/htmlCookieInfoFragment" {
    export let htmlCookieInfoFragment: string;
}
declare module "helpers/htmlHelper" {
    export const htmlHelper: (options: any, str: string) => string;
}
declare module "helpers/htmlBuilder" {
    export const htmlBuilder: (options: any, str: string) => string;
}
declare module "helpers/domHelper" {
    export const domHelper: (script: string, css: string, html: string) => void;
}
declare module "helpers/optionsHelper" {
    export const optionsHelper: (options?: any) => any;
}
declare module "index" {
    import { IOptions } from "./types";
    export default class GAConsent {
        options: IOptions;
        css: string;
        script: string;
        html: string;
        constructor(gaId: string, options?: IOptions);
        initCheckboxes: () => void;
        init: () => boolean;
    }
}
declare module "types/types" {
    export interface IOptions {
        styles?: IDefault;
        texts?: IDefault;
        actions?: IDefault;
        cookies?: any;
    }
    export interface IDefault {
        [key: string]: string | Function;
    }
    export interface IConsent {
        analytics: boolean;
        functional: boolean;
        commercial: boolean;
    }
}
declare module "defaults/actions" {
    import { IConsent } from "types/types";
    export const actionDefaults: {
        afterConsent: (consent: IConsent) => void;
    };
}
declare module "defaults/cookieTypes" {
    export enum cookieTypes {
        analytics = "analytics",
        technical = "technical",
        functional = "functional",
        commercial = "commercial"
    }
}
declare module "defaults/cookies" {
    export const cookieDefaults: {
        analytics: {
            used: {
                name: string;
                purpose: string;
                functions: string;
                privacyLink: string;
            }[];
        };
        technical: {
            used: never[];
        };
        functional: {
            used: never[];
        };
        commercial: {
            used: never[];
        };
    };
}
declare module "defaults/htmkPlaceholders" {
    export enum preferencesCookiesPlaceHolders {
        analyticsPlaceholder = "__analyticsPlaceholder__",
        technicalPlaceholder = "__technicalPlaceholder__",
        functionalPlaceholder = "__functionalPlaceholder__",
        commercialPlaceholder = "__commercialPlaceholder__"
    }
}
declare module "defaults/styles" {
    export const styleDefaults: {
        dialogShowed: string;
        pageColor: string;
        dialogShadow: string;
        dialogColor: string;
        fontSize: string;
        buttonFontSize: string;
        acceptBackgroundColor: string;
        acceptColor: string;
        showPreferencesBackgroundColor: string;
        showPreferencesColor: string;
        savePreferencesBackgroundColor: string;
        savePreferencesColor: string;
        cookieBackgroundColor: string;
        cookieTypeFontSize: string;
        cookieInfoFontSize: string;
        cookiePanelHeight: string;
        cookieCheckboxPadding: string;
    };
}
declare module "defaults/texts" {
    export const textDefaults: {
        textConsent: string;
        textPreferences: string;
        textAnalytics: string;
        textTechnical: string;
        textFunctional: string;
        textCommercial: string;
        textAnalyticsInfo: string;
        textTechnicalInfo: string;
        textFunctionalInfo: string;
        textCommercialInfo: string;
        showPreferencesButtonText: string;
        savePreferencesButtonText: string;
        acceptButtonText: string;
    };
}
declare module "defaults/index" {
    export * from "defaults/styles";
    export * from "defaults/actions";
    export * from "defaults/texts";
    export * from "defaults/cookieTypes";
    export * from "defaults/cookies";
    export * from "defaults/htmkPlaceholders";
}
declare module "templates/css" {
    export let css: string;
}
declare module "templates/html" {
    export let html: string;
}
declare module "templates/script" {
    export let script: string;
}
declare module "templates/index" {
    import { css } from "templates/css";
    import { html } from "templates/html";
    import { script } from "templates/script";
    export { css, html, script };
}
declare module "types/index" {
    export * from "types/types";
}
