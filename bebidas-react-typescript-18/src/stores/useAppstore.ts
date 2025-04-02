import { create } from "zustand";
import {devtools} from 'zustand/middleware'
import { createRecipesSlice, RecipesSliceType } from "./RecipeSlice"; 
import {FavoritesSliceType, createFavoritesSlice} from './favoritesSlice'


export const useAppStore = create<RecipesSliceType & FavoritesSliceType >()(devtools((...a) => ({
     ...createRecipesSlice(...a),
     ...createFavoritesSlice(...a)
})))

//Slice pattern