import { cssHelper } from "../helpers/cssHelper";

test("test single merge", () => {
  let result = ` #test {
    background-color: red;
   };`;
  let test = ` #test {
    background-color: __color__;
   };`;
  let merged = cssHelper({ styles: { color: "red" } }, test);
  expect(merged).toBe(result);
});
test("test multiple merge", () => {
  let result = ` #test2 {
    background-color: red;
    color: #ff3355;
   };`;
  let test = ` #test2 {
    background-color: __colorBackground__;
    color: __color__;
   };`;
  let merged = cssHelper(
    { styles: { colorBackground: "red", color: "#ff3355" } },
    test
  );
  expect(merged).toBe(result);
});
test("test repeated merge", () => {
  let result = ` #test {
    background-color: red;
    color: red;
   };`;
  let test = ` #test {
    background-color: __color__;
    color: __color__;
   };`;
  let merged = cssHelper({ styles: { color: "red" } }, test);
  expect(merged).toBe(result);
});
