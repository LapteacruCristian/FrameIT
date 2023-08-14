import './App.css';
import {Route,Routes} from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import SignUp from './pages/Authentification/SignUp/SignUp';
import NewProject from './pages/NewProject/NewProject';

import Login from './pages/Authentification/LogIn/LogIn';
import {LayoutWithNavbar, LayoutWithoutNavbar } from './Componenets/NavBar/Layout';
import MyAccount from './pages/MyAccount/MyAccount';
import Projects from './pages/Projects/Projects';
import ViewProject from './pages/ViewProject/viewProject';

function App(){
  return (
      <Routes>
        <Route element={<LayoutWithNavbar/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/myAccount" element={<MyAccount/>}/>
          <Route path="/projects" element={<Projects/>}/>
        </Route>

        <Route element={<LayoutWithoutNavbar/>}>
          <Route path="/logIn" element={<Login/>}/>
          <Route path="/signUp" element={<SignUp/>}/>
          <Route path="/editProject" element={<NewProject/>}/>
          <Route path="/viewProject" element={<ViewProject/>}/>
        </Route>     
      </Routes>  
  );
}

export default App;
