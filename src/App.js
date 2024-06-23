import './App.css';
import React, {useState,useEffect} from 'react'

function App() {
  const [countries,setCountries]=useState([]);
  const [searchInput, setSearchInput]=useState("")
  useEffect(()=>{
    fetch("https://restcountries.com/v3.1/all")
    .then((res)=> res.json())
    .then((data)=>{setCountries(data)})
    .catch((err)=>{
      console.error("Error fetching data", err);
    })
  },[]);
  const filteredCountries= 
    searchInput ? countries.filter((country)=>country.name.common.toLowerCase().includes(searchInput.toLowerCase())) : countries
  

  const flagStyle={
    width:"80px",
    aspectRatio:"2/3",
    objectFit:"contain",  
  }
  const cardStyle={
    height:"200px",
   width:"200px",
   border:"1px solid grey",
   borderRadius:"10px",
   margin:"10px",
   padding:"10px",
   display:"flex",
   flexDirection:"column",
   alignItems:"center",
   justifyContent:"center",
   objectFit:"contain"
  
  
  }
  const containerStyle={
    display: "flex",
    flexWrap:"wrap",
    justifyContent:"center",
    alignItems:"center",
    height:"100vh"
  }
  return (
    <div className="App">
      <h1>COUNTRIES</h1>
      <input value={searchInput} placeholder="Search Countries" onChange={(e)=>(setSearchInput(e.target.value))} />
      <div style={containerStyle}>{filteredCountries.map((country)=>(
  <div key={country.cca3} style={cardStyle}>
    <img src={country.flags.png} 
    alt={country.flags.alt}
    style={flagStyle} 
    />
    <h2>{country.name.common}</h2>
  </div>

))}
</div>

    </div>
  );
}

export default App;
