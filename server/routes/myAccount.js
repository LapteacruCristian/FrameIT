import express from "express"
import db from "../index.js"
import bcrypt from "bcrypt"

const encryptPassword= function(password){
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password,salt);
}

const router = express.Router()
import jwt from "jsonwebtoken"
//Functia actualizeaza informatia personala
router.post("/info",(req,res)=>{
    //Obtinerea Access Tokenului din Cookies
    const accessToken = req.cookies.accessToken;
    if (accessToken)
        try {
            //Decodificarea Access Tokenului
            const decodedToken = jwt.verify(accessToken, 'jwtSecretKey');
            //Verificarea daca id trimis de client este indentic cu cel creat
            //la autentificare
            if(req.body.userId === decodedToken.id){
                var q = "SELECT * FROM users WHERE id = ? "
    
                db.query(q,[req.body.userId],(err,result)=>{
                    if(err){
                        return res.status(500).json(err);
                    }
                    if(result.length>0){
                        if (!bcrypt.compareSync(req.body.password,result[0].password)){
                            return res.status(201).json("Wrong Password.")
                        }
                        if (result[0].username===req.body.username && result[0].email===req.body.email){
                            return res.status(201).json("No changes made!");
                        }

                        
                            q = "SELECT * FROM users WHERE username = ? "

                            db.query(q,[req.body.username],(err,result)=>{
                                if(err)
                                    return res.json(err)
                                if(result.length >0 && result[0].id!==req.body.userId)
                                    return res.status(201).json("This username is already used.")
                            
                                q = "SELECT * FROM users WHERE email = ? "
                                
                                db.query(q,[req.body.email],(err,result)=>{
                                    if(err)
                                        return res.json(err)
                                    if(result.length >0 && result[0].id!==req.body.userId){
                                        return res.status(201).json("This email is already used.")
                                    }

                                    q = "UPDATE users SET `username`=?, `email`=? WHERE `id`=?";
                                        var values = [
                                        req.body.username,
                                        req.body.email,
                                        req.body.userId,
                                        ];
                                        db.query(q, values, (err, result) => {
                                        if (err) {
                                            return res.status(500).json(err);
                                        }
                                        return res.status(200).json('Updated successfully.');
                                        });
                                })
                            })
                        }else{
                            return console.log('No user with this data');
                        }

                    })
                }else{
                    return console.log('Invalid user');
                }
        } catch (error) {
            return res.status(401).json('Invalid token');
        }
    else 
        return res.status(401).json('Access token not provided');
})


router.post("/delete",(req,res)=>{
    //Obtinerea Access Tokenului din Cookies
    const accessToken = req.cookies.accessToken;
    if (accessToken)
        try {
            //Decodificarea Access Tokenului
            const decodedToken = jwt.verify(accessToken, 'jwtSecretKey');
            //Verificarea daca id trimis de client este indentic cu cel creat
            //la autentificare
            if(req.body.userId === decodedToken.id){
                var q = "SELECT * FROM users WHERE id = ? "
    
                db.query(q,[req.body.userId],(err,result)=>{
                    if(err){
                        return res.status(500).json(err);
                    }
                    if(result.length>0){
                        if (!bcrypt.compareSync(req.body.password,result[0].password)){
                            return res.status(201).json("Wrong Password.")
                        }
                        var q = "DELETE FROM users WHERE id = ? "
                        db.query(q,[req.body.userId],(err,result)=>{
                            if(err){
                                return res.status(500).json(err);
                            }

                        })

                        
                        }else{
                            return console.log('No user with this data');
                        }

                    })
                }else{
                    return console.log('Invalid user');
                }
        } catch (error) {
            return res.status(401).json('Invalid token');
        }
    else 
        return res.status(401).json('Access token not provided');
})


router.post("/passw",(req,res)=>{
    //Obtinerea Access Tokenului din Cookies
    const accessToken = req.cookies.accessToken;
    if (accessToken)
        try {
            //Decodificarea Access Tokenului
            const decodedToken = jwt.verify(accessToken, 'jwtSecretKey');
            //Verificarea daca id trimis de client este indentic cu cel creat
            //la autentificare
            if(req.body.userId === decodedToken.id){
                var q = "SELECT * FROM users WHERE id = ? "
    
                db.query(q,[req.body.userId],(err,result)=>{
                    if(err){
                        return res.status(500).json(err);
                    }
                    if(result.length>0){
                        if (!bcrypt.compareSync(req.body.password,result[0].password)){
                            return res.status(201).json("Wrong Password.")
                        }else{
                            const hashedPassword = encryptPassword(req.body.newPassword)
                            q = "UPDATE users SET `password`=? WHERE `id`=?";

                                        db.query(q, hashedPassword, (err, result) => {
                                        if (err) {
                                            return res.status(500).json(err);
                                        }
                                        return res.status(200).json('Updated successfully.');
                                        });
                        }
                        
                    }else{
                            return console.log('No user with this data');
                    }

                    })
                }else{
                    return console.log('Invalid user');
                }
        } catch (error) {
            return res.status(401).json('Invalid token');
        }
    else 
        return res.status(401).json('Access token not provided');
})


export default router