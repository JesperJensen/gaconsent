var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
System.register("helpers/scriptHelper", [], function (exports_1, context_1) {
    "use strict";
    var scriptHelper;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("scriptHelper", scriptHelper = function (gaId, options, str) {
                var script = str.replace(/__gaId__/g, gaId);
                return Object.entries(options.actions).reduce(function (acc, curr) {
                    var re = new RegExp("__" + curr[0] + "__", "g");
                    var rep = "(" + curr[1] + ")";
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
            exports_2("cssHelper", cssHelper = function (options, str) {
                return Object.entries(options.styles).reduce(function (acc, curr) {
                    var re = new RegExp("__" + curr[0] + "__", "g");
                    var rep = curr[1];
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
            exports_3("htmlCookieInfoFragment", htmlCookieInfoFragment = "<div class=\"gaconsent-cookieInfo\"><p><i>__name__</i></p><p>__purpose__</p><p>__functions__</p><a target='_new' href=\"__privacyLink__\">Privacy policy</a></div>");
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
            exports_4("htmlHelper", htmlHelper = function (options, str) {
                var html = Object.entries(options).reduce(function (acc, curr) {
                    var re = new RegExp("__" + curr[0] + "__", "g");
                    var rep = curr[1];
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
            exports_5("htmlBuilder", htmlBuilder = function (options, str) {
                var html = htmlHelper_1.htmlHelper(__assign(__assign({}, options === null || options === void 0 ? void 0 : options.texts), options === null || options === void 0 ? void 0 : options.styles), str);
                if (options === null || options === void 0 ? void 0 : options.cookies) {
                    html = Object.keys(defaults_1.cookieTypes).reduce(function (acc, curr) {
                        var _a, _b;
                        var re = new RegExp("__" + curr + "__", "g");
                        var rep = ((_b = (_a = options === null || options === void 0 ? void 0 : options.cookies[curr]) === null || _a === void 0 ? void 0 : _a.used) === null || _b === void 0 ? void 0 : _b.length) || 0;
                        return acc.replace(re, rep);
                    }, html);
                    html = Object.entries(options.cookies).reduce(function (acc, curr) {
                        var fragment = "";
                        curr[1].used.forEach(function (cookie) {
                            cookie.name = cookie.name || "";
                            cookie.purpose = cookie.purpose || "";
                            cookie.functions = cookie.functions || "";
                            cookie.privacyLink = cookie.privacyLink || "http://google.com?q=" + cookie.name + " privacy policy";
                            fragment += htmlHelper_1.htmlHelper(cookie, htmlCookieInfoFragment_1.htmlCookieInfoFragment);
                        });
                        var re = new RegExp("__" + curr[0] + "Placeholder__", "g");
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
            exports_6("domHelper", domHelper = function (script, css, html) {
                var _a, _b;
                // insertAdjacentHTML doesnt evalutate inserted script tag. Use createContextualFragment instead
                var scriptSource = script;
                var range = document.createRange();
                range.selectNode(document.getElementsByTagName("body").item(0));
                var documentFragment = range.createContextualFragment(scriptSource);
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
            exports_7("optionsHelper", optionsHelper = function (options) {
                var mergedOptions = options || {};
                mergedOptions.styles = __assign(__assign({}, defaults_2.styleDefaults), options === null || options === void 0 ? void 0 : options.styles);
                mergedOptions.actions = __assign(__assign({}, defaults_2.actionDefaults), options === null || options === void 0 ? void 0 : options.actions);
                mergedOptions.texts = __assign(__assign({}, defaults_2.textDefaults), options === null || options === void 0 ? void 0 : options.texts);
                mergedOptions.cookies = __assign(__assign({}, defaults_2.cookieDefaults), options === null || options === void 0 ? void 0 : options.cookies);
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
            GAConsent = /** @class */ (function () {
                function GAConsent(gaId, options) {
                    var _this = this;
                    this.initCheckboxes = function () {
                        // initialize injected checkboxes depending on options (default/user options)
                        var checkboxes = Array.from(document.querySelectorAll("input.gaconsent-checkbox"));
                        Object.keys(defaults_3.cookieTypes).forEach(function (type, ix) {
                            if (_this.options.cookies[type].used.length === 0) {
                                checkboxes[ix].disabled = true;
                                checkboxes[ix].checked = false;
                            }
                        });
                    };
                    this.init = function () {
                        domHelper_1.domHelper(_this.script, _this.css, _this.html);
                        _this.initCheckboxes();
                        return true;
                    };
                    this.options = optionsHelper_1.optionsHelper(options);
                    this.script = scriptHelper_1.scriptHelper(gaId, this.options, templates_1.script);
                    this.css = cssHelper_1.cssHelper(this.options, templates_1.css);
                    this.html = htmlBuilder_1.htmlBuilder(this.options, templates_1.html);
                }
                return GAConsent;
            }());
            exports_8("default", GAConsent);
        }
    };
});
