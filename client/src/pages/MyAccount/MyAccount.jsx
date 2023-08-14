import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../context/User";
import axios from "axios";
import manImg from "C:/Users/crist/Documents/FrameIT/client/src/images/man.png";
import infoImg from "C:/Users/crist/Documents/FrameIT/client/src/images/info.png";
import settingsImg from "C:/Users/crist/Documents/FrameIT/client/src/images/settings.png";
import deleteAccImg from "C:/Users/crist/Documents/FrameIT/client/src/images/trash-bin.png";
import logOutImg from "C:/Users/crist/Documents/FrameIT/client/src/images/exit.png";

import './MyAccountStyle.css';

export default function MyAccount(){
    const navigate=useNavigate();
    const {currentUser,setCurrUser} = useContext(User);
    const [newPassword, setNewPassword] =useState("");
    const [confirmNewPassword,setConfirmNewPassword]=useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");

    const [userName,setUsername] = useState(currentUser.username)
    const [email,setEmail] = useState(currentUser.email)
    const [password, setPassword] = useState(null);

    const [showDisplay, setShowDisplay] = useState(1)


    const handlePasswordChange = (e) => {
        setError(null);
        setPassword(e.target.value);
      };

      const handleNewPasswordChange = (e) => {
        setError(null);
        setNewPassword(e.target.value);
      };

      const handleConfirmNewPasswordChange = (e) => {
        setError(null);
        setConfirmNewPassword(e.target.value);
      };

    const handleUsernameChange=(e)=>{
        setError(null);
        setUsername(e.target.value)
    }

    const handleEmailChange=(e)=>{
        setError(null);
        setEmail(e.target.value)
    }


    const handleShowPassword=(e)=>{
        setShowPassword(!showPassword);
      }

      const handleShowNewPassword=(e)=>{
        setShowNewPassword(!showNewPassword);
      }
      const handleShowConfirmPassword=(e)=>{
        setShowConfirmPassword(!showConfirmPassword);
      }

    const handleLogOutBtn=async(e)=>{
        try{

            const res = await axios.post("/auth/logOut",{},{withCredentials:true,})
            
            if (res.status===200){
                setCurrUser(null)
                navigate("/")
                window.location.reload();
            }
          }catch(err){
            console.log(err)
          }  
    }

    const handleInfoBtn=(e)=>{
        setError(null)
        setShowPassword(false)
        setShowDisplay(1)
        setPassword("");
    }

    const handleChangePassBtn=(e)=>{
        setError(null)
        setShowPassword(false)
        setShowNewPassword(false)
        setShowConfirmPassword(false)
        setShowDisplay(2)
        setPassword("");
    }

    const handleDeleteBtn=(e)=>{
        setError(null)
        setShowPassword(false)
        setShowDisplay(3)
        setPassword("");
    }

    const handleDeleteAccount=async(e)=>{
        e.preventDefault();
        try{
          var inputs={
            userId: currentUser.id,
            password : password,
          }
          const res = await axios.post("/change/delete",inputs,{withCredentials:true})
          setError(res.data)
          if (res.status===200){
            setPassword("")
            setCurrUser(null)
            navigate("/")
            window.location.reload();
          }
        }catch(err){
          console.log(err)
        }  
    }

    const handleInfoChange=async (e)=>{
        e.preventDefault();
        if(password!==null){
            try{
                var inputs={
                  userId: currentUser.id,
                  username : userName,
                  email : email,
                  password : password,
                }
                const res = await axios.post("/change/info",inputs,{withCredentials:true})
                setError(res.data)
                if (res.status===200){
                  setPassword("")
                  setCurrUser({"id":currentUser.id,"username":userName,"email":email})
                }
              }catch(err){
                console.log(err)
              }  
        }
        else{
            setError("Please insert the password!")
        }
    }

    const handlePassChange=async(e)=>{
        if(password!==null){
            if(newPassword===confirmNewPassword){
                try{
                    var inputs={
                      userId: currentUser.id,
                      password : password,
                      newPassword : newPassword,
                    }
                    const res = await axios.post("/change/passw",inputs,{withCredentials:true})
                    setError(res.data)
                    if (res.status===200){
                      setPassword("")
                      setCurrUser({"id":currentUser.id,"username":userName,"email":email})
                    }
                  }catch(err){
                    console.log(err)
                  }  
            }else{
                setError("New Passwords did not match!")
            }
        }else{
            setError("Please insert the current password!")
        }
    }

    if(currentUser!=null)
        return<>
        <div className="myAccContainer">
            
            <div className="myAccDecoration">
                <h2>My Account</h2> 
                <img src={manImg} alt="" width={175} height={175}/>
            </div>
            <div className="myAccDesktopMenuContainer">
                    <button className="myAccMenuItem" onClick={handleInfoBtn}>Information</button>
                    <button className="myAccMenuItem" onClick={handleChangePassBtn}>Change Password</button>
                    <button className="myAccMenuItem" onClick={handleDeleteBtn}>Delete Account</button>
                    <div className="blanckContainer"></div>
                    <button className="myAccMenuItem" onClick={handleLogOutBtn}>Log Out</button>
            </div>
            <div className="myAccMobileMenuContainer">
                    <button className="myAccMenuItem" onClick={handleInfoBtn}><img src={infoImg} alt="" width={29} height={29}/></button>
                    <button className="myAccMenuItem" onClick={handleChangePassBtn}><img src={settingsImg} alt="" width={29} height={29}/></button>
                    <button className="myAccMenuItem" onClick={handleDeleteBtn}><img src={deleteAccImg} alt="" width={29} height={29}/></button>
                    <div className="blanckContainer"></div>
                    <button className="myAccMenuItem" onClick={handleLogOutBtn}><img src={logOutImg} alt="" width={29} height={29}/></button>
            </div>

            {showDisplay===1 &&(DisplayInformation(userName,password, email, showPassword, handleShowPassword, error, handleUsernameChange,handleEmailChange,handlePasswordChange,handleInfoChange))}

            {showDisplay===2 &&(DisplayChangePassword(showPassword, handleShowPassword, showNewPassword, handleShowNewPassword, showConfirmPassword, handleShowConfirmPassword, error,password,newPassword,confirmNewPassword,handlePasswordChange,handleNewPasswordChange,handleConfirmNewPasswordChange))}

            {showDisplay===3 &&(DisplayDeleteAccount(showPassword, handleShowPassword, error,handleDeleteAccount,handlePasswordChange))}
        
        </div>
        </>
    else
        return<>
        </>
}

