import '../../style/articleItem.css';
import newspaperImage from '../../assets/newspaper.webp'

function ArticleItem() {
    return <>
        <section className='articleItem'>
            <div className='articleItemImage'>
                <img src={newspaperImage} />
            </div>
            <div className='articleItemContent'>
                <div className='articleItemInformation'>
                    <div className='articleItemCategory'>Category</div>
                    <div className='articleItemTime'>4 min read</div>
                </div>
                <div className='articleItemTitle'>Is AI taking over your job soon?</div>
                <div className='articleItemDescription'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</div>
                <div className='articleItemButton'>
                    <button type='button'>Read Article</button></div>
            </div>
        </section>
    </>
}

export default ArticleItem