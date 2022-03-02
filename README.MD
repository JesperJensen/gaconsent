# Easy google tags cookie accept/deny

| WARNING: Not to be used in EU. Using Google Analytics violates EU law. |
| --- |

### Get the script

- Using npm: `npm install gaconsent --save`

### In your main start script (main.ts, index.js etc...)
`new GAConsent('UA-XXXXXXXX-Y').init()`
 - Replace with your own UA id.
 - Thats it! If you only use Google gtag on your page. 
 - If you have other cookies, you can handle thoose too. Se options.

### How it works
 - inject needed html, css and scripts to handle Google Analytics (gtag). Only UA are requiered
 - save user consent in localStorage
 - automatic delete Google Analytics cookies if consent changed
 - if options changed (eg. more cookies types or less) consent dialog are shown again 
 - afterConsent function can be provided in options to handle other analytics, functional, commercial cookies
 - technical cookies are always shown as needed and can not be deselected
 - some texts, and styles (background, colors, font sizes etc.) can be changed (see options)

### Options

Defaults

```js
 options = {
  styles: {    
    dialogShowed: "bottom", // (bottom | center)
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
  },
  texts : {
    textConsent: `This page use cookies. You can change which cookies you want to accept`,
    textPreferences: `Select cookies you want to accept`,
    textAnalytics: `Analytics cookies (__analytics__)`, // eg (1)
    textTechnical: `Technical cookies: (__technical__)`,
    textFunctional: `Functional cookies: (__functional__)`,
    textCommercial: `Commercial cookies: (__commercial__)`,
    textAnalyticsInfo: `The Website uses cookies that are used to provide with statistics.`,
    textTechnicalInfo: `The Website uses cookies that are solely for technical reasons.`,
    textFunctionalInfo: `The website uses cookies that are used solely to make the site more  ser-friendly.`,
    textCommercialInfo: `The website uses third-party cookies that are used to provide the user with relevant advertisements.`,
    showPreferencesButtonText: 'Preferences...',
    savePreferencesButtonText: 'Save',
    acceptButtonText: 'OK'
  },
  cookies: {
    analytics: {
      used: [
        {
          name: 'Google Universal Analytics',
          purpose: 'Collect statistical data for service improvement.',
          functions: 'Number of pageviews, link clicked etc. ',
          privacyLink: 'https://policies.google.com/privacy?hl=en'
        },
      ]
    },
    technical: {
      used: [
      ]
    },
    functional: {
      used: [
      ]
    },
    commercial: {
      used: [
      ]
    },
   }
  }

```
### How to use own options:

```js
new GAConsent('UA-XXXXXXXX-Y', {
    styles: {
        pageColor: "white",
        dialogColor: "gray"
    },
    actions: {
        afterConsent: (consent: IConsent) => {
            console.log(consent, "handle other (not gtag) cookies")
        },
    },
    texts: {
        text: "Example text",
        acceptButtonText: 'ExamleBotton'
    },
    cookies: {
        functional: {
            used: [
                {
                    name: 'xxxx xxxxxx xxxxxxx',
                    purpose: 'xxxx xxxx xxxx xxxx xxx xxxx.',
                    functions: 'xxxxx xxx xxxx, xxxx xxxx xxxx. ',
                    privacyLink: 'https://example.com'
                }
            ]
        }
    }
}).init()

```
