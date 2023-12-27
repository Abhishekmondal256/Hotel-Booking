import React,{useState,useContext} from "react";
import { NavLink } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import Loader from '../Loader/Loader';
import Error from "../Error/Error";
const Login =()=>{


    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState();

    const loginUser=async(e)=>{
    e.preventDefault();
    const user={
        email,password
    }
try{
    setLoading(true);
const result=await axios.post("/api/users/login",user);

setLoading(false);
localStorage.setItem('currentUser',JSON.stringify(result));
window.location.href="/home";

}catch(error){
console.log(error);
setLoading(false);
setError(true);
}
   
      
      }
      return (
        <>
        {loading && <Loader/>}
        {error && <Error message='Invalid Credentials'/>}
        <section className="signup">
        
        
        <div className="containere containery">
        <div className="signup-imagey" >
           <div className="imy" style={{ backgroundImage: 'url(/signup.avif)', 
            backgroundRepeat: 'no-repeat' ,opacity:'0.7'}} />
          </div>
    <div className="signin-content">
<h2 className="ftitley">Log In</h2>
<form method="POST" className="register-form" id="register-form">

 
 <div className="form-groupe">
 <div id="labl">Email</div>
 <div id="lab2l">  <label htmlFor="email">
   <i class="zmdi zmdi-email "></i>
   </label>
   <input type="email" name="email" id="email" autoComplete="off" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="enter your email"/>
</div>
 </div>
 <div className="form-groupe">
 <div id="labl">Password</div>
 <div id="lab2l">  <label htmlFor="password">
   <i class="zmdi zmdi-gps-dot"></i>
   </label>
   <input type="password" name="password" id="password" autoComplete="off" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="enter your password"/>
</div>
 </div>
 
 <div className="form-groupeu">
 <NavLink to="/register" className="signup-link " >Create Account</NavLink>
    <input type="submit" name="signin" id="signin" className="form-submit" value="Log In" onClick={loginUser}/>
    
 </div>
 </form>

</div>


</div>



</section>

</>
)


}
export default Login;  
