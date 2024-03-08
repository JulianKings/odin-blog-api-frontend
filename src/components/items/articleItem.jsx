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
        <section className='article-item'>
            <div className='article-item-image'>
                <img src={imageUrl} />
            </div>
            <div className='article-item-content'>
                <div className='article-item-information'>
                    <div className='article-item-category'>{article.category.name}</div>
                    <div className='article-item-time'>{minuteRead} min read</div>
                </div>
                <div className='article-item-title'>{article.title}</div>
                <div className='article-item-description'>{article.description}</div>
                <div className='article-item-button'>
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