import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'


const FavoritesPage = lazy(()=> import('./views/FavoritesPage'))
const IndexPage = lazy(()=> import('./views/IndexPage'))

export default function Approuter() {
  return (

    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path='/'
            element={
              <Suspense fallback="Cargando...">
                <IndexPage />
              </Suspense>
              }
            index
          />
          <Route
            path='/favoritos'
            element={
            <Suspense fallback="Cargando...">
              <FavoritesPage />
            </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
