import { create } from "zustand";
import { createRecipesSlice, RecipesSliceType } from "./RecipeSlice"; 



export const useAppStore = create<RecipesSliceType>((...a) => ({
     ...createRecipesSlice(...a)
}))