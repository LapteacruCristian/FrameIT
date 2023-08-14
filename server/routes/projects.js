import express from "express"
import db from "../index.js"
import jwt from "jsonwebtoken"


const router = express.Router()
/**
 * Changes the personal information of the user
 * @param req - request
 * @param res - response
 * @return the json format of the response
 */


router.get("",(req,res)=>{
    
    const accessToken = req.cookies.accessToken;
    if (accessToken) {
        try {
          const decodedToken = jwt.verify(accessToken, 'jwtSecretKey');
            
            const q = 'SELECT id,name,date FROM projects WHERE authorId=? ORDER BY date DESC,name ASC'           

            db.query(q,decodedToken.id,(err,result)=>{

                if(err){
                    return res.json(err)   
                }
                res.json(result)

          })
        }catch (error) {
            console.error('Error verifying token:', error);
        }
    }

                
                
 })

router.get("/recent",(req,res)=>{
    
    const accessToken = req.cookies.accessToken;
    if (accessToken) {
        try {
          const decodedToken = jwt.verify(accessToken, 'jwtSecretKey');
            
            const q = 'SELECT id,name,date FROM projects WHERE authorId=? ORDER BY date DESC, name ASC LIMIT 10'           

            
            db.query(q,decodedToken.id,(err,result)=>{

                if(err){
                    return res.json(err)   
                }
                res.json(result)

          })
        }catch (error) {
            console.error('Error verifying token:', error);
        }
    }

                
                
 })

 const getFrames = (slideId) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM frames WHERE idSlide=?';
      db.query(query, slideId, (err, frames) => {
        if (err) {
          reject(err);
        } else {
          resolve(frames);
        }
      });
    });
  };

 router.get('/:id', (req, res) => {
    const slidesList = [];
    const { id } = req.params;
    const q = 'SELECT * FROM slides WHERE idProject=?'           

        db.query(q,id,async (err,slides)=>{
            if(err){
                return res.json(err) 
            }
            else{
                for (let i = 0; i < slides.length; i++){
                
                    slidesList.push({
                        id:slides[i].slideOrder,
                        background:slides[i].background,
                        frames:[]
                    })
                    console.log(slides[i].id)
                    var frames=await getFrames(slides[i].id)
                        for (let j = 0; j < frames.length; j++) {

                            slidesList[i].frames.push({
                                id: frames[j].order,
                                type: frames[j].type,
                                content: frames[j].content,
                                x: frames[j].x,
                                y: frames[j].y,
                                width: frames[j].width,
                                height: frames[j].height,
                            })
                        }
                    
                    
                }
                console.log(slidesList[0].frames)
                res.status(200).json(slidesList);
            }
      })
})

router.post('/:id', (req, res) => {
    const { id } = req.params;
    const q = 'SELECT * FROM projects WHERE id=?'           

        db.query(q,id,(err,result)=>{
            if(err)
                return res.json(err)
            if(result.length>0){
                const q="DELETE FROM projects WHERE id=?";
                    db.query(q,[result[0].id],(err,result)=>{
                        if(err)
                            return res.json(err)
                        res.status(200).json("Project deleted.")
                    })
            }
        })
})


export default router