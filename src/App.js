import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";  
import SignupPage from "./pages/SignupPage";
//import LoginPage from "./pages/LoginPage";
//import IsPrivate from "./components/IsPrivate";  
//import IsAnon from "./components/IsAnon";
//import BookListPage from "./pages/BookListPage";
function App() {
  return (
    <div className="App">
    <Router> 
      <Navbar />

      <Routes>      
        <Route exact path="/" element={<HomePage />} />   
        <Route path="*" element={ <ErrorPage /> } />
        {/*<Route exact path="/books" element={<BookListPage />} />*/}

       <Route path="/signup" element={ <SignupPage /> } /> 
        {/* <Route path="/login" element={ <IsAnon> <LoginPage /> </IsAnon> } /> */} 
      </Routes>
      </Router> 
    </div>
  );
}

export default App;
