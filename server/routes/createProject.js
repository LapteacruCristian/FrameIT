import express from "express"
import db from "../index.js"
import jwt from "jsonwebtoken"


const router = express.Router()
router.post("", (req, res) => {
    var projectId = null;
    const accessToken = req.cookies.accessToken;
  
    if (accessToken) {
      try {
        const decodedToken = jwt.verify(accessToken, 'jwtSecretKey');

        if(decodedToken.id===req.body.uderId){
          var q = "SELECT * FROM projects WHERE name=? AND authorId=?";
        var values = [
          req.body.projectName,
          decodedToken.id,
        ];
        db.query(q, values, (err, result) => {
          if (err) {
            return res.status(500).json(err);
          }
          if (result.length > 0) {
            return res.status(201).json("Project name already used.");
          } else {
            q = "INSERT INTO projects (`name`, `authorId`, `date`) VALUES (?, ?, NOW())";
            var values = [
              req.body.projectName,
              decodedToken.id,
            ];
            db.query(q, values, (err, result) => {
              if (err) {
                return res.status(500).json(err);
              }
              projectId = result.insertId;
    
              for (const slide of req.body.slidesList) {
                console.log(slide)
                q = "INSERT INTO slides (`idProject`, `slideOrder`, `background`) VALUES (?, ?, ?)";
                var values = [
                  projectId,
                  slide.id,
                  slide.background,
                ];
                db.query(q, values, (err, result) => {
                    if (err) {
                        console.log("Eroare: ",err)
                        return res.status(500).json(err);
                    }else{
                         for (var frame of slide.frames) {
                          console.log(frame)
                            q = "INSERT INTO frames (`order`, `idSlide`, `type`, `content`, `x`, `y`, `width`, `height`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
                            var values = [
                              frame.id,
                              result.insertId,
                              frame.type,
                              frame.content,
                              frame.x,
                              frame.y,
                              frame.width,
                              frame.height,
                            ];
                            db.query(q, values, (err, result) => {
                                if (err) {
                                    return res.status(500).json(err);
                                }
                            });
                         
                        }
                    }
                })
                
            }
            return res.status(200).json(projectId);

        })
                         
    }
    });
        }
  
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json('Invalid token');
      }
    } else {
      return res.status(401).json('Access token not provided');
    }
  });
  
  export default router;
  