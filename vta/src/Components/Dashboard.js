import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect, useRef, useState } from "react";
import { VTAContext } from "../Context/Context";
import Sidebar from './Sidebar';

import '../Component2.css'
import aapllogo from '../apple-inc-logo.webp'
import googlogo from '../clipart-google-9-removebg-preview.png'
import msftlogo from '../R (1).png'
import metalogo from '../Meta-Symbol.png'
import nvdalogo from '../Nvidia-Logo-Download-Transparent-PNG-Image.png'
import tslalogo from '../OIP.jpeg'
import nflxlogo from '../c8c8077a-10fc-44d5-93f0-da4e592a299e-netflix-logo-print_pms-removebg-preview.png'
import amznlogo from '../brands-amazon-logo.jpg'
import { app } from "../Firebase";

export default function Dashboard(props) {
  // let ref = useRef(null);
  // const refcl = useRef(null);
  const [curr,setCurr]=useState(0);
  const context = useContext(VTAContext);
  const {addWatchlist, watchl, getWatchlist}=context;
  const [view,setView] = useState(true)
  // const arr=[];
  // arr.push({appllogo});


  const images = {
    AAPL:{ url: aapllogo, altText: 'Image 1' },
    GOOG:{ url:  googlogo, altText: 'Image 2' },
    MSFT:{ url:  msftlogo, altText: 'Image 2' },
    META:{ url:  metalogo, altText: 'Image 2' },
    NVDA:{ url: nvdalogo, altText: 'Image 1' },
    TSLA:{ url:  tslalogo, altText: 'Image 2' },
    NFLX:{ url:  nflxlogo, altText: 'Image 2' },
    AMZN:{ url:  amznlogo, altText: 'Image 2' }
  };


  useEffect(()=>{
    getWatchlist();
  },[])
  function inwatchlist(ind)
  {
    
    let len=watchl.length;
    // console.log("INDEXES:",len);
    for(let vari=0;vari<len;vari++)
    {
      if(watchl[vari]===ind)
      return true;
    }
    return false;
  }
  return (
    <>
  
   <div id="main">

   <button style={{float:"right"}} onClick={() => {
    setView(!view);
   }}>{view==false ? "Block View" : "Table View" }</button>


            {view === false ? 
            <div class="card" style={{marginTop:"3%",}}>
  <div class="card-body" style={{fontFamily:"cursive"}}>
 <table className="table">
 <FontAwesomeIcon icon={['fas', 'ellipsis-vertical']} />
  <thead>
    <tr>
      <th scope="col" width='10%'>Stock</th>
      <th scope="col" width='10%'>Price</th>
      <th scope="col" width='10%'>Open</th>
      <th scope="col" width='10%'>High</th>
      <th scope="col" width='10%'>Low</th>
      <th scope="col" width='10%'>Close</th>
    </tr>
  </thead>
  
  <tbody>

    {
         props.stockPrice?.map((value, index) => {
          // console.log("value:" , value);
          inwatchlist(index);
        return(<tr>
      <th scope='g-col' width='10%'>{value.name}</th>
      <td width='10%'>{value.price}</td>
      <td width='10%'>{props.stockdata[index].open}</td>
      <td width='10%'>{props.stockdata[index].high}</td>
      <td width='10%'>{props.stockdata[index].low}</td>
      <td width='10%'>{props.stockdata[index].close}</td>
      
      
      
       {!inwatchlist(index)?(<td width='10%'><button onClick={()=>{
        console.log("Add to Watchlist", index);
        addWatchlist(index);
       }}>Add to Watchlist</button></td>) : (<td width='10%'>Already in Watchlist </td>)
       }
       
       </tr>
       ) } ) 
        }
      

  </tbody>

  </table>
  </div>
  </div>  : 
  
  <div style={{display:"flex",flexWrap: "wrap", marginTop:"3%", gap: "20px", marginBottom:"3%"}}>

{
     props.stockPrice?.map((value, index) => {
      return(
        
       <div style={{border:"2px solid #dcdcdc",width: "18rem", padding:"2%", borderRadius:"5%", height:"10rem"}}>
        {/* // <div class="card" style={{width: "18rem"}}> */}
      <img src={images[value.name].url} class="card-img-top" alt={images[value.name].alt}  style={{float:"right",height:"100px", width:"150px"}}/>
      <div class="card-body"style={{width:"50%"}}>
        <h5 class="card-title">{value.name}</h5>
        <p class="card-text">{value.price}</p>
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={()=>{
setCurr(index);

}}>
More
</button>
        </div>
        </div>
        ) }
   ) } 
   </div>
   }

   News

   {
      view === false ?
      <div>
      Company News
   {
         props.news?.map((value, index) => {
          console.log(props.news[index])
        return(
          <>
        <div style={{border:"1px solid black", boxShadow:"1px 1px", borderRadius:"10px", marginTop:"10px", padding:"5px", marginBottom:"5px", display:"flex",flexWrap: "wrap", gap: "20px"}}>
          <div id="text" style={{width:"85%"}}>
      <h2><p style={{fontFamily: "Roboto, sans-serif"}} >{props.news[index].headline}</p></h2>
      <h5><p style={{width: "100%", whiteSpace: "nowrap" , overflow: "hidden",textOverflow: "ellipsis"}} >{props.news[index].summary}</p></h5>
      <h6><a href={props.news[index].url} target="_blank" rel="noopener noreferrer">Read More</a></h6>
      </div>
      <img src={props.news[index].image} alt="" style={{float:"right",height:"100px", width:"150px", borderRadius:"50%", marginTop:"1%"}}>{props.news[index].img}</img>
      </div>
       </>
       ) 
      }
       
        ) 
        }
        </div>
        : 
        "Market News"}

  


    {/* <div class="card">
  <div class="card-body" style={{fontFamily:"cursive"}}>
 <table className="table">
 <FontAwesomeIcon icon={['fas', 'ellipsis-vertical']} />
  <thead>
    <tr>
      <th scope="col" width='10%'>Stock</th>
      <th scope="col" width='10%'>Price</th>
      <th scope="col" width='10%'>Open</th>
      <th scope="col" width='10%'>High</th>
      <th scope="col" width='10%'>Low</th>
      <th scope="col" width='10%'>Close</th>
    </tr>
  </thead>
  
  <tbody>

    {
        props.stockPrice?.map((value, index) => {
          // console.log("value:" , value);
          inwatchlist(index);
        return(<tr>
      <th scope='g-col' width='10%'>{value.name}</th>
      <td width='10%'>{value.price}</td>
      <td width='10%'>{props.stockdata[index].open}</td>
      <td width='10%'>{props.stockdata[index].high}</td>
      <td width='10%'>{props.stockdata[index].low}</td>
      <td width='10%'>{props.stockdata[index].close}</td>
      
      
      
       {!inwatchlist(index)?(<td width='10%'><button onClick={()=>{
        console.log("Add to Watchlist", index);
        addWatchlist(index);
       }}>Add to Watchlist</button></td>) : (<td width='10%'>Already in Watchlist </td>)
       }
       
       </tr>
       ) } )
        }
      

  </tbody>

  </table>
  </div>
  </div>  */}




  {/* <div class="card" style={{width: "18rem"}}>
  <img src={appllogo} class="card-img-top" alt="..." />
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a> */}

    

        
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">{props.stockPrice[curr].name}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <h4 width='10%'>Current: {props.stockPrice[curr].price}</h4>
      <h4 width='10%'>Open: {props.stockdata[curr].open}</h4>
      <h4 width='10%'>High: {props.stockdata[curr].high}</h4>
      <h4 width='10%'>Low: {props.stockdata[curr].low}</h4>
      <h4 width='10%'>Close: {props.stockdata[curr].close}</h4>
      <img src={images[props.stockPrice[curr].name].url} class="card-img-top" alt={images[props.stockPrice[curr].name].alt}  style={{float:"right",height:"100px", width:"150px"}}/>


      {!inwatchlist(curr)?(<td width='10%'><button onClick={()=>{
        console.log("Add to Watchlist", curr);
        addWatchlist(curr);
       }}>Add to Watchlist</button></td>) : (<td width='10%'>Already in Watchlist </td>)
       }

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>  



  </div>



  
  </>);
}
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
// import { useContext, useEffect, useRef } from "react";
// import { VTAContext } from "../Context/Context";


