import { NavLink } from "react-router-dom";
import { useContext } from "react";                    
import { AuthContext } from "../context/auth.context";

import Logo from '../assets/Lithub-logo-new.png' 
function Navbar() {
// Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext); 

  //  The rendering logic to display different content 
  //  depending on the user being logged in or not
    return (
      <nav className="Navbar">
        <div>
        <NavLink to="/" 
        >
          <img src={Logo} width="230px" height="120px" alt={'logo'}/>
        </NavLink>
        <div className="navButtons">
        <NavLink to="/books" 
        className={({ isActive }) => isActive ? "selected" : ""}> 
          Books
        </NavLink>


        {isLoggedIn && (
        <>
          <NavLink to="/profilePage" className={({ isActive }) => isActive ? "selected" : ""}> My profile page </NavLink>        
          <button onClick={logOutUser} id="LogoutButton" >Logout</button>
          <span>{user && user.username}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <NavLink to="/signup" className={({ isActive }) => isActive ? "selected" : ""}> Sign Up </NavLink>
          <NavLink to="/login" className={({ isActive }) => isActive ? "selected" : ""}> Log in </NavLink>
        </>
      )}
      </div>
        </div>
      </nav>
    );
  }
   
  export default Navbar;