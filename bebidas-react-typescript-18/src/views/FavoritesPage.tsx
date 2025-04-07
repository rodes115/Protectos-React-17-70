import { useMemo } from "react"
import DrinkCard from "../components/DrinkCard"
import { useAppStore } from "../stores/useAppstore"


export default function FavoritesPage() {

  const Favorites = useAppStore((state) => state.favorites)
  const hasFavorites = useMemo(() => Favorites.length, [Favorites])

  return (
    <>
      <h1 className="text-6xl font-extrabold">Favoritos</h1>


      {hasFavorites ? (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
            {Favorites.map(drink => (
          <DrinkCard
            key={drink.idDrink}
            drink={drink}
          />
          ))}
        </div>
      ): (
        <p className="my-10 text-center text-2xl">
          Los Favoritos se mostrarán aqui 
        </p>
      )}


    </>
  )
}
