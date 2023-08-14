import{Link, useMatch,useResolvedPath,useHistory, useNavigate} from "react-router-dom";
import './NavBarStyle.css';
import {useContext, useState} from 'react';
import Logo from "C:/Users/crist/Documents/FrameIT/client/src/images/logo.png";
import { User } from "../../context/User";

export default function NavBar(){
    const {currentUser} = useContext(User);

    const [isDrawerOpen,setIsDrawerOpen] = useState(false);

    const toggleDrawer=()=>{
        setIsDrawerOpen(!isDrawerOpen);
    };

    const closeDrawer=()=>{
        setIsDrawerOpen(false);
    }; 

    var navItems=null

    if (currentUser==null){
        navItems=[
        {name: "Home",path:"/"},
        {name: "About",path:"/about"},
        {name: "Log In",path:"/logIn"},
        {name: "Sign Up",path:"/signUp"},
        ]
    }
    else{
        navItems=[
            {name: "Home",path:"/"},
            {name: "About",path:"/about"},
            {name: "Projects",path:"/projects"},
            {name: "My Account",path:"/myAccount"},
            ]
        }
    

    return <nav className="nav-bar">
        <Link to="/"><img src={Logo} alt="" width={200}/></Link>

        <div className="menu-icon" onClick={toggleDrawer} >
            {isDrawerOpen?<i className="fa-solid fa-xmark"></i>:<i className="fas fa-bars"></i>}
        </div>

        <ul className={isDrawerOpen?'open':''}> 

            {navItems.map((item,index)=>{
                return (<CustomLink key={index} to={item.path} onClick={closeDrawer}>{item.name}</CustomLink>)
            })
            }
            
        </ul>

    </nav>
}

function CustomLink({to,children,...props}){
    const navigate=useNavigate()
    const handleClick = () => {
      if (to === "/") {
        navigate('/', { replace: true });
      }
    };

    const resolvedPath=useResolvedPath(to)
    const isActive=useMatch({path:resolvedPath.pathname,end:true})
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} onClick={handleClick} {...props}>
                {children}
            </Link>
        </li>
    )
}