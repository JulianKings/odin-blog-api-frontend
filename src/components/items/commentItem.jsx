import { DateTime } from 'luxon';
import '../../style/commentItem.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CommentItem({comment, showArticle})
{
    let luxonDatetime = DateTime.fromISO(comment.timestamp);
    let showArticleContent = '';

    if(showArticle)
    {
        let articleLink = '/article/' + comment.article._id;
        showArticleContent = (<div className='comment-article'>
            <span>From: </span>
            <Link to={articleLink}>{comment.article.title}</Link>
        </div>);
    }

    let commentLink = '/comments/' + comment.author._id;

    let commentMessage = (new DOMParser()).parseFromString(comment.message, "text/html").documentElement.textContent;

    return <>
        <div className='comment-item'>
            {showArticleContent}
            <div className='comment-message'>{commentMessage}</div>
            <hr />
            <div className='comment-information'>
                <div className='comment-author'><Link to={commentLink}>{comment.author.first_name} {comment.author.last_name}</Link></div>
                <div className='comment-time'>{luxonDatetime.toFormat('yyyy LLL dd')}<span className='dot'></span>{luxonDatetime.toFormat("hh':'mm a")}</div>
            </div>
        </div>
    </>;
}

CommentItem.propTypes = {
    comment: PropTypes.object,
    showArticle: PropTypes.bool
}

export default CommentItem