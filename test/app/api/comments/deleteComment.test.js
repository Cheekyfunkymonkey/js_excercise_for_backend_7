const assert = require("power-assert");
const requestHelper = require("../../../helper/requestHelper");

const getComments = async () => {
  const response = await requestHelper.request({
    method: "get",
    endPoint: "/api/comments",
    statusCode: 200
  });

  return response.body;
};

const VALID_ID = 1;
const INVALID_ID = 99999999;

describe("test DELETE /api/comments/:id", () => {
  it("idが不正な場合はエラーになる", async () => {
    const response = await requestHelper.request({
      method: "delete",
      endPoint: `/api/comments/${INVALID_ID}`,
      statusCode: 400
    });

    assert.deepEqual(response.body, {
      message: "IDに該当するコメントが存在しません"
    });
  });

  it("存在するIDを送信したら成功する", async () => {
    const oldComments = await getComments();

    const response = await requestHelper.request({
      method: "delete",
      endPoint: `/api/comments/${VALID_ID}`,
      statusCode: 200
    });

    const deletedComment = response.body;
    assert.deepStrictEqual(
      { ...deletedComment },
      {
        id: VALID_ID,
        username: deletedComment.username,
        body: deletedComment.body,
        createdAt: deletedComment.createdAt,
        updatedAt: deletedComment.updatedAt
      }
    );

    const currentComments = await getComments();

    assert.equal(
      oldComments.length,
      currentComments.length + 1,
      "削除後はデータが１件減っている"
    );

    assert.deepStrictEqual(
      oldComments[0],
      deletedComment,
      `削除前の１件目のデータは${VALID_ID}である`
    );

    assert.notDeepStrictEqual(
      currentComments[0],
      deletedComment,
      `削除後の１件目のデータは${VALID_ID}ではない`
    );
  });
});
