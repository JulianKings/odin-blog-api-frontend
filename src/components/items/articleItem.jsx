import '../../style/articleItem.css'
import workingImage from '../../assets/working.webp'

function ArticleItem()
{
    return <>
        <div className='articleItem'>
            <div className='articleImage'>
                <img src={workingImage} />
            </div>
            <div className='articleContent'>
                <div className='articleInformation'>
                    <div className='articleCategory'>Category</div>
                    <div className='articleTime'>4 min read</div>
                </div>
                <div className='articleTitle'>Is AI taking over your job soon?</div>
                <div className='articleDescription'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</div>
            </div>
        </div>
    </>;
}

export default ArticleItem;