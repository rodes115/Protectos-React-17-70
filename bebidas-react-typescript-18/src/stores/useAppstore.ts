import { create } from "zustand";
import {devtools} from 'zustand/middleware'
import { createRecipesSlice, RecipesSliceType } from "./RecipeSlice"; 



export const useAppStore = create<RecipesSliceType>()(devtools((...a) => ({
     ...createRecipesSlice(...a)
})))