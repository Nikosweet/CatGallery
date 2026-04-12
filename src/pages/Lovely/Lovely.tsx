import { useState, useEffect } from 'react'
import classes from './Lovely.module.scss'
import CatCard from '@/components/CatCard'

interface LikedCat {
    id: string;
    url: string;
}

export default function Lovely() {
    const [lovelyCats, setLovelyCats] = useState<LikedCat[]>([])

    useEffect(() => {
        // Функция для обновления списка
        const updateLovelyCats = () => {
            const cats = JSON.parse(localStorage.getItem('likedCats') || '[]')
            console.log('Updating lovely cats:', cats) // Для отладки
            setLovelyCats(cats)
        }

        updateLovelyCats()

        window.addEventListener('likedCatsChanged', updateLovelyCats)
        window.addEventListener('storage', updateLovelyCats)

        return () => {
            window.removeEventListener('likedCatsChanged', updateLovelyCats)
            window.removeEventListener('storage', updateLovelyCats)
        }
    }, [])

    return (
        <section className={classes.catsSection}>
            {lovelyCats.length > 0 ? (
                <ul className={classes.catsList}>
                    {lovelyCats.map(lovelyCat => (
                        <li key={lovelyCat.id}>
                            <CatCard id={lovelyCat.id} url={lovelyCat.url}/>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className={classes.writing}>Нет лайкнутых котиков</p>
            )}
        </section>
    )
}