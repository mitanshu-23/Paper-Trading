import '../App.css'
import {app} from '../Firebase'
import { useContext, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import { VTAContext } from '../Context/Context';


export default function SignUp()
{
    const [Email, setEmail] = useState("");
    const[pass,setpass]=useState("");
    const[cpass,setcpass]=useState("");
    const navigate = useNavigate(); 
    const context= useContext(VTAContext);
    const {putuser,user}= context;

    const Register = async (e) =>{
      e.preventDefault();
        if(pass.length<8)
        {
          alert("Password is too weak, use atleast 8 characters");
        }
        else if(pass !== cpass)
        {
          alert("Password and Confirm Password don't match");
        }
        else{
          //console.log(pass);
         const ans=await putuser({Email,pass});
         console.log("YESCOMPLETE",ans);
        //  const user = await 
         if(ans===true)
         {
          console.log("YESCOMPLETE");
          navigate('/Profile');
         }

        //console.log(success);
        //console.log("Response" + res);
      }
        //Returns Promise

    }
    // const handleChange = (e) =>{
    //     setCred({...Cred, [e.target.name]:e.target.value});
    //     //console.log(e.target.name);
    // }
    //console.log(name);
    return(
        <>
<form id="main" onSubmit={Register}>
  <div className="mb-3">
    <label>Email address</label>
    <input type="email"  value={Email} onChange={(e)=>{
        setEmail(e.target.value);
    }} placeholder='Your email here'/>
  </div>
  <div className="mb-3">
    <label >Password</label>
    <input type="password"   value={pass} onChange={(e)=>{
        setpass(e.target.value);
    }} placeholder='Password' required/>
  </div>
  <div className="mb-3">
    <label  >Confirm Password</label>
    <input type="password"  value={cpass} onChange={(e)=>{
        setcpass(e.target.value);
    }} placeholder='Confirm Password'/>
  </div>
  <div id="emailHelp" className="form-text">We'll never share your data with anyone else.</div>
  <button type="submit" className="btn btn-primary">Submit</button>

</form>
        </>
    )
}