import React,{useState} from 'react'
import "./Register.css";
import axios from "axios";
import {NavLink,useNavigate} from "react-router-dom";
import Loader from '../Loader/Loader';
import Error from "../Error/Error";
import Success from "../Success/Success";
const Register = () => {
    const navigate=useNavigate();
    const [ name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [cpassword,setCpassword]=useState('');
    const [loading,setLoading]=useState(false);
const [error,setError]=useState();
const [success,setSuccess]=useState();
      const validateEmail = (email) => {
    
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
      };
      
      
          const PostData=async(e)=>{
            e.preventDefault();
            if (!validateEmail(email)) {
                window.alert("Invalid email format");
                return;
              }
              if(password===cpassword){
               const user={
               name,
               email,
               password,
               cpassword

               }
               try{
                setLoading(true);
              const result=await axios.post("/api/users/register",user).data
              setLoading(false);
              setSuccess(true);
              setName('');
              setEmail('');
              setPassword('');
              setCpassword('');

               }catch(error){
             console.log(error);
               setLoading(false);
               setError(true);
               }

              }
              else
              {
              alert("passwords not matched");

              }
              
                }

  return (
    <>
 
    <section className="signup">
    {loading && <Loader/>}
    {error && <Error/>}
    {success && <Success message='Registration Successfull'/>}
    <div className="containere">
   
    <div className="signup-image " >
       <div className="im " style={{ backgroundImage: `url(/signuppage.avif)`, 
        backgroundRepeat: 'no-repeat' ,opacity:'0.7' }} />
        
    
    
    </div>
    <div className="signup-content">
    <h2 className="ftitle">Sign up</h2>
    <form method="POST" className="register-form" id="register-form">
     <div className="form-group "><div id="lab">Name</div>
      <div id="lab2"> <label htmlFor="name">
       <i class="zmdi zmdi-account "></i>
        </label>
       <input type="text" name="name" id="name" autoComplete="off" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="enter your name"/>
    
       </div> </div>
     
     <div className="form-group"><div id="lab">Email</div>
      <div id="lab2"> <label htmlFor="email">
       <i class="zmdi zmdi-email"></i>
        </label>
       <input type="email" name="email" id="email" autoComplete="off" value={email} onChange={(e)=>{setEmail(e.target.value)}}  placeholder="enter your email"/>
    
      </div>  </div>
     
    
     
     
        
     
     <div className="form-group"><div id="lab">Password</div>
      <div id="lab2"> <label htmlFor="password">
       <i class="zmdi zmdi-gps-dot"></i> 
       </label>
       <input type="password" name="password" id="password" autoComplete="off" value={password} onChange={(e)=>{setPassword(e.target.value)}}  placeholder="enter your password"/>
       </div>
     </div>
     <div className="form-group"><div id="lab">Confirm Password</div>
      <div id="lab2"> <label htmlFor="cpassword">
       <i class="zmdi zmdi-lock"></i> 
       </label>
       <input type="password" name="cpassword" id="cpassword" autoComplete="off" value={cpassword} onChange={(e)=>{setCpassword(e.target.value)}}  placeholder="confirm your password"/>
       </div>
     </div>
    
     <div className="form-groupy">
     <NavLink to="/login" className="signup-link">already registered</NavLink>
        <input type="submit" name="signup" id="signup" className="form-submit" value="Register" onClick={PostData} />
        
     </div>
    
    </form>
    
    </div>
    
    
    </div>
    
    
    
    </section>
    
</>

    
  )
}

export default Register