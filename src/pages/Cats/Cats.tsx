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

    const isLoadingRef = useRef(false);

    const loadCats = useCallback(async () => {
        if (isLoadingRef.current) return;

        isLoadingRef.current = true;
        setIsLoading(true);
        setError(null);

        try {
            const newCats = await catAPI.getRandomCats(15);
            dispatch(addCats(newCats));
        } catch (e) {
            console.log(e);
            setError(e);
        } finally {
            isLoadingRef.current = false;
            setIsLoading(false);
        }
    }, [dispatch]);

    useEffect(() => {
        loadCats();
    }, [loadCats]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const windowHeight = document.documentElement.clientHeight;
            const documentHeight = document.documentElement.scrollHeight;

            if (scrollTop + windowHeight >= documentHeight - 200) {
                loadCats();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadCats]);

    return (
        <section className={classes.catsSection}>
            <ul className={classes.catsList}>
                {cats.map(cat => (
                    <li key={cat.id}>
                        <CatCard id={cat.id} url={cat.url} />
                    </li>
                ))}
            </ul>
            {isLoading && (<p className={classes.writing}>... Загружаем еще котиков ...</p>)}
            {error && (<p className={classes.writing}>Упс, произошла ошибка!</p>)}
        </section>
    );
}