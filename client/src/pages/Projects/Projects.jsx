import "./ProjectsStyle.css"
import React,{useRef,useState,useContext,useEffect} from "react";
import axios from "axios";
import Detailes from "./Detailes";
import projectLogo from 'C:/Users/crist/Documents/FrameIT/client/src/images/projectLogo.png';


export default function Projects(){
    const [showDetails, setShowDetails]=useState(false);
    const [selectedProject,setSelectedProject]=useState(null);
    const [projectsList,setProjectsList]=useState()
    const [showProject,setShowProject]=useState(false)
    useEffect(() => {
        const fetchProjects = async () => {
          try {
            const response = await axios.get('/projects'); 
            setProjectsList(response.data);
          } catch (error) {
            console.error('Error fetching map data:', error);
          }
        };
       
          fetchProjects();
        
      }, []);

    const handleProjectClick=(project)=>{
        setShowDetails(true)
        setSelectedProject(project)
    }

    var projects=projectsList&&projectsList.map((project)=>{
        return(
            <div className="projectItem" key={project.id}>
                    <div className="projectPreviewContainer" onClick={()=>handleProjectClick(project)} ><img src={projectLogo} alt="" width={60} /></div>
                    <div className="projectTitleContainer">{project.name}</div>
                </div>
        )
    })

    return <>
     <div className="container column">
        <h1>Projects</h1>
        <div className="projectsContainer">
            <div className="projectsContent">
                {projects}
            </div>
        </div>

    </div>;

   
    {Detailes(showDetails,setShowDetails,setSelectedProject,selectedProject,projectsList,setProjectsList)}
</>
}
