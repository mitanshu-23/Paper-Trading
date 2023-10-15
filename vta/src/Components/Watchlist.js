import { useContext, useEffect } from "react";
import { VTAContext } from "../Context/Context";

export default function Watchlist(props){
    console.log("Yes");
    const context=useContext(VTAContext);
    const {getWatchlist, watchl}=context;
    
    useEffect(()=>{
        getWatchlist();
        //console.log("Inside Watclist", watchl);
    },[]);
    return(
        <>
    <div style={{ paddingTop:'10px', paddingBottom:'50px',marginLeft:"30px" }}>
<div id="main">
<div class="card">
  <div class="card-body">
        <table className="table">

        <thead>
    <tr>
      <th scope="col">Stock</th>
      <th scope="col">Price</th>
    </tr>
  </thead>

  <tbody>
        {
             watchl.map((index)=>{
                console.log("Watch:", watchl);
                return(<tr>
                    <th scope='g-col' width='10%'>{props.stockPrice[index].name}</th>
                    <td width='10%'>{props.stockPrice[index].price}</td>
                  </tr>);
             })
         
    }
    </tbody>
        </table>
        </div>
        </div>
        </div>
        </div>
        </>
    );
}