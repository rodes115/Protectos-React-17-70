import { Outlet } from "react-router-dom"
import Logo from "@/components/Logo"
import NavMenu from "@/components/NavMenu"

export default function AppLayout() {
     return (
          <>
               <header className="bg-gray-800 py-5">
                    <div className="mx-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
                         <div className="w-64 ">
                              <Logo />
                         </div>

                         <NavMenu />
                    </div>
               </header>
               
               <section className="max-w-screen-2xl mx-auto mt-10 py-5"> 
                    <Outlet />
               </section>

               <footer className="py-5">
                    <p className="text-center">
                         Todos los derechos reservados {new Date().getFullYear()} &copy; UpTask
                    </p>
               </footer>
               
          </>
     )
}
