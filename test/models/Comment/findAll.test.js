const assert = require("power-assert");
const Comment = require("../../../models/Comment");

describe("Comment.findAll", () => {
  it("Comment.findAllはメソッドである", () => {
    assert.equal(typeof Comment.findAll === "function", true);
  });

  it("決められたデータ構造でデータが格納されている", () => {
    const comments = Comment.findAll();
    assert.equal(Array.isArray(comments), true);
    assert.equal(comments.length > 0, true);
    comments.forEach(comment => {
      assert.deepStrictEqual(Object.assign({}, comment), {
        id: comment.id,
        username: comment.username,
        body: comment.body,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt
      });
    });
  });
});
