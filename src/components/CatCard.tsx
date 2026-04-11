import classes from './CatCard.module.scss'

import HoveredCard from '@/assets/images/catCard/hoveredCard.png'
import HoveredHeart from '@/assets/images/catCard/hoveredHeart.png'
import ClickedHeart from '@/assets/images/catCard/clickedHeart.png'

interface Props {
    url: string
}

function CatCard({url}: Props) {
    return (
        <figure className={classes.image_container}>
            <img className={classes.cat} alt={'Милый котик'} src={url}/>
            <img className={classes.heart} alt={'Кнопка лайка'} src={ClickedHeart}/>
        </figure>
    );
}

export default CatCard;