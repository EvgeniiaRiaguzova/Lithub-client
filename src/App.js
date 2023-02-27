
import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import ErrorPage from "./pages/ErrorPage";  
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import EditUserPage from "./pages/EditUserPage";
import UserProfilePage from "./pages/UserProfilePage";
import Books from "./pages/Books";
import BookPage from "./pages/BookPage";
import AddBook from "./components/AddBook";
import EditBook from "./pages/EditBook";
import BookCard from "./components/BookCard";
import { useState } from "react";

import IsPrivate from "./components/IsPrivate";  
import IsAnon from "./components/IsAnon";
import IsAuthor from "./components/IsAuthor";

function App() {
  
  return (
    <div className="App">
      <Navbar />

      <Routes>      
        <Route exact path="/" element={<HomePage />} />   
        <Route path="*" element={ <ErrorPage /> } />
       <Route path="/signup" element={<IsAnon>  <SignupPage /> </IsAnon> } /> 
       <Route path="/login" element={ <IsAnon> <LoginPage /> </IsAnon> } />
       <Route path="/profilePage" element={ <IsPrivate> <UserProfilePage/> </IsPrivate> } />
       <Route path="/users/edit" element={ <IsPrivate> <EditUserPage /> </IsPrivate>} />
       <Route path="/books" element={ <Books /> } /> 
       <Route path="/addbooks" element={<IsAuthor><AddBook/></IsAuthor>} />
       <Route path='/BookPage/:bookId' element={<BookPage/>} />
        <Route path='/books/edit/:bookId' element={<IsAuthor><EditBook/></IsAuthor>} />
        <Route path='/cardbooks' element={<BookCard/>} />
      </Routes>
    </div>
  );
}

export default App;

