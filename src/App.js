import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";  
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import EditUserPage from "./pages/EditUserPage";
import UserProfilePage from "./pages/UserProfilePage";
import Books from "./pages/Books";

//import IsPrivate from "./components/IsPrivate";  
//import IsAnon from "./components/IsAnon";
//import BookListPage from "./pages/BookListPage";
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
      </Routes>
    </div>
  );
}

export default App;
