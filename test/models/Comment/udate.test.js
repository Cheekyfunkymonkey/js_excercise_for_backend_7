const assert = require("power-assert");
const Comment = require("../../../models/Comment");

describe("Comment.update", () => {
  it("Comment.updateはメソッドである", () => {
    assert.equal(typeof Comment.update, "function");
  });

  it("メソッド実行時に引数にID（１以上の数字）がないとエラーになる", () => {
    const invalidDataList = [
      {},
      { id: 0 },
      { id: -1 },
      { id: null },
      { id: {} },
      { id: [] },
      { id: "1" }
    ];

    invalidDataList.forEach(data => {
      try {
        Comment.update(data);
        assert.fail();
      } catch (error) {
        assert.equal(error.message, "IDは必須です（１以上の数値）");
      }
    });
  });

  it("メソッド実行時に引数のオブジェクトにusernameプロパティがないとエラーになる", () => {
    try {
      Comment.update({ id: 1, body: "コメント" });
    } catch (error) {
      assert.equal(error.message, "ユーザー名は必須です");
    }
  });

  it("メソッド実行時に引数のオブジェクトにbodyプロパティがないとエラーになる", () => {
    try {
      Comment.update({ id: 1, username: "ユーザー名" });
      assert.fail();
    } catch (error) {
      assert.equal(error.message, "コメントは必須です");
    }
  });

  it("メソッド実行時にIDに紐づくデータがないとエラーになる", () => {
    const notExistedId = 999999;
    try {
      Comment.update({
        id: notExistedId,
        username: "ユーザー名",
        body: "コメント"
      });
      assert.fail();
    } catch (error) {
      assert.equal(error.message, "IDに該当するコメントが見つかりません");
    }
  });

  it("メソッド実行後に正しい引数を渡すとIDに該当する既存コメントを更新して更新したコメントを返す", () => {
    const data = {
      id: 1,
      username: "更新後のユーザー名",
      body: "更新後のコメント"
    };
    const updatedComment = Comment.update(data);

    assert.deepStrictEqual(
      { ...updatedComment },
      {
        id: updatedComment.id,
        username: data.username,
        body: data.body,
        createdAt: updatedComment.createdAt,
        updatedAt: updatedComment.updatedAt
      }
    );
    const currentComments = Comment.findAll();
    assert.deepStrictEqual(currentComments[0], updatedComment);
    assert.equal(updatedComment.updatedAt > updatedComment.createdAt, true);
  });
});
