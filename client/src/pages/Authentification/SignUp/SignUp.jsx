import React, { useState , useContext} from "react";
import './../AuthentificationStyle.css';
import LoginImg from "C:/Users/crist/Documents/FrameIT/client/src/images/login.png";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { User } from "../../../context/User";

const sleep = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);
  const {currentUser} = useContext(User);

  
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleShowPassword=(e)=>{
    setShowPassword(!showPassword);
  }
  const handleShowConfirmPassword = (e)=>{
    setShowConfirmPassword(!showConfirmPassword);
  }

  const navigate=useNavigate()

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    if (password!==confirmPassword)
      setError("Passwords did not match.")
    else
      try{
        var inputs={
          username : username,
          email : email,
          password : password,
        }
        const res = await axios.post("/auth/signUp",inputs)
        setError(res.data)
        if (res.status===200){
          await sleep(500)
          setPassword("")
          setConfirmPassword("")
          navigate("/login")
        }
      }catch(err){
        console.log(err)
      }  
  };

  if (currentUser != null)
    return<></>
  return (
    <div className="authPageBody">
    <div className="signUpContainer">
      <div className="authDecoration">
        <h2>Start your journey with us</h2> 
        <img src={LoginImg} alt="" width={200} height={200}/>
      </div>
      <div className="authForm">
        <h2 className="title">Sign Up</h2>
        <form onSubmit={handleFormSubmit}>
        
          <div className="authComponent">
            <label htmlFor="username">Username </label>
            <input
              required
              type="text"
              id="username"
              value={username}
              placeholder="username"
              onChange={handleUsernameChange}
            />
          </div>
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

            <div className="authComponent">
            <label htmlFor="confirmPassword">Confirm Password </label>
            <div className="passwordInput">
              <input
              required
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              placeholder="confirm password"
              onChange={handleConfirmPasswordChange}
              />
              <i onClick={handleShowConfirmPassword} className={showConfirmPassword?"fa-sharp fa-regular fa-eye-slash":"fa-regular fa-eye"}></i>
            </div>
            </div>
          
          {error && <p id="err">{error}</p>}
          <button className="submitBtn">Sign Up</button>
        </form>
        <span> Already have an account? <a className="text-gray-500" href="/logIn">Log In</a></span>
      
      </div>
    </div>
    </div>
  );
};

export default SignUp;