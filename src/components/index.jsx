import '../style/index.css'
import newspaperImage from '../assets/newspaper.webp'
import LatestArticleItem from './items/latestArticleItem';
import { useEffect, useState } from 'react';
import PopularArticles from './popularArticles';
import { Link } from 'react-router-dom';

function Index()
{
    const [articleList, setArticleList] = useState(null);
    const [featuredArticle, setFeaturedArticle] = useState(null);

    useEffect(() => {
        // Get latest articles
        fetch("http://localhost:3000/article", {                
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

        // Get featured article
        fetch("http://localhost:3000/settings", {                
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
                setFeaturedArticle(response.settings.featured_article);
            }
        })
        .catch((error) => {
            throw new Error(error);
        })
    }, []);

    let latestArticleList = (<div className='loadingPrompt'>Loading Articles...</div>);

    if(articleList && articleList.length > 0)
    {
        latestArticleList = articleList.map((art) => <LatestArticleItem key={art._id} article={art}></LatestArticleItem>)
    } else if(articleList) {
        latestArticleList = (<div className='loadingPrompt'>No articles available.</div>);
    }

    let featuredArticleImage = newspaperImage;
    let featuredArticleMinuteRead = 'Unknown';
    let featuredArticleLink = '/';

    if(featuredArticle)
    {
        let wordArray = featuredArticle.message.split(' ');
        // Average 238 words per minute per reading speed statistic
        featuredArticleMinuteRead = Math.floor(wordArray.length / 238);

        if(featuredArticleMinuteRead === 0)
        {
            featuredArticleMinuteRead = 'less than 1';
        }

        featuredArticleImage = (featuredArticle.imageUrl === '' ? '/src/assets/newspaper.webp' : featuredArticle.imageUrl);
        featuredArticleLink = '/article/' + featuredArticle._id;
    }

    return <>
        <section className='mainArticle'>
            <div className='mainArticleContent'>
                <div className='mainArticleTitle'>Tech keeps evolving. Be up to date</div>
                <div className='mainArticleDescription'>In this blog you can discover the latest news on everything that&apos;s happening in the tech industry, with just a few clicks</div>
                <div className='mainArticleButton'>
                    <Link to='/articles'>
                        <button type='button'>Start Reading</button>
                    </Link>
                </div>
            </div>
            <div className='mainArticleImage'>
                <img src={newspaperImage} />
            </div>
        </section>
        <section className='latestArticles'>
            <div className='latestArticlesTitle'>Latest articles</div>
            <div className='latestArticlesHolder'>
                {latestArticleList}
            </div>
        </section>
        <section className='featuredArticle'>
            <div className='featuredArticleImage'>
                <img src={featuredArticleImage} />
            </div>
            <div className='featuredArticleContent'>
                <div className='featuredArticleInformation'>
                    <div className='featuredArticleCategory'>{(featuredArticle) ? featuredArticle.category.name : 'Unknown category'}</div>
                    <div className='featuredArticleTime'>{featuredArticleMinuteRead} min read</div>
                </div>
                <div className='featuredArticleTitle'>{(featuredArticle) ? featuredArticle.title : 'Unknown title'}</div>
                <div className='featuredArticleDescription'>{(featuredArticle) ? featuredArticle.description : 'Unknown description'}</div>
                <div className='featuredArticleButton'>
                    <Link to={featuredArticleLink}>
                        <button type='button'>Read Article</button>
                    </Link>
                </div>
            </div>
        </section>
        <PopularArticles></PopularArticles>
        <section className='newsLetter'>
            <div className='newsLetterContent'>
                <div className='newsLetterTitle'>Subscribe to our newsletter</div>
                <div className='newsLetterDescription'>Get the latest tech insights in your e-mail.</div>
            </div>
            <div className='newsLetterInput'>
                <input type='text' placeholder='Enter your email' />
                <button type='button'>Subscribe</button>
            </div>
        </section>
    </>
}

export default Index;