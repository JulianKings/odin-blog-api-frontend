/* eslint-disable react-hooks/exhaustive-deps */
import { DateTime } from 'luxon';
import '../style/article.css';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import CommentItem from './items/commentItem';

function Article()
{
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [commentList, setCommentList] = useState(null);
    const [userObject] = useOutletContext();
    const commentInput = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Get popular articles
        fetch("http://localhost:3000/article/" + id, {                
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
                setArticle(response.article);
                setCommentList(response.comments);
            } else if(response && response.responseStatus === 'articleNotFound')
            {
                navigate('/');
            }
        })
        .catch((error) => {
            throw new Error(error);
        })
    }, [])

    let articleContent = (<p>Loading article...</p>);

    if(article && commentList)
    {
        let articleTime = article.timestamp;
        let imageUrl = (article.imageUrl === '' ? '/src/assets/newspaper.webp' : article.imageUrl);

        let luxonDatetime = DateTime.fromISO(articleTime);

        let commentContent = 'There are no comments right now.';

        if(commentList.length > 0)
        {
            commentContent = commentList.map((com) => <CommentItem key={com._id} comment={com}></CommentItem>)
        }

        let commentForm = '';

        if(userObject)
        {
            commentForm = (<form method='post' onSubmit={submitComment}>
                <div className='article-comment-form'>                
                    <div className='article-comment-form-input'>
                        <textarea rows='4' ref={commentInput} id='comment-box' name='comment' placeholder='Please input your comment'>
                        </textarea>
                    </div>
                    <div className='article-comment-form-button'>
                        <button type='submit'>Add comment</button>
                    </div>
                </div>            
            </form>);
        }

        articleContent = (<div className='article-content-holder'>
            <div className='article-back'>
            <Link
                to="page"
                onClick={(e) => {
                    e.preventDefault();
                    navigate(-1);
                }} >
                    &lt; Back
                </Link>
            </div>
            <div className='article-category'>{article.category.name}</div>
            <div className='article-title'>{article.title}</div>
            <div className='article-timestamp'>{luxonDatetime.toFormat('yyyy LLL dd')}<span className='dot'></span>{luxonDatetime.toFormat("hh':'mm a")}</div>
            <div className='article-author'>Written by <span>{article.author.first_name} {article.author.last_name}</span></div>
            <div className='article-image'><img src={imageUrl} /></div>
            <div className='article-message'>{article.message}</div>
            <div className='article-comments'>
                <div className='article-comments-title'>Comments ({commentList.length})</div>
                {commentForm}
                {commentContent}
            </div>
        </div>);
    }

    return <>
        {articleContent}
    </>;

    function submitComment(event)
    {
        event.preventDefault();
        const comment = {};
        comment.comment = commentInput.current.value;
        comment.article_id = id;

        if(commentInput.current && commentInput.current.value && commentInput.current.value.length > 0 && localStorage.getItem('sso_token'))
        {
            // ask the backEnd
            const ssoToken = localStorage.getItem('sso_token');
            fetch("http://localhost:3000/sso/comment", { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + ssoToken
                },
                mode: "cors",
                dataType: 'json',
                body: JSON.stringify(comment),
            })
            .then((response) => {
            if (response.status >= 400) {
                throw new Error("server error");
            }
            return response.json();
            })
            .then((response) => {
                console.log(response);
                if(response.responseStatus)
                {
                    if(response.responseStatus === 'validComment')
                    {
                        // Do JWT stuff
                        let newCommentList = [response.commentResult].concat(commentList);
                        setCommentList(newCommentList);
                    } else {
                        // TODO: notify error
                    }
                }            
            })
            .catch((error) => {
                throw new Error(error);
            });
        }
    }
}

export default Article