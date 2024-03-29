import { Link } from 'react-router-dom';
import '../../style/popularArticleItem.css'
import PropTypes from 'prop-types';

function PopularArticleItem({article}) {
    let wordArray = article.message.split(' ');
    // Average 238 words per minute per reading speed statistic
    let minuteRead = Math.floor(wordArray.length / 238);

    if(minuteRead === 0)
    {
        minuteRead = 'less than 1';
    }

    let imageUrl = (article.imageUrl === '' ? '/src/assets/newspaper.webp' : article.imageUrl);
    let articleUrl = '/article/' + article._id;

    return <>
        <div className="popular-article-item">
            <div className='popular-article-image'>
                <img src={imageUrl} />
            </div>
            <div className='popular-article-content'>
                <div className='popular-article-information'>
                    <div className='popular-article-category'>{article.category.name}</div>
                    <div className='popular-article-time'>{minuteRead} min read</div>
                </div>
                <div className='popular-article-title'><Link to={articleUrl}>{article.title}</Link></div>
            </div>

        </div>
    </>
}

PopularArticleItem.propTypes = {
    article: PropTypes.object
}

export default PopularArticleItem