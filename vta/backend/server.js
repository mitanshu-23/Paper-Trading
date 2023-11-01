var cors = require('cors')
const express = require('express')
const finnhub = require('finnhub');
const app = express()
const port = 5000

app.use(cors())
let currpricedata= null
let stockdata = null
let news= null
let TDKEY="7ee66fa1de1945418d0e7dda8b87f9d7";
let TDKEY2="e2773db44c59460ca86bbdb3a45bd44f";

const api_key = finnhub.ApiClient.instance.authentications['api_key'];

//const tickers=["AAPL","GOOG","MSFT"];
const tickers=["AAPL","GOOG","MSFT","META","NVDA","TSLA","NFLX","AMZN"];


api_key.apiKey = "ckt8hqpr01qvc3s704b0ckt8hqpr01qvc3s704bg"
const finnhubClient = new finnhub.DefaultApi()

finnhubClient.companyNews(tickers.toString(), "2023-10-25", "2023-10-26", (error, data, response) => {
	//console.log("Data",data)
  news=data
  //console.log(news.slice(20,30))
});

const stockvalues = async()=>{

    try{
        const response= await fetch('https://api.twelvedata.com/price?symbol=' + tickers.toString() + '&apikey=' + TDKEY2);
        currpricedata = await response.json();
        //console.log(currpricedata)
        const response2= await fetch('https://api.twelvedata.com/quote?symbol=' + tickers.toString() + '&apikey=' + TDKEY);
        stockdata = await response2.json();
        //console.log(stockdata)
        
    }
    catch(error)
    {
        console.error(error);
    }

}
stockvalues();
 setInterval(stockvalues, 60000);

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

app.get('/getnews', async(req,res)=>{
  if (news) {
    //let limitedData = objects.slice(0, limit);
    
      res.json(news.slice(0,10));
    } else {
      res.status(500).send('Sorry not available');
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






