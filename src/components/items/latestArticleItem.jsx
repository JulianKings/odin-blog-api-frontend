import '../../style/latestArticleItem.css'
import workingImage from '../../assets/working.webp'

function LatestArticleItem()
{
    return <>
        <div className='latestArticleItem'>
            <div className='latestArticleImage'>
                <img src={workingImage} />
            </div>
            <div className='latestArticleContent'>
                <div className='latestArticleInformation'>
                    <div className='latestArticleCategory'>Category</div>
                    <div className='latestArticleTime'>4 min read</div>
                </div>
                <div className='latestArticleTitle'>Is AI taking over your job soon?</div>
                <div className='latestArticleDescription'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</div>
            </div>
        </div>
    </>;
}

export default LatestArticleItem;