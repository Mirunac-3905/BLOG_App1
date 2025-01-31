import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegistrationPage';
import IndexPage from './Pages/IndexPage.js';
import CreateBlog from './Pages/CreateBlog'; 
import Subscribe from './Pages/Subscribe.js'; 
import MyBlogs from './Pages/MyBlogPage.js'; 
import Profile from './Pages/ProfilePage.js'; 
import './App.css';
import Contact from './Pages/Contact.js';
import { UserContextProvider } from './UserContext';
const App = () => {
  return (
    <UserContextProvider>
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/register" element={<RegisterPage />}/>
          <Route path='/indexPage' element={<IndexPage/>}/>
          <Route path="/createBlog" element={<CreateBlog/>} /> 
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/myBlogs" element={<MyBlogs/>} /> 
          <Route path="/Profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </div>
    </UserContextProvider>
  )
}

export default App
