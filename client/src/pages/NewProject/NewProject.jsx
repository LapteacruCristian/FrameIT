import "./NewProjectStyle.css";
import React,{useRef,useState,useContext} from "react";
import { BlockPicker } from "react-color";
import {Rnd} from "react-rnd";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Menu from "./Menu.jsx";
import ToolBar from "./ToolBar";
import { useLocation,useNavigate } from 'react-router-dom';
import axios from "axios"
import "./PopUpStyle.css";
import { User } from "../../context/User";


export default function NewProject(){
    const location = useLocation();
    const { initialSlidesList,initialProjectName,initialProjectId} = location.state;
    const {currentUser} = useContext(User);
    const navigate=useNavigate();
    const [projectName, setProjectName] = useState(initialProjectName);
    const [showEditSlidePopUp, setShowEditSlidePopUp] = useState(false);
    const [slideColor,setSlideColor]=useState("white")
    const [projectId,setProjectId]=useState(initialProjectId)

    const [currSlideId,setCurrSlideId]=useState(initialSlidesList.length>0? initialSlidesList[0].id : null);
    const [slidesList, setSlideList] = useState(initialSlidesList);
    const [currFrameId,setCurrFrameId]=useState();
    const editorRefs = useRef({});
    const [error, setError] = useState(null);


    const sleep = ms => new Promise(
        resolve => setTimeout(resolve, ms)
      );


    console.log(slidesList)

    const handleCurrSlide=(id)=>{
        setCurrSlideId(id)
    }

    const handleProjectName=(e)=>{
        setProjectName(e.target.value)
    }
    const handleSaveBtn=async (e)=>{
        try{
            var inputs={
                uderId : currentUser.id,
                projectName : projectName,          
                slidesList:slidesList,
                id:projectId,
              }
            if(projectId!==null){
                  const res = await axios.post("/editProject",inputs)
                  setError(res.data)
            }else{
                  const res = await axios.post("/createProject",inputs)
                  if(res.status===200){
                    setError("Project saved!")
                    setProjectId(res.data)

                  }else{
                    setError(res.data)
                  }
            }
            await sleep(500);
            setError(null)
            
          }catch(err){
            console.log(err)
          }  
    }

    const handleDeleteSlideBtn=(id)=>{
        const newList = slidesList.filter((item) => item.id !== id);
        
        for (var i = id-1; i < newList.length; i++) {
             newList[i].id-=1
        }
        if(currSlideId>=id ){
            if(currSlideId>1){
                setCurrSlideId(currSlideId-1)
            }
        }

        if(newList.length===0){
            setCurrSlideId(null)
        }
        
        setSlideList(newList);
    }

    const handleNewSlideBtn=(e)=>{
        var newSlide={id:slidesList.length+1,background:currSlideId?slidesList[slidesList.length-1].background:"white",frames: []}
        setSlideList(slidesList => [...slidesList, newSlide])
        setCurrSlideId(newSlide.id)      
    }
    const handleEditSlideBtn=(e)=>{
        setSlideColor(slidesList[currSlideId-1].background)
        setShowEditSlidePopUp(!showEditSlidePopUp) 
    }

    const handleEditSlide=()=>{
        setShowEditSlidePopUp(!showEditSlidePopUp)
        slidesList[currSlideId-1].background=slideColor;
        setSlideList(slidesList => [...slidesList])
    }


    const draggableEventHandler=(x,y,frameId)=>{
        slidesList[currSlideId-1].frames[frameId-1].x=x;
        slidesList[currSlideId-1].frames[frameId-1].y=y;
        setSlideList(slidesList => [...slidesList]);
       
    }

    const resizebleEventHandler=(ref,frameId,position)=>{
        // console.log(editorRefs.current[frameId-1].offsetHeight,ref.style.height)
        // if(ref.style.height!==editorRefs.current[frameId-1].offsetHeight){
        //     slidesList[currSlideId-1].frames[frameId-1].height=editorRefs.current[frameId-1].offsetHeight;
        // }else{
            slidesList[currSlideId-1].frames[frameId-1].height= ref.style.height;
        //}
        slidesList[currSlideId-1].frames[frameId-1].width= ref.style.width;
        setSlideList(slidesList => [...slidesList]);

    }
    const resizebleImgEventHandler=(ref,frameId,position)=>{
        slidesList[currSlideId-1].frames[frameId-1].height= ref.style.height;
        slidesList[currSlideId-1].frames[frameId-1].width= ref.style.width;
        setSlideList(slidesList => [...slidesList]);

    }


  const handleEditorChange = (value,frameId) => {
    slidesList[currSlideId-1].frames[frameId-1].content=value;
    setSlideList(slidesList => [...slidesList]);
  };

  const handleFrameCLick=(frameId)=>{
    setCurrFrameId(frameId)
  }

    var currSlideFrames=currSlideId && slidesList[currSlideId-1].frames.map((frame)=>{
        if (!showEditSlidePopUp){
        var key=currSlideId*100+frame.id;
        if(frame.type==1){
            return (

                <Rnd className={`ql-container ${currFrameId === frame.id ? 'activeFrame' : ''}`} key={key} bounds="parent" 
                position={{ x: frame.x, y: frame.y }} 
                enableResizing={{ top:false, right:true, bottom:false, left:false, topRight:false, bottomRight:true, bottomLeft:false, topLeft:false }}
                size={{ width: frame.width,  height: frame.height }}
                onClick={()=>handleFrameCLick(frame.id)}
                onDragStop={(e,d)=>{ draggableEventHandler(d.lastX,d.lastY,frame.id)}} 
                onResizeStop={(e,direction,ref,delta,position)=>{resizebleEventHandler(ref,frame.id,position);}}>
                
                <ReactQuill
                    ref={(element) => editorRefs.current[frame.id-1]=element}
                    value={frame.content}
                    onChange={(props)=>handleEditorChange(props,frame.id)}
                    placeholder="Text"
                    modules={{ toolbar: false }}
                />
      
                </Rnd>
                                
        )}
        return <Rnd className={`frameImg ${currFrameId === frame.id ? 'activeFrame' : ''}`} 
        style={{backgroundImage:`url(${frame.content})`,backgroundSize:'cover',backgroundRepeat:"no-repeat"}}
        key={key} bounds="parent" 
        position={{ x: frame.x, y: frame.y }} 
        enableResizing={{ top:false, right:false, bottom:false, left:false, topRight:false, bottomRight:true, bottomLeft:false, topLeft:false }}
        size={{ width: frame.width,  height: frame.height }}
        onClick={()=>handleFrameCLick(frame.id)}
        onDragStart={()=>handleFrameCLick(frame.id)}
        onResizeStart={()=>handleFrameCLick(frame.id)}
        onDragStop={(e,d)=>{ draggableEventHandler(d.lastX,d.lastY,frame.id)}} 
        onResizeStop={(e,direction,ref,delta,position)=>{resizebleImgEventHandler(ref,frame.id,position);}}>
        
        </Rnd>
        }

        return null
    })

    var slides=slidesList.map((slide)=>{
        return (
        <li key={slide.id}>
            {slide.id}
           
             <div className={`slidePreview1 ${currSlideId===slide.id ?'activeSlide':""}`} style={{background:slidesList[slide.id-1].background}} onClick={() => handleCurrSlide(slide.id)}>
                <div style={{transform: "scale(0.1)",transformOrigin:'0% 0%'}}>
                    {
                    slide.frames.map((frame)=>{
                        if(frame.type==1){
                            return(
                                <div className="ql-container" style={{left:frame.x,top:frame.y,width:frame.width,height:0}}>
                                    <ReactQuill
                                        readOnly
                                        value={frame.content}                  
                                        modules={{ toolbar: false }}/>
                                </div>)
                        }
                        return(
                            <div className="frameImg" style={{left:frame.x,top:frame.y,width:frame.width,height:frame.height,backgroundImage:`url(${frame.content})`,backgroundSize:'cover',backgroundRepeat:"no-repeat"}}></div>)
                    })
                }
                </div>
                
             </div>
            <button className="slideDeleteBtn" onClick={() => handleDeleteSlideBtn(slide.id)}>                 
                 x              
            </button>
        </li>)
    })



    if(showEditSlidePopUp) {
      document.body.classList.add('activePopUp')
    } else {
      document.body.classList.remove('activePopUp')
    }
    
    //Main 
    if(currentUser!==null)
        return(
        <div className="newProjectPageBody">
            {Menu(projectName, handleProjectName, slides, handleNewSlideBtn, handleSaveBtn,slidesList,setSlideList,currSlideId,setCurrSlideId,error)}
            {showEditSlidePopUp && (EditSlidePopUp(handleEditSlide,setShowEditSlidePopUp,slideColor,setSlideColor))}
            <div className="workPlaceContainer">
                {ToolBar(handleEditSlideBtn,editorRefs,slidesList,setSlideList,currSlideId,currFrameId,setCurrFrameId)}
                {currSlideId &&
                <div className="slide"  style={{background:slidesList[currSlideId-1].background, position:(showEditSlidePopUp)?"static":"relative"}}>
                    {currSlideFrames}           
                </div>}
            </div>
        </div>
        );
    else{
        return<>            
        {navigate("/")}</>

    }
}





//The function displays the pop up for the newSilde action
function EditSlidePopUp(handleEditSlide,setShowNewSlidePopUp,slideColor,setSlideColor) {
    const blockStyle={
        default: { 
          head: {
            height: '35px',
              },
            }
         };
    return (
    <div className="popUp">
        <div className="overlay" onClick={()=>setShowNewSlidePopUp(false)}/>
        <div className="popUpContent center">
            <h2>Edit Slide</h2>
            <hr/>
            <h3>Background</h3>
            <BlockPicker
                styles={blockStyle}
                width="72%"
                color={slideColor}
                onChange={updatedColor=> setSlideColor(updatedColor.hex)}
            />
                <button className="popUpSubmitBtn"onClick={() => handleEditSlide()}>Save</button>
            <button className="closePopUpBtn" onClick={()=>setShowNewSlidePopUp(false)}>
                    X
            </button>
        </div>
    </div>)
}

