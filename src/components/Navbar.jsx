import { Link } from 'react-router-dom';
import { useNavbarContext } from '../context/navbarContext.jsx';
import { useAuthContext } from "../context/authProvider.jsx";
import {Home, Highlighter, Contact, LogIn, Armchair, LogOut } from 'lucide-react';

const Navbar = () => {
    const { isMenuOpen, toggleMenu, menuRef } = useNavbarContext();
    const { user, handleLogout } = useAuthContext();
    

    
//console.log(user)
    return (
        <nav className="bg-black text-white shadow-lg relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="flex items-center justify-between h-16">
                <div className="flex items-center">                                                       
                        <div className="flex-shrink-0">
                            <Link to="/"><h1 className="text-2xl font-bold">X TO DO</h1></Link>
                        </div>
                        <div className="hidden md:block">
                        {user &&  <div className="ml-10 flex items-baseline space-x-4">
                                {/* Existing links */}
                               
                                <Link to="/" className="flex flex-col items-center justify-center text-white hover:text-black hover:bg-white px-3 py-2 rounded-full text-sm font-medium transition duration-300"> <Home  /> Home </Link>
                                <Link to="/add" className="flex flex-col items-center justify-center text-white hover:text-black hover:bg-white px-3 py-2 rounded-full text-sm font-medium transition duration-300"><Highlighter />  Add Post</Link>
                                <Link to="/contact" className="flex flex-col items-center justify-center text-white hover:text-black hover:bg-white px-3 py-2 rounded-full text-sm font-medium transition duration-300"><Contact />Contact</Link>
                                </div>}
                        </div>
                        </div>
                                {/* Conditional rendering for Login/Logout */}
                                <div className="ml-auto  flex items-center space-x-4">
                                {user && user._id ? (
                                    <>
                                        <button onClick={handleLogout} className="flex flex-col items-center  text-white hover:text-black hover:bg-white px-3 py-2 rounded-full text-sm font-medium transition duration-300">
                                        <LogOut /> Logout
                                        </button>
                                        <Link to="/" className=" flex flex-col items-center  px-3 py-1 rounded-full text-sm font-medium shadow-sm transition duration-300  text-white">
                                            Welcome<span>{user.name}</span>
                                        </Link>
                                    </>
                                    
                                ) : (
                                    <>
                                        <Link to="/register" className="flex flex-col items-center justify-center text-white hover:text-black hover:bg-white px-3 py-2 rounded-full text-sm font-medium transition duration-300"><Armchair />Register</Link>
                                        <Link to="/login" className="flex flex-col items-center justify-center text-white hover:text-black hover:bg-white px-3 py-2 rounded-full text-sm font-medium transition duration-300"><LogIn />Login</Link>
                                    </>
                                )}
                               </div>
                            
                        

                    {/* Hamburger menu button */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-white focus:outline-none">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Overlay Menu for smaller screens */}
            <div ref={menuRef} className={`absolute top-16 left-0 w-full bg-black z-10 md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
                <div className="px-4 py-2">
                    <Link to="/" className="flex gap-2 items-center  text-white hover:text-black hover:bg-white px-3 py-2 rounded-full text-sm font-medium transition duration-300"> <Home className='w-4 h-4'/> Home</Link>
                    <Link to="/add" className="flex gap-2 items-center  text-white hover:text-black hover:bg-white px-3 py-2 rounded-full text-sm font-medium transition duration-300"><Highlighter className='w-4 h-4'/>Add Post</Link>
                    <Link to="/contact" className="flex gap-2 items-center  text-white hover:text-black hover:bg-white px-3 py-2 rounded-full text-sm font-medium transition duration-300"><Contact className='w-4 h-4'/>Contact</Link>
                    {/* Assuming you want the same login/logout functionality on the mobile menu */}
                    {user && user._id ? (
                        <button onClick={handleLogout} className="flex gap-2 items-center  text-white hover:text-black hover:bg-white px-3 py-2 rounded-full text-sm font-medium transition duration-300"><LogOut className='w-4 h-4'/>Logout</button>
                    ) : (
                        <>
                            <Link to="/register" className="flex gap-2 items-center  text-white hover:text-black hover:bg-white px-3 py-2 rounded-full text-sm font-medium transition duration-300"><Armchair className='w-4 h-4'/>Register</Link>
                            <Link to="/login" className="flex gap-2 items-center  text-white hover:text-black hover:bg-white px-3 py-2 rounded-full text-sm font-medium transition duration-300"><LogIn className='w-4 h-4'/>Login</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
