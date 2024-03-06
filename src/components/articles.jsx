import '../style/articles.css'
import ArticleItem from "./items/articleItem"

function Articles() {
    return <>
        <div className="article-content-holder">
            <div className="article-content">
                <ArticleItem></ArticleItem>
                <ArticleItem></ArticleItem>
                <ArticleItem></ArticleItem>
            </div>

        </div>
    </>
}

export default Articles