import classes from './CatCard.module.scss'

function CatCard() {
    return (
        <figure className={classes.image_container}>
            <img className={classes.cat} alt={'Милый котик'}/>
            <img className={classes.heart} alt={'Кнопка лайка'}/>
        </figure>
    );
}

export default CatCard;