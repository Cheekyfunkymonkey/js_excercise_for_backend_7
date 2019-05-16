// メッセージを追加していく配列。
const comments = [];

//　メッセージのID。メッセージが追加されると増える。
let nextID = 1;

// ダミーDBに格納する１件ごとのデータ構造
class Comment {
    constructor({username, body}) {
        this.id = nextID++;
        this.username = username;
        this.body = body;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

// CRUD機能
module.exports = {};