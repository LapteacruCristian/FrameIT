import text from 'C:/Users/crist/Documents/FrameIT/client/src/images/text.png';
import image from 'C:/Users/crist/Documents/FrameIT/client/src/images/image.png';
import lAlign from 'C:/Users/crist/Documents/FrameIT/client/src/images/left-align.png';
import cAlign from 'C:/Users/crist/Documents/FrameIT/client/src/images/center-align.png';
import rAlign from 'C:/Users/crist/Documents/FrameIT/client/src/images/right-align.png';
import boldBtn from 'C:/Users/crist/Documents/FrameIT/client/src/images/bold.png';
import italicBtn from 'C:/Users/crist/Documents/FrameIT/client/src/images/italic.png';
import underlineBtn from 'C:/Users/crist/Documents/FrameIT/client/src/images/underline.png';
import trash from 'C:/Users/crist/Documents/FrameIT/client/src/images/trash.png';
import pen from 'C:/Users/crist/Documents/FrameIT/client/src/images/pen.png';
import { useRef, useState } from 'react';
import converImgTo64 from "./convertImg.jsx"

export default function ToolBar(handleEditSlideBtn, editorRef,slidesList,setSlideList,currSlideId,currFrameId,setCurrFrameId) {
    
const imgRef=useRef();

    const handleFormat = (format, value = true) => {
        if(slidesList&& slidesList[currSlideId-1].frames[currFrameId-1].type==1){
            editorRef.current[currFrameId-1].focus();
            const quill = editorRef.current[currFrameId-1].getEditor();  
            if(format==='bold' || format==='italic' || format==='underline'){
                const isFormat=quill.getFormat()[format];
                quill.format(format,!isFormat);
            }else{
                const range = quill.getSelection();
                quill.format(format, value);
                quill.setSelection(range);
            }
        }       
      };
    
      const handleFontSizeChange = (e) => {
        const fontSize = e.target.value;
        handleFormat('size', fontSize);
      };
    
      const handleColorChange = (e) => {
        const color = e.target.value;
        handleFormat('color', color);
      };
    
      const handleAlignmentChange = (alignment) => {
        handleFormat('align', alignment);
      };

   
      const handleDeleteFrame=()=>{
        console.log(currFrameId)
        if(currSlideId!==null && currFrameId!==null){
            const updatedList= slidesList.map((slide)=>{
                if(slide && slide.id===currSlideId){
                    const updatedFrames=slide.frames.filter((frame)=>frame.id!==currFrameId)
                    for (var i = currFrameId-1; i < slide.frames.length; i++) {
                        if(updatedFrames[i])
                            updatedFrames[i].id-=1
                   }
                   return { ...slide, frames: updatedFrames };

                }
              
                return slide;
                
            })
           
            setCurrFrameId(null);
            setSlideList(updatedList);
        }
        
      }

      const handleAddTextFrame=(e)=>{
        setCurrFrameId(slidesList[currSlideId-1].frames.length+1)
        var frame={id:slidesList[currSlideId-1].frames.length+1,type:1,content:'',height:'40px',width:'150px',x:0,y:0}

        slidesList[currSlideId-1].frames=[...slidesList[currSlideId-1].frames,frame]
        setSlideList(slidesList => [...slidesList]);
    }

    const handleAddImage=()=>{
        imgRef.current.click();
    }

    const handleAddImageFrame=async (e)=>{
        const image=e.target.files[0];
        const img64 = await converImgTo64(image);
        var frame={id:slidesList[currSlideId-1].frames.length+1,type:2,content:img64,height:'150px',width:'150px',x:0,y:0}
        slidesList[currSlideId-1].frames=[...slidesList[currSlideId-1].frames,frame]
        setSlideList(slidesList => [...slidesList]);
    }
    return currSlideId&&<div className="toolbar">
        {/* Toolbar buttons */}
        <div className="insertFrameContainer">        
            <div className="menuItem" onClick={handleAddTextFrame}><img src={text} alt="" width={18} /> Text</div>
            <input type="file" ref={imgRef} onChange={handleAddImageFrame} accept="image/*" style={{display:"none"}}/>
            <div className="menuItem" onClick={handleAddImage}><img src={image} alt="" width={18} /> Image</div>
            <div className="menuItem" onClick={handleDeleteFrame}><img src={trash} alt="" width={18} /> Frame</div> 
            <div className="menuItem" onClick={handleEditSlideBtn}><img src={pen} alt="" width={18} /> Slide</div> 

        </div>
        <div className='verticalDevider'></div>
      <div className="editTextContainer">
        <select onChange={handleFontSizeChange}>
            <option value="small">Small</option>
            <option value="">Normal</option>
            <option value="large">Large</option>
            <option value="huge">Huge</option>
        </select>

        <input type="color" className='inputColor' onChange={handleColorChange} />
        <div className='alignStyleContainer'>
        <div className='editTextBtn' onClick={() => handleAlignmentChange('')}><img src={lAlign} alt="" width={18} /></div>
        <div className='editTextBtn' onClick={() => handleAlignmentChange('center')}><img src={cAlign} alt="" width={18} /></div>
        <div className='editTextBtn' onClick={() => handleAlignmentChange('right')}><img src={rAlign} alt="" width={18} /></div>
        </div>
        <div className='textStyleContainer'>
        <div className='editTextBtn' onClick={() => handleFormat('bold')}><img src={boldBtn} alt="" height={20} /></div>
        <div className='editTextBtn' onClick={() => handleFormat('italic')}><img src={italicBtn} alt="" height={14} /></div>
        <div className='editTextBtn' onClick={() => handleFormat('underline')}><img src={underlineBtn} alt="" height={14} /></div>
        </div>
        </div>
    </div>;
}

