// メッセージを追加していく配列。
const comments = [];

//　メッセージのID。メッセージが追加されると増える。
let nextID = 1;

// ダミーDBに格納する１件ごとのデータ構造
class Comment {
  constructor({ username, body }) {
    this.id = nextID++;
    this.username = username;
    this.body = body;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

// ダミーDBにデータを追加する
for (let i = 0; i < 5; i++) {
  const comment = new Comment({
    username: "ユーザー" + i,
    body: "コメント" + i
  });
  comments.push(comment);
}

// CRUD機能
module.exports = {
  findAll: () => {
    return comments.slice();
  },
  create: ({ username, body }) => {
    if (!username) {
      throw new Error("ユーザー名は必須です");
    }
    if (!body) {
      throw new Error("コメントは必須です");
    }

    const comment = new Comment({
      username: username,
      body: body
    });
    comments.push(comment);

    return comment;
  },
  update: ({ id, username, body }) => {
    if (typeof id !== "number" || id < 1) {
      throw new Error("IDは必須です（１以上の数値）");
    }
    if (!username) {
      throw new Error("ユーザー名は必須です");
    }
    if (!body) {
      throw new Error("コメントは必須です");
    }

    const comment = comments.find(comment => id === comment.id);
    if (!comment) {
      throw new Error("IDに該当するコメントが見つかりません");
    }

    comment.username = username;
    comment.body = body;
    comment.updatedAt = new Date();

    return comment;
  }
};
