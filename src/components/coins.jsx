import React, { useEffect, useState } from 'react'
import axios from "axios"
import { server } from '../index'
import { Container, HStack,Button,RadioGroup,Radio, Box, IconButton, Input} from '@chakra-ui/react'
import Loader from './loader'
import ErrorComponent from './errorComponent'
import CoinCard from './coinCard'


function Coins() {
const[coins, setcoins]=useState([])
const[loading, setloading]=useState(true)
const[error, seterror]=useState(false)
const[page, setpage]=useState("1")
const[currency, setcurrency]=useState("inr")
const[initialValue, setInitialValue]=useState("")
const[Value, setValue]=useState("")

const handleChange = (event) => {
  setValue(event.target.value);
};


 useEffect(()=> { 
  const fechCoins= async (id) =>{
    try {
     {
     const{ data }= await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
     setcoins (data)
    }
    setloading(false)
    } catch (error) {
     seterror(true)
     setloading(false)
    }
   }
  fechCoins();
},[currency,page])
//var a = {} ;
const onSearch=(Value,coins) => {
  var a = {}
 
  console.log(coins);
  for (let i = 0; i < coins.length; i++) {
    if (Value === coins[i].name) {
       a = coins[i];

       setInitialValue(initialValue => ({
        ...initialValue,
        ...a
      }));
    }
  }
  // console.log(a)
  
  console.log(initialValue.id)
}
console.log(initialValue.id)


const currencysym=
currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

const changepage=(page)=>{
  setpage(page)
  setloading(true)
}

const btn=new Array(132).fill(1)




  if (error)  return <ErrorComponent/>



  return (


   <Container maxW={"container.xl"}>
    { loading ? <Loader/> : initialValue==={}?
(<CoinCard 
id={initialValue.id}
key={initialValue.id}
name={initialValue.name} 
img={initialValue.image}
url={initialValue.url}
symbol={initialValue.symbol} 
price={initialValue.current_price}
currencysym={currencysym}/> ) : (
      <>

<Box display="flex" alignItems="center">
      <Input

        placeholder="Search..."
        mr={2}
        value={Value}
        onChange={ handleChange}
      />
      <IconButton
        aria-label="Search"
        bg={'black'}
       
        variant="outline"
        onClick={() => onSearch(Value,coins)}
      />
    </Box>

      <RadioGroup value={currency} onChange={setcurrency} p={"8"}>
        <HStack spacing={"4"}>
          <Radio value={"inr"}>inr</Radio>
          <Radio value={"usd"}>usd</Radio>
          <Radio value={"eur"}>eur</Radio>
        </HStack>
      </RadioGroup>


      <HStack wrap={"wrap"} justifyContent={"space-evenly"}>



      {coins.map((i)=>(
  <CoinCard 
  id={i.id}
  key={i.id}
   name={i.name} 
   img={i.image}
    url={i.url}
    symbol={i.symbol} 
    price={i.current_price}
    currencysym={currencysym}     />
))}
      </HStack>
      <HStack w={'full'} overflowX={"auto"} p={8} justifyContent={"space-evenly"}>
      {
      btn.map(( item,index )=>(
        <Button
        key={index}
         bgColor={"black"}
         color={"white"} 
         onClick={()=>changepage(index+1)}>
           {index + 1}
           </Button>
    )  )}
      </HStack>
        
</>)
}
   </Container>
  )
}




export default Coins

