import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import {version, binance,kucoin,bybit,mexc,huobi} from 'ccxt';
import date from 'date-and-time';
import { db } from "./firebase-config.js";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import axios from 'axios';
const routeCollection = collection(db, "route");
const route_dexCollection = collection(db, "dex_route");
const route_dexDepthCollection = collection(db, "dex_depth");
let bybit_data_route={
    "symbol": "ROUTE/USDT",
    "high": 2.9218,
    "low": 2.7987,
    "bid": 2.8039,
    "bidVolume": 89.18,
    "ask": 2.8104,
    "askVolume": 88.97,
    "vwap": 2.87077906374863,
    "open": 2.8489,
    "close": 2.81,
    "last": 2.81,
    "change": -0.0389,
    "percentage": -1.37,
    "average": 2.82945,
    "baseVolume": 12951.65,
    "quoteVolume": 37181.325661,
    "info": {
      "symbol": "ROUTEUSDT",
      "bid1Price": "2.8039",
      "bid1Size": "89.18",
      "ask1Price": "2.8104",
      "ask1Size": "88.97",
      "lastPrice": "2.81",
      "prevPrice24h": "2.8489",
      "price24hPcnt": "-0.0137",
      "highPrice24h": "2.9218",
      "lowPrice24h": "2.7987",
      "turnover24h": "37181.325661",
      "volume24h": "12951.65"
    }
  }


let kucoin_data_route={
    "code": "200000",
    "data": {
      "time": 1716058758270,
      "symbol": "DFYN-USDT",
      "buy": "0.02009",
      "sell": "0.02012",
      "changeRate": "0.0004",
      "changePrice": "0.00001",
      "high": "0.02013",
      "low": "0.02008",
      "vol": "28353.921",
      "volValue": "569.793045809",
      "last": "0.02009",
      "averagePrice": "0.02009765",
      "takerFeeRate": "0.001",
      "makerFeeRate": "0.001",
      "takerCoefficient": "2",
      "makerCoefficient": "2"
    }
  }

let mexc_data_route={
    "symbol": "ROUTEUSDT",
    "priceChange": "-0.168",
    "priceChangePercent": "-0.0544",
    "prevClosePrice": "3.084",
    "lastPrice": "2.916",
    "bidPrice": "2.922",
    "bidQty": "8.32",
    "askPrice": "2.939",
    "askQty": "139.65",
    "openPrice": "3.084",
    "highPrice": "3.199",
    "lowPrice": "2.77",
    "volume": "33090.97",
    "quoteVolume": "99639.958",
    "openTime": 1716067083060,
    "closeTime": 1716067133644,
    "count": null
  }
let htx_data_route={}
let asd_data_route={
    "code": 0,
    "data": {
      "symbol": "ROUTE/USDT",
      "open": "3.07055",
      "close": "2.91232",
      "high": "3.20924",
      "low": "2.85461",
      "volume": "43743",
      "ask": [
        "2.94098",
        "4"
      ],
      "bid": [
        "2.89013",
        "4"
      ],
      "type": "spot"
    }
  }
let gate_data_route=[
    {
      "currency_pair": "ROUTE_USDT",
      "last": "2.934",
      "lowest_ask": "2.937",
      "highest_bid": "2.931",
      "change_percentage": "-4.46",
      "base_volume": "32020.04479277",
      "quote_volume": "97699.877380275",
      "high_24h": "3.197",
      "low_24h": "2.856"
    }
  ]
let kucoin_data_dfyn={}
let bybit_data_dfyn={}
let mexc_data_dfyn={}
let htx_data_dfyn={}
let asd_data_dfyn={}
let gate_data_dfyn={}
let uniswap_data_route_eth={}
let uniswap_data_route_usdc={}
let uniswap_data_route_eth_v3={}
let uniswap_data_dfyn_eth={}
let dfyn_data_route_usdc={}
let dfyn_data_route_eth={}

let kucoin_data_route_depth={
    "0.3%": 0,
    "0.5%": 0,
    "1%": 0
}


let bybit_data_route_depth={
    "0.3%": 0,
    "0.5%": 0,
    "1%": 0
};
let mexc_data_route_depth={
    "0.3%": 0,
    "0.5%": 0,
    "1%": 0
};
let htx_data_route_depth={
    "0.3%": 0,
    "0.5%": 0,
    "1%": 0
};
let asd_data_route_depth={
    "0.3%": 0,
    "0.5%": 0,
    "1%": 0
};
let gate_data_route_depth={
    "0.3%": 0,
    "0.5%": 0,
    "1%": 0
};

let kucoin_data_dfyn_depth={
    "0.3%": 0,
    "0.5%": 0,
    "1%": 0
}


