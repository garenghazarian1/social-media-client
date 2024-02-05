import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PostForm from './pages/AddPage';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Contact from './pages/Contact';

export default function Routers() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" index element={<Home />} />
                <Route path="/add"  element={<PostForm />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" index element={<NotFound />} /> 
            </Routes>
            </>  
    );
};
