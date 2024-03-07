import PropTypes from 'prop-types';

function Article({ match })
{
    let articleId = match.params.id;

    return <>
    <p>The article id is {articleId}</p>
    </>;
}

Article.propTypes = {
    match: PropTypes.object
}

export default Article