export interface IArticle {
    articles: string;
    due_date: string;
}
declare const Article: import("mongoose").Model<IArticle, {}, {}, {}, import("mongoose").Document<unknown, {}, IArticle> & IArticle & {
    _id: import("mongoose").Types.ObjectId;
}, any>;
export default Article;
