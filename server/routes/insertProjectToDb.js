import db from "../index.js"

export default function insertProject(req,decodedToken,res){
    if(!req.body.id){
        const q = "INSERT INTO projects (`name`,`authorId`,`date`) VALUES (?,?,CURDATE())";            
    const values=[
        req.body.projectName,
        decodedToken.id,
    ]
    db.query(q,values,(err,result)=>{

        if(err)
            return res.json(err)   

            for (const slide of req.body.slidesList) {
                    var q = "INSERT INTO slides (`idProject`,`slideOrder`,`background`) VALUES (?)"
                    const values=[
                        result.insertId,
                        slide.id,
                        slide.background,         
                    ]
                    db.query(q,[values],(err,result)=>{
                        if(err)
                            return res.json(err)   

                        for (const frame of slide.frames){
                            var q = "INSERT INTO frames (`order`,`idSlide`,`type`,`content`,`x`,`y`,`width`,`height`) VALUES (?)"
                            const values=[
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
                                return res.json("Project saved!") 
                            })
                        }
                    })
                }
            })
    }else{
        const q = "INSERT INTO projects (`id`,`name`,`authorId`,`date`) VALUES (?,?,?,CURDATE())";            
        const values=[
            req.body.id,
            req.body.projectName,
            decodedToken.id,
        ]
        db.query(q,values,(err,result)=>{
    
            if(err)
                return res.json(err)   
    
                for (const slide of req.body.slidesList) {
                        var q = "INSERT INTO slides (`idProject`,`slideOrder`,`background`) VALUES (?)"
                        const values=[
                            result.insertId,
                            slide.id,
                            slide.background,         
                        ]
                        db.query(q,[values],(err,result)=>{
                            if(err)
                                return res.json(err)   
    
                            for (const frame of slide.frames){
                                var q = "INSERT INTO frames (`order`,`idSlide`,`type`,`content`,`x`,`y`,`width`,`height`) VALUES (?)"
                                const values=[
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
                                    return res.json("Project saved!")   
                                })
                            }
                        })
                    }
                })
    }
    
            
        
    

}