

import { useAuthContext } from '../context/authProvider';
const Login = () => {
const {user, setUser, username, setUsername, password, setPassword, navigate, handleLoginSubmit } = useAuthContext ()
    
    return (
        <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center my-4">Login</h2>
            <form onSubmit={handleLoginSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                    </label>
                    <input type="email" id="email" name="email" required value={username} onChange={(e) => setUsername(e.target.value)}
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div className="flex items-center justify-between">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
