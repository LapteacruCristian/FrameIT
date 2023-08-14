import projectLogo from 'C:/Users/crist/Documents/FrameIT/client/src/images/projectLogo.png';
import "./ProjectsStyle.css"

export default function RecentProjects(setShowDetails,setSelectedProject,projectList) {
    const handleProjectClick=(project)=>{
        setShowDetails(true)
        setSelectedProject(project)
    }

    var projects=projectList&&projectList.map((project)=>{
        return(
            <div className="projectItem">
                    <div className="projectPreviewContainer" onClick={()=>handleProjectClick(project)} ><img src={projectLogo} alt="" width={60} /></div>
                    <div className="projectTitleContainer">{project.name}</div>
                </div>
        )
    })
    
    return <div className="container column">
        <h1>Recent projects</h1>
        <div className="recentProjectsContainer">
            <div className="recentProjectsContent">
                {projects}
            </div>
        </div>

    </div>;
}

