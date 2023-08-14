import { createContext, useEffect, useState } from "react";

export const User= createContext();

export const UserProvider=({ children })=>{
    const [currentUser,setCurrentUser] =useState(JSON.parse(localStorage.getItem("user")) || null)

    const setCurrUser = (userData) => {
        setCurrentUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))
    } 
        
    return(
        <User.Provider value={{currentUser, setCurrUser}}>
            { children };
        </User.Provider>
    );
}