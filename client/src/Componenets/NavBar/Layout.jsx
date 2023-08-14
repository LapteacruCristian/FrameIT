import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import "../../App.css"
export function LayoutWithNavbar(){
    return (
        <div className="page">
            <NavBar/>
            <div className="pageBodyWithNavBar">
                <Outlet/>
            </div>
        </div>
    )
}

export function LayoutWithoutNavbar(){
    return (
        <div className="page">
                <Outlet/>
        </div>
    )
}