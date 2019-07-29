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

describe("test POST /api/comments", () => {
  it("usernameを送らなかったらエラーが返る", async () => {
    const postData = { body: "test body" };

    const response = await requestHelper
      .request({
        method: "post",
        endPoint: "/api/comments",
        statusCode: 400
      })
      .send(postData);

    assert.deepEqual(response.body, { message: "ユーザー名は必須です" });
  });

  it("bodyを送らなかったらエラーが返る", async () => {
    const postData = { username: "test username" };

    const response = await requestHelper
      .request({
        method: "post",
        endPoint: "/api/comments",
        statusCode: 400
      })
      .send(postData);

    assert.deepEqual(response.body, { message: "コメントは必須です" });
  });

  it("username, bodyを送ったら成功する", async () => {
    const oldComments = await getComments();

    const postData = {
      username: "test username",
      body: "test body"
    };

    const response = await requestHelper
      .request({
        method: "post",
        endPoint: "/api/comments",
        statusCode: 200
      })
      .send(postData);

    const createdComment = response.body;
    assert.deepStrictEqual(
      { ...createdComment },
      {
        id: createdComment.id,
        username: postData.username,
        body: postData.body,
        createdAt: createdComment.createdAt,
        updatedAt: createdComment.updatedAt
      }
    );

    const currentComments = await getComments();
    assert.equal(oldComments.length + 1, currentComments.length);
  });
});
