import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {version, binance,bybit,kucoin,mexc,huobi} from 'ccxt';
import fetch from 'node-fetch';
import { AtomSpinner,HollowDotsSpinner } from 'react-epic-spinners'
import { Chart } from "react-google-charts";
import logo from './Assets/logo.png'
import {Dropdown,Button,Toast} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';




import './App.css'
function HomePage({token}) {


  const [TV_KUKOIN_ROUTE,setTV_KUKOIN_ROUTE]=useState(0)
  const [SPREAD_KUKOIN_ROUTE,setSPREAD_KUKOIN_ROUTE]=useState(0)
  const [DEPTH_KUKOIN_ROUTE,setDEPTH_KUKOIN_ROUTE]=useState({})
  const [TV_KUKOIN_DFYN,setTV_KUKOIN_DFYN]=useState('')
  const [SPREAD_KUKOIN_DFYN,setSPREAD_KUKOIN_DFYN]=useState(0)
  const [DEPTH_KUKOIN_DFYN,setDEPTH_KUKOIN_DFYN]=useState({})
  // const [TV_BYBIT,setTV_BYBIT]=useState(20)
  // const [SPREAD_BYBIT,setSPREAD_BYBIT]=useState(0)
  // const [DEPTH_BYBIT,setDEPTH_BYBIT]=useState(0)
  const [TV_MEXC_ROUTE,setTV_MEXC_ROUTE]=useState(0)
  const [SPREAD_MEXC_ROUTE,setSPREAD_MEXC_ROUTE]=useState(0)
  const [DEPTH_MEXC_ROUTE,setDEPTH_MEXC_ROUTE]=useState({})
  const [TV_MEXC_DFYN,setTV_MEXC_DFYN]=useState(0)
  const [SPREAD_MEXC_DFYN,setSPREAD_MEXC_DFYN]=useState(0)
  const [DEPTH_MEXC_DFYN,setDEPTH_MEXC_DFYN]=useState({})
  const [TV_GATE_ROUTE,setTV_GATE_ROUTE]=useState(0)
  const [SPREAD_GATE_ROUTE,setSPREAD_GATE_ROUTE]=useState(0)
  const [DEPTH_GATE_ROUTE,setDEPTH_GATE_ROUTE]=useState({})
  const [TV_GATE_DFYN,setTV_GATE_DFYN]=useState(0)
  const [SPREAD_GATE_DFYN,setSPREAD_GATE_DFYN]=useState(0)
  const [DEPTH_GATE_DFYN,setDEPTH_GATE_DFYN]=useState({})
  const [TV_ASD,setTV_ASD]=useState(0)
  const [SPREAD_ASD,setSPREAD_ASD]=useState(0)
  const [DEPTH_ASD,setDEPTH_ASD]=useState({})
  const [TV_HTX,setTV_HTX]=useState(0)
  const [SPREAD_HTX,setSPREAD_HTX]=useState(0)
  const [DEPTH_HTX,setDEPTH_HTX]=useState({})
  const [TOTAL_VOLUME_ROUTE,setTOTAL_VOLUME_ROUTE]=useState(0)
  const [TOTAL_VOLUME_DFYN,setTOTAL_VOLUME_DFYN]=useState(0)
  const [TV_UNISWAP_ROUTEETHV2,setTV_UNISWAP_ROUTEETHV2]=useState(0)
  const [DEPTH_UNISWAP_ROUTEETHV2,setDEPTH_UNISWAP_ROUTEETHV2]=useState({})
  const [TV_UNISWAP_ROUTEETHV3,setTV_UNISWAP_ROUTEETHV3]=useState(0)
  const [DEPTH_UNISWAP_ROUTEUSDCV2,setDEPTH_UNISWAP_ROUTEUSDCV2]=useState({})
  const [TV_UNISWAP_ROUTEUSDCV2,setTV_UNISWAP_ROUTEUSDCV2]=useState(0)
  const [DEPTH_UNISWAP_ROUTEETHV3,setDEPTH_UNISWAP_ROUTEETHV3]=useState({})
  const [TV_DFYN_ROUTEETH,setTV_DFYN_ROUTEETH]=useState(0)
  const [DEPTH_DFYN_ROUTEUSDC,setDEPTH_DFYN_ROUTEUSDC]=useState({})
  const [TV_DFYN_ROUTEUSDC,setTV_DFYN_ROUTEUSDC]=useState(0)
  const [DEPTH_DFYN_ROUTEETH,setDEPTH_DFYN_ROUTEETH]=useState({})
  const [TOTAL_VOLUME_ROUTE_DEX,setTOTAL_VOLUME_ROUTE_DEX]=useState(0)



  const [showTextTrading, setShowTextTrading] = useState(false);
  const [showTextSpread, setShowTextSpread] = useState(false);
  const [showTextDepth, setShowTextDepth] = useState(false);


  // const slackToken = '1598065417879-7796577210704-T8uZf0zUDKmSNjrMqER0t2N9';
  // const channel = 'C07NNRMAH9T';
  // const slackClient = new WebClient(slackToken);
  

    
  const [TV_DATA_ROUTE,setTV_DATA_ROUTE] = useState([
      ["CEX", "24h Trading Volume", { role: "style" }],
      ["Bybit",8990,"#b87333"]
      ["Kucoin", 8.94, "#b87333"], // RGB value
      ["MEXC", 10.49, "silver"], // English color name
      ["HTX", 19.3, "gold"],
      ["GATE", 21.45, "color: #e5e4e2"], // CSS-style declaration
      ["ASCENDEX", 21.45, "green"],
    ]);

    const [SPREAD_DATA_ROUTE,setSPREAD_DATA_ROUTE] = useState([
      ["CEX", "24h Trading Volume", { role: "style" }],
      ["Kucoin", 8.94, "#b87333"], // RGB value
      ["MEXC", 10.49, "silver"], // English color name
      ["HTX", 19.3, "gold"],
      ["GATE", 21.45, "color: #e5e4e2"], // CSS-style declaration
      ["ASCENDEX", 21.45, "green"],
    ]);
    const [DEPTH_DATA_ROUTE,setDEPTH_DATA_ROUTE] = useState([
      [
        "Depth",
        "Kucoin",
        "MEXC",
        "HTX",
        "GATE",
        "ASENDEX"
      ],
      [0.3, 37.8, 80.8, 41.8,0,0],
      [0.5, 30.9, 69.5, 32.4,0,0],
      [1, 25.4, 57, 25.7,0,0],
      
    ]);

    const [TV_DATA_DFYN,setTV_DATA_DFYN] = useState([
      ["CEX", "24h Trading Volume", { role: "style" }],
      ["Kucoin", 8.94, "#b87333"], // RGB value
      ["MEXC", 10.49, "silver"], // English color name
    
      ["GATE", 21.45, "color: #e5e4e2"] // CSS-style declaration
     
    ]);

    const [SPREAD_DATA_DFYN,setSPREAD_DATA_DFYN] = useState([
      ["CEX", "24h Trading Volume", { role: "style" }],
      ["Kucoin", 8.94, "#b87333"], // RGB value
      ["MEXC", 10.49, "silver"], // English color name
      ["GATE", 21.45, "color: #e5e4e2"] // CSS-style declaration
  
    ]);
    const [DEPTH_DATA_DFYN,setDEPTH_DATA_DFYN] = useState([
      [
        "Depth",
        "Kucoin",
        "MEXC",
       
        "GATE"
       
      ],
      [0.3, 37.8, 80.8, 41.8],
      [0.5, 30.9, 69.5, 32.4],
      [1, 25.4, 57, 25.7,0],
      
    ]);

    const [TV_DATA_UNISWAP_ROUTE,setTV_DATA_UNISWAP_ROUTE] = useState([
      ["DEX", "24h Trading Volume", { role: "style" }],
      ["Uniswap V2 ROUTE-ETH",8990,"#b87333"]
      ["Uniswap V3 ROUTE-ETH", 8.94, "#b87333"], // RGB value
      ["Uniswap V2 ROUTE-USDC", 10.49, "silver"], // English color name
      ["DFYN ROUTE-ETH", 19.3, "gold"],
      ["DFYN ROUTE-USDC", 21.45, "color: #e5e4e2"], // CSS-style declaration
     
    ]);
    const [DEPTH_DATA_UNISWAP,setDEPTH_DATA_UNISWAP] = useState([
      [
        "Depth",
        "Kucoin",
        "MEXC",
       
        "GATE"
       
      ],
      [0.3, 37.8, 80.8, 41.8],
      [0.5, 30.9, 69.5, 32.4],
      [1, 25.4, 57, 25.7,0],
      
    ]);

      const options = {
            chartArea: {
                  backgroundColor: 'white',
                  textStyle: {
                    color: 'white', // set the color to white
                  }
            },
      
    };
    
// http://34.93.102.172:8000/
  useEffect(() => {
    const fetchData = async () => {

   

      // const res_bybit1=await axios('http://localhost:8000/bybitdata')
      // const res_bybit2=await axios('http://localhost:8000/bybitdepth')
      const res_kukoin1 = await axios('http://localhost:8000/kucoindata?token=route')
      const res_kukoin2= await axios('http://localhost:8000/kucoindepth?token=route')
      const res_kukoin3 = await axios('http://localhost:8000/kucoindata?token=dfyn')
      const res_kukoin4= await axios('http://localhost:8000/kucoindepth?token=dfyn')
      const res_mexc1=await axios('http://localhost:8000/mexcdata?token=route');
      const res_mexc2= await axios('http://localhost:8000/mexcdepth?token=route')
      const res_mexc3=await axios('http://localhost:8000/mexcdata?token=dfyn');
      const res_mexc4= await axios('http://localhost:8000/mexcdepth?token=dfyn')
      // const res_htx1=await axios('http://localhost:8000/htxdata');
      // const res_htx2= await axios('http://localhost:8000/htxdepth')
      const res_asd1=await axios('http://localhost:8000/asddata');
      const res_asd2= await axios('http://localhost:8000/asddepth')
      const res_gate1=await axios('http://localhost:8000/gatedata?token=route');
      const res_gate2= await axios('http://localhost:8000/gatedepth?token=route')
      const res_gate3=await axios('http://localhost:8000/gatedata?token=dfyn');
      const res_gate4= await axios('http://localhost:8000/gatedepth?token=dfyn')
      const res_uniswaprouteethv2= await axios('http://localhost:8000/uniswapdata?token=routeethv2')
      const res_uniswaprouteethv3= await axios('https://api.geckoterminal.com/api/v2/networks/eth/pools/0xcfac0661d802ef85ece2f02ca691cd2079a19456') // http://localhost:8000/uniswapdata?token=routeethv3
      const res_uniswaprouteusdcv2= await axios('http://localhost:8000/uniswapdata?token=routeusdcv2')
      const res_dfynrouteeth= await axios('http://localhost:8000/dfyndata?token=routeeth')
      const res_dfynrouteusdc= await axios('http://localhost:8000/dfyndata?token=routeusdc')
      const res_uniswaprouteethv2_depth=await axios('http://localhost:8000/uniswapv2eth_data_route_depth')
      const res_uniswaprouteusdcv2_depth=await axios('http://localhost:8000/uniswapv2usdc_data_route_depth')
      const res_uniswaprouteethv3_depth=await axios('http://localhost:8000/uniswapv3eth_data_route_depth')
      const res_dfynrouteeth_depth=await axios('http://localhost:8000/dfyneth_data_route_depth')
      const res_dfynrouteusdc_depth=await axios('http://localhost:8000/dfynusdc_data_route_depth')
      console.log(res_kukoin2.data)
    
    

    //  setTV_BYBIT(parseFloat(res_bybit1.data.result.list[0].turnover24h).toFixed(2))
    //  setSPREAD_BYBIT(parseFloat((res_bybit1.data.result.list[0].ask1Price-res_bybit1.data.result.list[0].bid1Price) / res_bybit1.data.result.list[0].bid1Price * 100).toFixed(3))
    //  setDEPTH_BYBIT(res_bybit2.data)
     setTV_KUKOIN_ROUTE( parseFloat(res_kukoin1.data.data.volValue).toFixed(2))
      setSPREAD_KUKOIN_ROUTE(parseFloat((res_kukoin1.data.data.sell-res_kukoin1.data.data.buy) / res_kukoin1.data.data.buy * 100).toFixed(3))
      setDEPTH_KUKOIN_ROUTE(res_kukoin2.data)
      setTV_MEXC_ROUTE(parseFloat(res_mexc1.data.volume).toFixed(2) * res_mexc1.data.lastPrice); // 
      setSPREAD_MEXC_ROUTE(parseFloat((res_mexc1.data.askPrice-res_mexc1.data.bidPrice) / res_mexc1.data.bidPrice * 100).toFixed(3))
      setDEPTH_MEXC_ROUTE(res_mexc2.data)
      // setTV_HTX(parseFloat(res_htx1.data.tick.vol).toFixed(2));
      // setSPREAD_HTX(parseFloat(res_kukoin1.data.data.volValue).toFixed(3))
      // setDEPTH_HTX(res_htx2.data)
      setTV_GATE_ROUTE(parseFloat(res_gate1.data[0].quote_volume).toFixed(2));
      setSPREAD_GATE_ROUTE(parseFloat((res_gate1.data[0].lowest_ask-res_gate1.data[0].highest_bid) / res_gate1.data[0].highest_bid * 100).toFixed(3))
      setDEPTH_GATE_ROUTE(res_gate2.data)
      setTV_ASD(parseFloat(res_asd1.data.data.volume).toFixed(2) * res_asd1.data.data.open);
      setSPREAD_ASD(parseFloat(res_asd1.data.data.ask[0]-res_asd1.data.data.bid[0]).toFixed(3))
      setDEPTH_ASD(res_asd2.data)
//parseFloat(res_bybit1.data.result.list[0].turnover24h)+
      setTOTAL_VOLUME_ROUTE((parseFloat(res_kukoin1.data.data.volValue)+parseFloat(res_mexc1.data.volume)+parseFloat(res_gate1.data[0].quote_volume)+parseFloat(res_asd1.data.data.volume)).toFixed(2))

      setTV_DATA_ROUTE([
            ["CEX", "24h Trading Volume", { role: "style" }],
            // ["Bybit",parseFloat(res_bybit1.data.result.list[0].turnover24h), "yellow"], // RGB value
            ["Kucoin",parseFloat(res_kukoin1.data.data.volValue), "red"],
            ["MEXC",parseFloat(res_mexc1.data.volume), "bluer"], // English color name
            // ["HTX", parseFloat(res_htx1.data.tick.vol), "gold"],
            ["GATE",parseFloat(res_gate1.data[0].quote_volume), "color: #e5e4e2"], // CSS-style declaration
            ["ASCENDEX", parseFloat(res_asd1.data.data.volume), "green"],
            
          ])
      setSPREAD_DATA_ROUTE([
            ["CEX", "Spread", { role: "style" }],
            // ["Bybit",parseFloat(res_bybit1.data.result.list[0].ask1Price-res_bybit1.data.result.list[0].bid1Price), "yellow"],
            ["Kucoin",parseFloat(res_kukoin1.data.data.sell-res_kukoin1.data.data.buy) , "red"], // RGB value
            ["MEXC",parseFloat(res_mexc1.data.askPrice-res_mexc1.data.bidPrice), "blue"], // English color name
            ["GATE",parseFloat(res_gate1.data[0].lowest_ask-res_gate1.data[0].highest_bid), "color: #e5e4e2"], // CSS-style declaration
            ["ASCENDEX", parseFloat(res_asd1.data.data.ask[0]-res_asd1.data.data.bid[0]), "green"],
          ])
          //res_bybit2.data["0.3%"], 
          //,res_bybit2.data["0.5%"]
          //, res_bybit2.data["1%"]
      setDEPTH_DATA_ROUTE([
            [
              "Depth",
              // "Bybit",
              "Kucoin",
              "MEXC",
              // "HTX",
              "GATE",
              "ASENDEX"
            ],
            [0.3,res_kukoin2.data["0.3%"],res_mexc2.data["0.3%"] ,res_gate2.data["0.3%"],res_asd2.data["0.3%"]], //res_htx2.data["0.3%"]
            [0.5,res_kukoin2.data["0.5%"],res_mexc2.data["0.5%"] ,res_gate2.data["0.5%"],res_asd2.data["0.5%"]], //res_htx2.data["0.5%"]
            [1,res_kukoin2.data["1%"],res_mexc2.data["1%"] ,res_gate2.data["1%"],res_asd2.data["1%"]], //res_htx2.data["1%"]
            
          ])

          setTV_DATA_DFYN([
            ["CEX", "24h Trading Volume", { role: "style" }],
            ["Kucoin",parseFloat(res_kukoin3.data.data.volValue) , "#b87333"], // RGB value
            ["MEXC",parseFloat(res_mexc3.data.quoteVolume), "silver"], // English color name
            ["GATE",parseFloat(res_gate3.data[0].quote_volume), "color: #e5e4e2"] // CSS-style declaration
            
          ])
      setSPREAD_DATA_DFYN([
            ["CEX", "Spread", { role: "style" }],
            ["Kucoin",parseFloat(res_kukoin3.data.data.sell-res_kukoin3.data.data.buy) , "#b87333"], // RGB value
            ["MEXC",parseFloat(res_mexc3.data.askPrice-res_mexc3.data.bidPrice), "silver"], // English color name
            ["GATE",parseFloat(res_gate3.data[0].lowest_ask-res_gate3.data[0].highest_bid), "color: #e5e4e2"] // CSS-style declaration
            
          ])
      setDEPTH_DATA_DFYN([
            [
              "Depth",
              "Kucoin",
              "MEXC",
              "GATE"
              
            ],
            [0.3,res_kukoin4.data["0.3%"],res_mexc2.data["0.3%"],res_gate2.data["0.3%"]],
            [0.5,res_kukoin4.data["0.5%"],res_mexc4.data["0.5%"],res_gate4.data["0.5%"]],
            [1, res_kukoin4.data["1%"],res_mexc4.data["1%"],res_gate4.data["1%"]]
            
          ])

          setTV_KUKOIN_DFYN( parseFloat(res_kukoin3.data.data.volValue).toFixed(2))
          setSPREAD_KUKOIN_DFYN(parseFloat(res_kukoin3.data.data.sell-res_kukoin3.data.data.buy).toFixed(5))
          setDEPTH_KUKOIN_DFYN(res_kukoin4.data)
          setTV_MEXC_DFYN( parseFloat(res_mexc3.data.quoteVolume).toFixed(2))
          setSPREAD_MEXC_DFYN(parseFloat(res_mexc3.data.askPrice-res_mexc3.data.bidPrice).toFixed(5))
          setDEPTH_MEXC_DFYN(res_mexc4.data)
          setTV_GATE_DFYN( parseFloat(res_gate3.data[0].quote_volume).toFixed(2));
          setSPREAD_GATE_DFYN(parseFloat(res_gate3.data[0].lowest_ask-res_gate3.data[0].highest_bid).toFixed(5))
          setDEPTH_GATE_DFYN(res_gate4.data)
          
          setTOTAL_VOLUME_DFYN(parseFloat(res_kukoin3.data.data.volValue)+parseFloat(res_mexc3.data.quoteVolume)+parseFloat(res_gate3.data[0].quote_volume))
      // const res_bybit1=await axios('https://proxy-j1k6.onrender.com/exchange?exchangeName=bybit');
      // setTV_BYBIT( res_bybit.data.data.volValue)
      // setSPREAD_BYBIT(res_kukoin1.data.data.volValue)
     
          setTV_UNISWAP_ROUTEETHV2(parseFloat(res_uniswaprouteethv2.data.data.attributes.volume_usd.h24).toFixed(2))
          setTV_UNISWAP_ROUTEETHV3(parseFloat(res_uniswaprouteethv3.data.data.attributes.volume_usd.h24).toFixed(2))
          setTV_UNISWAP_ROUTEUSDCV2(parseFloat(res_uniswaprouteusdcv2.data.data.attributes.volume_usd.h24).toFixed(2))
          setTV_DFYN_ROUTEETH(parseFloat(res_dfynrouteeth.data.data.attributes.volume_usd.h24).toFixed(2))
          setTV_DFYN_ROUTEUSDC(parseFloat(res_dfynrouteusdc.data.data.attributes.volume_usd.h24).toFixed(2))
          setDEPTH_UNISWAP_ROUTEETHV2(res_uniswaprouteethv2_depth.data)
          setDEPTH_UNISWAP_ROUTEUSDCV2(res_uniswaprouteusdcv2_depth.data)
          setDEPTH_UNISWAP_ROUTEETHV3(res_uniswaprouteethv3_depth.data)
          setDEPTH_DFYN_ROUTEETH(res_dfynrouteeth_depth.data)
          setDEPTH_DFYN_ROUTEUSDC(res_dfynrouteusdc_depth.data)




          setTOTAL_VOLUME_ROUTE_DEX(parseFloat(res_uniswaprouteethv2.data.data.attributes.volume_usd.h24).toFixed(2)+parseFloat(res_uniswaprouteethv3.data.data.attributes.volume_usd.h24).toFixed(2)+parseFloat(res_uniswaprouteusdcv2.data.data.attributes.volume_usd.h24).toFixed(2)+parseFloat(res_dfynrouteeth.data.data.attributes.volume_usd.h24).toFixed(2)+parseFloat(res_dfynrouteusdc.data.data.attributes.volume_usd.h24).toFixed(2))

          setTV_DATA_UNISWAP_ROUTE([
            ["DEX", "24h Trading Volume", { role: "style" }],
            ["UNISWAP V2 ROUTE-ETH",parseFloat(res_uniswaprouteethv2.data.data.attributes.volume_usd.h24), "yellow"], // RGB value
            ["UNISWAP V3 ROUTE-ETH",parseFloat(res_uniswaprouteethv3.data.data.attributes.volume_usd.h24), "red"],
            ["UNISWAP V2 ROUTE-USDC",parseFloat(res_uniswaprouteusdcv2.data.data.attributes.volume_usd.h24), "bluer"], // English color name
            ["DFYN ROUTE-ETH", parseFloat(res_dfynrouteeth.data.data.attributes.volume_usd.h24), "gold"],
            ["DFYN ROUTE-USDC",parseFloat(res_dfynrouteusdc.data.data.attributes.volume_usd.h24), "color: #e5e4e2"], // CSS-style declaration
          

          ])

          setDEPTH_DATA_UNISWAP([
            [
              "Depth",
              "Uniswap v2 Route-Eth",
              "Uniswap v2 Route-USDC",
              "Uniswap v3 Route-Eth",
              "Dfyn Route-Eth",
              "Dfyn Route-USDC"
              
            ],
            [0.3,res_uniswaprouteethv2_depth.data["0.3%"],res_uniswaprouteusdcv2_depth.data["0.3%"],res_uniswaprouteethv3_depth.data["0.3"], res_dfynrouteeth_depth.data["0.3%"],res_dfynrouteusdc_depth.data["0.3%"]],

            [0.5,res_uniswaprouteethv2_depth.data["0.5%"],res_uniswaprouteusdcv2_depth.data["0.5%"],res_uniswaprouteethv3_depth.data["0.5"], res_dfynrouteeth_depth.data["0.5%"],res_dfynrouteusdc_depth.data["0.5%"]],

            [1, res_uniswaprouteethv2_depth.data["1%"],res_uniswaprouteusdcv2_depth.data["1%"],res_uniswaprouteethv3_depth.data["1"], res_dfynrouteeth_depth.data["1%"],res_dfynrouteusdc_depth.data["1%"]]
            
          ])
        }
    fetchData();
  }, []);

  // slack integrations

  return (
    <div>
        {TV_KUKOIN_ROUTE!=0? <center>
    

         


    {token=="route"?<div>

  
      
                <h2>Trading Volume <l style={{ fontSize: '18px', verticalAlign: 'super',cursor: 'pointer'}} onMouseEnter={() => setShowTextTrading(true)}
        onMouseLeave={() => setShowTextTrading(false)}>&#x24D8;</l></h2>
        <br></br>

        {showTextTrading && (
        <div 
          className="text-container" 
          style={{backgroundColor:'grey',color:'white',width:'35',height:'5em'}}
          onMouseEnter={() => setShowTextTrading(true)}
          onMouseLeave={() => setShowTextTrading(false)}
        >
          <p>
          <br></br>
            
          24-Hour Trading Volume of ROUTE Across Exchanges
            
            </p>
        </div>
      )}
        <br></br>
        <h3>CEX</h3>
        <Chart chartType="ColumnChart" width="100%" height="400px" data={TV_DATA_ROUTE} options={options} />
        <table  style={{ border: '1px solid black' }}>
              <tr>
        <th style={{ borderRight: '1px solid black',borderBottom: '1px solid black' }}>CEX</th>
        <th style={{borderBottom: '1px solid black'}}>24h Volume</th>
        </tr>
        <tr>
              <th style={{ borderRight: '1px solid black' }}>ASCENDEX</th>
              <td>{TV_ASD}</td>
              
              </tr>
        {/* <tr>
              <th style={{ borderRight: '1px solid black' }}> Bybit</th>
              <td>{TV_BYBIT}</td>
        </tr> */}
              
        <tr>
              <th style={{ borderRight: '1px solid black' }}> Kucoin</th>
              <td>{TV_KUKOIN_ROUTE}</td>
        </tr>
        <tr>
              <th style={{ borderRight: '1px solid black' }}>MEXC</th>
              <td>{TV_MEXC_ROUTE}</td>
              
              </tr>
              <tr>
              <th style={{ borderRight: '1px solid black' }}>GATE</th>
              <td>{TV_GATE_ROUTE}</td>
              
              </tr>
              {/* <tr>
              <th style={{ borderRight: '1px solid black' }}>HTX</th>
              <td>{TV_HTX}</td>
              </tr> */}
           
              
        </table>
        <br></br>
        <tr> <h5> Total = {TOTAL_VOLUME_ROUTE}</h5></tr>
          
        <br></br>
     
        <br></br>

     
        <br></br>
        <h3>DEX</h3>

        <Chart chartType="ColumnChart" width="100%" height="400px" data={TV_DATA_UNISWAP_ROUTE} options={options} />
        <table  style={{ border: '1px solid black' }}>
              <tr>
        <th style={{ borderRight: '1px solid black',borderBottom: '1px solid black' }}>DEX</th>
        <th style={{borderBottom: '1px solid black'}}>24h Volume</th>
        </tr>
        <tr>
              <th style={{ borderRight: '1px solid black' }}>UNISWAP V2 ROUTE-ETH</th>
              <td>{TV_UNISWAP_ROUTEETHV2}</td>
              
              </tr>
        <tr>
              <th style={{ borderRight: '1px solid black' }}> UNISWAP V3 ROUTE-ETH</th>
              <td>{TV_UNISWAP_ROUTEETHV3}</td>
        </tr>
              
        <tr>
              <th style={{ borderRight: '1px solid black' }}> UNISWAP V2 ROUTE-USDC</th>
              <td>{TV_UNISWAP_ROUTEUSDCV2}</td>
        </tr>
        <tr>
              <th style={{ borderRight: '1px solid black' }}>DFYN ROUTE-ETH</th>
              <td>{TV_DFYN_ROUTEETH}</td>
              
              </tr>
              <tr>
              <th style={{ borderRight: '1px solid black' }}>DFYN ROUTE-USDC</th>
              <td>{TV_DFYN_ROUTEUSDC}</td>
              
              </tr>
              
             
           
              
        </table>
        <br></br>
        {/* <tr> <h5> Total = {TOTAL_VOLUME_ROUTE}</h5></tr> */}
          
        <br></br>
     
        <br></br>

        <hr></hr>

        

      

        <h2>Spread <l style={{ fontSize: '18px', verticalAlign: 'super',cursor: 'pointer'}} onMouseEnter={() => setShowTextSpread(true)}
        onMouseLeave={() => setShowTextSpread(false)}>&#x24D8;</l></h2>
        <br></br>

        {showTextSpread && (
        <div 
          className="text-container" 
          style={{backgroundColor:'grey',color:'white',width:'35',height:'8em'}}
          onMouseEnter={() => setShowTextSpread(true)}
          onMouseLeave={() => setShowTextSpread(false)}
        >
          <p>
            <br></br>
            Spread is calculated by taking the difference between the buying price (also known as the "bid" price) and the selling price (also known as the "ask" price) of ROUTE on an exchange.
            <br></br><br></br>


          Spread = Ask Price − Bid Price
                 
          </p>
        </div>
      )}

        <br></br>
        <Chart chartType="ColumnChart" width="100%" height="400px" data={SPREAD_DATA_ROUTE} options={options} />
        <table style={{ border: '1px solid black' }}>
              <tr>
              <th style={{ borderRight: '1px solid black',borderBottom: '1px solid black' }}>CEX</th>
        <th style={{borderBottom: '1px solid black'}}>Spread %</th>
        </tr>
        <tr>
              <th style={{ borderRight: '1px solid black' }}>ASCENDEX</th>
              <td>{SPREAD_ASD}</td>
              
              </tr>
        {/* <tr>
              <th style={{ borderRight: '1px solid black' }}> Bybit</th>
              <td>{SPREAD_BYBIT}</td>
        </tr> */}
        <tr>
              <th style={{ borderRight: '1px solid black' }}>Kucoin</th>
              <td>{SPREAD_KUKOIN_ROUTE}</td>
        </tr>
        <tr>
              <th style={{ borderRight: '1px solid black' }}>MEXC</th>
              <td>{SPREAD_MEXC_ROUTE}</td>
              
              </tr>
              <tr>
              <th style={{ borderRight: '1px solid black' }}>GATE</th>
              <td>{SPREAD_GATE_ROUTE}</td>
              
              </tr>
            
            
              
        </table>
        <br></br>

        <hr></hr>


        <h2>Depth <l style={{ fontSize: '18px', verticalAlign: 'super',cursor: 'pointer'}} onMouseEnter={() => setShowTextDepth(true)}
        onMouseLeave={() => setShowTextDepth(false)}>&#x24D8;</l></h2>
        <br></br>

        {showTextDepth && (
        <div 
          className="text-container" 
          style={{backgroundColor:'grey',color:'white',width:'35',height:'8em'}}
          onMouseEnter={() => setShowTextDepth(true)}
          onMouseLeave={() => setShowTextDepth(false)}
        >
          <p>
            <br></br>
            Depth refers to the liquidity available at various price levels within the order book. 
            <br></br><br></br>
            
            Calculated over 0.3%, 0.5%, and 1% .

          


       
                 
          </p>
        </div>
      )}
      <h3>CEX</h3>
      <br></br>
        <Chart
              chartType="Line"
              width="100%"
              height="400px"
              data={DEPTH_DATA_ROUTE}
              options={options}
            />
            <br></br>

            <table>

              <tr>
              <th>%</th>
              <th>Depth</th>

              </tr>

            </table>

        <br></br>
        <table style={{ border: '1px solid black' }}>
              <tr>  <th style={{ borderRight: '1px solid black' }}>%</th>
              {/* <th style={{ borderRight: '1px solid black' , borderBottom: '1px solid black'}}>Bybit</th> */}
              <th style={{ borderRight: '1px solid black' , borderBottom: '1px solid black'}}>Kucoin</th>
              <th style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>MEXC</th>
              {/* <th style={{ borderRight: '1px solid black', borderBottom: '1px solid black'}}>HTX</th> */}
              <th style={{ borderRight: '1px solid black' , borderBottom: '1px solid black'}}>ASCENDEX</th>
              <th style={{borderBottom: '1px solid black'}}>GATE</th>
              
              </tr>
            
        <tr>
        <td style={{ borderRight: '1px solid black' }}> 0.3%</td>
        {/* <td style={{ borderRight: '1px solid black' }}>{DEPTH_BYBIT["0.3%"].toFixed(2)}</td> */}
        <td style={{ borderRight: '1px solid black' }}>{DEPTH_KUKOIN_ROUTE["0.3%"].toFixed(2)}</td>
        <td style={{ borderRight: '1px solid black' }}>{DEPTH_MEXC_ROUTE["0.3%"].toFixed(2)}</td>
        {/* <td style={{ borderRight: '1px solid black' }}>{DEPTH_HTX["0.3%"].toFixed(2)}</td> */}
        <td style={{ borderRight: '1px solid black' }}>{DEPTH_ASD["0.3%"].toFixed(2)}</td>
        <td>{DEPTH_GATE_ROUTE["0.3%"].toFixed(2)}</td>
        </tr>
        <tr>
        <td style={{ borderRight: '1px solid black' }}>0.5%</td>
        {/* <td style={{ borderRight: '1px solid black' }}>{DEPTH_BYBIT["0.5%"].toFixed(2)}</td> */}
        <td style={{ borderRight: '1px solid black' }}>{DEPTH_KUKOIN_ROUTE["0.5%"].toFixed(2)}</td>
        <td style={{ borderRight: '1px solid black' }}>{DEPTH_MEXC_ROUTE["0.5%"].toFixed(2)}</td>
        {/* <td style={{ borderRight: '1px solid black' }}>{DEPTH_HTX["0.5%"].toFixed(2)}</td> */}
        <td style={{ borderRight: '1px solid black' }}>{DEPTH_ASD["0.5%"].toFixed(2)}</td>
        <td >{DEPTH_GATE_ROUTE["0.5%"].toFixed(2)}</td>

        </tr>
        <tr>
        <td style={{ borderRight: '1px solid black' }}>1%</td>
        {/* <td style={{ borderRight: '1px solid black' }}>{DEPTH_BYBIT["1%"].toFixed(2)}</td> */}
        <td style={{ borderRight: '1px solid black' }}>{DEPTH_KUKOIN_ROUTE["1%"].toFixed(2)}</td>
        <td style={{ borderRight: '1px solid black' }}>{DEPTH_MEXC_ROUTE["1%"].toFixed(2)}</td>
        {/* <td style={{ borderRight: '1px solid black' }}>{DEPTH_HTX["1%"].toFixed(2)}</td> */}
        <td style={{ borderRight: '1px solid black' }}>0</td>
        <td>{DEPTH_GATE_ROUTE["0.5%"].toFixed(2)}</td>

        </tr>
        </table>
        <br></br>
     
     <br></br>

  
     <br></br>
        <h3>DEX</h3>
      <br></br>
        <Chart
              chartType="Line"
              width="100%"
              height="400px"
              data={DEPTH_DATA_UNISWAP}
              options={options}
            />
            <br></br>

            <table>

              <tr>
              <th>%</th>
              <th>Depth</th>

              </tr>

            </table>

        <br></br>
        <table style={{ border: '1px solid black' }}>
              <tr>  <th style={{ borderRight: '1px solid black' }}>%</th>
              <th style={{ borderRight: '1px solid black' , borderBottom: '1px solid black'}}>Uniswap v2 Route-Eth</th>
              <th style={{ borderRight: '1px solid black' , borderBottom: '1px solid black'}}>Uniswap v2 Route-USDC</th>
              <th style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>Uniswap v3 Route-Eth</th>
              <th style={{ borderRight: '1px solid black', borderBottom: '1px solid black'}}>Dfyn Route-Eth</th>
              <th style={{ borderRight: '1px solid black' , borderBottom: '1px solid black'}}>Dfyn Route-USDC</th>
            
              
              </tr>
            
        <tr>
        <td style={{ borderRight: '1px solid black' }}> 0.3%</td>
        <td style={{ borderRight: '1px solid black' }}>{DEPTH_UNISWAP_ROUTEETHV2["0.3%"].toFixed(2)}</td>
        <td style={{ borderRight: '1px solid black' }}>{DEPTH_UNISWAP_ROUTEUSDCV2["0.3%"].toFixed(2)}</td>
        <td style={{ borderRight: '1px solid black' }}>{DEPTH_UNISWAP_ROUTEETHV3["0.3%"].toFixed(2)}</td>
        <td style={{ borderRight: '1px solid black' }}>{DEPTH_DFYN_ROUTEETH["0.3%"].toFixed(2)}</td>
        <td style={{ borderRight: '1px solid black' }}>{DEPTH_DFYN_ROUTEUSDC["0.3%"].toFixed(2)}</td>
       
        </tr>
        <tr>
      
        <td style={{ borderRight: '1px solid black' }}> 0.5%</td>
        <td style={{ borderRight: '1px solid black' }}>{DEPTH_UNISWAP_ROUTEETHV2["0.5%"].toFixed(2)}</td>
        <td style={{ borderRight: '1px solid black' }}>{DEPTH_UNISWAP_ROUTEUSDCV2["0.5%"].toFixed(2)}</td>
        <td style={{ borderRight: '1px solid black' }}>{DEPTH_UNISWAP_ROUTEETHV3["0.5%"].toFixed(2)}</td>
        <td style={{ borderRight: '1px solid black' }}>{DEPTH_DFYN_ROUTEETH["0.5%"].toFixed(2)}</td>
        <td style={{ borderRight: '1px solid black' }}>{DEPTH_DFYN_ROUTEUSDC["0.5%"].toFixed(2)}</td>

        </tr>
        <tr>
        <td style={{ borderRight: '1px solid black' }}> 1%</td>
        <td style={{ borderRight: '1px solid black' }}>{DEPTH_UNISWAP_ROUTEETHV2["1%"].toFixed(2)}</td>
        <td style={{ borderRight: '1px solid black' }}>{DEPTH_UNISWAP_ROUTEUSDCV2["1%"].toFixed(2)}</td>
        <td style={{ borderRight: '1px solid black' }}>{DEPTH_UNISWAP_ROUTEETHV3["1%"].toFixed(2)}</td>
        <td style={{ borderRight: '1px solid black' }}>{DEPTH_DFYN_ROUTEETH["1%"].toFixed(2)}</td>
        <td style={{ borderRight: '1px solid black' }}>{DEPTH_DFYN_ROUTEUSDC["1%"].toFixed(2)}</td>
        </tr>
        </table>

        <br></br><br></br><br></br><br></br><br></br>

    </div>:<div>
      
    <h2>Trading Volume <l style={{ fontSize: '18px', verticalAlign: 'super',cursor: 'pointer'}} onMouseEnter={() => setShowTextTrading(true)}
        onMouseLeave={() => setShowTextTrading(false)}>&#x24D8;</l></h2>
        <br></br>

        {showTextTrading && (
        <div 
          className="text-container" 
          style={{backgroundColor:'grey',color:'white',width:'35',height:'5em'}}
          onMouseEnter={() => setShowTextTrading(true)}
          onMouseLeave={() => setShowTextTrading(false)}
        >
          <p>
          <br></br>
            
          24-Hour Trading Volume of ROUTE Across Exchanges (in USDT)
            
            </p>
        </div>
      )}
        <br></br>

        <Chart chartType="ColumnChart" width="100%" height="400px" data={TV_DATA_DFYN} options={options} />
        <table  style={{ border: '1px solid black' }}>
              <tr>
        <th style={{ borderRight: '1px solid black',borderBottom: '1px solid black' }}>CEX</th>
        <th style={{borderBottom: '1px solid black'}}>24h Volume</th>
        </tr>
       
              
        <tr>
              <th style={{ borderRight: '1px solid black' }}> Kucoin</th>
              <td>{TV_KUKOIN_DFYN}</td>
        </tr>
        <tr>
              <th style={{ borderRight: '1px solid black' }}>MEXC</th>
              <td>{TV_MEXC_DFYN}</td>
              
              </tr>
              <tr>
              <th style={{ borderRight: '1px solid black' }}>GATE</th>
              <td>{TV_GATE_DFYN}</td>
              
              </tr>
             
            
              
        </table>
<br></br>
        <h5> Total = {parseFloat(TOTAL_VOLUME_DFYN).toFixed(2)}</h5>
        <br></br>
        <hr></hr>


        <h2>Spread  <l style={{ fontSize: '18px', verticalAlign: 'super',cursor: 'pointer'}} onMouseEnter={() => setShowTextSpread(true)}
        onMouseLeave={() => setShowTextSpread(false)}>&#x24D8;</l></h2>
        <br></br>

        {showTextSpread && (
        <div 
          className="text-container" 
          style={{backgroundColor:'grey',color:'white',width:'35',height:'8em'}}
          onMouseEnter={() => setShowTextSpread(true)}
          onMouseLeave={() => setShowTextSpread(false)}
        >
          <p>
            <br></br>
            Spread is calculated by taking the difference between the buying price (also known as the "bid" price) and the selling price (also known as the "ask" price) of ROUTE on an exchange.
            <br></br><br></br>


          Spread = Ask Price − Bid Price
                 
          </p>
        </div>
      )}


        <br></br>
        <Chart chartType="ColumnChart" width="100%" height="400px" data={SPREAD_DATA_DFYN} options={options} />
        <table style={{ border: '1px solid black' }}>
              <tr>
              <th style={{ borderRight: '1px solid black',borderBottom: '1px solid black' }}>CEX</th>
        <th style={{borderBottom: '1px solid black'}}>Spread</th>
        </tr>
       
              
        <tr>
              <th style={{ borderRight: '1px solid black' }}>Kucoin</th>
              <td>{SPREAD_KUKOIN_DFYN}</td>
        </tr>
        <tr>
              <th style={{ borderRight: '1px solid black' }}>MEXC</th>
              <td>{SPREAD_MEXC_DFYN}</td>
              
              </tr>
              <tr>
              <th style={{ borderRight: '1px solid black' }}>GATE</th>
              <td>{SPREAD_GATE_DFYN}</td>
              
              </tr>
            
            
              
        </table>
        <br></br>

        <hr></hr>

        <h2>Depth <l style={{ fontSize: '18px', verticalAlign: 'super',cursor: 'pointer'}} onMouseEnter={() => setShowTextDepth(true)}
        onMouseLeave={() => setShowTextDepth(false)}>&#x24D8;</l></h2>
        <br></br>

        {showTextDepth && (
        <div 
          className="text-container" 
          style={{backgroundColor:'grey',color:'white',width:'35',height:'8em'}}
          onMouseEnter={() => setShowTextDepth(true)}
          onMouseLeave={() => setShowTextDepth(false)}
        >
          <p>
            <br></br>
            Depth refers to the liquidity available at various price levels within the order book. 
            <br></br><br></br>
            
            Calculated over 0.3%, 0.5%, and 1% .

          


       
                 
          </p>
        </div>
      )}

        <Chart
              chartType="Line"
              width="100%"
              height="400px"
              data={DEPTH_DATA_DFYN}
              options={options}
            />
            <br></br>

            <table>

              <tr>
              <th>%</th>
              <th>Depth</th>

              </tr>

            </table>

        <br></br>
        <table style={{ border: '1px solid black' }}>
              <tr>  <th style={{ borderRight: '1px solid black' }}>%</th>
              
              <th style={{ borderRight: '1px solid black' , borderBottom: '1px solid black'}}>Kucoin</th>
              <th style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>MEXC</th>
              <th style={{borderBottom: '1px solid black'}}>GATE</th>
              
              </tr>
            
        <tr>
        <td style={{ borderRight: '1px solid black' }}> 0.3%</td>
        <td style={{ borderRight: '1px solid black' }}>{DEPTH_KUKOIN_DFYN["0.3%"].toFixed(2)}</td>
        <td style={{ borderRight: '1px solid black' }}>{DEPTH_MEXC_DFYN["0.3%"].toFixed(2)}</td>
        <td>{DEPTH_GATE_DFYN["0.3%"].toFixed(2)}</td>
        </tr>
        <tr>
        <td style={{ borderRight: '1px solid black' }}>0.5%</td>
        <td style={{ borderRight: '1px solid black' }}>{DEPTH_KUKOIN_DFYN["0.5%"].toFixed(2)}</td>
        <td style={{ borderRight: '1px solid black' }}>{DEPTH_MEXC_DFYN["0.5%"].toFixed(2)}</td>
        <td >{DEPTH_GATE_DFYN["0.5%"].toFixed(2)}</td>

        </tr>
        <tr>
        <td style={{ borderRight: '1px solid black' }}>1%</td>
        <td style={{ borderRight: '1px solid black' }}>{DEPTH_KUKOIN_DFYN["1%"].toFixed(2)}</td>
        <td style={{ borderRight: '1px solid black' }}>{DEPTH_MEXC_DFYN["1%"].toFixed(2)}</td>
        <td>{DEPTH_GATE_DFYN["1%"].toFixed(2)}</td>

        </tr>
        </table>

        <br></br><br></br><br></br><br></br><br></br>
      </div>}






</center>:<center><HollowDotsSpinner size="120" color="red"></HollowDotsSpinner></center>
}

    
  
  
  
      
    </div>
  )
}

export default HomePage

// 