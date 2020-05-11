export let script = `
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
  const domain = document.domain.split(".").splice(-2).join(".");
  document.cookie = '_gat_gtag___gaId__=; expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=' + domain + '; path=/';
  document.cookie = '_gid=; expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=' + domain + '; path=/';
  document.cookie = '_ga=; expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=' + domain + '; path=/';
  // try without domain & path eg. localhost
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
  `;
