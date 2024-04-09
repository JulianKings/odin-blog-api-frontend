import PopularArticleItem from "./items/popularArticleItem";
import newspaperImage from '../assets/newspaper.webp'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PopularArticles()
{
    const [popularArticleList, setPopularArticleList] = useState(null);

    useEffect(() => {
        // Get popular articles
        fetch("https://odin-blog-app-904858222abf.herokuapp.com/article/popular", {                
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
                setPopularArticleList(response.articles);
            }
        })
        .catch((error) => {
            throw new Error(error);
        })
    }, []);

    let mainArticle = null;

    if(popularArticleList && popularArticleList.length > 0)
    {
        mainArticle = popularArticleList[0];
    }

    let mainArticleImage = newspaperImage;
    let mainArticleMinuteRead = 'Unknown';
    let mainArticleLink = '/';

    if(mainArticle)
    {
        let wordArray = mainArticle.message.split(' ');
        // Average 238 words per minute per reading speed statistic
        mainArticleMinuteRead = Math.floor(wordArray.length / 238);

        if(mainArticleMinuteRead === 0)
        {
            mainArticleMinuteRead = 'less than 1';
        }

        mainArticleImage = (mainArticle.imageUrl === '' ? '/src/assets/newspaper.webp' : mainArticle.imageUrl);
        mainArticleLink = '/article/' + mainArticle._id;
    }

    let popularListContent = (<div className='loading-articles-prompt'>Loading articles...</div>)

    if(popularArticleList && popularArticleList.length > 1)
    {
        let slicedArticleList = popularArticleList.slice(1);
        popularListContent = slicedArticleList.map((art) => <PopularArticleItem key={art._id} article={art}></PopularArticleItem>)
    } else {
        popularListContent = (<div className='loading-articles-prompt'>No articles found</div>)
    }

    return (<>
        <section className='popular-articles'>
            <div className='popular-articles-title'>
                Most popular articles
            </div>
            <div className='popular-articles-container'>
                <div className='main-popular-article'>
                    <div className='main-popular-article-image'>
                        <img src={mainArticleImage} />
                    </div>
                    <div className='main-popular-article-content'>
                        <div className='main-popular-article-information'>
                            <div className='main-popular-article-category'>{(mainArticle) ? mainArticle.category.name : 'Unknown category'}</div>
                            <div className='main-popular-article-time'>{mainArticleMinuteRead} min read</div>
                        </div>
                        <div className='main-popular-article-title'><Link to={mainArticleLink}>{(mainArticle) ? mainArticle.title : 'Unknown title'}</Link></div>
                        <div className='main-popular-article-description'>{(mainArticle) ? mainArticle.description : 'Unknown description'}</div>
                    </div>
                </div>
                <div className='popular-articles-list'>
                    {popularListContent}
                </div>
            </div>
        </section>
    </>);
}

export default PopularArticles;