import '../style/index.css'
import newspaperImage from '../assets/newspaper.webp'
import ArticleItem from './items/articleItem';
import PopularArticleItem from './items/popularArticleItem';

function Index()
{
    return <>
        <section className='mainArticle'>
            <div className='mainArticleContent'>
                <div className='mainArticleTitle'>Tech keeps evolving. Be up to date</div>
                <div className='mainArticleDescription'>In this blog you can discover the latest news on everything that&apos;s happening in the tech industry, with just a few clicks</div>
                <div className='mainArticleButton'>
                    <button type='button'>Start Reading</button>
                </div>
            </div>
            <div className='mainArticleImage'>
                <img src={newspaperImage} />
            </div>
        </section>
        <section className='latestArticles'>
            <div className='latestArticlesTitle'>Latest articles</div>
            <div className='latestArticlesHolder'>
                <ArticleItem></ArticleItem>
                <ArticleItem></ArticleItem>
                <ArticleItem></ArticleItem>
                <ArticleItem></ArticleItem>
                <ArticleItem></ArticleItem>
                <ArticleItem></ArticleItem>
            </div>
        </section>
        <section className='featuredArticle'>
            <div className='featuredArticleImage'>
                <img src={newspaperImage} />
            </div>
            <div className='featuredArticleContent'>
                <div className='featuredArticleInformation'>
                    <div className='featuredArticleCategory'>Category</div>
                    <div className='featuredArticleTime'>4 min read</div>
                </div>
                <div className='featuredArticleTitle'>Is AI taking over your job soon?</div>
                <div className='featuredArticleDescription'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</div>
                <div className='featuredArticleButton'>
                    <button type='button'>Read Article</button></div>
            </div>
        </section>
        <section className='popularArticles'>
            <div className='popularArticlesTitle'>
                Most popular articles
            </div>
            <div className='popularArticlesContainer'>
                <div className='mainPopularArticle'>
                    <div className='mainPopularArticleImage'>
                        <img src={newspaperImage} />
                    </div>
                    <div className='mainPopularArticleContent'>
                        <div className='mainPopularArticleInformation'>
                            <div className='mainPopularArticleCategory'>Category</div>
                            <div className='mainPopularArticleTime'>4 min read</div>
                        </div>
                        <div className='mainPopularArticleTitle'>Is AI taking over your job soon?</div>
                        <div className='mainPopularArticleDescription'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</div>
                    </div>
                </div>
                <div className='popularArticlesList'>
                    <PopularArticleItem />
                    <PopularArticleItem />
                    <PopularArticleItem />
                    <PopularArticleItem />
                </div>
            </div>
        </section>
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