// export default function Dashboard(props) {
//   let ref = useRef(null);
//   const refcl = useRef(null);
//   const context = useContext(VTAContext);
//   const {addWatchlist, watchl, getWatchlist}=context;
//   useEffect(()=>{
//     getWatchlist();

//   },[])
//   function inwatchlist(ind)
//   {
    
//     let len=watchl.length;
//     console.log("INDEXES:",len);
//     for(let vari=0;vari<len;vari++)
//     {
//       if(watchl[vari]===ind)
//       return true;
//     }
//     return false;
//   }
//   return (
//     <>
//     <div style={{backgroundColor:'white',height:"50px"}}>
//       <div><img src="" alt="img" /></div>
//     </div>
//   <div style={{backgroundColor:'black', paddingTop:'10px', paddingBottom:'50px', marginTop:'100px'}}>
//   <div id="main" >
//   <div class="card">
//   <div class="card-body">
//  <table className="table">
//  <FontAwesomeIcon icon={['fas', 'ellipsis-vertical']} />
//   <thead>
//     <tr>
//       <th scope="col" width='10%'>Stock</th>
//       <th scope="col" width='10%'>Price</th>
//       <th scope="col" width='10%'>Open</th>
//       <th scope="col" width='10%'>High</th>
//       <th scope="col" width='10%'>Low</th>
//       <th scope="col" width='10%'>Close</th>
//     </tr>
//   </thead>
  
//   <tbody>

//     {
//         props.stockPrice?.map((value, index) => {
//           console.log("value:" , value);
//           inwatchlist(index);
//         return(<tr>
//       <th scope='g-col' width='10%'>{value.name}</th>
//       <td width='10%'>{value.price}</td>
//       <td width='10%'>{props.stockdata[index].open}</td>
//       <td width='10%'>{props.stockdata[index].high}</td>
//       <td width='10%'>{props.stockdata[index].low}</td>
//       <td width='10%'>{props.stockdata[index].close}</td>
      
      
      
//        {!inwatchlist(index)?(<td width='10%'><button onClick={()=>{
//         console.log("Add to Watchlist", index);
//         addWatchlist(index);
//        }}>Add to Watchlist</button></td>) : (<td width='10%'>Already in Watchlist </td>)
//        }
       
//        </tr>
//        ) } )
//         }
      

//   </tbody>

//   </table>
//   </div>
//   </div>
//   </div>
//   </div>
  
    
  
//   </>);
// }






