import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from './context/authProvider.jsx';
import { NavbarContextProvider } from './context/navbarContext';
import PostContextProvider from './context/postContext.jsx';
import { ScrollProvider } from './context/scrollContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthContextProvider>
                <NavbarContextProvider>
                    <PostContextProvider> 
                        <ScrollProvider>
                                            <App />
                        </ScrollProvider>
                    </PostContextProvider>
                </NavbarContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    </React.StrictMode>);
