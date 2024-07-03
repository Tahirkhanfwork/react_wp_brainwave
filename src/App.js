import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Posts from './components/Posts';
import SinglePost from './components/SinglePost';
import { useSelector } from 'react-redux';

function App() {
  const jwt_token = useSelector((state) => state.login.jwt_token);

  return (
    <Router>
      <Routes>
        <Route path="/" element={jwt_token ? <Posts /> : <Login />} />
        <Route path="/post/:id" element={<SinglePost />} />
      </Routes>
    </Router>
  );
}

export default App;
