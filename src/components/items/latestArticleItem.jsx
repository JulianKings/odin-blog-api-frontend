import { Link } from 'react-router-dom';
import '../../style/latestArticleItem.css';
import PropTypes from 'prop-types';

function LatestArticleItem({article})
{
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
        <div className='latest-article-item'>
            <div className='latest-article-image'>
                <img src={imageUrl} />
            </div>
            <div className='latest-article-content'>
                <div className='latest-article-information'>
                    <div className='latest-article-category'>{article.category.name}</div>
                    <div className='latest-article-time'>{minuteRead} min read</div>
                </div>
                <div className='latest-article-title'><Link to={articleUrl}>{article.title}</Link></div>
                <div className='latest-article-description'>{article.description}</div>
            </div>
        </div>
    </>;
}

LatestArticleItem.propTypes = {
    article: PropTypes.object
}

export default LatestArticleItem;