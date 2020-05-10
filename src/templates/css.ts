export let css = `
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
`;
