import express from "express"
import mySql from "mysql"
import cors from "cors"
import authRoutes from "./routes/authentification.js"
import editProject from "./routes/editProject.js"
import cookieParser from "cookie-parser"
import projects from "./routes/projects.js"
import createProject from "./routes/createProject.js"
import change from "./routes/myAccount.js"
//DataBase connection
const db=mySql.createConnection({
    host:"localhost",
    user:"root",
    password:"Frame2023ITUAIC",
    database:"FrameIT"
})
export default db

const app=express()
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials",true)
    next();
})
app.use(cors({
    origin:"http://localhost:3000",
}))
app.use(cookieParser())
app.use(express.json())
app.use("/auth",authRoutes)
app.use("/editProject",editProject)
app.use("/createProject",createProject)

app.use("/projects",projects)

app.use("/change",change)


app.listen(5000,()=>{
    console.log("Server connected!")
})