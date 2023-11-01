import "../App.css"
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../Firebase";
import { useNavigate } from "react-router-dom";

const auth = getAuth(app);

export default function SignIn()
{
    const [Email, setEmail] = useState("");
    const[pass,setpass]=useState("");
    const navigate = useNavigate(); 


    const Login = (e) =>{
        e.preventDefault();
        signInWithEmailAndPassword(auth,Email,pass)
        .then((value) => {
            console.log(value);
            console.log(auth);
            alert("SignIn Successful");
            navigate('/');
        }
        ).catch((error)=>{
            console.log(error);
            console.log(auth);
            alert("Some error occured");
        });
    }

    return(
    <div id="main">
        <form  onSubmit={Login}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  value={Email} onChange={(e)=>{
        setEmail(e.target.value);
    }}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label" >Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1"  value={pass} onChange={(e)=>{
        setpass(e.target.value);
    }} />
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
    );
}