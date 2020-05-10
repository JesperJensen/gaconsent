import { css, html, script } from "./templates";
import { cookieTypes } from "./defaults";
import { IOptions } from "./types";
import { scriptHelper } from "./helpers/scriptHelper";
import { cssHelper } from "./helpers/cssHelper";
import { htmlBuilder } from "./helpers/htmlBuilder";
import { domHelper } from "./helpers/domHelper";
import { optionsHelper } from "./helpers/optionsHelper";

export default class GAConsent {
  options: IOptions;
  css: string;
  script: string;
  html: string;
  constructor(gaId: string, options?: IOptions) {
    this.options = optionsHelper(options);
    this.script = scriptHelper(gaId, this.options, script)
    this.css = cssHelper(this.options, css)
    this.html = htmlBuilder(this.options, html)
  }
  initCheckboxes = () => {
    // initialize injected checkboxes depending on options (default/user options)
    const checkboxes: Array<HTMLInputElement> = Array.from(
      document.querySelectorAll("input.gaconsent-checkbox")
    );
    Object.keys(cookieTypes).forEach((type, ix) => {
      if (this.options.cookies[type].used.length === 0) {
        checkboxes[ix].disabled = true;
        checkboxes[ix].checked = false;
      }
    })
  };
  init = () => {
    domHelper(this.script, this.css, this.html);
    this.initCheckboxes();
    return true;
  };
}
