import '../../style/popularArticleItem.css'
import workingImage from '../../assets/working.webp'

function PopularArticleItem() {
    return <>
        <div className="popularArticleItem">
            <div className='popularArticleImage'>
                <img src={workingImage} />
            </div>
            <div className='popularArticleContent'>
                <div className='popularArticleInformation'>
                    <div className='popularArticleCategory'>Category</div>
                    <div className='popularArticleTime'>4 min read</div>
                </div>
                <div className='popularArticleTitle'>Is AI taking over your job soon?</div>
                
            </div>

        </div>
    </>
}

export default PopularArticleItem