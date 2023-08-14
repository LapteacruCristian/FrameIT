import express from "express"
import db from "../index.js"
import jwt from "jsonwebtoken"

const router = express.Router()


router.post("",(req,res)=>{
    const projectId=req.body.id;
    const accessToken = req.cookies.accessToken;
    if (accessToken) {
        try {
            const decodedToken = jwt.verify(accessToken, 'jwtSecretKey');
            console.log(req.body.uderId)
            if (decodedToken.id===req.body.uderId){
                var q = "SELECT * FROM projects WHERE name=? AND authorId=?";
                var values = [
                  req.body.projectName,
                  decodedToken.id,
                  ];
                  db.query(q, values, (err, result) => {
                      if (err) {
                          return res.status(500).json(err);
                      }
                      if (result.length > 0 && result[0].id!==projectId) {
                          return res.status(201).json("Project name already used.");
                      } else {
                          var q="DELETE FROM projects WHERE id=?";
                          db.query(q,projectId,(err,result)=>{
                              if(err)
                                  return res.json(err)
                                  q = "INSERT INTO projects (`id`,`name`,`authorId`,`date`) VALUES (?,?,?,NOW())";            
                                  var values=[
                                      projectId,
                                      req.body.projectName,
                                      decodedToken.id,
                                  ]
                                  db.query(q,values,(err,result)=>{
                              
                                      if(err){
                                          return res.json(err)
                                      }   
                                      else{
                                          for (const slide of req.body.slidesList) {
                                              q = "INSERT INTO slides (`idProject`,`slideOrder`,`background`) VALUES (?)"
                                              var values=[
                                                  result.insertId,
                                                  slide.id,
                                                  slide.background,         
                                              ]
                                              db.query(q,[values],(err,result)=>{
                                                  if(err)
                                                      return res.json(err)   
                          
                                                  for (var frame of slide.frames){
                                                      console.log(frame)
                                                      q = "INSERT INTO frames (`order`,`idSlide`,`type`,`content`,`x`,`y`,`width`,`height`) VALUES (?)"
                                                      values=[
                                                          frame.id,
                                                          result.insertId,
                                                          frame.type,
                                                          frame.content,
                                                          frame.x,    
                                                          frame.y,
                                                          frame.width,
                                                          frame.height     
                                                          ]
                                                      
                                                      db.query(q,[values],(err,result)=>{
                                                          if(err)
                                                              return res.json(err) 
                                                      })
                                                  }
                                              })
                                          }
                                          return res.status(200).json("Project saved!")  
                                      }
                                  })
                              })
                      }
                  })
            }
          
        }catch (error) {
            console.error('Error verifying token:', error);
            res.sendStatus(401);
        }
    }               
 })


export default router