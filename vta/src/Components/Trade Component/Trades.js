import Tradesdata from "./Tradesdata";
import "../../App.css";
import { useContext, useEffect, useState } from "react";
import { VTAContext } from "../../Context/Context";
import Historydata from "./Historydata";
import { useNavigate } from "react-router-dom";
import { ChartComponent } from "../../Charts/Chart1";

export default function Trades(props) {
  const {
    user,
    getdata,
    data,
    dkey,
    sell,
    gethistory,
    hdata,
    putdata,
    profiledata,
    getProfile,
  } = useContext(VTAContext);
  const [curr, setCurr] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();
  const initialData = [
    { time: "2018-12-22", value: 32.51 },
    { time: "2018-12-23", value: 31.11 },
    { time: "2018-12-24", value: 27.02 },
    { time: "2018-12-25", value: 27.32 },
    { time: "2018-12-26", value: 25.17 },
    { time: "2018-12-27", value: 28.89 },
    { time: "2018-12-28", value: 25.46 },
    { time: "2018-12-29", value: 23.92 },
    { time: "2018-12-30", value: 22.68 },
    { time: "2018-12-31", value: 22.67 },
  ];

  useEffect(() => {
    console.log("Useeffect----------------");

    const fetchData = async () => {
      await getdata();
      await gethistory();
      await getProfile();
    };
    if (!user) {
      console.log("USER", user);
      alert("YOU NEED TO SIGNIN");
      navigate("/SignIn");
    } else {
      fetchData();
    }

    return () => {};
  }, []);

  //console.log(profiledata);
  return (
    
     <>
        <div style={{ display: "flex", flexWrap: "nowrap",marginTop:"50px",marginLeft:"200px" }}>
          <div className="card  mb-3 rounded-3" style={{ width: "43%" ,backgroundColor:"#0859FE"    }}>
            <div className="card-header">
              <h3>Funds</h3>
            </div>
            <div>
              <div className="card-body">
                <blockquote className="blockquote mb-0">
                  <h3>
                    Used Margin: ${parseFloat(profiledata.Amount).toFixed(2)}
                  </h3>
                  <h3>
                    {props.stockPrice[curr].name}: $
                    {props.stockPrice[curr].price}
                  </h3>
                </blockquote>
              </div>
            </div>
          </div>

          <div
            className="card mb-3 rounded-3"
            style={{ width: "43%", marginLeft: "5%" , backgroundColor:"#0859FE"}}
          >
            <div className="card-header">
              <h3>Name</h3>
            </div>
            <div>
              <div className="card-body">
                <blockquote className="blockquote mb-0">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    onChange={(e) => {
                      console.log("Name:", e.target.value);
                      console.log("Current Stock", curr);
                      setCurr(e.target.value);
                    }}
                    style={{ width: "60%", marginBottom: "10px" }}
                  >
                    {props.stockPrice.map((stocks, index) => (
                      <option key={index} value={index}>
                        {stocks.name}
                      </option>
                    ))}
                  </select>

                  <div className="mb-3">
                    <label>Quantity</label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => {
                        //setQuantity(Number(e.target.value));
                        setQuantity(+e.target.value);
                        console.log(typeof quantity);
                      }}
                      placeholder="50"
                      style={{ width: "20%" }}
                    />
                  </div>

                  <button
                    onClick={(e) => {
                      putdata({
                        "Buying Price": props.stockPrice[curr].price * quantity,
                        "Stock name": props.stockPrice[curr].name,
                        Sindex: curr,
                        Quantity: quantity,
                      });
                    }}
                  >
                    Buy
                  </button>
                </blockquote>
              </div>
            </div>
          </div>
          </div>


          <div style={{ marginLeft:"199px",marginTop:"3%", width:"80%" , border:"1px solid black"}}>
        <ChartComponent data={initialData}></ChartComponent>
      </div>
        


      
   
      <div style={{ marginLeft:"200px",marginTop:"3%", width:"80%" }}>
        <div class="card">
          <div class="card-body">
            <h1>Position</h1>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="g-col" width="10%">
                    Stock Name
                  </th>
                  <th scope="g-col" width="10%">
                    Buying Price
                  </th>
                  <th scope="g-col" width="10%">
                    Exit Price
                  </th>
                  <th scope="g-col" width="10%"></th>
                </tr>
              </thead>
            </table>

            <div>{data.length === 0 && "No data"}</div>

            {data.map((absolute, index) => {
              console.log("Ab", absolute);
              let ep =
                props.stockPrice[absolute["Sindex"]].price * absolute.Quantity;
              return (
                <Tradesdata
                  data_p={absolute}
                  absid={dkey[index]}
                  update={() => {
                    sell(dkey[index], index, ep);
                  }}
                  sp={ep}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ marginLeft:"200px",marginTop:"3%", width:"80%", marginBottom:"3%" }}>
        <div class="card">
          <div class="card-body">
            <h1>Trades</h1>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="g-col" width="10%">
                    Stock Name
                  </th>
                  <th scope="g-col" width="10%">
                    Buying Price
                  </th>
                  <th scope="g-col" width="10%">
                    Exit Price
                  </th>
                  <th scope="g-col" width="10%">
                    Gain/Loss
                  </th>
                  <th scope="g-col" width="10%">
                    Quantity
                  </th>
                </tr>
              </thead>
            </table>

            {hdata.map((absolute) => {
              return <Historydata hdata_p={absolute} />;
            })}
          </div>
        </div>
      </div>

  
    </>
  );
}
