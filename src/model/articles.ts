import { model, Schema } from "mongoose";

export interface IArticle {
  articles: string
  due_date: string
}

const article = new Schema<IArticle>({
  articles: String,
  due_date: Date,
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
})

const Article = model<IArticle>("article", article)
export default Article