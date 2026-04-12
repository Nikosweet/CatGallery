import { useState, useEffect } from 'react'
import classes from './CatCard.module.scss'

import HoveredCard from '@/assets/images/catCard/hoveredCard.png'
import ClickedHeart from '@/assets/images/catCard/clickedHeart.png'
import HoveredHeart from '@/assets/images/catCard/hoveredHeart.png'

interface Props {
    id: string
    url: string
}

interface LikedCat {
    id: string
    url: string
}

function CatCard({ id, url }: Props) {
    const [isCardHovered, setIsCardHovered] = useState(false)
    const [isHeartHovered, setIsHeartHovered] = useState(false)
    const [isLiked, setIsLiked] = useState(false)

    useEffect(() => {
        const likedCats: LikedCat[] = JSON.parse(localStorage.getItem('likedCats') || '[]')
        setIsLiked(likedCats.some(cat => cat.id === id))
    }, [id])

    const handleLike = () => {
        const likedCats: LikedCat[] = JSON.parse(localStorage.getItem('likedCats') || '[]')

        if (isLiked) {
            const updated = likedCats.filter(cat => cat.id !== id)
            localStorage.setItem('likedCats', JSON.stringify(updated))
            setIsLiked(false)
        } else {
            const updated = [...likedCats, { id, url }]
            localStorage.setItem('likedCats', JSON.stringify(updated))
            setIsLiked(true)
        }
    }

    const shouldShowHeart = isCardHovered || isHeartHovered

    const getActiveHeart = () => {
        if (!shouldShowHeart) return null
        if (isLiked && !isHeartHovered) return 'clicked'
        if (isHeartHovered) return 'heartHovered'
        return 'cardHovered'
    }

    const activeHeart = getActiveHeart()

    return (
        <figure
            className={classes.image_container}
            onMouseEnter={() => setIsCardHovered(true)}
            onMouseLeave={() => setIsCardHovered(false)}
        >
            <img
                className={classes.cat}
                alt={'Милый котик'}
                src={url}
            />
            {shouldShowHeart && (
                <div
                    className={classes.heart_wrapper}
                    onMouseEnter={() => setIsHeartHovered(true)}
                    onMouseLeave={() => setIsHeartHovered(false)}
                >
                    <img
                        className={`${classes.heart} ${activeHeart === 'cardHovered' ? classes.visible : ''}`}
                        alt={'Кнопка лайка'}
                        src={HoveredCard}
                    />
                    <img
                        className={`${classes.heart} ${activeHeart === 'heartHovered' ? classes.visible : ''}`}
                        alt={'Кнопка лайка'}
                        src={HoveredHeart}
                        onClick={handleLike}
                    />
                    <img
                        className={`${classes.heart} ${activeHeart === 'clicked' ? classes.visible : ''}`}
                        alt={'Кнопка лайка'}
                        src={ClickedHeart}
                        onClick={handleLike}
                    />
                </div>
            )}
        </figure>
    )
}

export default CatCard