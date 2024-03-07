import { Link } from 'react-router-dom';
import '../../style/articleItem.css';
import PropTypes from 'prop-types';


function ArticleItem({article}) {
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
        <section className='articleItem'>
            <div className='articleItemImage'>
                <img src={imageUrl} />
            </div>
            <div className='articleItemContent'>
                <div className='articleItemInformation'>
                    <div className='articleItemCategory'>{article.category.name}</div>
                    <div className='articleItemTime'>{minuteRead} min read</div>
                </div>
                <div className='articleItemTitle'>{article.title}</div>
                <div className='articleItemDescription'>{article.description}</div>
                <div className='articleItemButton'>
                    <Link to={articleUrl}>
                        <button type='button'>Read Article</button>
                    </Link>
                </div>
            </div>
        </section>
    </>
}

ArticleItem.propTypes = {
    article: PropTypes.object
}

export default ArticleItem