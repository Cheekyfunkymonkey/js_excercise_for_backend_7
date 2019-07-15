const assert = require("power-assert");
const Comment = require("../../../models/Comment");

describe("Comment.remove", () => {
  it("Comment.removeはメソッドである", () => {
    assert.equal(typeof Comment.remove, "function");
  });

  it("メソッド実行時に引数のIDが１以上の数字でないとエラーになる", () => {
    const invalidIDList = [0, -1, null, {}, [], "1"];

    invalidIDList.forEach(id => {
      try {
        Comment.remove(id);
        assert.fail();
      } catch (error) {
        assert.equal(error.message, "IDは必須です（１以上の数値）");
      }
    });
  });

  it("メソッド実行時にIDに紐づくデータがないとエラーになる", () => {
    const notExistedId = 999999;
    try {
      Comment.remove(notExistedId);
      assert.fail();
    } catch (error) {
      assert.equal(error.message, "IDに該当するコメントが存在しません");
    }
  });

  it("メソッド実行後に正しいIDを渡すと該当する既存コメントを削除して削除したコメントを返す", () => {
    const oldComments = Comment.findAll();
    const existedID = 4;

    const removedComment = Comment.remove(existedID);

    assert.deepStrictEqual(
      { ...removedComment },
      {
        id: existedID,
        username: removedComment.username,
        body: removedComment.body,
        createdAt: removedComment.createdAt,
        updatedAt: removedComment.updatedAt
      }
    );
    const currentComments = Comment.findAll();
    assert.equal(
      oldComments.length,
      currentComments.length + 1,
      "Todo.removeメソッドが成功した後はTodoの件数が１件少なくなっているはず"
    );
  });
});