let bybit_data_dfyn_depth={
    "0.3%": 0,
    "0.5%": 0,
    "1%": 0
};
let mexc_data_dfyn_depth={
    "0.3%": 0,
    "0.5%": 0,
    "1%": 0
};
let htx_data_dfyn_depth={
    "0.3%": 0,
    "0.5%": 0,
    "1%": 0
};
let asd_data_dfyn_depth={
    "0.3%": 0,
    "0.5%": 0,
    "1%": 0
};
let gate_data_dfyn_depth={
    "0.3%": 0,
    "0.5%": 0,
    "1%": 0
};
let uniswapv2eth_data_route_depth={
    "0.3%": 0,
    "0.5%": 0,
    "1%": 0
};
let uniswapv2usdc_data_route_depth={
    "0.3%": 0,
    "0.5%": 0,
    "1%": 0
};
let uniswapv3eth_data_route_depth={
    "0.3%": 0,
    "0.5%": 0,
    "1%": 0
};
let dfyneth_data_route_depth={
    "0.3%": 0,
    "0.5%": 0,
    "1%": 0
};
let dfynusdc_data_route_depth={
    "0.3%": 0,
    "0.5%": 0,
    "1%": 0
};




const createDocRoute=(kucoin,mexc,asd,gate)=>{
    const now = new Date();
    const time=date.format(now, 'YYYY/MM/DD HH:mm:ss');

    fetch('https://sheetdb.io/api/v1/5rgvstaifizxw', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        data: [
            {
                'time': time,
                'kucoin':kucoin,
                'mexc':mexc,
                'asd':asd,
                'gate':gate
               

            }
        ]
    })
})
  .then((response) => response.json())
  .then((data) => console.log(data));

}


const app = express();
app.use(cors());
app.set('view engine', 'ejs');
const PORT = process.env.PORT || 8000;

app.use(express.json());


app.get('/hello', async (req, res) => {
    res.send('Hare Krishna');
});

