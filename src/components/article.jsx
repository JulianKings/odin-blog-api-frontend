/* eslint-disable react-hooks/exhaustive-deps */
import { DateTime } from 'luxon';
import '../style/article.css';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import CommentItem from './items/commentItem';
import heartIcon from '../assets/heart.svg';
import filledHeartIcon from '../assets/heart_filled.svg';
import starIcon from '../assets/star.svg';
import filledStarIcon from '../assets/filled_star.svg';
import DOMPurify from 'dompurify';
import parser from 'html-react-parser';

function Article()
{
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [commentList, setCommentList] = useState(null);
    const [articleLike, setArticleLike] = useState(null);
    const [articleSaved, setArticleSaved] = useState(null);
    const [userObject] = useOutletContext();
    const commentInput = useRef(null);
    const articleLikeBox = useRef(null);
    const articleSaveBox = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Get popular articles
        fetch("https://odin-blog-app-904858222abf.herokuapp.com/article/" + id, {                
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

    useEffect(() => {
        if(userObject && article && localStorage.getItem('sso_token'))
        {
            const ssoToken = localStorage.getItem('sso_token');
            
            fetch("https://odin-blog-app-904858222abf.herokuapp.com/sso/check_like/" + article._id, {                
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + ssoToken
                },
                mode: "cors",
                dataType: 'json'
            })
            .then((response) => {
            if (response.status >= 400) {
                throw new Error("server error");
            }
            return response.json();
            })
            .then((response) => {
                if(response && response.responseStatus === 'articleLikeFound')
                {
                    setArticleLike(true);
                }
            })
            .catch((error) => {
                throw new Error(error);
            })

            fetch("https://odin-blog-app-904858222abf.herokuapp.com/sso/check_saved_article/" + article._id, {                
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + ssoToken
                },
                mode: "cors",
                dataType: 'json'
            })
            .then((response) => {
            if (response.status >= 400) {
                throw new Error("server error");
            }
            return response.json();
            })
            .then((response) => {
                if(response && response.responseStatus === 'articleSavedFound')
                {
                    setArticleSaved(true);
                }
            })
            .catch((error) => {
                throw new Error(error);
            })
        }
    }, [article]);

    let articleContent = (<p>Loading article...</p>);

    if(article && commentList)
    {
        let articleTime = article.timestamp;
        let imageUrl = (article.imageUrl === '' ? '/src/assets/newspaper.webp' : article.imageUrl);

        let luxonDatetime = DateTime.fromISO(articleTime);

        let likeContent = '';
        let savedContent = '';

        let commentContent = 'There are no comments right now.';

        if(commentList.length > 0)
        {
            commentContent = commentList.map((com) => <CommentItem key={com._id} comment={com} userInstance={userObject}></CommentItem>)
        }

        let commentForm = '';

        if(userObject)
        {
            if(!articleLike)
            {
                likeContent = <div ref={articleLikeBox} onClick={likeArticle} className='article-like article-scale'><img src={heartIcon} alt='Like button' /> <span>{article.likes} likes</span></div>;
            } else {
                likeContent = <div ref={articleLikeBox} className='article-like'><img src={filledHeartIcon} alt='Like button' /> <span>{article.likes} likes</span></div>;
            }

            if(!articleSaved)
            {
                savedContent = <div ref={articleSaveBox} onClick={saveArticle} className='article-save article-scale'><img src={starIcon} alt='Save button' /></div>;
            } else {
                savedContent = <div ref={articleSaveBox} onClick={saveArticle} className='article-save article-scale'><img src={filledStarIcon} alt='Save button' /></div>;
            }
            
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

        const cleanContent = (new DOMParser().parseFromString(article.message, "text/html")).documentElement.textContent;
        const sanitizeContent = DOMPurify.sanitize(cleanContent);

        articleContent = (<div className='single-article-content-holder'>
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
            <div className='article-message'>{parser(sanitizeContent)}</div>
            <div className='article-extra'>{likeContent} {savedContent}</div>
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

    function likeArticle()
    {
        if(articleLikeBox.current && userObject && article && localStorage.getItem('sso_token'))
        {
            articleLikeBox.current.innerHTML = "<img src=" + filledHeartIcon + " alt='Like button' /> <span>" + (article.likes + 1) + " likes</span>"
            if(articleLikeBox.current.classList.contains('article-scale'))
            {
                articleLikeBox.current.classList.remove('article-scale');
            }
            const ssoToken = localStorage.getItem('sso_token');
            fetch("https://odin-blog-app-904858222abf.herokuapp.com/sso/do_like/" + article._id, {                
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + ssoToken
                },
                mode: "cors",
                dataType: 'json'
            })
            .then((response) => {
            if (response.status >= 400) {
                // rectify UI
                articleLikeBox.current.innerHTML = "<img src=" + heartIcon + " alt='Like button' /> <span>" + (article.likes) + " likes</span>"
                if(!articleLikeBox.current.classList.contains('article-scale'))
                {
                    articleLikeBox.current.classList.add('article-scale');
                }

                throw new Error("server error");
            }
            return response.json();
            })
            .then((response) => {
                if(response && response.responseStatus === 'articleLiked')
                {
                    // TODO maybe add like completion animation?
                    setArticleLike(true);
                    const newLikeCount = (article.likes) + 1;
                    const updatedArticle = {
                        ...article,
                        likes: newLikeCount
                    }
                    setArticle(updatedArticle);
                } else {
                    // rectify UI
                    articleLikeBox.current.innerHTML = "<img src=" + heartIcon + " alt='Like button' /> <span>" + (article.likes) + " likes</span>"
                    if(!articleLikeBox.current.classList.contains('article-scale'))
                    {
                        articleLikeBox.current.classList.add('article-scale');
                    }
                }
            })
            .catch((error) => {
                // rectify UI
                articleLikeBox.current.innerHTML = "<img src=" + heartIcon + " alt='Like button' /> <span>" + (article.likes) + " likes</span>"
                if(!articleLikeBox.current.classList.contains('article-scale'))
                {
                    articleLikeBox.current.classList.add('article-scale');
                }

                throw new Error(error);
            })
        }
    }

    function saveArticle()
    {
        if(articleSaveBox.current && userObject && article && localStorage.getItem('sso_token'))
        {
            if(articleSaved)
            {
                articleSaveBox.current.innerHTML = "<img src=" + starIcon + " alt='Save button' />"
            } else {
                articleSaveBox.current.innerHTML = "<img src=" + filledStarIcon + " alt='Save button' />"
            }

            const ssoToken = localStorage.getItem('sso_token');
            fetch("https://odin-blog-app-904858222abf.herokuapp.com/sso/do_save_article/" + article._id, {                
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + ssoToken
                },
                mode: "cors",
                dataType: 'json'
            })
            .then((response) => {
            if (response.status >= 400) {
                // rectify UI
                if(!articleSaved)
                {
                    articleSaveBox.current.innerHTML = "<img src=" + starIcon + " alt='Save button' />"
                } else {
                    articleSaveBox.current.innerHTML = "<img src=" + filledStarIcon + " alt='Save button' />"
                }

                throw new Error("server error");
            }
            return response.json();
            })
            .then((response) => {
                if(response && response.responseStatus === 'articleSaved')
                {
                    // TODO maybe add like completion animation?
                    setArticleSaved(true);
                } else if(response && response.responseStatus === 'articleRemovedSave')
                {
                    // TODO maybe add like completion animation?
                    setArticleSaved(false);
                } else {
                    // rectify UI                    
                    if(!articleSaved)
                    {
                        articleSaveBox.current.innerHTML = "<img src=" + starIcon + " alt='Save button' />"
                    } else {
                        articleSaveBox.current.innerHTML = "<img src=" + filledStarIcon + " alt='Save button' />"
                    }
                }
            })
            .catch((error) => {
                // rectify UI
                if(!articleSaved)
                {
                    articleSaveBox.current.innerHTML = "<img src=" + starIcon + " alt='Save button' />"
                    if(!articleSaveBox.current.classList.contains('article-scale'))
                    {
                        articleSaveBox.current.classList.add('article-scale');
                    }
                } else {
                    articleSaveBox.current.innerHTML = "<img src=" + filledStarIcon + " alt='Save button' />"
                    if(articleSaveBox.current.classList.contains('article-scale'))
                    {
                        articleSaveBox.current.classList.remove('article-scale');
                    }
                }

                throw new Error(error);
            })
        }
    }

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
            fetch("https://odin-blog-app-904858222abf.herokuapp.com/sso/comment", { 
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