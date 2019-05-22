const assert = require("power-assert");
const Comment = require("../../../models/Comment");

describe("Comment.create", () => {
  it("Comment.createはメソッドである", () => {
    assert.equal(typeof Comment.create === "function", true);
  });

  it("メソッド実行時に引数のオブジェクトにusernameプロパティがないとエラーになる", () => {
    dataList = [{}, { body: "コメント" }];
    dataList.forEach(data => {
      try {
        Comment.create(data);
        assert.fail();
      } catch (error) {
        assert.equal(error.message, "ユーザー名は必須です");
      }
    });
  });

  it("メソッド実行時に引数のオブジェクトにbodyプロパティがないとエラーになる", () => {
    try {
      Comment.create({ username: "ユーザー名" });
      assert.fail();
    } catch (error) {
      assert.equal(error.message, "コメントは必須です");
    }
  });

  it("メソッド実行後に正しい引数を渡すと新規にコメントを作成してコメントが１件追加される", () => {
    const oldComments = Comment.findAll();
    const data = { username: "ユーザー名", body: "コメント" };
    const createdComment = Comment.create(data);

    assert.deepStrictEqual(
      { ...createdComment },
      {
        id: createdComment.id,
        username: createdComment.username,
        body: createdComment.body,
        createdAt: createdComment.createdAt,
        updatedAt: createdComment.updatedAt
      }
    );
    const currentComments = Comment.findAll();
    assert.equal(oldComments.length + 1, currentComments.length);
  });
});
