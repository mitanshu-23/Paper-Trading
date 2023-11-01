import logo from './logo.svg';
import './App.css';
import Sidebar from './Components/Sidebar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Watchlist from './Components/Watchlist';
import Dashboard from './Components/Dashboard';
import SignUp from './Authentication/SignUp';
import Profile from './Authentication/ProfileFolder/Profile';
import SignIn from './Authentication/SignIn';
import ContextProvider from './Context/Context';
import Trades from './Components/Trade Component/Trades';
import Check from './Check';
import { useEffect, useState } from 'react';
import { ChartComponent } from './Charts/Chart1';
import Component2 from './Component2';

function App() {
  const [stockPrice, setStockprice]=useState([{name:"AAPL", price:"Loading...."}]);
  const [stockdata, setStockData]=useState([{open:"Loading...", high:"Loading....", low:"Loading...", close:"Loading...."}]);
  const [newsdata, setNewsData]=useState([{}]);

  useEffect(()=>{

    const fetchData = async () => {
  await fetch('http://localhost:5000/stockPrice')
  .then(response => response.json())
  .then(data => {
    console.log("Suucceess");
    let array = Object.keys(data).map(key => {
      return { name: key, price: data[key].price };
    });
  setStockprice(array);
 }
  ).catch(error => console.log('Error:', error));
    };


    const fetchother = async () => {
await fetch('http://localhost:5000/stockdataPrice')
  .then(response => response.json())
  .then(data => {
          console.log("HIGH",data);
        let array = Object.keys(data).map(key => {
          return { name: key, close: data[key].close, open: data[key].open, high: data[key].high, low: data[key].low };
        });
      setStockData(array);
 }
  ).catch(error => console.log('Error:', error));
    }

    const fetchNews = async () => {
      await fetch('http://localhost:5000/getnews')
      .then(response => response.json())
      .then(data => {
        console.log("Suucceess",data); 
        setNewsData(data);
        }).catch(error => console.log('Error:', error));
        };


    fetchData();
    fetchother();
    fetchNews();
    const interval = setInterval(fetchData, 60000);
    const interval2 = setInterval(fetchother, 60000);

    fetchother();
    return () =>{ 
     //clearInterval(interval);
    }
  },[]);
  return (
    // <div style={{backgroundColor:'black', , width:'100%'}}>
    <>
    <ContextProvider>
    <BrowserRouter>
    
    <Component2 />
    <Sidebar /> 
    <Routes>
    <Route exact path='/SignUp' element={<SignUp/>} />
    <Route exact path='/Profile' element={<Profile/>} />
    <Route exact path='/SignIn' element={<SignIn/>} />
    <Route exact path='/' element={<Dashboard stockPrice={stockPrice} stockdata={stockdata} news={newsdata}/>} />
    <Route exact path='/Trades' element={<Trades stockPrice={stockPrice}/>} />
    <Route exact path='/Watchlist' element={<Watchlist stockPrice={stockPrice}/>} />
    <Route exact path='/Profile' element={<Profile />} />
    <Route exact path='/Check' element={<Check />} />
    <Route exact path='/Profile1' element={<Component2 />} />
    </Routes>


    
    </BrowserRouter>
    </ContextProvider>
    {/* // <ChartComponent  data={initialData}></ChartComponent> */}
    
    </>
    );
    {/* // </div> */}
    
}

export default App;
