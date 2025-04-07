import { create } from "zustand";
import {devtools} from 'zustand/middleware'
import { createRecipesSlice, RecipesSliceType } from "./RecipeSlice"; 
import {FavoritesSliceType, createFavoritesSlice} from './favoritesSlice'
import { NotificationSliceType, createNotificationSlice } from "./notificationSlice";


export const useAppStore = create<RecipesSliceType & FavoritesSliceType & NotificationSliceType >()(devtools((...a) => ({
     ...createRecipesSlice(...a),
     ...createFavoritesSlice(...a),
     ...createNotificationSlice(...a)
})))

//Slice pattern