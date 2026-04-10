import classes from './CatCard.module.scss'

import HoveredCard from '@/assets/images/catCard/hoveredCard.jpg'
import HoveredHeart from '@/assets/images/catCard/hoveredHeart.jpg'
import ClickedHeart from '@/assets/images/catCard/clickedHeart.jpg'

interface Props {
    url: string
}

function CatCard({url}: Props) {
    return (
        <figure className={classes.image_container}>
            <img className={classes.cat} alt={'Милый котик'} src={url}/>
            <HoveredCard className={classes.heart} alt={'Кнопка лайка'}></HoveredCard>
        </figure>
    );
}

export default CatCard;