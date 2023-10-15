import './App.css'
import { useEffect, useState } from 'react'
export default function Check()
{
    const [count,setCount]=useState(0);
    let vari=0;

    useEffect(()=>{
        vari=vari+1;
        console.log(vari);
    })

    return(
        <>
        <div id="main">
            {count}
        </div>
        </>
    )
}