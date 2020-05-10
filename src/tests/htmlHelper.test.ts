import { htmlBuilder } from "../helpers/htmlBuilder";

test("test single merge", () => {
  let result = `<p>works!</p>`
  let test = `<p>__test__</p>`
  let merged = htmlBuilder({ texts: { test: 'works!' } }, test)
  expect(merged).toBe(result);
});
test("test multiple merge", () => {
  let result = `<p>works! - good works!</p>`
  let test = `<p>__test__ - __test2__</p>`
  let merged = htmlBuilder({ texts: { test: 'works!', test2: 'good works!' } }, test)
  expect(merged).toBe(result);
});
test("test repeated merge", () => {
  let result = `<p>works!works!works!</p>`
  let test = `<p>__test____test____test__</p>`
  let merged = htmlBuilder({ texts: { test: 'works!' } }, test)
  expect(merged).toBe(result);
});
test("test cookies merge", () => {
  let result = `Analytics cookies (1)`
  let test = `__textAnalytics__`
  let options = {
    texts: {
      textAnalytics: `Analytics cookies (__analytics__)`,
    },
    cookies: {
      analytics: { used: [{ name: 'A', }] }
    }
  }
  let merged = htmlBuilder(options, test)
  expect(merged).toBe(result);
});
test("test 2 cookies merge", () => {
  let result = `Analytics cookies (2)`
  let test = `__textAnalytics__`
  let options = {
    texts: {
      textAnalytics: `Analytics cookies (__analytics__)`,
    },
    cookies: {
      analytics: { used: [{ name: 'A' }, { name: 'B', }] }
    }
  }
  let merged = htmlBuilder(options, test)
  expect(merged).toBe(result);
});
test("test cookies placeholder merge", () => {
  let result = `Analytics cookies (2)<br><div class=\"gaconsent-cookieInfo\"><p><i>A</i></p><p></p><p></p><a target='_new' href=\"http://google.com?q=A privacy policy\">Privacy policy</a></div><div class=\"gaconsent-cookieInfo\"><p><i>B</i></p><p></p><p></p><a target='_new' href=\"http://google.com?q=B privacy policy\">Privacy policy</a></div>`
  let test = `__textAnalytics__<br>__analyticsPlaceholder__`
  let options = {
    texts: {
      textAnalytics: `Analytics cookies (__analytics__)`,
    },
    cookies: {
      analytics: { used: [{ name: 'A' }, { name: 'B', }] }
    }
  }
  let merged = htmlBuilder(options, test)
  expect(merged).toBe(result);
});