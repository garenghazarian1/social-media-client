import {createContext, useContext,  useState, useEffect, useRef } from "react";

// Create a context
const NavbarContext = createContext();

// Hook for easy access to the context
export const useNavbarContext = () => useContext(NavbarContext);

export const NavbarContextProvider = ({ children }) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (isMenuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [isMenuOpen]);

    return (
        <NavbarContext.Provider value={{ isMenuOpen, toggleMenu, menuRef }}>
            {children}
        </NavbarContext.Provider>
    );
}