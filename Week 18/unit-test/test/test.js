// 引入[断言]模块，因为是在webpack之前，所以不支持import

// var add = require("../add.js");
import { add } from "../add.js";
var assert = require("assert");

// 简要描述
describe("add function testing", function () {
  // 用例1
  it("1+2 should be 3", function () {
    assert.equal(add(1, 2), 3);
  });

  // 用例2
  it("-5+2 should be -3", function () {
    assert.equal(add(-5, 2), -3);
  });
});