function DisplayDeleteAccount(showPassword, handleShowPassword, error,password,handleDeleteAccount,handlePasswordChange) {

    return <div className="myAccContent">
        <h2 className="title">Delete Account</h2>
        <p> Deleting your account will result in the permanent loss of all information and projects associated with it. Please be aware that this action cannot be undone, and all data stored on this account will be deleted permanently.</p>
        <form>
            <div className="myAccFormComponent">
                <label htmlFor="password"> Password </label>
                <div className="passwordInput">
                <input
                        required
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    placeholder="password"
                    onChange={handlePasswordChange}/>
              
                    <i onClick={handleShowPassword} className={showPassword ? "fa-sharp fa-regular fa-eye-slash" : "fa-regular fa-eye"}></i>
                </div>
            </div>
            {error && <p id="err">{error}</p>}
            <button className="submitBtn" onClick={()=>handleDeleteAccount()}>Delete Account</button>
        </form>
    </div>;
}

function DisplayChangePassword(showPassword, handleShowPassword, showNewPassword, handleShowNewPassword, showConfirmPassword, handleShowConfirmPassword, error,password,newPassword,confirmNewPassword,handlePasswordChange,handleNewPasswordChange,handleConfirmNewPasswordChange) {
    return <div className="myAccContent">
        <h2 className="title">Change Password</h2>
        <form>
            <div className="myAccFormComponent">
                <label htmlFor="password"> Old Password </label>
                <div className="passwordInput">
                <input
                        required
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    placeholder="password"
                    onChange={handlePasswordChange}/>
                    <i onClick={handleShowPassword} className={showPassword ? "fa-sharp fa-regular fa-eye-slash" : "fa-regular fa-eye"}></i>
                </div>
            </div>
            <div className="myAccFormComponent">
                <label htmlFor="password"> New Password </label>
                <div className="passwordInput">
                    <input
                        required
                        type={showNewPassword ? "text" : "password"}
                        id="password"
                        value={newPassword}
                        placeholder="Password"
                        onChange={handleNewPasswordChange} />
                    <i onClick={handleShowNewPassword} className={showNewPassword ? "fa-sharp fa-regular fa-eye-slash" : "fa-regular fa-eye"}></i>
                </div>
            </div>
            <div className="myAccFormComponent">
                <label htmlFor="password"> Confirm Password </label>
                <div className="passwordInput">
                    <input
                        required
                        type={showConfirmPassword ? "text" : "password"}
                        id="password"
                        value={confirmNewPassword}
                        placeholder="Password" 
                        onChange={handleConfirmNewPasswordChange}/>
                    <i onClick={handleShowConfirmPassword} className={showConfirmPassword ? "fa-sharp fa-regular fa-eye-slash" : "fa-regular fa-eye"}></i>
                </div>
            </div>
            {error && <p id="err">{error}</p>}
            <button className="submitBtn">Change Password</button>
        </form>
    </div>;
}

function DisplayInformation(userName,password, email, showPassword, handleShowPassword, error,handleUsernameChange,handleEmailChange,handlePasswordChange,handleInfoChange) {
    return <div className="myAccContent">
        <h2 className="title">Information</h2>
        <form>
            <div className="myAccFormComponent">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    defaultValue={userName}
                    value={userName}
                    placeholder={userName}
                    onChange={handleUsernameChange} />
            </div>
            <div className="myAccFormComponent">
                <label htmlFor="email">Email </label>
                <input
                    type="text"
                    id="email"
                    defaultValue={email}
                    value={email}
                    placeholder={email}
                    onChange={handleEmailChange} />
            </div>
            <div className="myAccFormComponent">
                <label htmlFor="password">Password </label>
                <div className="passwordInput">
                <input
                        required
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    placeholder="password"
                    onChange={handlePasswordChange}/>
                    <i onClick={handleShowPassword} className={showPassword ? "fa-sharp fa-regular fa-eye-slash" : "fa-regular fa-eye"}></i>
                </div>
            </div>
            {error && <p id="err">{error}</p>}
            <button className="submitBtn" onClick={handleInfoChange}>Save Changes</button>
        </form>
    </div>;
}
