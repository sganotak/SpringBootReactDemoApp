import './App.css';
import Navbar from './components/Navbar';
import UserRegisterForm from './components/UserRegisterForm';
import UserList from './components/UserList';
import UserProfile from './components/UserProfile';
import UserUpdatePage from './components/UserUpdatePage';
import { Routes,Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home';
import NotFoundPage from './components/NotFoundPage';



function App() {
  return (
    <div className="App">
     
      <header className="App-header-bs-primary">
      <Navbar/>
      </header>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/register" element={<UserRegisterForm/>} />
        <Route path="/users" element={<UserList/>} />
        <Route path="/users/:id" element={<UserProfile/>} />
        <Route path="/users/edit/:id" element={<UserUpdatePage/>} />
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
      <ToastContainer/>
    
    </div>
  );
}

export default App;
