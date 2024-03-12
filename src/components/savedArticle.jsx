import { useEffect, useState } from 'react'
import '../style/articles.css'
import ArticleItem from "./items/articleItem"
import { useNavigate, useOutletContext } from 'react-router-dom';

function SavedArticles() {
    const [articleList, setArticleList] = useState(null);
    const [userObject] = useOutletContext();
    const navigate = useNavigate();

    if(!localStorage.getItem('sso_token'))
    {
        navigate('/');
    }

    useEffect(() => {
        if(userObject && localStorage.getItem('sso_token'))
        {
            const ssoToken = localStorage.getItem('sso_token');
            
            fetch("http://localhost:3000/sso/get_saved_articles", {                
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + ssoToken
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
        }

    }, [userObject]);

    let articleContent = (<div className='loadingPrompt'>Loading articles...</div>)

    if(articleList && articleList.length > 0)
    {
        articleContent = articleList.map((art) => <ArticleItem key={art._id} article={art.article}></ArticleItem>)
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

export default SavedArticles