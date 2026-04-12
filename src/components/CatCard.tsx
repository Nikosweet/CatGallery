import { useState, useEffect } from 'react'
import classes from './CatCard.module.scss'

import HoveredCard from '@/assets/images/catCard/hoveredCard.png'
import HoveredHeart from '@/assets/images/catCard/hoveredHeart.png'
import ClickedHeart from '@/assets/images/catCard/clickedHeart.png'

interface Props {
    id: string
    url: string
}

interface LikedCat {
    id: string
    url: string
}

export default function CatCard({ id, url }: Props) {
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

        window.dispatchEvent(new Event('likedCatsChanged'))
    }

    const getActiveHeart = () => {
        if (isLiked) return 'clicked'
        if (isHeartHovered) return 'heartHovered'
        return 'cardHovered'
    }
    const activeHeart = getActiveHeart()

    return (
        <figure className={classes.image_container}>
            <img
                className={classes.cat}
                alt={'Милый котик'}
                src={url}
                draggable={false}
            />
            <div
                className={classes.heart_wrapper}
                onMouseEnter={() => setIsHeartHovered(true)}
                onMouseLeave={() => setIsHeartHovered(false)}
            >
                <img
                    className={`${classes.heart} ${classes.heart_card_hover}`}
                    alt={'Кнопка лайка'}
                    src={HoveredCard}
                    draggable={false}
                />
                <img
                    className={`${classes.heart} ${activeHeart === 'heartHovered' ? classes.visible : ''}`}
                    alt={'Кнопка лайка'}
                    src={HoveredHeart}
                    onClick={handleLike}
                    draggable={false}
                />
                <img
                    className={`${classes.heart} ${activeHeart === 'clicked' ? classes.visible : ''}`}
                    alt={'Кнопка лайка'}
                    src={ClickedHeart}
                    onClick={handleLike}
                    draggable={false}
                />
            </div>
        </figure>
    )
}
