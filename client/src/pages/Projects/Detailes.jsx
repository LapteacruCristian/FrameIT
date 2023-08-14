import "./ProjectsStyle.css"
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Detailes(showDetails,setShowDetails,setSelectedProject,project,projects,setProjects) {
    const navigate=useNavigate();


    const handleEditBtn=async ()=>{
        try {
            const response = await axios.get(`/projects/${project.id}`); 
            console.log(response.data)
            const initialSlidesList=response.data
            const initialProjectName=project.name
            const initialProjectId=project.id
            navigate("/editProject",
            { state: { initialSlidesList,initialProjectName,initialProjectId } })
            } catch (error) {
                console.error('Error fetching map data:', error);
          }
    }
    const handleViewBtn=async()=>{
        try {
            const response = await axios.get(`/projects/${project.id}`); 
            console.log(response.data)
            const initialSlidesList=response.data
            navigate("/viewProject",
            { state: initialSlidesList})
            } catch (error) {
                console.error('Error fetching map data:', error);
          }
    }

    const handleDeleteBtn=async()=>{
        try {
            const response = await axios.post(`/projects/${project.id}`); 
            console.log(response.data)
            setShowDetails(false);
            setSelectedProject(null)

            setProjects(projects.filter((p) => p.id !== project.id));

            } catch (error) {
                console.error('Error fetching map data:', error);
          }
    }
    return<>
        {showDetails&&<div className="projectDetailedContainer"><button className="closeStickyBtn" onClick={() => {setShowDetails(false);setSelectedProject(null)}}>
            X
        </button>
        <div className="projectInfoItemContainer">
            <div className="category">Title: </div>
            <div className="projectTitleContainer" style={{fontSize:"14px"}}>{project.name}</div>
        </div>
        <div className="projectInfoItemContainer">
            <div className="category">Date: </div>
            <div className="projectTitleContainer" style={{fontSize:"14px"}}>{project.date.split('T')[0]}</div>
        </div>
        <div className="projectInfoItemContainer">
            <div className="btn" onClick={handleEditBtn}>Edit</div>
            <div className="btn" onClick={handleViewBtn} id="goFullScreen">View</div>
            <div className="btn" onClick={handleDeleteBtn}>Delete</div>
        </div>
        </div>};
    </>
}

