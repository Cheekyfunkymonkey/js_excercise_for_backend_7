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

describe("test PUT api/comments/:id", () => {
  it("idが不正な場合はエラーになる", async () => {
    const putData = {
      username: "test username",
      body: "test body"
    };

    const response = await requestHelper
      .request({
        method: "put",
        endPoint: `/api/comments/${INVALID_ID}`,
        statusCode: 400
      })
      .send(putData);

    assert.deepEqual(response.body, {
      message: "IDに該当するコメントが見つかりません"
    });
  });

  it("usernameを送らなかったらエラーになる", async () => {
    const putData = {
      body: "test body"
    };

    const response = await requestHelper
      .request({
        method: "put",
        endPoint: `/api/comments/${VALID_ID}`,
        statusCode: 400
      })
      .send(putData);

    assert.deepEqual(response.body, {
      message: "ユーザー名は必須です"
    });
  });

  it("bodyを送らなかったらエラーになる", async () => {
    const putData = {
      username: "test username"
    };

    const response = await requestHelper
      .request({
        method: "put",
        endPoint: `/api/comments/${VALID_ID}`,
        statusCode: 400
      })
      .send(putData);

    assert.deepEqual(response.body, {
      message: "コメントは必須です"
    });
  });

  it("不備なくデータを送信したら成功する", async () => {
    const oldComments = await getComments();

    const putData = {
      username: "test username",
      body: "test body"
    };

    const response = await requestHelper
      .request({
        method: "put",
        endPoint: `/api/comments/${VALID_ID}`,
        statusCode: 200
      })
      .send(putData);

    const updatedComment = response.body;
    assert.deepStrictEqual(
      { ...updatedComment },
      {
        id: VALID_ID,
        username: putData.username,
        body: putData.body,
        createdAt: updatedComment.createdAt,
        updatedAt: updatedComment.updatedAt
      }
    );

    const currentComments = await getComments();
    assert.notDeepEqual(
      oldComments,
      currentComments,
      "更新前後でid:1のデータは一致しないはず"
    );
  });
});
