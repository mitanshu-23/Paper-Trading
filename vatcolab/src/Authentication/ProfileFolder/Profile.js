import '../../App.css'
import { useContext, useState } from 'react';
import { VTAContext } from '../../Context/Context';
import { useNavigate } from 'react-router-dom';

export default function Profile()
{
    const [name, setName] = useState("");
    const[age,setAge]=useState(0);
    const[amount,setAmount]=useState(0);
    const navigate = useNavigate(); 
    const{editProfile} = useContext(VTAContext);
    const Register = async (e) =>{
      e.preventDefault();
      console.log(name,age,amount);
      const res=await editProfile({'Name' :name,'Age':age,'Amount':amount});
      if(res===true)
      {
        alert("Profile Updated Successfully");
        navigate('/');
      }
      else
      alert("We couldn't proceed your request, Please try again");
      }
        


    return(
        <>
        <form id="main" onSubmit={Register}>
  <div className="mb-3">
    <label>Your Name</label>
    <input type="text"  value={name} onChange={(e)=>{
        setName(e.target.value);
    }} placeholder='Your Name' required/>
  </div>
  <div className="mb-3">
    <label >Date of Birth</label>
    <input type="number"   value={age} onChange={(e)=>{
        setAge(e.target.value);
    }} placeholder='15' required/>
  </div>
  <div className="mb-3">
    <label  >Select Amount</label>
    <input type='number'  value={amount} onChange={(e)=>{
        setAmount(e.target.value);
    }} placeholder='Confirm Password' required/> 
    It is Recommended to choose amount wisely
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
  

</form>

        </>
    );
}