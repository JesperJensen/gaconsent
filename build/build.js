System.register("helpers/scriptHelper", [], function (exports_1, context_1) {
    "use strict";
    var scriptHelper;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("scriptHelper", scriptHelper = (gaId, options, str) => {
                const script = str.replace(/__gaId__/g, gaId);
                return Object.entries(options.actions).reduce((acc, curr) => {
                    const re = new RegExp(`__${curr[0]}__`, "g");
                    const rep = `(${curr[1]})`;
                    return acc.replace(re, rep);
                }, script);
            });
        }
    };
});
System.register("helpers/cssHelper", [], function (exports_2, context_2) {
    "use strict";
    var cssHelper;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            exports_2("cssHelper", cssHelper = (options, str) => {
                return Object.entries(options.styles).reduce((acc, curr) => {
                    const re = new RegExp(`__${curr[0]}__`, "g");
                    const rep = curr[1];
                    return acc.replace(re, rep);
                }, str);
            });
        }
    };
});
System.register("templates/htmlCookieInfoFragment", [], function (exports_3, context_3) {
    "use strict";
    var htmlCookieInfoFragment;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
            exports_3("htmlCookieInfoFragment", htmlCookieInfoFragment = `<div class=\"gaconsent-cookieInfo\"><p><i>__name__</i></p><p>__purpose__</p><p>__functions__</p><a target='_new' href=\"__privacyLink__">Privacy policy</a></div>`);
        }
    };
});
System.register("helpers/htmlHelper", [], function (exports_4, context_4) {
    "use strict";
    var htmlHelper;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
            exports_4("htmlHelper", htmlHelper = (options, str) => {
                const html = Object.entries(options).reduce((acc, curr) => {
                    const re = new RegExp(`__${curr[0]}__`, "g");
                    const rep = curr[1];
                    return acc.replace(re, rep);
                }, str);
                return html;
            });
        }
    };
});
System.register("helpers/htmlBuilder", ["../defaults", "templates/htmlCookieInfoFragment", "helpers/htmlHelper"], function (exports_5, context_5) {
    "use strict";
    var defaults_1, htmlCookieInfoFragment_1, htmlHelper_1, htmlBuilder;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (defaults_1_1) {
                defaults_1 = defaults_1_1;
            },
            function (htmlCookieInfoFragment_1_1) {
                htmlCookieInfoFragment_1 = htmlCookieInfoFragment_1_1;
            },
            function (htmlHelper_1_1) {
                htmlHelper_1 = htmlHelper_1_1;
            }
        ],
        execute: function () {
            exports_5("htmlBuilder", htmlBuilder = (options, str) => {
                let html = htmlHelper_1.htmlHelper(Object.assign(Object.assign({}, options === null || options === void 0 ? void 0 : options.texts), options === null || options === void 0 ? void 0 : options.styles), str);
                if (options === null || options === void 0 ? void 0 : options.cookies) {
                    html = Object.keys(defaults_1.cookieTypes).reduce((acc, curr) => {
                        var _a, _b;
                        const re = new RegExp(`__${curr}__`, "g");
                        const rep = ((_b = (_a = options === null || options === void 0 ? void 0 : options.cookies[curr]) === null || _a === void 0 ? void 0 : _a.used) === null || _b === void 0 ? void 0 : _b.length) || 0;
                        return acc.replace(re, rep);
                    }, html);
                    html = Object.entries(options.cookies).reduce((acc, curr) => {
                        let fragment = "";
                        curr[1].used.forEach((cookie) => {
                            cookie.name = cookie.name || "";
                            cookie.purpose = cookie.purpose || "";
                            cookie.functions = cookie.functions || "";
                            cookie.privacyLink = cookie.privacyLink || "http://google.com?q=" + cookie.name + " privacy policy";
                            fragment += htmlHelper_1.htmlHelper(cookie, htmlCookieInfoFragment_1.htmlCookieInfoFragment);
                        });
                        const re = new RegExp(`__${curr[0]}Placeholder__`, "g");
                        return acc.replace(re, fragment);
                    }, html);
                }
                return html;
            });
        }
    };
});
System.register("helpers/domHelper", [], function (exports_6, context_6) {
    "use strict";
    var domHelper;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [],
        execute: function () {
            exports_6("domHelper", domHelper = (script, css, html) => {
                var _a, _b;
                // insertAdjacentHTML doesnt evalutate inserted script tag. Use createContextualFragment instead
                const scriptSource = script;
                const range = document.createRange();
                range.selectNode(document.getElementsByTagName("body").item(0));
                const documentFragment = range.createContextualFragment(scriptSource);
                document.body.appendChild(documentFragment);
                (_a = document.querySelector("body")) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML("beforeend", html);
                (_b = document.querySelector("head")) === null || _b === void 0 ? void 0 : _b.insertAdjacentHTML("beforeend", css);
            });
        }
    };
});
System.register("helpers/optionsHelper", ["../defaults"], function (exports_7, context_7) {
    "use strict";
    var defaults_2, optionsHelper;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [
            function (defaults_2_1) {
                defaults_2 = defaults_2_1;
            }
        ],
        execute: function () {
            exports_7("optionsHelper", optionsHelper = (options) => {
                const mergedOptions = options || {};
                mergedOptions.styles = Object.assign(Object.assign({}, defaults_2.styleDefaults), options === null || options === void 0 ? void 0 : options.styles);
                mergedOptions.actions = Object.assign(Object.assign({}, defaults_2.actionDefaults), options === null || options === void 0 ? void 0 : options.actions);
                mergedOptions.texts = Object.assign(Object.assign({}, defaults_2.textDefaults), options === null || options === void 0 ? void 0 : options.texts);
                mergedOptions.cookies = Object.assign(Object.assign({}, defaults_2.cookieDefaults), options === null || options === void 0 ? void 0 : options.cookies);
                return mergedOptions;
            });
        }
    };
});
System.register("index", ["./templates", "./defaults", "helpers/scriptHelper", "helpers/cssHelper", "helpers/htmlBuilder", "helpers/domHelper", "helpers/optionsHelper"], function (exports_8, context_8) {
    "use strict";
    var templates_1, defaults_3, scriptHelper_1, cssHelper_1, htmlBuilder_1, domHelper_1, optionsHelper_1, GAConsent;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [
            function (templates_1_1) {
                templates_1 = templates_1_1;
            },
            function (defaults_3_1) {
                defaults_3 = defaults_3_1;
            },
            function (scriptHelper_1_1) {
                scriptHelper_1 = scriptHelper_1_1;
            },
            function (cssHelper_1_1) {
                cssHelper_1 = cssHelper_1_1;
            },
            function (htmlBuilder_1_1) {
                htmlBuilder_1 = htmlBuilder_1_1;
            },
            function (domHelper_1_1) {
                domHelper_1 = domHelper_1_1;
            },
            function (optionsHelper_1_1) {
                optionsHelper_1 = optionsHelper_1_1;
            }
        ],
        execute: function () {
            GAConsent = class GAConsent {
                constructor(gaId, options) {
                    this.initCheckboxes = () => {
                        // initialize injected checkboxes depending on options (default/user options)
                        const checkboxes = Array.from(document.querySelectorAll("input.gaconsent-checkbox"));
                        Object.keys(defaults_3.cookieTypes).forEach((type, ix) => {
                            if (this.options.cookies[type].used.length === 0) {
                                checkboxes[ix].disabled = true;
                                checkboxes[ix].checked = false;
                            }
                        });
                    };
                    this.init = () => {
                        domHelper_1.domHelper(this.script, this.css, this.html);
                        this.initCheckboxes();
                        return true;
                    };
                    this.options = optionsHelper_1.optionsHelper(options);
                    this.script = scriptHelper_1.scriptHelper(gaId, this.options, templates_1.script);
                    this.css = cssHelper_1.cssHelper(this.options, templates_1.css);
                    this.html = htmlBuilder_1.htmlBuilder(this.options, templates_1.html);
                }
            };
            exports_8("default", GAConsent);
        }
    };
});
System.register("types/types", [], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("defaults/actions", [], function (exports_10, context_10) {
    "use strict";
    var actionDefaults;
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [],
        execute: function () {
            exports_10("actionDefaults", actionDefaults = {
                afterConsent: (consent) => {
                    /* empty */
                },
            });
        }
    };
});
System.register("defaults/cookieTypes", [], function (exports_11, context_11) {
    "use strict";
    var cookieTypes;
    var __moduleName = context_11 && context_11.id;
    return {
        setters: [],
        execute: function () {
            (function (cookieTypes) {
                cookieTypes["analytics"] = "analytics";
                cookieTypes["technical"] = "technical";
                cookieTypes["functional"] = "functional";
                cookieTypes["commercial"] = "commercial";
            })(cookieTypes || (cookieTypes = {}));
            exports_11("cookieTypes", cookieTypes);
        }
    };
});
System.register("defaults/cookies", [], function (exports_12, context_12) {
    "use strict";
    var cookieDefaults;
    var __moduleName = context_12 && context_12.id;
    return {
        setters: [],
        execute: function () {
            exports_12("cookieDefaults", cookieDefaults = {
                analytics: {
                    used: [
                        {
                            name: "Google Universal Analytics",
                            purpose: "Collect statistical data for service improvement.",
                            functions: "Number of pageviews, link clicked etc. ",
                            privacyLink: "https://policies.google.com/privacy?hl=en",
                        },
                    ],
                },
                technical: {
                    used: [],
                },
                functional: {
                    used: [],
                },
                commercial: {
                    used: [],
                },
            });
        }
    };
});
System.register("defaults/htmkPlaceholders", [], function (exports_13, context_13) {
    "use strict";
    var preferencesCookiesPlaceHolders;
    var __moduleName = context_13 && context_13.id;
    return {
        setters: [],
        execute: function () {
            (function (preferencesCookiesPlaceHolders) {
                preferencesCookiesPlaceHolders["analyticsPlaceholder"] = "__analyticsPlaceholder__";
                preferencesCookiesPlaceHolders["technicalPlaceholder"] = "__technicalPlaceholder__";
                preferencesCookiesPlaceHolders["functionalPlaceholder"] = "__functionalPlaceholder__";
                preferencesCookiesPlaceHolders["commercialPlaceholder"] = "__commercialPlaceholder__";
            })(preferencesCookiesPlaceHolders || (preferencesCookiesPlaceHolders = {}));
            exports_13("preferencesCookiesPlaceHolders", preferencesCookiesPlaceHolders);
        }
    };
});
System.register("defaults/styles", [], function (exports_14, context_14) {
    "use strict";
    var styleDefaults;
    var __moduleName = context_14 && context_14.id;
    return {
        setters: [],
        execute: function () {
            exports_14("styleDefaults", styleDefaults = {
                dialogShowed: "bottom",
                pageColor: "rgba(155,155,155,.5)",
                dialogShadow: "3px 25px 27px -29px rgba(0,0,0,0.4)",
                dialogColor: "rgb(255,255,255)",
                fontSize: "16px",
                buttonFontSize: "18px",
                acceptBackgroundColor: "white",
                acceptColor: "black",
                showPreferencesBackgroundColor: "white",
                showPreferencesColor: "black",
                savePreferencesBackgroundColor: "white",
                savePreferencesColor: "black",
                cookieBackgroundColor: "rgb(250,250,250)",
                cookieTypeFontSize: "12px",
                cookieInfoFontSize: "12px",
                cookiePanelHeight: "60px",
                cookieCheckboxPadding: "8px",
            });
        }
    };
});
System.register("defaults/texts", [], function (exports_15, context_15) {
    "use strict";
    var textDefaults;
    var __moduleName = context_15 && context_15.id;
    return {
        setters: [],
        execute: function () {
            exports_15("textDefaults", textDefaults = {
                textConsent: `This page use cookies. You can change which cookies you want to accept`,
                textPreferences: `Select cookies you want to accept`,
                textAnalytics: `Analytics cookies (__analytics__)`,
                textTechnical: `Technical cookies: (__technical__)`,
                textFunctional: `Functional cookies: (__functional__)`,
                textCommercial: `Commercial cookies: (__commercial__)`,
                textAnalyticsInfo: `The Website uses cookies that are used to provide with statistics.`,
                textTechnicalInfo: `The Website uses cookies that are solely for technical reasons.`,
                textFunctionalInfo: `The website uses cookies that are used solely to make the site more user-friendly.`,
                textCommercialInfo: `The website uses third-party cookies that are used to provide the user with relevant advertisements.`,
                showPreferencesButtonText: "Preferences...",
                savePreferencesButtonText: "Save",
                acceptButtonText: "OK",
            });
        }
    };
});
System.register("defaults/index", ["defaults/styles", "defaults/actions", "defaults/texts", "defaults/cookieTypes", "defaults/cookies", "defaults/htmkPlaceholders"], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_16(exports);
    }
    return {
        setters: [
            function (styles_1_1) {
                exportStar_1(styles_1_1);
            },
            function (actions_1_1) {
                exportStar_1(actions_1_1);
            },
            function (texts_1_1) {
                exportStar_1(texts_1_1);
            },
            function (cookieTypes_1_1) {
                exportStar_1(cookieTypes_1_1);
            },
            function (cookies_1_1) {
                exportStar_1(cookies_1_1);
            },
            function (htmkPlaceholders_1_1) {
                exportStar_1(htmkPlaceholders_1_1);
            }
        ],
        execute: function () {
        }
    };
});
System.register("templates/css", [], function (exports_17, context_17) {
    "use strict";
    var css;
    var __moduleName = context_17 && context_17.id;
    return {
        setters: [],
        execute: function () {
            exports_17("css", css = `
<style>

#gaconsent-dialog, #gaconsent-preferences  {
  height: 100vh;
  left:0;
  top: 0;
  bottom: 0;
  right: 0;
  position: fixed;
  width: 100vw;
  max-height: 100%;
  background-color: __pageColor__;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.gaconsent-container.gaconsent-center {
  max-height: 100%;
  max-width: 80%;
  overflow: auto;
  border: 1px solid black;
  background-color: __dialogColor__;
  padding: 5px;
  -webkit-__dialogShadow__
  -moz-__dialogShadow__
  __dialogShadow__
}
.gaconsent-container.gaconsent-bottom {
  max-height: 100%;
  max-width: 80%;
  overflow: auto;
  border: 1px solid black;
  background-color: __dialogColor__;
  padding: 5px;
  position: fixed;
  bottom:0px;
  -webkit-__dialogShadow__
  -moz-__dialogShadow__
  __dialogShadow__
}
.gaconsent-content{
  font-size: __fontSize__;  
  width: 100%;
}
.gaconsent-text{
  padding: 0 3px;
}
.gaconsent-buttons {
  text-align: center;
}
.gaconsent-buttons button {
    font-size: __buttonFontSize__;  
    margin: 5px 10px;
}
button#gaconsent-showPreferences {
    background-color: __showPreferencesBackgroundColor__; 
    color: __showPreferencesColor__; 
}
button#gaconsent-accept {
    background-color: __acceptBackgroundColor__; 
    color: __acceptColor__; 
}
button#gaconsent-savePreferences {
    background-color: __savePreferencesBackgroundColor__; 
    color: __savePreferencesColor__; 
}
.gaconsent-cookieInfo{
  width: 100%;
  display: inline-block;
  padding-bottom: 5px;
}
.gaconsent-cookieInfo p{
  font-size: __cookieInfoFontSize__;
  margin: 5px;
}
.gaconsent-cookieInfo i{
  font-weight: bold;
}
.gaconsent-cookieInfo a{
  font-size: __cookieInfoFontSize__;
  margin: 5px;
}
.gaconsent-checkbox {
  float:right;
  margin-top: 0px;
}
.gaconsent-cookie-scroll-panel{
  background-color: __cookieBackgroundColor__;
  border: 1px solid black;
  width: 100%;
  overflow: scroll;
  max-height: __cookiePanelHeight__;
}
.gaconsent-cookie-scroll-panel:empty{
  display:none;
}
.gaconsent-cookie-type {
  overflow: auto;
}
.gaconsent-cookie-type {
  border: 1px solid black;
  padding-bottom: 5px;
  padding-left: 5px;
  padding-right: 5px;
  margin-bottom: 5px;
}
.gaconsent-text h3 {
  text-align:center;
  margin: 5px;
}
.gaconsent-cookie-type h4{
  margin: 5px 0px 5px 0px;
}
input.gaconsent-checkbox {
	-webkit-appearance: none;
	background-color: white;
  border: 2px solid gray;
	padding: __cookieCheckboxPadding__;
	display: inline-block;
  position: relative;
}
input.gaconsent-checkbox:disabled, input.gaconsent-checkbox:checked:disabled {
  background-color: lightgray;
}
input.gaconsent-checkbox:checked {
	border: 2px solid gray;
  color: #99a1a7;
}
input.gaconsent-checkbox:checked:after {
	content: '\\2714';
	font-size:calc(1.5 * __cookieCheckboxPadding__);
	position: absolute;
	top: 0px;
	left: 3px;
  color: green;
}
input.gaconsent-checkbox:disabled:checked:after {
	color: gray;
}
</style>
`);
        }
    };
});
System.register("templates/html", [], function (exports_18, context_18) {
    "use strict";
    var html;
    var __moduleName = context_18 && context_18.id;
    return {
        setters: [],
        execute: function () {
            exports_18("html", html = `
<div id="gaconsent-dialog">
  <div class="gaconsent-container gaconsent-__dialogShowed__">
    <div class="gaconsent-content">
      <div class="gaconsent-text">
        <p>__textConsent__</p>
      </div>
      <div class="gaconsent-buttons">
        <button id="gaconsent-showPreferences" onclick="gaconsent_showPreferences()">__showPreferencesButtonText__</button>
        <button id="gaconsent-accept" onclick="gaconsent_updateLocalStorage(document.querySelectorAll('input.gaconsent-checkbox'));gaconsent_doConsent();">__acceptButtonText__</button>
      </div>
    </div>
  </div>
</div>
<div id="gaconsent-preferences">
  <div class="gaconsent-container gaconsent-__dialogShowed__">
    <div class="gaconsent-content">
      <div class="gaconsent-text">
        <h3>__textPreferences__</h3>
      </div>
      <div class="gaconsent-cookie-type">
        <h4>__textAnalytics__ <label class="gaconsent-checkbox-label"><input id="gaconsent-checkbox-analytics" class="gaconsent-checkbox" type="checkbox" name="contentAccept"/><span class="gaconsent-checkbox-custom"></span></label></h4>
        <div class="gaconsent-cookie-scroll-panel">__analyticsPlaceholder__</div>
      </div>
      <div class="gaconsent-cookie-type">
        <h4>__textTechnical__ <label class="gaconsent-checkbox-label"><input id="gaconsent-checkbox-technical" class="gaconsent-checkbox" type="checkbox" name="contentAccept"/><span class="gaconsent-checkbox-custom"></span></label></h4> 
        <div class="gaconsent-cookie-scroll-panel">__technicalPlaceholder__</div>
      </div>
      <div class="gaconsent-cookie-type">
        <h4>__textFunctional__ <label class="gaconsent-checkbox-label"><input id="gaconsent-checkbox-functional" class="gaconsent-checkbox" type="checkbox" name="contentAccept" /><span class="gaconsent-checkbox-custom"></span></label></h4> 
        <div class="gaconsent-cookie-scroll-panel">__functionalPlaceholder__</div>
      </div>
      <div class="gaconsent-cookie-type">
        <h4>__textCommercial__ <label class="gaconsent-checkbox-label"><input id="gaconsent-checkbox-commerciaL" class="gaconsent-checkbox" type="checkbox" name="contentAccept" /><span class="gaconsent-checkbox-custom"></span></label></h4> 
        <div class="gaconsent-cookie-scroll-panel">__commercialPlaceholder__</div>
      </div>
      <div class="gaconsent-buttons">
        <button id="gaconsent-savePreferences" onclick="gaconsent_savePreferences(document.querySelectorAll('input.gaconsent-checkbox'))">__savePreferencesButtonText__</button>
      </div>
    </div>
  </div>
</div>
`);
        }
    };
});
System.register("templates/script", [], function (exports_19, context_19) {
    "use strict";
    var script;
    var __moduleName = context_19 && context_19.id;
    return {
        setters: [],
        execute: function () {
            exports_19("script", script = `
<script async src="https://www.googletagmanager.com/gtag/js?id=__gaId__"></script>
<script type="text/javascript">
(() => {
const disableStr = 'ga-disable-' + '__gaId__'
const analyticsCookies = 'analyticsCookies'
const technicalCookies = 'technicalCookies'
const functionalCookies = 'functionalCookies'
const commercialCookies = 'commercialCookies'

const doConsent = () => {
  const gaActive = localStorage.getItem(analyticsCookies)
  if (gaActive === 'on') {
    gaOptIn()
  } 
  if (gaActive === 'off') {
    gaOptOut()
  }
  let consent = {
    analytics: "on" === localStorage.getItem(analyticsCookies) ? true: false ,
    functional: "on" === localStorage.getItem(functionalCookies) ? true: false,
    commercial: "on" === localStorage.getItem(commercialCookies)? true: false,
  };
  __afterConsent__(consent);
  hideConsent();
}

const gaOptOut = () => {
  window[disableStr] = true
  document.cookie = '_gat_gtag___gaId__=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  document.cookie = '_gid=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  document.cookie = '_ga=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}  

const gaOptIn = () => {
  window[disableStr] = false
  window.dataLayer = window.dataLayer || []
  function gtag() {dataLayer.push(arguments)}
  gtag('js', new Date())
  gtag('config', '__gaId__')
}

const showPreferences = () => {
  hideConsent()
  document.querySelector('#gaconsent-preferences').style.display = 'flex'
}

const hidePreferences = () => {
  document.querySelector('#gaconsent-preferences').style.display = 'none'
}

const showConsent = () => {
  hidePreferences()
  document.querySelector('#gaconsent-dialog').style.display = 'flex'
}

const hideConsent = () => {
  document.querySelector('#gaconsent-dialog').style.display = 'none'
}

const savePreferences = (checkboxes) => {
  updateLocalStorage(checkboxes)
  doConsent()
  hidePreferences()
}

const deleteLocalStorage = () => {
  localStorage.removeItem(analyticsCookies)
  localStorage.removeItem(functionalCookies)
  localStorage.removeItem(commercialCookies)
}

const updateLocalStorage = (checkboxes) => {
  let [analytics, technical, functional, commercial] = Array.from(checkboxes)
  deleteLocalStorage()
  if (!analytics.disabled) localStorage.setItem(analyticsCookies, analytics.checked?"on":"off")
  if (!functional.disabled) localStorage.setItem(functionalCookies, functional.checked?"on":"off")
  if (!commercial.disabled) localStorage.setItem(commercialCookies, commercial.checked?"on":"off")
}

const updateStates = () => {
  let needToShowConsent = false;
  const analyticsConsent = localStorage.getItem(analyticsCookies)
  const functionalConsent = localStorage.getItem(functionalCookies)
  const commercialConsent = localStorage.getItem(commercialCookies)
  
  let checkboxes = document.querySelectorAll("input.gaconsent-checkbox")
  let [analytics, technical, functional, commercial] = Array.from(checkboxes)

  // if no existing consent but content -> showContent
  if ((!analyticsConsent && !analytics.disabled)) needToShowConsent = true
  if ((!functionalConsent && !functional.disabled)) needToShowConsent = true
  if ((!commercialConsent && !commercial.disabled)) needToShowConsent = true
  // if existing consent but no content something changed -> showContent
  if ((analyticsConsent && analytics.disabled)) needToShowConsent = true
  if ((functionalConsent && functional.disabled)) needToShowConsent = true
  if ((commercialConsent && commercial.disabled)) needToShowConsent = true
  // checkboxes are disabled if no content for cookie type (index.ts initCheckboxes)
  if (!analytics.disabled){
    analytics.checked = analyticsConsent == "on" ? true : analyticsConsent == "off" ? false: true // if not exist assume on wanted
  }
  if (!technical.disabled){
    technical.checked =  true // always checked (if content!)
    technical.disabled = true // always diabled (mandatory)
  }
  if (!functional.disabled){
    functional.checked = functionalConsent == "on" ? true : functionalConsent == "off" ? false: true // if not exist assume on wanted
  }
  if (!commercial.disabled){
    commercial.checked = commercialConsent == "on" ? true : commercialConsent == "off" ? false: true // if not exist assume on wanted
  }
  updateLocalStorage(checkboxes)
  return needToShowConsent
}

document.addEventListener('DOMContentLoaded', (event) => {
  const needToShowConsent = updateStates()
  if (!needToShowConsent){
    hidePreferences()
    doConsent()
  } else {
    deleteLocalStorage()
    showConsent()
  }
})
window.gaconsent_doConsent = doConsent;
window.gaconsent_showConsent = showConsent;
window.gaconsent_updateLocalStorage = updateLocalStorage;
window.gaconsent_savePreferences = savePreferences;
window.gaconsent_showPreferences = showPreferences;

})()
</script>
  `);
        }
    };
});
System.register("templates/index", ["templates/css", "templates/html", "templates/script"], function (exports_20, context_20) {
    "use strict";
    var css_1, html_1, script_1;
    var __moduleName = context_20 && context_20.id;
    return {
        setters: [
            function (css_1_1) {
                css_1 = css_1_1;
            },
            function (html_1_1) {
                html_1 = html_1_1;
            },
            function (script_1_1) {
                script_1 = script_1_1;
            }
        ],
        execute: function () {
            exports_20("css", css_1.css);
            exports_20("html", html_1.html);
            exports_20("script", script_1.script);
        }
    };
});
System.register("types/index", [], function (exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
