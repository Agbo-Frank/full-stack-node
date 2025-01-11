"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const article = new mongoose_1.Schema({
    articles: String,
    due_date: Date,
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});
const Article = (0, mongoose_1.model)("article", article);
exports.default = Article;
//# sourceMappingURL=articles.js.map