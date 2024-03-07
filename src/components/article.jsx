/* eslint-disable react-hooks/exhaustive-deps */
import { DateTime } from 'luxon';
import '../style/article.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import parse from 'html-react-parser';

function Article()
{
    const { id } = useParams();
    const [article, setArticle] = useState(null);
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
            console.log(response);
            if(response && response.responseStatus === 'validRequest')
            {
                setArticle(response.article);
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

    if(article)
    {
        let articleTime = article.timestamp;
        let imageUrl = (article.imageUrl === '' ? '/src/assets/newspaper.webp' : article.imageUrl);

        let luxonDatetime = DateTime.fromISO(articleTime);

        let articleMessage = article.message.replace(/\\n/g, '<br />\n');

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
            <div className='article-image'><img src={imageUrl} /></div>
            <div className='article-message'>{parse(articleMessage)}</div>
        </div>);
    }

    return <>
        {articleContent}
    </>;
}

export default Article