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

    let imageUrl = (article.imageUrl === '' ? './src/assets/newspaper.webp' : article.imageUrl);

    return <>
        <div className='latestArticleItem'>
            <div className='latestArticleImage'>
                <img src={imageUrl} />
            </div>
            <div className='latestArticleContent'>
                <div className='latestArticleInformation'>
                    <div className='latestArticleCategory'>{article.category.name}</div>
                    <div className='latestArticleTime'>{minuteRead} min read</div>
                </div>
                <div className='latestArticleTitle'>{article.title}</div>
                <div className='latestArticleDescription'>{article.description}</div>
            </div>
        </div>
    </>;
}

LatestArticleItem.propTypes = {
    article: PropTypes.object
}

export default LatestArticleItem;