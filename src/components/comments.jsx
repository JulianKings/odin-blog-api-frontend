/* eslint-disable react-hooks/exhaustive-deps */
import '../style/comments.css';
import { useState, useEffect } from "react"
import CommentItem from './items/commentItem';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

function Comments()
{
    const { id } = useParams();
    const [commentList, setCommentList] = useState(null);
    const [userObject] = useOutletContext();
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://odin-blog-app-904858222abf.herokuapp.com/comment/" + id, {                
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
                setCommentList(response.comments);
            } else if(response && response.responseStatus === 'commentsNotFound')
            {
                navigate('/');
            }
        })
        .catch((error) => {
            throw new Error(error);
        })
    }, []);

    let commentContent = <div className='information-box'>Loading comments...</div>;

    if(commentList)
    {
        if(commentList.length > 0)
        {
            commentContent = commentList.map((com) => <CommentItem key={com._id} comment={com} showArticle={(true)} userInstance={userObject}></CommentItem>)
        } else {
            commentContent = <div className='information-box'>This user has no comments.</div>;
        }
    }

    return (<>
        <div className='comment-container'>
            <div className='comment-list'>
                {commentContent}
            </div>
        </div>
    </>);

}

export default Comments