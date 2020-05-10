export let html = `
<div id="gaconsent-dialog">
  <div class="gaconsent-container gaconsent-__dialogShowed__">
    <div class="gaconsent-content">
      <div class="gaconsent-text">
        <p>__textConsent__</p>
      </div>
      <div class="gaconsent-buttons">
        <button id="gaconsent-showPreferences" onclick="showPreferences()">__showPreferencesButtonText__</button>
        <button id="gaconsent-accept" onclick="updateLocalStorage(document.querySelectorAll('input.gaconsent-checkbox'));doConsent();">__acceptButtonText__</button>
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
        <button id="gaconsent-savePreferences" onclick="savePreferences(document.querySelectorAll('input.gaconsent-checkbox'))">__savePreferencesButtonText__</button>
      </div>
    </div>
  </div>
</div>
`;
