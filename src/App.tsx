import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Main } from './pages/main/main-page';
import { Login } from './pages/Login';
import { Navbar } from './Components/Navbar';
import { CreatePost } from './pages/createPost/CreatePost';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post" element={<CreatePost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
