import { useNavigate } from "react-router-dom";
import About from "../About/About";
import "./HomeStyle.css";
import presentation from "C:/Users/crist/Documents/FrameIT/client/src/images/presentation.png";
import edit from "C:/Users/crist/Documents/FrameIT/client/src/images/edit-tools.png";
import { useContext, useState,useEffect } from "react";
import axios from "axios";
import { User } from "../../context/User";
import RecentProjects from "../Projects/RecentProjects";
import Detailes from "../Projects/Detailes";

export default function Home(){
    const {currentUser} = useContext(User);
    const [showProjectDetails, setShowProjectDetails]=useState(false);
    const [selectedProject,setSelectedProject]=useState(null);
    const [recentProjectList,setRecentProjectsList]=useState()

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('/projects/recent'); 
            setRecentProjectsList(response.data);
          } catch (error) {
            console.error('Error fetching map data:', error);
          }
        };
            currentUser&&fetchData();
      }, []);

    const navigate=useNavigate();
    const handleBtnClick=(e)=>{
        navigate('/signUp');
    }

    const handleNewBtnClick=(e)=>{
        const initialSlidesList=[{id:1,background:'white',frames:[]}]
        const initialProjectName="Project Name"
        const initialProjectId=null;
        navigate("/editProject",
        { state: { initialSlidesList,initialProjectName,initialProjectId} })

    }
   
    if(currentUser!=null)
        return <>
            <div className="container">
                <ul>
                    <li>
                        <h1>Create Your next project frame by frame</h1>
                        <button id="newProject" className="callToActionBtn" onClick={handleNewBtnClick}>New Project</button>
                    </li>
                    <li><img src={edit} alt="" width={130} height={130}/></li>

                </ul>       
            </div>
            {RecentProjects(setShowProjectDetails,setSelectedProject,recentProjectList)}
            <About/>
            {Detailes(showProjectDetails,setShowProjectDetails,setSelectedProject,selectedProject,recentProjectList,setRecentProjectsList)}


        </>
    else
        return <>
            <div className="container column">
                    <h1>What project will you make today?</h1>
                    <ul>
                        <li><h2>FrameIT makes it easy to create quickly structured projects</h2></li>
                        <li><img src={presentation} alt="" width={130} height={130}/></li>
                    </ul>
                    <button className="callToActionBtn" onClick={handleBtnClick}>Sign Up</button>
            </div>
            <About/>      
        </>
}