import { createContext, useEffect, useState } from "react";

export const ShowProjectDetails= createContext();

export const ShowProjectDetailsProvider=({ children })=>{
    const [showProjectDetails,setShowProjectDetails]=useState(false);
        
    return(
        <ShowProjectDetails.Provider value={{showProjectDetails, setShowProjectDetails}}>
            { children };
        </ShowProjectDetails.Provider>
    );
}