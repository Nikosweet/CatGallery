import { Helmet } from 'react-helmet-async';

import classes from './Cats.module.scss';
import { useCallback, useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { addCats } from "@/states/slices/catsSlice";
import { catAPI } from "@/api/catsApi";
import CatCard from '@/components/CatCard';

export default function Cats() {
    const dispatch = useAppDispatch();
    const cats = useAppSelector(state => state.cats.items);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);

    const isLoadingRef = useRef(false);
    const observerRef = useRef(null);
    const sentinelRef = useRef(null);
    const initialLoadDoneRef = useRef(false);
    const checkContentTimerRef = useRef(null);

    const loadCats = useCallback(async () => {
        if (isLoadingRef.current || !hasMore) return;

        isLoadingRef.current = true;
        setIsLoading(true);
        setError(null);

        try {
            const newCats = await catAPI.getRandomCats(15);

            if (newCats.length === 0) {
                setHasMore(false);
            } else {
                dispatch(addCats(newCats));
            }
        } catch (e) {
            console.error('Ошибка загрузки котиков:', e);
            setError(e);
        } finally {
            isLoadingRef.current = false;
            setIsLoading(false);
        }
    }, [dispatch, hasMore]);

    useEffect(() => {
        if (cats.length === 0 && !initialLoadDoneRef.current) {
            initialLoadDoneRef.current = true;
            loadCats();
        }
    }, [loadCats, cats.length]);

    useEffect(() => {
        if (checkContentTimerRef.current) {
            clearTimeout(checkContentTimerRef.current);
        }

        const checkIfNeedMoreContent = () => {
            if (isLoading || !hasMore || cats.length === 0) return;

            const documentHeight = document.documentElement.scrollHeight;
            const windowHeight = document.documentElement.clientHeight;

            if (documentHeight <= windowHeight && cats.length < 30) {
                loadCats();
            }
        };
        checkContentTimerRef.current = setTimeout(checkIfNeedMoreContent, 300);

        return () => {
            if (checkContentTimerRef.current) {
                clearTimeout(checkContentTimerRef.current);
            }
        };
    }, [cats.length, isLoading, hasMore, loadCats]);

    useEffect(() => {
        if (isLoading || !hasMore) return;

        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        observerRef.current = new IntersectionObserver(
            (entries) => {
                const firstEntry = entries[0];
                if (firstEntry.isIntersecting && !isLoading && hasMore) {
                    loadCats();
                }
            },
            {
                rootMargin: '200px',
                threshold: 0.1
            }
        );

        const currentSentinel = sentinelRef.current;
        if (currentSentinel) {
            observerRef.current.observe(currentSentinel);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [isLoading, hasMore, loadCats]);

    const handleRetry = useCallback(() => {
        setError(null);
        setHasMore(true);
        loadCats();
    }, [loadCats]);

    return (
        <>
            <Helmet>
                <title>Все котики | Галерея</title>
                <meta name="description"
                      content="Смотрите бесконечную ленту милых котиков. Добавляйте понравившихся в избранное."/>
                <meta name="keywords" content="котики, коты, милые животные, галерея котиков"/>
                <meta name="author" content="Nikosweet"/>
                <meta httpEquiv="content-language" content="ru"/>

                <meta property="og:title" content="Галерея милых котиков"/>
                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://nikosweet.github.io/CatGallery/"/>
                <meta property="og:image" content="заглушка"/>
                <meta property="og:image:alt" content="Превью галереи с милыми котиками"/>
                <meta property="og:description" content="Смотрите и сохраняйте самых милых котиков в интернете"/>
                <meta property="og:site_name" content="КотоГалерея"/>
                <meta property="og:locale" content="ru_RU"/>
            </Helmet>

            <section className={classes.catsSection}>
                <ul className={classes.catsList}>
                    {cats.map(cat => (
                        <li key={cat.id}>
                            <CatCard id={cat.id} url={cat.url} />
                        </li>
                    ))}
                </ul>

                {hasMore && !error && (
                    <div
                        ref={sentinelRef}
                        style={{
                            height: '10px',
                            width: '100%',
                            marginTop: '20px'
                        }}
                    />
                )}

                {isLoading && (
                    <p className={classes.writing}>... Загружаем еще котиков ...</p>
                )}

                {error && (
                    <div className={classes.errorContainer}>
                        <p className={classes.writing}>
                            Упс, произошла ошибка при загрузке котиков!
                        </p>
                        <button
                            onClick={handleRetry}
                            className={classes.retryButton}
                        >
                            Попробовать снова
                        </button>
                    </div>
                )}

                {!hasMore && !error && cats.length > 0 && (
                    <p className={classes.writing}>
                        Вы посмотрели всех котиков! 🐱
                    </p>
                )}
            </section>
        </>
    );
}