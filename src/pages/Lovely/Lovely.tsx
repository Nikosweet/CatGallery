import { Helmet } from 'react-helmet-async'

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
        <>
            <Helmet>
                <title>Любимые котики | Галерея</title>
                <meta name="description" content="Смотрите на котиков, выбранных Вами"/>
                <meta name="keywords" content="котики, коты, милые животные, галерея котиков"/>
                <meta name="author" content="Nikosweet"/>
                <meta http-equiv="content-language" content="ru"/>

                <meta property="og:title" content="Мои любимые котики"/>
                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://127.0.0.1:5000/lovely"/>
                <meta property="og:image" content="заглушка"/>
                <meta property="og:image:alt" content="Превью галереи с любимыми котиками"/>
                <meta property="og:description" content="Смотрите на котиков, которых выбрали Вы!"/>
                <meta property="og:site_name" content="КотоГалерея"/>
                <meta property="og:locale" content="ru_RU"/>

            </Helmet>
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
        </>
    )
}