// 引入[断言]模块，因为是在webpack之前，所以不支持import

var assert = require("assert");

import { parseHTML } from "../src/parser.js";

// 简要描述
describe("parse html:", function () {
  // 用例1
  it("<a>abc</a>", function () {
    let tree = parseHTML("<a>abc</a>");
    console.log(tree);
    assert.equal(tree.children[0].tagName, "a");
    assert.equal(tree.children[0].children.length, 1);
  });
  it("<a href='www.baidu.com'>abc</a>", function () {
    let tree = parseHTML("a href='www.baidu.com'>abc</a>");
    console.log(tree);
    assert.equal(tree.children[0].tagName, "a");
    assert.equal(tree.children[0].children.length, 1);
  });
});
