import { createContext, useState } from "react";
import React from "react";
// import {getAuth} from "firebase"
import {getDatabase,ref,push, set, get, child, update, remove} from 'firebase/database'
import {app} from '../Firebase'
import{createUserWithEmailAndPassword, getAuth} from 'firebase/auth'
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";


const db=getDatabase(app);//Instance to interact with database
const auth=getAuth(app);
export const VTAContext = createContext();


function ContextProvider(props){

    const [user,setUser] = useState(null);
    const[data,setData]=useState([]);
    const[hdata,setHdata]=useState([]);
    const[dkey,setDkey]=useState({});
    const[watchl, setWatchl]=useState([]);
    const[profiledata,setProfiledata]=useState([]);
    

    useEffect(() =>{
        onAuthStateChanged(auth, (user) => {
            if(user)
            {
                //console.log('Hello', user);
                setUser(user);
               // fetchData();
                //console.log(user.uid);
            }
            else
            {
                console.log('You are logged out');
                setUser(null);
                 setData([]);
                 setHdata([]);
            }
        })
      },[]);



//     const fetchData = async () => {
      
//       const tickers=["AAPL","GOOG"];

//       await fetch('https://api.twelvedata.com/price?symbol=' + tickers.toString() + '&apikey=' + TDKEY)
//   .then(response => response.json())
//   .then(data => {
//     console.log("data:", data);
//     //console.log(data["AAPL"]["price"]);
//     //let temp2=;
    
//     let array = Object.keys(data).map(key => {
//       return { name: key, price: data[key].price };
//     });
//   console.log("2nd",array);
//   setStockprice(array);
//   //setSec(sec+1);
//  }
//   )
//   .catch(error => console.log('Error:', error));
//             //await CurrPrices(["AAPL","GOOG"]);

//     };

    const putdata =async (data_put) => {
        if(!user)
       { alert("You NEED TO SIGN IN FIRST");}
        else
        {
        //let temp=user.uid;
        //await set(ref(db, 'stocks/' + user.uid), data);
        console.log("Data to put: ",data_put);
        const newChildRef = await push(ref(db, 'stocks/' + user.uid));
        set(newChildRef, data_put).then(() => {
            //console.log('Generated key:', newChildRef.key);
    alert('Data added successfully.');
    let newData=JSON.parse(JSON.stringify(data));
    console.log("New Data",newData);
    newData.push(data_put);
    //setData(newData);
    updateProfile((-data_put['Buying Price']));
    getdata();
  })
  .catch((error) => {
    alert('Data could not be added.');
    console.log(error);
  });
        //alert("Stock bought");}
      }
    }

    const getdata =async () => {
        console.log("GetData:",user);
        if(!user)
       { alert("You NEED TO SIGN IN FIRST");
       console.log(hdata,data);
       }
        else
        {
        //const newChildRef = await push(ref(db, 'stocks/' + user.uid));
        console.log(user.uid);
        const data_get = await get(child(ref(db),'stocks/' + user.uid));
        //var data = snapshot.val();
        console.log("Data in getdata:",data_get.val());
        if(data_get.val() !==null)
        {
          var keys = Object.keys(data_get.val());
        setDkey(keys);
        console.log(data_get.val());
        let arr = Object.values(data_get.val());//Converting Object of Object to array of objects to use map function
        setData(arr);
      }
      else
    {
      setData([]);
    }
        //setData(data_get);
    //     .then((snapshot) => {
    //         console.log(snapshot);
    //         if(snapshot.exists()) {
    //             console.log("Data exists",snapshot.val());
    //         } else {
    //             console.log("No Data");
    //         }
    //     }).catch((error) => {
    // alert('Data could not be added.');
    // console.log(error);
//   });
        //alert("Stock bought");}
      }
    }

      const putuser =async (data_u) => {
        //console.log(data);

        try {
          await createUserWithEmailAndPassword(auth, data_u.Email, data_u.pass);
          alert("User Registered");
          return true;
      } catch (error) {
          console.log("Error: ", error.message);
          alert("Some error occured");
          return false;
      }
        // await createUserWithEmailAndPassword(auth,data_u.Email,data_u.pass)
        // .then((value) => {
          
        //     alert("User Registered"); 
        //     return true;
        //      //profileRef = firebase.database().ref('Profile/' + userId);
        // }).catch((error)=>{
        //     console.log("Error: ",error.message);
        //     alert("Some error occured");
        //     return false;
        // });

        // const newChildRef = await push(ref(db, 'users'));

        // update(newChildRef, user.uid).then(() => {
         
        //   alert("User Registered");
// })
// .catch((error) => {
//   alert('Data could not be added.');
//   console.log(error);
// });

      }

      const sell = async (data_id,ind, ep) =>{
        console.log(typeof(ep));
        console.log(data_id,data,"ep:",ep);//even update is later update will be seen on console so use,
        console.log(JSON.parse(JSON.stringify(data)));
        //If you’re logging the data before updating it and seeing the updated data in the log, 
        //it’s likely because JavaScript objects (like your data object) are passed by reference, not by value.

        //JSON.parse(JSON.stringify(data)) is used to create a deep copy of data. This copy is then logged to the console. 
        //Because this is a copy and not a reference to the original data object, any changes to data will not be reflected in the logged object.

         //const nodeRef = ref(db, 'stocks/' + user.uid +'/' + data_id);
        //  console.log("before:",data);
// // 'newValue' is the new value you want to set for the key
//  let updates = {'Selling Price' :ep};
// // updates['Selling Price'] = 40; || updates
// console.log("UPDATES",updates);
//  update(nodeRef, updates).then(() => {
//     alert('Update successful');
    // console.log(ind,data[ind]);
    
    let newData=JSON.parse(JSON.stringify(data));
    //let newData=data;

    // console.log("New Data",newData);
    // newData[ind]['Selling Price']=newData[ind]['Selling Price']+ind;
    // console.log(newData[ind]['Selling Price']);
    // setData(newData);
    // console.log(data, data[ind]);
    del(data_id,ind, data[ind],ep);
    // getdata();
    // gethistory();
    

     
    // console.log(newData[ind]['Selling Price']);
    // setData(newData);
    // console.log(data, data[ind]);
  // }).catch((error) => {
  //   console.error('Update failed: ', error);
  // });

  // del(data_id, data[ind]);

}


  const del = async (data_id,ind,histry,ep) => {

    const nodeRef = ref(db, 'stocks/' + user.uid +'/' + data_id);

    remove(nodeRef).then(() => {
          alert(data_id);
          puthistory(data_id,ind,histry,ep);
    })
    .catch((error) => {
      console.log("Error removing node: " + error.message);
        del(data_id,ind,histry,ep);
    });

  }

    const puthistory = async (data_id,ind,histry,ep) =>{
      if(!user)
       { alert("You NEED TO SIGN IN FIRST");
       }
        else
        {
          histry['Selling Price'] = ep
        console.log(histry);
        const newChildRef = await push(ref(db, 'history/' + user.uid));
        set(newChildRef, histry).then(() => {
            //console.log('Generated key:', newChildRef.key);
    alert('Data added successfully.');
    let newData=JSON.parse(JSON.stringify(data));
    //let newData=data;
    newData.splice(ind, 1);
    console.log("New Data after removal",newData);
    //newData[ind]['Selling Price']=newData[ind]['Selling Price']+ind;
    //console.log(newData[ind]['Selling Price']);
    setData(newData);

    let newhdata=JSON.parse(JSON.stringify(hdata));
    //let newData=data;
   
     newhdata.push(histry)
     console.log("New Data H:",newhdata);
     setHdata(newhdata);
     updateProfile(ep);
    //gethistory();

  })
  .catch((error) => {
    alert('Data could not be added.');
    console.log(error);
    puthistory(histry);
  });
        //alert("Stock bought");}
      }
    }


    const gethistory =async () => {
      //console.log("GetData:",user);
      if(!user)
     { alert("You NEED TO SIGN IN FIRST");
     }
      else
      {
      //const newChildRef = await push(ref(db, 'stocks/' + user.uid));
      console.log(user.uid);
      const history_get = await get(child(ref(db),'history/' + user.uid));
      //var data = snapshot.val();
      console.log("Data in getdata history:",history_get.val());
      if(history_get.val() !==null)
      {
       // var keys = Object.keys(data_get.val());
      //setDkey(keys);
      console.log("GET HISTORY:",history_get.val());
      let arr = Object.values(history_get.val());//Converting Object of Object to array of objects to use map function
      console.log("arr:",arr);
      setHdata(arr);
    }
    else
    {
      setHdata([]);
    }
    }
  }

  const addWatchlist= async (index) =>{
    if(!user)
       { alert("You NEED TO SIGN IN FIRST");
       }
        else
        {
        console.log(index);
        const newChildRef = await push(ref(db, 'watchlist/' + user.uid));
        set(newChildRef, index).then(() => {
    alert('Watchlist Updated');
    getWatchlist();
    // let newData=JSON.parse(JSON.stringify(watchl));
    // newData.push(index)
    // console.log("New Data after removal",newData);
   // setData(newData);
  })
  .catch((error) => {
    // alert('Data could not be added.');
    console.log(error);
    addWatchlist(index);
  });
      }
  }

  const getWatchlist= async (index) =>{
    if(!user)
       { alert("You NEED TO SIGN IN FIRST");
       }
        else
        {
        const watchldata = await get(child(ref(db),'watchlist/' + user.uid));
        if(watchldata.val()!=null)
        {
        let arr = Object.values(watchldata.val())
        console.log("Watchlist: ",watchldata.val(),arr);
        setWatchl(arr);
        }
        else{
          setWatchl([])
        }
      }
  }

const editProfile =async (pdata) =>{
         console.log(pdata);
         try{
        const newChildRef = await (ref(db, 'users/' + user.uid));

        const res=await set(newChildRef, pdata)
        
    alert('Data added successfully.');
    return true;
        }
      catch(error){
          alert("Couldn't Update Profile");
          return false;
    }
    
}

const getProfile = async()=>{
  const profiled = await get(child(ref(db),'users/' + user.uid));
    console.log("Profiled",profiled);
    if(profiled.val()!=null)
    {
    console.log("ppp",profiled.val());
    setProfiledata(profiled.val());
    }
    else{
      setProfiledata([])
    }
  }

  const updateProfile = async(change)=>{
   // const profiled = await get(child(ref(db),'users/' + user.uid));
   try {
    const newChildRef = ref(db, 'users/' + user.uid);
    update(newChildRef, {
      'Amount': +profiledata['Amount'] + +change
    }).then(() => {
      console.log('Update successful');
      getProfile();
    }).catch((error) => {
      console.error('Update failed: ', error);
    });
  } catch(error) {
    console.log("Error");
    updateProfile(change);
  }
    //let updates['Amount'] = 40;
      // if(profiled.val()!=null)
      // {
      // setProfiledata(profiled.val());
      // }
      // else{
      //   setProfiledata([])
      // }
    }

  

  //setInterval(fetchData, 20000);
    return(
    
<VTAContext.Provider value={{user, putdata, putuser,auth, getdata, data,dkey, sell, gethistory, hdata, addWatchlist, getWatchlist, watchl, editProfile, profiledata, getProfile}}>
{props.children}
</VTAContext.Provider>
    );
}

export default ContextProvider;