import express from "express"
import db from "../index.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const router = express.Router()


const encryptPassword= function(password){
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password,salt);
}

/**
 * Log In
 * Checks if the user exists and if the password is correct
 * @param req - request
 * @param res - response
 * @return the json format of the response
 */
router.post("/logIn",(req,res)=>{
    var q = "SELECT * FROM users WHERE email = ? "
    
    db.query(q,[req.body.email],(err,result)=>{
        if(err)
            return res.json(err)
        if(result.length === 0)
            return res.status(201).json("This user does not exist.")
        if (!bcrypt.compareSync(req.body.password,result[0].password))
             return res.status(201).json("Wrong Password.")
        
        const token=jwt.sign({id:result[0].id},"jwtSecretKey")
        res.cookie("accessToken",token,{httpOnly:true,}).status(200).json({id:result[0].id,username:result[0].username,email:result[0].email})
    })

})

/**
 * Sign Up
 * Checks if the username and email is not already used and add it to the database
 * @param req - request
 * @param res - response
 * @return the json format of the response
 */
router.post("/signUp",(req,res)=>{
    var q = "SELECT * FROM users WHERE username = ? "

    db.query(q,[req.body.username],(err,result)=>{
        if(err)
            return res.json(err)
        if(result.length >0)
            return res.status(201).json("This username is already used.")
    
        q = "SELECT * FROM users WHERE email = ? "
    
        db.query(q,[req.body.email],(err,result)=>{
            if(err)
                return res.json(err)
            if(result.length >0)
                return res.status(201).json("This email is already used.")
        
            const hashedPassword = encryptPassword(req.body.password)
            q = "INSERT INTO users (`username`,`email`,`password`) VALUES (?)"
            
            const values=[
                req.body.username,
                req.body.email,
                hashedPassword,
            ]
            
            db.query(q,[values],(err,result)=>{
                if(err)
                    return res.json(err)     
                return res.status(200).json("User has been created.")
            })
        
        })
        
    })
    
})
/**
 * Log Out
 * Deletes the accessToken from the cookies
 * @param req - request
 * @param res - response
 * @return the json format of the response
 */
router.post("/logOut",(req,res)=>{
    res.clearCookie("accessToken",{
        secure:true,
        sameSite:"none"
    }).status(200).json("LogOut successfull.")
})

export default router