app.get('/proxy', async (req, res) => {
    try {
        const url = req.query.url;
        if (!url) {
            return res.status(400).json({ error: 'Missing URL parameter' });
        }

       
        const response = await fetch(url);

  
        res.json(await response.json());
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



const fetchData = async () => {


    //bybit

   
    let url = `https://api.bybit.com/v5/market/tickers`;
    let params = {
      category: 'spot',
      symbol: 'ROUTEUSDT'
    };
    
    axios.get(url, {
      params,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
    
    })
    .then(response => {
    bybit_data_route=response.data;
    })
    .catch(error => {
      if (error.response) {
        console.error('Bybit Error response data:', error.response.data);
        console.error('Bybit Error status:', error.response.status);
        console.error('Bybit Error headers:', error.response.headers);
      } else if (error.request) {
        console.error('Bybit Error request data:', error.request);
      } else {
        console.error('Bybit Error message:', error.message);
      }
    });
   

  


    

    //kucoin



    fetch(`http://localhost:${PORT}/proxy?url=https://api.kucoin.com/api/v1/market/stats?symbol=ROUTE-USDT`)
        .then(response => response.json())
        .then(data => {
           
           kucoin_data_route = data;

     
          

        })
        .catch(error => {
            console.error('Kucoin Error fetching data:', error);
        });

        fetch(`http://localhost:${PORT}/proxy?url=https://api.kucoin.com/api/v1/market/stats?symbol=DFYN-USDT`)
        .then(response => response.json())
        .then(data => {
           
           kucoin_data_dfyn = data;
           
        })
        .catch(error => {
            console.error('Kucoin Error fetching data:', error);
        });

  



    //mexc

    fetch(`http://localhost:${PORT}/proxy?url=https://api.mexc.com/api/v3/ticker/24hr?symbol=ROUTEUSDT`)
    .then(response => response.json())
    .then(data => {
     
       mexc_data_route = data;
    

    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

    fetch(`http://localhost:${PORT}/proxy?url=https://api.mexc.com/api/v3/ticker/24hr?symbol=DFYNUSDT`)
    .then(response => response.json())
    .then(data => {
       
       mexc_data_dfyn = data;
      

    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
    //houbi

    fetch(`http://localhost:${PORT}/proxy?url=https://api.huobi.pro/market/detail?symbol=routeusdt`)
    .then(response => response.json())
    .then(data => {
      
       htx_data_route = data;
     

    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
  

    // ascendx

    fetch(`http://localhost:${PORT}/proxy?url=https://ascendex.com/api/pro/v1/spot/ticker?symbol=ROUTE/USDT`)
    .then(response => response.json())
    .then(data => {
      
      asd_data_route = data;
      

    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

    // gate

    fetch(`http://localhost:${PORT}/proxy?url=https://api.gateio.ws/api/v4/spot/tickers?currency_pair=route_usdt`)
    .then(response => response.json())
    .then(data => {
      
      gate_data_route = data;
     

    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

    fetch(`http://localhost:${PORT}/proxy?url=https://api.gateio.ws/api/v4/spot/tickers?currency_pair=dfyn_usdt`)
    .then(response => response.json())
    .then(data => {
    
      gate_data_dfyn = data;
       

    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
    

    //uniswap

    fetch(`http://localhost:${PORT}/proxy?url=https://api.geckoterminal.com/api/v2/networks/eth/pools/0x819de42d3ab832eaf7111a222a8a5a7419f13b48`)
    .then(response => response.json())
    .then(data => {
       
      uniswap_data_route_usdc = data;
      uniswapv2usdc_data_route_depth={"0.3%":parseFloat(data.data.attributes.reserve_in_usd)*0.003,
        "0.5%":parseFloat(data.data.attributes.reserve_in_usd)*0.005,
        "1%":parseFloat(data.data.attributes.reserve_in_usd)*0.01
      }
   

    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

    fetch(`http://localhost:${PORT}/proxy?url=https://api.geckoterminal.com/api/v2/networks/eth/pools/0x92CC4300B9FD36242900BcA782b2E9E000BD5099`)
    .then(response => response.json())
    .then(data => {
      
      uniswap_data_route_eth = data;
      uniswapv2eth_data_route_depth={"0.3%":parseFloat(data.data.attributes.reserve_in_usd)*0.003,
        "0.5%":parseFloat(data.data.attributes.reserve_in_usd)*0.005,
        "1%":parseFloat(data.data.attributes.reserve_in_usd)*0.01
      }
      

    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

    fetch(`http://localhost:${PORT}/proxy?url=https://api.geckoterminal.com/api/v2/networks/eth/pools/0xcfac0661d802ef85ece2f02ca691cd2079a19456`)
    .then(response => response.json())
    .then(data => {
   
      uniswap_data_route_eth_v3 = data;
      uniswapv3eth_data_route_depth={"0.3%":parseFloat(data.data.attributes.reserve_in_usd)*0.003,
        "0.5%":parseFloat(data.data.attributes.reserve_in_usd)*0.005,
        "1%":parseFloat(data.data.attributes.reserve_in_usd)*0.01
      }
       

    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

    fetch(`http://localhost:${PORT}/proxy?url=https://api.geckoterminal.com/api/v2/networks/eth/pools/0xCAb335e1964363e48A790DA303B74Ec02D3F8fB2`)
    .then(response => response.json())
    .then(data => {
       
      uniswap_data_dfyn_eth = data;
      dfyneth_data_route_depth={"0.3%":parseFloat(data.data.attributes.reserve_in_usd)*0.003,
        "0.5%":parseFloat(data.data.attributes.reserve_in_usd)*0.005,
        "1%":parseFloat(data.data.attributes.reserve_in_usd)*0.01
      }

      

    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });


    //  dfyn exchange

    fetch(`http://localhost:${PORT}/proxy?url=https://api.geckoterminal.com/api/v2/networks/polygon_pos/pools/0x40f0a05c8c7a86ad1491a3911c293e093fe92436`)
    .then(response => response.json())
    .then(data => {
       
      dfyn_data_route_usdc = data;
      dfynusdc_data_route_depth={"0.3%":parseFloat(data.data.attributes.reserve_in_usd)*0.003,
        "0.5%":parseFloat(data.data.attributes.reserve_in_usd)*0.005,
        "1%":parseFloat(data.data.attributes.reserve_in_usd)*0.01
      }
      

    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

    fetch(`http://localhost:${PORT}/proxy?url=https://api.geckoterminal.com/api/v2/networks/polygon_pos/pools/0xebc4f9b1ce66258ac3a48578ffeeba1330ddb68b`)
    .then(response => response.json())
    .then(data => {
       
     dfyn_data_route_eth = data;
     dfyneth_data_route_depth={"0.3%":parseFloat(data.data.attributes.reserve_in_usd)*0.003,
        "0.5%":parseFloat(data.data.attributes.reserve_in_usd)*0.005,
        "1%":parseFloat(data.data.attributes.reserve_in_usd)*0.01
     }
      

    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

   


    let symbol="ROUTE-USDT"
    let orderbookUrl = `http://localhost:${PORT}/proxy?url=https://api.kucoin.com/api/v1/market/orderbook/level2_20?symbol=${symbol}`;
    let tickerUrl = `http://localhost:${PORT}/proxy?url=https://api.kucoin.com/api/v1/market/orderbook/level1?symbol=${symbol}`;

    try {
       
        const orderbookResponse = await fetch(orderbookUrl);
        const tickerResponse = await fetch(tickerUrl);

     
        if (orderbookResponse.ok && tickerResponse.ok) {
            const orderbookData = await orderbookResponse.json();
            const tickerData = await tickerResponse.json();
            const bids = orderbookData.data.bids;
            const lastTradedPrice = parseFloat(tickerData.data.price);

           
            const ranges = {
                "0.3%": lastTradedPrice * 0.997,
                "0.5%": lastTradedPrice * 0.995,
                "1%": lastTradedPrice * 0.99
            };

        
            const totalValues = {
                "0.3%": 0,
                "0.5%": 0,
                "1%": 0
            };

            bids.forEach(bid => {
                const price = parseFloat(bid[0]);
                const quantity = parseFloat(bid[1]);
                const value = price * quantity;

                for (const [rangeKey, rangeValue] of Object.entries(ranges)) {
                    if (price >= rangeValue) {
                        totalValues[rangeKey] += value;
                        kucoin_data_route_depth[rangeKey]=totalValues[rangeKey]

                    }
                }
            });

            
         

            
        } else {
            console.log(`Kucoin Failed to retrieve data for ${symbol} from the API.`);
        }
    } catch (error) {
        console.log(`Kucoin Error occurred while making the API request for ${symbol}: ${error}`);
    }


     symbol="DFYN-USDT"
     orderbookUrl = `http://localhost:${PORT}/proxy?url=https://api.kucoin.com/api/v1/market/orderbook/level2_20?symbol=${symbol}`;
     tickerUrl = `http://localhost:${PORT}/proxy?url=https://api.kucoin.com/api/v1/market/orderbook/level1?symbol=${symbol}`;

    try {
   
        const orderbookResponse = await fetch(orderbookUrl);
        const tickerResponse = await fetch(tickerUrl);

    
        if (orderbookResponse.ok && tickerResponse.ok) {
            const orderbookData = await orderbookResponse.json();
            const tickerData = await tickerResponse.json();
            const bids = orderbookData.data.bids;
            const lastTradedPrice = parseFloat(tickerData.data.price);

          
            const ranges = {
                "0.3%": lastTradedPrice * 0.997,
                "0.5%": lastTradedPrice * 0.995,
                "1%": lastTradedPrice * 0.99
            };

            const totalValues = {
                "0.3%": 0,
                "0.5%": 0,
                "1%": 0
            };

            bids.forEach(bid => {
                const price = parseFloat(bid[0]);
                const quantity = parseFloat(bid[1]);
                const value = price * quantity;

                for (const [rangeKey, rangeValue] of Object.entries(ranges)) {
                    if (price >= rangeValue) {
                        totalValues[rangeKey] += value;
                        kucoin_data_dfyn_depth[rangeKey]=totalValues[rangeKey]

                    }
                }
            });

            
           
          

            
        } else {
            console.log(`Kucoin Dfyn Failed to retrieve data for ${symbol} from the API.`);
        }
    } catch (error) {
        console.log(`Kucoin Dfyn Error occurred while making the API request for ${symbol}: ${error}`);
    }


    //mexc

     symbol="ROUTEUSDT"
    orderbookUrl = `http://localhost:${PORT}/proxy?url=https://api.mexc.com/api/v3/depth?symbol=ROUTEUSDT`;
  tickerUrl = `http://localhost:${PORT}/proxy?url=https://api.mexc.com/api/v3/ticker/price?symbol=ROUTEUSDT`;

    try {
        
        const orderbookResponse = await fetch(orderbookUrl);
        const tickerResponse = await fetch(tickerUrl);

       
        if (orderbookResponse.ok && tickerResponse.ok) {
            const orderbookData = await orderbookResponse.json();
            const tickerData = await tickerResponse.json();
            const bids = orderbookData.bids;
            const lastTradedPrice = parseFloat(tickerData.price);

           
            const ranges = {
                "0.3%": lastTradedPrice * 0.997,
                "0.5%": lastTradedPrice * 0.995,
                "1%": lastTradedPrice * 0.99
            };

          
            const totalValues = {
                "0.3%": 0,
                "0.5%": 0,
                "1%": 0
            };

            bids.forEach(bid => {
                const price = parseFloat(bid[0]);
                const quantity = parseFloat(bid[1]);
                const value = price * quantity;

                for (const [rangeKey, rangeValue] of Object.entries(ranges)) {
                    if (price >= rangeValue) {
                        totalValues[rangeKey] += value;
                       mexc_data_route_depth[rangeKey]=totalValues[rangeKey]

                    }
                }
            });

          
            
        } else {
            console.log(`mexc Failed to retrieve data for ${symbol} from the API.`);
        }
    } catch (error) {
        console.log(`mexc Error occurred while making the API request for ${symbol}: ${error}`);
    }

    symbol="DFYNUSDT"
    orderbookUrl = `http://localhost:${PORT}/proxy?url=https://api.mexc.com/api/v3/depth?symbol=DFYNUSDT`;
  tickerUrl = `http://localhost:${PORT}/proxy?url=https://api.mexc.com/api/v3/ticker/price?symbol=DFYNUSDT`;

    try {
       
        const orderbookResponse = await fetch(orderbookUrl);
        const tickerResponse = await fetch(tickerUrl);

       
        if (orderbookResponse.ok && tickerResponse.ok) {
            const orderbookData = await orderbookResponse.json();
            const tickerData = await tickerResponse.json();
            const bids = orderbookData.bids;
            const lastTradedPrice = parseFloat(tickerData.price);

         
            const ranges = {
                "0.3%": lastTradedPrice * 0.997,
                "0.5%": lastTradedPrice * 0.995,
                "1%": lastTradedPrice * 0.99
            };

       
            const totalValues = {
                "0.3%": 0,
                "0.5%": 0,
                "1%": 0
            };

            bids.forEach(bid => {
                const price = parseFloat(bid[0]);
                const quantity = parseFloat(bid[1]);
                const value = price * quantity;

                for (const [rangeKey, rangeValue] of Object.entries(ranges)) {
                    if (price >= rangeValue) {
                        totalValues[rangeKey] += value;
                       mexc_data_dfyn_depth[rangeKey]=totalValues[rangeKey]

                    }
                }
            });

            
            
        } else {
            console.log(`mexc dfyn Failed to retrieve data for ${symbol} from the API.`);
        }
    } catch (error) {
        console.log(`mexc dfyn Error occurred while making the API request for ${symbol}: ${error}`);
    }

    //houbi

    symbol="routeusdt"
    orderbookUrl=`http://localhost:${PORT}/proxy?url=https://api.huobi.pro/market/depth?symbol=routeusdt&depth=5&type=step0`
    tickerUrl=`http://localhost:${PORT}/proxy?url=https://api.huobi.pro/market/trade?symbol=routeusdt`
    try {
      
        const orderbookResponse = await fetch(orderbookUrl);
        const tickerResponse = await fetch(tickerUrl);

       
        if (orderbookResponse.ok && tickerResponse.ok) {
            const orderbookData = await orderbookResponse.json();
            const tickerData = await tickerResponse.json();
            const bids = orderbookData.tick.bids;
            const lastTradedPrice = tickerData.tick.data[0].price;

          
            const ranges = {
                "0.3%": lastTradedPrice * 0.997,
                "0.5%": lastTradedPrice * 0.995,
                "1%": lastTradedPrice * 0.99
            };
        
            const totalValues = {
                "0.3%": 0,
                "0.5%": 0,
                "1%": 0
            };

            bids.forEach(bid => {
                const price = parseFloat(bid[0]);
                
                const quantity = parseFloat(bid[1]);
              
                const value = price * quantity;

                for (const [rangeKey, rangeValue] of Object.entries(ranges)) {
                    if (price >= rangeValue) {
                        totalValues[rangeKey] += value;
                       htx_data_route_depth[rangeKey]=totalValues[rangeKey]

                    }
                }
            });
          

           

          
        } else {
            console.log(`huobli Failed to retrieve data for ${symbol} from the API.`);
        }
    } catch (error) {
        console.log(`huobli Error occurred while making the API request for ${symbol}: ${error}`);
    }

    
    // ascendx

    symbol="ROUTE/USDT"
    orderbookUrl = `http://localhost:${PORT}/proxy?url=https://ascendex.com/api/pro/v1/depth?symbol=ROUTE/USDT`;
    tickerUrl = `http://localhost:${PORT}/proxy?url=https://ascendex.com/api/pro/v1/spot/ticker?symbol=ROUTE/USDT`;

    try {
     
        const orderbookResponse = await fetch(orderbookUrl);
        const tickerResponse = await fetch(tickerUrl);

     
        if (orderbookResponse.ok && tickerResponse.ok) {
            const orderbookData = await orderbookResponse.json();
            const tickerData = await tickerResponse.json();
            const bids = orderbookData.data.data.bids;
            const lastTradedPrice = parseFloat(tickerData.data.close);
         
            const ranges = {
                "0.3%": lastTradedPrice * 0.997,
                "0.5%": lastTradedPrice * 0.995,
                "1%": lastTradedPrice * 0.99
            };

         
            const totalValues = {
                "0.3%": 0,
                "0.5%": 0,
                "1%": 0
            };

            bids.forEach(bid => {
                const price = parseFloat(bid[0]);
                const quantity = parseFloat(bid[1]);
                const value = price * quantity;

                for (const [rangeKey, rangeValue] of Object.entries(ranges)) {
                    if (price >= rangeValue) {
                        totalValues[rangeKey] += value;
                       asd_data_route_depth[rangeKey]=totalValues[rangeKey]

                    }
                }
            });

          
            
        } else {
            console.log(`ascendex Failed to retrieve data for ${symbol} from the API.`);
        }
    } catch (error) {
        console.log(`ascendex Error occurred while making the API request for ${symbol}: ${error}`);
    }


   

    // gate

    symbol="ROUTE_USDT"
    orderbookUrl = `http://localhost:${PORT}/proxy?url=https://api.gateio.ws/api/v4/spot/order_book?currency_pair=ROUTE_USDT`;
    tickerUrl = `http://localhost:${PORT}/proxy?url=https://api.gateio.ws/api/v4/spot/trades?currency_pair=ROUTE_USDT`;

    try {
      
        const orderbookResponse = await fetch(orderbookUrl);
        const tickerResponse = await fetch(tickerUrl);

       
        if (orderbookResponse.ok && tickerResponse.ok) {
            const orderbookData = await orderbookResponse.json();
            const tickerData = await tickerResponse.json();
            const bids = orderbookData.bids;
            const lastTradedPrice = parseFloat(tickerData[0].price);
            console.log(lastTradedPrice)
        

            
            const ranges = {
                "0.3%": lastTradedPrice * 0.997,
                "0.5%": lastTradedPrice * 0.995,
                "1%": lastTradedPrice * 0.99
            };

          
            const totalValues = {
                "0.3%": 0,
                "0.5%": 0,
                "1%": 0
            };

            bids.forEach(bid => {
                const price = parseFloat(bid[0]);
                const quantity = parseFloat(bid[1]);
                const value = price * quantity;

                for (const [rangeKey, rangeValue] of Object.entries(ranges)) {
                    if (price >= rangeValue) {
                        totalValues[rangeKey] += value;
                       gate_data_route_depth[rangeKey]=totalValues[rangeKey]

                    }
                }
            });

           
            
            for (const [rangeKey, totalValue] of Object.entries(totalValues)) {
                console.log(`Total bid value within ${rangeKey} range: ${totalValue.toFixed(2)} USDT`);
            }

            
        } else {
            console.log(`gate Failed to retrieve data for ${symbol} from the API.`);
        }
    } catch (error) {
        console.log(`gate Error occurred while making the API request for ${symbol}: ${error}`);
    }

    symbol="DFYN_USDT"
    orderbookUrl = `http://localhost:${PORT}/proxy?url=https://api.gateio.ws/api/v4/spot/order_book?currency_pair=DFYN_USDT`;
    tickerUrl = `http://localhost:${PORT}/proxy?url=https://api.gateio.ws/api/v4/spot/trades?currency_pair=DFYN_USDT`;

    try {
       
        const orderbookResponse = await fetch(orderbookUrl);
        const tickerResponse = await fetch(tickerUrl);

       
        if (orderbookResponse.ok && tickerResponse.ok) {
            const orderbookData = await orderbookResponse.json();
            const tickerData = await tickerResponse.json();
            const bids = orderbookData.bids;
            const lastTradedPrice = parseFloat(tickerData[0].price);
            console.log(lastTradedPrice)
        

          
            const ranges = {
                "0.3%": lastTradedPrice * 0.997,
                "0.5%": lastTradedPrice * 0.995,
                "1%": lastTradedPrice * 0.99
            };

         
            const totalValues = {
                "0.3%": 0,
                "0.5%": 0,
                "1%": 0
            };

            bids.forEach(bid => {
                const price = parseFloat(bid[0]);
                const quantity = parseFloat(bid[1]);
                const value = price * quantity;

                for (const [rangeKey, rangeValue] of Object.entries(ranges)) {
                    if (price >= rangeValue) {
                        totalValues[rangeKey] += value;
                       gate_data_dfyn_depth[rangeKey]=totalValues[rangeKey]

                    }
                }
            });

          
            
            for (const [rangeKey, totalValue] of Object.entries(totalValues)) {
                console.log(`Total bid value within ${rangeKey} range: ${totalValue.toFixed(2)} USDT`);
            }

            
        } else {
            console.log(`Failed to retrieve data for ${symbol} from the API.`);
        }
    } catch (error) {
        console.log(`gate dfyn Error occurred while making the API request for ${symbol}: ${error}`);
        
    }

    //ByBit

    console.log("Bybit")

    try{let orderbookData;
        let tickerData=bybit_data_route
    
        url = `https://api.bybit.com/v5/market/orderbook`;
        params = {
          category: 'spot',
          symbol: 'ROUTEUSDT',
          limit:10
        };
        let bybitdepth={}
        
        axios.get(url, {
          params,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          },
         
        })
       
        .then(response => {
            orderbookData=response.data;
    
            const bids = response.data.result.b;
            const lastTradedPrice = parseFloat(tickerData.result.list[0].lastPrice);
            console.log(lastTradedPrice)
        
    
          
            const ranges = {
                "0.3%": lastTradedPrice * 0.997,
                "0.5%": lastTradedPrice * 0.995,
                "1%": lastTradedPrice * 0.99
            };
    
         
            const totalValues = {
                "0.3%": 0,
                "0.5%": 0,
                "1%": 0
            };
            try{
                bids.forEach(bid => {
                    const price = parseFloat(bid[0]);
                    const quantity = parseFloat(bid[1]);
                    const value = price * quantity;
        
                    for (const [rangeKey, rangeValue] of Object.entries(ranges)) {
                        if (price >= rangeValue) {
                            totalValues[rangeKey] += value;
                           bybit_data_route_depth[rangeKey]=totalValues[rangeKey]
                           bybitdepth[rangeKey]=totalValues[rangeKey]
                           console.log("bybit[0.5%]="+bybitdepth[rangeKey])
        
                        }
                    }
                });
                 for (const [rangeKey, totalValue] of Object.entries(totalValues)) {

                    bybit_data_route[rangeKey]=totalValue.toFixed(2)
                    console.log(`Total bid value within ${rangeKey} range: ${totalValue.toFixed(2)} USDT`);
                }
                console.log("bybit depth for 0.5% is"+bybit_data_route_depth["0.5%"])
            }
            catch(error)
            {
                console.log("bybit",error)
               
            }
         
    
          
            
           



            
            const bybit_volume_route=bybit_data_route.result.list[0].turnover24h;
            const bybit_spread_route=bybit_data_route.result.list[0].ask1Price-bybit_data_route.result.list[0].bid1Price
          
            const kucoin_volume_route=kucoin_data_route.data.volValue
            const kucoin_spread_route=kucoin_data_route.data.sell-kucoin_data_route.data.buy
            const kucoin_depth_route=kucoin_data_route_depth
            const mexc_volume_route=mexc_data_route.volume
            const mexc_spread_route=mexc_data_route.askPrice-mexc_data_route.bidPrice
            const mexc_depth_route=mexc_data_route_depth
            const asd_volume_route=asd_data_route.data.volume
            const asd_spread_route=asd_data_route.data.ask[0]-asd_data_route.data.bid[0]
            const asd_depth_route=asd_data_route_depth
            const gate_volume_route=gate_data_route[0].quote_volume
            const gate_spread_route=gate_data_route[0].lowest_ask-gate_data_route[0].highest_bid
            const gate_depth_route=gate_data_route_depth

            
            const uniswapv2_route_eth_volume= uniswap_data_route_eth.data.attributes.volume_usd.h24;
            const uniswapv2_route_usdc_volume= uniswap_data_route_usdc.data.attributes.volume_usd.h24
            const uniswapv3_route_eth_volume=   uniswap_data_route_eth_v3.data.attributes.volume_usd.h24
            const dfyn_route_eth_volume=  dfyn_data_route_eth.data.attributes.volume_usd.h24
            const dfyn_route_usdc_volume=  dfyn_data_route_usdc.data.attributes.volume_usd.h24
    
    
            const now = new Date();
          
            const time=date.format(now, 'MMM DD YYYY');


            addDoc(route_dexDepthCollection,{time:time,exchange:[{name:"Uniswapv2routeeth",
                depth:uniswapv2eth_data_route_depth},{name:"Uniswapv2routeusdc",
                    depth:uniswapv2usdc_data_route_depth},{name:"Uniswapv3routeeth",
                        depth:uniswapv3eth_data_route_depth},{name:"dfynrouteeth",
                            depth:dfyneth_data_route_depth},{name:"dfynrouteusdc",
                                depth:dfynusdc_data_route_depth}
            ]})

            addDoc(route_dexCollection,{time:time,exchange:[{name:"Uniswapv2routeeth",volume:uniswapv2_route_eth_volume},{name:"Uniswapv2routeusdc",volume:uniswapv2_route_usdc_volume},{name:"Uniswapv3routeeth",volume:uniswapv3_route_eth_volume},{name:"Dfyn_routeeth",volume:dfyn_route_eth_volume},{name:"Dfyn_routeusdc",volume:dfyn_route_usdc_volume}]}).then(()=>{
                console.log("sent in route_dex")
             }).catch((error)=>{
                console.log("dex_route",error)
             })
             addDoc(routeCollection,{time:time,exchange:[{name:"Bybit", volume:bybit_volume_route,spread:bybit_spread_route,depth:bybit_data_route_depth},{ name:"Kucoin",volume:kucoin_volume_route,spread:kucoin_spread_route,depth:kucoin_data_route_depth },{  name:"Mexc",volume:mexc_volume_route,spread:mexc_spread_route,depth:mexc_data_route_depth },{name:"Ascendex", volume:asd_volume_route,spread:asd_spread_route,depth:asd_data_route_depth },{name:"Gate", volume:gate_volume_route,spread:gate_spread_route,depth:gate_data_route_depth} ]});

            
    
        })
        .catch(error => {
          if (error.response) {
            console.error('Error response bybit data:', error.response.data);
            console.error('Error bybit status:', error.response.status);
            console.error('Error bybit headers:', error.response.headers);
          } else if (error.request) {
            console.error('Error bybit request data:', error.request);
          } else {
            console.error('Error bybit message:', error.message);
          }
        });
       
    }
    catch(err)
    {
        console.log("bybit error")
    }

    console.log("Bybit end")
 
  
    
      
       
    
       


    }
  
    

    fetchData();
//     // fetchData1();


const interval = setInterval(fetchData, 86400 * 1000);

app.get('/fetchdata',(req,res)=>{

    fetchData()
})


app.get('/kucoindata',(req,res)=>{

    const token = req.query.token;
    if(token=="route")
    res.send(kucoin_data_route)
    else
    res.send(kucoin_data_dfyn)
})

app.get('/mexcdata',(req,res)=>{
    const token = req.query.token;
    if(token=="route")
    res.send(mexc_data_route)
    else
    res.send(mexc_data_dfyn)
})

app.get('/htxdata',(req,res)=>{
    res.send(htx_data_route)
})

app.get('/asddata',(req,res)=>{
    res.send(asd_data_route)
})

app.get('/gatedata',(req,res)=>{
    const token = req.query.token;
    if(token=="route")
    res.send(gate_data_route)
    else
    res.send(gate_data_dfyn)
})

app.get('/uniswapdata',(req,res)=>{
    const token = req.query.token;
    if(token=="routeusdcv2")

      {
        fetch(`http://localhost:${PORT}/proxy?url=https://api.geckoterminal.com/api/v2/networks/eth/pools/0x819de42d3ab832eaf7111a222a8a5a7419f13b48`)
        .then(response => response.json())
        .then(data => {
          
          
          res.send(data)
          
    
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
      }
        
    else if(token=="routeethv2")
        

      {
        fetch(`http://localhost:${PORT}/proxy?url=https://api.geckoterminal.com/api/v2/networks/eth/pools/0x92cc4300b9fd36242900bca782b2e9e000bd5099`)
        .then(response => response.json())
        .then(data => {
          
          
          res.send(data)
          
    
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
      }
        
       
    else if(token=="routeethv3")
        
      {
        fetch(`http://localhost:${PORT}/proxy?url=https://api.geckoterminal.com/api/v2/networks/eth/pools/0x5c2b3edbe845764b99eaebe87377f1f9d27d2a7e`)
        .then(response => response.json())
        .then(data => {
          
          
          res.send(data)
          
    
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
      }
    else if(token=="dfynethv2")
        res.send(uniswap_data_dfyn_eth)
})

app.get('/dfyndata',(req,res)=>{

    const token=req.query.token;
    if(token=="routeusdc")
        {
            fetch(`http://localhost:${PORT}/proxy?url=https://api.geckoterminal.com/api/v2/networks/polygon_pos/pools/0x40f0a05c8c7a86ad1491a3911c293e093fe92436`)
            .then(response => response.json())
            .then(data => {
              
              
              res.send(data)
              
        
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
          }
    else if(token=="routeeth")
        {
            fetch(`http://localhost:${PORT}/proxy?url=https://api.geckoterminal.com/api/v2/networks/polygon_pos/pools/0xebc4f9b1ce66258ac3a48578ffeeba1330ddb68b`)
            .then(response => response.json())
            .then(data => {
              
              
              res.send(data)
              
        
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
          }
})

app.get('/kucoindepth',(req,res)=>{
    
    const token=req.query.token;
    if(token=="route")
    res.send(kucoin_data_route_depth)
    else
    res.send(kucoin_data_dfyn_depth)
})


app.get('/mexcdepth',(req,res)=>{
    const token=req.query.token;
    if(token=="route")
    res.send(mexc_data_route_depth)
    else
    res.send(mexc_data_dfyn_depth)
})

app.get('/htxdepth',(req,res)=>{
    res.send(htx_data_route_depth)
})

app.get('/asddepth',(req,res)=>{
    res.send(asd_data_route_depth)
})

app.get('/gatedepth',(req,res)=>{
    const token=req.query.token;
    if(token=="route")
    res.send(gate_data_route_depth)
    else
    res.send(gate_data_dfyn_depth)
})

app.get('/bybitdata',async (req,res)=>{
    res.send(bybit_data_route)
  
})

app.get('/bybitdepth',async (req,res)=>{

    res.send(bybit_data_route_depth);

})


app.get('/getdate',(req,res)=>{

   res.send(kucoin_data_route.data.volValue)

})

app.get('/write',async (req,res)=>{
    await addDoc(routeCollection,{Gate:{ volume:"1234",spread:"4321",depth:[2345,3456,4567] }} );
    res.send("done")
})

app.get('/read',async (req,res)=>{

  
        const data = await getDocs(routeCollection);
       const response=data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
       res.send(response)
    
  
})

app.get('/read_dex_route',async (req,res)=>{

  
    const data = await getDocs(route_dexCollection);
   const response=data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
   res.send(response)


})

app.get('/uniswapv2usdc_data_route_depth',(req,res)=>{
    res.send(uniswapv2usdc_data_route_depth)
})

app.get('/uniswapv2eth_data_route_depth',(req,res)=>{
    res.send(uniswapv2eth_data_route_depth)
})

app.get('/uniswapv3eth_data_route_depth',(req,res)=>{
    res.send(uniswapv3eth_data_route_depth)
})

app.get('/dfyneth_data_route_depth',(req,res)=>{
    res.send(dfyneth_data_route_depth)
})

app.get('/dfynusdc_data_route_depth',(req,res)=>{
    res.send(dfynusdc_data_route_depth)
})

app.get('/dexdepth',async (req,res)=>{
    const data = await getDocs(route_dexDepthCollection);
   const response=data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
   res.send(response)
})



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

