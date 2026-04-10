import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {CatImage} from "@/api/catsApi";

interface CatsState {
    items: CatImage[];
}

const initialState: CatsState = {
    items: [],
};

const catsSlice = createSlice({
    name: 'cats',
    initialState,
    reducers: {
        addCats: (state, action: PayloadAction<CatImage[]>) => {
            state.items = state.items.concat(action.payload);
        },
        addCat: (state, action: PayloadAction<CatImage>) => {
            state.items.push(action.payload);
        }
    }
})

export const { addCats, addCat } = catsSlice.actions;
export default catsSlice.reducer;

