import Logo from 'C:/Users/crist/Documents/FrameIT/client/src/images/logo-flavicon.png';
import{Link} from "react-router-dom";
import arrowDown from 'C:/Users/crist/Documents/FrameIT/client/src/images/down-arrow.png';
import arrowUp from 'C:/Users/crist/Documents/FrameIT/client/src/images/up-arrow.png';


//The function displays the menu 
export default function Menu(projectName, handleProjectName, slides, handleNewSlideBtn, handleSaveBtn,slidesList,setSlideList,currSlideId,setCurrSlideId,error) {

   const handleSlideUp=()=>{
    if(slidesList.length>=1&& currSlideId>=2){
        const updatedList = [...slidesList];
        [updatedList[currSlideId-2], updatedList[currSlideId-1]] = [updatedList[currSlideId-1], updatedList[currSlideId-2]];
        updatedList[currSlideId-2].id-=1;
        updatedList[currSlideId-1].id+=1;
        setCurrSlideId(updatedList[currSlideId-2].id)
        setSlideList(updatedList);
    }
   }
    const handleSlideDown=()=>{
        if(slidesList.length>=1&& currSlideId<slidesList.length){
            const updatedList = [...slidesList];
            [updatedList[currSlideId-1], updatedList[currSlideId]] = [updatedList[currSlideId], updatedList[currSlideId-1]];
            updatedList[currSlideId-1].id-=1;
            updatedList[currSlideId].id+=1;
            setCurrSlideId(updatedList[currSlideId].id)
            setSlideList(updatedList);
        }
    }
    return(
    <div className="menuContainer">
        <Link to="/"><img src={Logo} alt="" width={80} /></Link>
        <div className="projectInfoContainer">
            <input
                type="text"
                id="projectName"
                value={projectName}
                placeholder="Project Name"
                onChange={handleProjectName} />
            {error && <p id="errProject">{error}</p>}
            <div className='slidesInfoContainer'> 
            <div className='slidesChangeContainer'>
            <div className="arrow" onClick={handleSlideDown}><img src={arrowDown} alt="" width={16}/></div>
            <div className="arrow" onClick={handleSlideUp}><img src={arrowUp} alt="" width={16}/></div>

            </div>
            <div className="slidesPreviewContainer">
                {slides}

            </div>
            </div> 
            <div className="menuItem" onClick={handleNewSlideBtn}>New Slide</div>
            <div className="menuItem" onClick={handleSaveBtn}>Save</div>
        </div>
    </div>
    );
}