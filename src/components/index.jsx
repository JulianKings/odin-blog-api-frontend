import '../style/index.css'
import newspaperImage from '../assets/newspaper.webp'
import LatestArticleItem from './items/latestArticleItem';
import { useEffect, useRef, useState } from 'react';
import PopularArticles from './popularArticles';
import { Link, useNavigate } from 'react-router-dom';

function Index()
{
    const [articleList, setArticleList] = useState(null);
    const [featuredArticle, setFeaturedArticle] = useState(null);
    const mailInput = useRef(null);
    const navigate = useNavigate();

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

    let latestArticleList = (<div className='loading-prompt'>Loading Articles...</div>);

    if(articleList && articleList.length > 0)
    {
        latestArticleList = articleList.map((art) => <LatestArticleItem key={art._id} article={art}></LatestArticleItem>)
    } else if(articleList) {
        latestArticleList = (<div className='loading-prompt'>No articles available.</div>);
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
        <section className='main-article'>
            <div className='main-article-content'>
                <div className='main-article-title'>Tech keeps evolving. Be up to date</div>
                <div className='main-article-description'>In this blog you can discover the latest news on everything that&apos;s happening in the tech industry, with just a few clicks</div>
                <div className='main-article-button'>
                    <Link to='/articles'>
                        <button type='button'>Start Reading</button>
                    </Link>
                </div>
            </div>
            <div className='main-article-image'>
                <img src={newspaperImage} />
            </div>
        </section>
        <section className='latest-articles'>
            <div className='latest-articles-title'>Latest articles</div>
            <div className='latest-articles-holder'>
                {latestArticleList}
            </div>
        </section>
        <section className='featured-article'>
            <div className='featured-article-image'>
                <img src={featuredArticleImage} />
            </div>
            <div className='featured-article-content'>
                <div className='featured-article-information'>
                    <div className='featured-article-category'>{(featuredArticle) ? featuredArticle.category.name : 'Unknown category'}</div>
                    <div className='featured-article-time'>{featuredArticleMinuteRead} min read</div>
                </div>
                <div className='featured-article-title'>{(featuredArticle) ? featuredArticle.title : 'Unknown title'}</div>
                <div className='featured-article-description'>{(featuredArticle) ? featuredArticle.description : 'Unknown description'}</div>
                <div className='featured-article-button'>
                    <Link to={featuredArticleLink}>
                        <button type='button'>Read Article</button>
                    </Link>
                </div>
            </div>
        </section>
        <PopularArticles></PopularArticles>
        <section className='newsletter'>
            <div className='newsletter-content'>
                <div className='newsletter-title'>Subscribe to our newsletter</div>
                <div className='newsletter-description'>Get the latest tech insights in your e-mail.</div>
            </div>
            <form method="post" onSubmit={sendSubscription}>
            <div className='newsletter-input'>
                <input ref={mailInput} type='text' id='email-holder' name='email' placeholder='Enter your email' />
                <button type='submit'>Subscribe</button>
            </div>
            </form>
        </section>
    </>

    function sendSubscription(event)
    {
        event.preventDefault();
        if(mailInput.current)
        {
            const requestBody = {
                email: mailInput.current.value
            }
            // ask the backEnd
            fetch("http://localhost:3000/subscribe", { 
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                mode: "cors",
                dataType: 'json',
                body: JSON.stringify(requestBody),
            })
            .then((response) => {
            if (response.status >= 400) {
                throw new Error("server error");
            }
            return response.json();
            })
            .then((response) => {
                if(response.responseStatus)
                {
                    if(response.responseStatus === 'validSubscription')
                    {
                        navigate(0);
                    }
                }            
            })
            .catch((error) => {
                throw new Error(error);
            });
        }
    }
}

export default Index;