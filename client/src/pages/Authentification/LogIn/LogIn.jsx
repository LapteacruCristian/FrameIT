import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import './../AuthentificationStyle.css';
import handImg from "C:/Users/crist/Documents/FrameIT/client/src/images/handshake.png";
import axios from "axios"
import { User } from "../../../context/User";

const sleep = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const {currentUser,setCurrUser} = useContext(User);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleShowPassword=(e)=>{
    setShowPassword(!showPassword);
  }

  const navigate=useNavigate();

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    try{
      var inputs={
        email : email,
        password : password,
      }
      const res = await axios.post("/auth/logIn",inputs,{withCredentials:true,})
      
      if (res.status===200){
        setError("SignIn successfully.")
        await sleep(500)
        setCurrUser(res.data)
        setPassword("")
        navigate("/",{ replace: true })
      }else{
        setError(res.data)
      }
    }catch(err){
      console.log(err)
    }  
  };

  if (currentUser!=null)
    navigate('/', {replace: true});
  else
  return (
    <div className="authPageBody">
    <div className="loginContainer">
      <div className="authDecoration">
        <h2>Good to see You again!</h2> 
        <img src={handImg} alt="" width={200} height={200}/>
      </div>
      <div className="authForm">
        <h2 className="title">Log In</h2>
        <form onSubmit={handleFormSubmit}>
          
          <div className="authComponent">
            <label htmlFor="email">Email </label>
            <input
              required
              type="text"
              id="email"
              value={email}
              placeholder="example@example.com"
              onChange={handleEmailChange}
            />
          </div>

          <div className="authComponent">
            <label htmlFor="password">Password </label>
            <div className="passwordInput">
              <input
                required
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                placeholder="password"
                onChange={handlePasswordChange}
                />
                <i onClick={handleShowPassword} className={showPassword?"fa-sharp fa-regular fa-eye-slash":"fa-regular fa-eye"}></i>
              </div>
            </div>
          
          {error && <p id="err">{error}</p>}
          <button className="submitBtn" >Log In</button>
        </form>
        <span> Not Registered yet? <a className="text-gray-500" href="/signUp">Sign Up</a></span>
      
      </div>
    </div>
    </div>
  );
};

export default Login;