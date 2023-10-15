var cors = require('cors')
const express = require('express')
const app = express()
const port = 5000

app.use(cors())
let currpricedata= null
let stockdata = null
let TDKEY="7ee66fa1de1945418d0e7dda8b87f9d7";
let TDKEY2="e2773db44c59460ca86bbdb3a45bd44f";

const tickers=["AAPL","GOOG","MSFT"];
//const tickers=["AAPL","GOOG","MSFT","META","NVDA","TSLA","NFLX","AMZN"];


const stockvalues = async()=>{

    try{
        const response= await fetch('https://api.twelvedata.com/price?symbol=' + tickers.toString() + '&apikey=' + TDKEY);
        currpricedata = await response.json();
        console.log(currpricedata)
        const response2= await fetch('https://api.twelvedata.com/quote?symbol=' + tickers.toString() + '&apikey=' + TDKEY2);
        stockdata = await response2.json();
        console.log(stockdata)
        
    }
    catch(error)
    {
        console.error(error);
    }

}
stockvalues();
 setInterval(stockvalues, 60000);
//await stockvalues();

app.get('/stockPrice', async(req,res)=>{
    if (currpricedata) {
        res.json(currpricedata);
      } else {
        res.status(500).send('Stock data is not available');
      }
})

app.get('/stockdataPrice', async(req,res)=>{
    if (stockdata) {
        res.json(stockdata);
      } else {
        res.status(500).send('Stock data is not available');
      }
})

// router.get('/getalldata',fetch,
// (req,res)=>{
//     if (currpricedata) {
//         res.json(stockData);
//       } else {
//         res.status(500).send('Stock data is not available');
//       }
// }
// )

app.listen(port, () => {
  console.log(`Expense app listening on port ${port}`)
}
)
