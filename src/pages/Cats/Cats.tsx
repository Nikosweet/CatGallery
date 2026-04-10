import classes from './Cats.module.scss'
import {useEffect,  useState} from "react";
import {useAppDispatch, useAppSelector} from "@/states/hooks";
import {addCats} from "@/states/slices/catsSlice";
import {catAPI} from "@/api/catsApi";
import CatCard from '@/components/CatCard'

export default function Cats() {
    const dispatch = useAppDispatch();
    const cats = useAppSelector(state => state.cats.items);

    useEffect(() => {
        const loadCats = async () => {
            const newCats = await catAPI.getRandomCats(15);
            console.log(newCats)
            dispatch(addCats(newCats));
        };

        loadCats();
    }, [])

    return (
        <section className={classes.catsSection}>
            <ul className={classes.catsList}>
                {cats.map(cat =>
                    <li key={cat.id}>
                        <CatCard url={cat.url}/>
                    </li>
                )}
            </ul>
            <p className={classes.loading}>... Загружаем еще котиков ...</p>
        </section>
    )
}