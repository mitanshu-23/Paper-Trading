import React, { useContext } from 'react'
import "./Sidebar.css"
import {SidebarData} from "./SidebarData"
 import {Link, useLocation,useNavigate} from 'react-router-dom'
import { VTAContext } from '../Context/Context'
import { signOut } from 'firebase/auth'

function Sidebar() {
  // let location = useLocation();
  // let navigate=useNavigate();

    const context = useContext(VTAContext);

    const {user,auth} = context;

    const navigate = useNavigate();

    console.log(auth);

  
   //console.log("Sidebar: ",typeof(localStorage.getItem('login')))
 
  return (
    <div className='Sidebar'>
      <ul className='SidebarList'>
      {
      SidebarData.map((val,key)=>{
        // console.log(val);
        return (
          <div key = {key}  >
          <Link className='row' to={val.link}> {val.title} </Link>
           </div> 

        );
      }
      
      )}
      {   
            
            !user ? ( 
              <>
          <div>
          <Link className='row' to='/SignIn'> SignIn </Link>
           </div>
           <div>
           <Link className='row' to='/SignUp'> SignUp </Link>
            </div>
            </>
           ) :  
           (
            <div className='btn2' >
           <button 
           className='btn3'
           onClick={(e) =>{
            signOut(auth);
            navigate('/');
          
           }}
           
        >
            LogOut 
             </button>
             </div>

           )


          // else
          // {
          //     <li key = {key} >
          // <Link className='row' to={val.link}> {val.title} </Link>
          //  </li> 
          // }
      }
     
      </ul>
    </div>
  )
}

export default Sidebar