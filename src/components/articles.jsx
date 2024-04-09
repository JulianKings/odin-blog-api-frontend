import { useEffect, useState } from 'react'
import '../style/articles.css'
import ArticleItem from "./items/articleItem"

function Articles() {
    const [articleList, setArticleList] = useState(null);

    useEffect(() => {
        fetch("https://odin-blog-app-904858222abf.herokuapp.com/article/all", {                
            headers: {
                'Content-Type': 'application/json'
            },
            mode: "cors",
            dataType: 'json',
         })
        .then((response) => {
          if (response.status >= 400) {
            throw new Error("server error");
          }
          return response.json();
        })
        .then((response) => {
            if(response && response.responseStatus === 'validRequest')
            {
                setArticleList(response.articles);
            }
        })
        .catch((error) => {
            throw new Error(error);
        })
    }, []);

    let articleContent = (<div className='loadingPrompt'>Loading articles...</div>)

    if(articleList && articleList.length > 0)
    {
        articleContent = articleList.map((art) => <ArticleItem key={art._id} article={art}></ArticleItem>)
    } else if(articleList) {
        articleContent = (<div className='loadingPrompt'>No articles available.</div>);
    }

    return <>
        <div className="article-content-holder">
            <div className="article-content">
                {articleContent}
            </div>

        </div>
    </>
}

export default Articles