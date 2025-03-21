import { useMemo } from 'react'
import { NavLink, useLocation } from 'react-router-dom'


export default function Header() {

    const { pathname } = useLocation()


    const isHome = useMemo(() => pathname === '/', [pathname])


    return (
        <header className="bg-slate-800">
            <div className="mx-auto container px-5 py-16">
                <div className="flex justify-between items-center">
                    <div>
                        <img className="w-32" src="/logo.svg" alt="logotipo" />
                    </div>
                    <nav className='flex gap-4'>
                        <NavLink
                            to='/'
                            className={({ isActive }) =>
                                isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                            }>Inicio</NavLink>
                        <NavLink
                            to='/favoritos'
                            className={({ isActive }) =>
                                isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                            }>Favoritos</NavLink>
                    </nav>
                </div>
                {isHome && (
                    <form>
                        <div>
                            <label
                                htmlFor="ingredient"
                                className='block text-white uppercase font-extrabold text-lg'
                            >Nombre o Ingredientes</label>

                            <input
                                id='ingredient'
                                type='text'
                                name='ingredient'
                                className='text-white font-bold p-3 w-full rounded-lg focus:outline-none'
                                placeholder='Nombre o Ingredientes. Ej. Vodka, Tequila, Café'
                            />
                        </div>
                    </form>
                )}
            </div>
        </header>
    )
}
