/* eslint-disable react-hooks/exhaustive-deps */
import '../style/comments.css';
import { useState, useEffect } from "react"
import CommentItem from './items/commentItem';
import { useNavigate, useParams } from 'react-router-dom';

function Comments()
{
    const { id } = useParams();
    const [commentList, setCommentList] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Get popular articles
        fetch("http://localhost:3000/comment/" + id, {                
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
            commentContent = commentList.map((com) => <CommentItem key={com._id} comment={com} showArticle={(true)}></CommentItem>)
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