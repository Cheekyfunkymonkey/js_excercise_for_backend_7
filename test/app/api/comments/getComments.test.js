const request = require("supertest");
const assert = require("power-assert");
const app = require("../../../../app");

describe("test GET /api/comments", () => {
  it("return comments in response.body", async () => {
    const response = await request(app)
      .get("/api/comments")
      .set("Accept", "application/json")
      .expect("Content-Type", /application\/json/)
      .expect(200);

    const comments = response.body;
    assert.equal(Array.isArray(comments), true);
    comments.forEach(comment => {
      assert.equal(typeof comment.id, "number");
      assert.equal(typeof comment.username, "string");
      assert.equal(typeof comment.body, "string");
      assert.equal(typeof comment.createdAt, "string");
      assert.equal(typeof comment.updatedAt, "string");
    });
  });
});
