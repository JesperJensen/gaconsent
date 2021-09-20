import { scriptHelper } from "../helpers/scriptHelper";

test("test action", () => {
  let result = `(function () { return console.log('works'); })(consent);`;
  let test = `__afterConsent__(consent);`;
  let merged = scriptHelper(
    "UA-XXXXXXXX-Y",
    { actions: { afterConsent: () => console.log("works") } },
    test
  );
  expect(merged).toBe(result);
});
