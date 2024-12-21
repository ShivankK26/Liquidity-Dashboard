import React,{useState} from 'react'
import HomePage from './HomePage'
import {Dropdown,Button,Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './Assets/logo.png'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CH from './CH';

function App() {
  const [token,setToken]=useState('route')
  const [token_button_color,setToken_button_color]=useState('rgb(52, 155, 235)')
  const [token_button_color1,setToken_button_color1]=useState('white')
  const [token_button_color2,setToken_button_color2]=useState('white')
  const [History,setHistory]=useState(false)
  return (
    <div>

<br></br><br></br>
        <div class="nav" ><img src={logo} style={{width:"20em"}}></img>
</div>
<br></br><br></br>


<Router>

  <div class="navitem">
  <Link to="/"> <Button style={{backgroundColor:token_button_color,color:'black'}} onClick={()=>{
    setToken_button_color('rgb(52, 155, 235)')
    setToken_button_color1('white')
    setToken_button_color2('white')
  }}>Home </Button></Link>
<Dropdown>
      <Dropdown.Toggle style={{backgroundColor:token_button_color1, color:'black'}} id="dropdown-basic">
      {token.toLocaleUpperCase()}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item  onClick={()=>{
            setToken("route")
           
          }}>ROUTE</Dropdown.Item>
        <Dropdown.Item  onClick={()=>{
            setToken("dfyn")
           
          }}>DFYN</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>


    <Link to="/ch"> <Button style={{backgroundColor:token_button_color2,color:'black'}} variant="outline-primary" onClick={()=>{
    setToken_button_color2('rgb(52, 155, 235)')
    setToken_button_color('white')
    setToken_button_color1('white')
  }}>Check History </Button></Link>

  
  
    </div>

   
  <hr></hr>
<br></br>
          


<Routes>
          <Route exact path="/" element={<HomePage token={token} />} />
          <Route exact path="/ch" element={<CH />} />
          
        </Routes>

        </Router>


    
     
    
    </div>
  )
}

export default App
