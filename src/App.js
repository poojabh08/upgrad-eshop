import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';

export default function App() {
    
    const isLoggedIn = false; 
    const isAdmin = false; 

    return (
        <Router>
            <Navbar isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                {/* Other routes */}
            </Routes>
        </Router>
    );
}

