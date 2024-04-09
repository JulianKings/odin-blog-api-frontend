import { DateTime } from 'luxon';
import '../../style/commentItem.css';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import deleteIcon from '../../assets/delete.svg';

function CommentItem({comment, showArticle, userInstance})
{
    const navigate = useNavigate();
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

    let adminDeletion = '';

    if(userInstance && userInstance.role === 'administrator')
    {
        adminDeletion = <div className='comment-delete'><img src={deleteIcon} onClick={() => { attemptArticleDeletion(); }} /></div>;
    }

    return <>
        <div className='comment-item'>
            {showArticleContent}
            <div className='comment-message'>{commentMessage}</div>
            {adminDeletion}
            <hr />
            <div className='comment-information'>
                <div className='comment-author'><Link to={commentLink}>{comment.author.first_name} {comment.author.last_name}</Link></div>
                <div className='comment-time'>{luxonDatetime.toFormat('yyyy LLL dd')}<span className='dot'></span>{luxonDatetime.toFormat("hh':'mm a")}</div>
            </div>
        </div>
    </>;

    function attemptArticleDeletion()
    {
        if(userInstance && userInstance.role === 'administrator' && localStorage.getItem('sso_token'))
        {
            const requestObject = {
                comment_id: comment._id
            }
            const ssoToken = localStorage.getItem('sso_token');
            // ask the backend
            fetch("https://odin-blog-app-904858222abf.herokuapp.com/sso/admin/comments/force_delete", { 
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + ssoToken
                },
                mode: "cors",
                dataType: 'json',
                body: JSON.stringify(requestObject),
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
                    if(response.responseStatus === 'commentDeleted')
                    {
                        navigate(0);
                    } else {
                        // an error happened
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

CommentItem.propTypes = {
    comment: PropTypes.object,
    showArticle: PropTypes.bool,
    userInstance: PropTypes.object
}

export default CommentItem