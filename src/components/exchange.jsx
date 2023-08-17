import React, { useEffect, useState } from 'react'
import axios from "axios"
import { server } from '../index'
import { Container, HStack,VStack,Image ,Text} from '@chakra-ui/react'
import Loader from './loader'
import ErrorComponent from './errorComponent'


function Exchange() {
const[exchanges, setexchanges]=useState([])
const[loading, setloading]=useState(true)
const[error, seterror]=useState(false)


  useEffect(()=> {
    const fechExchange= async () =>{
     try {
      const{data}= await axios.get(`${server}/exchanges`)
    
     setexchanges(data)
     setloading(false)
     } catch (error) {
      seterror(true)
      setloading(false)
     }
    }
    fechExchange();
  },[])
  if (error)  return <ErrorComponent/>
  return (
   <Container maxW={"container.xl"}>
    { loading ? <Loader/>:(
      <>
      <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
      {exchanges.map((i)=>(
  <ExchangeCard key={i.id} name={i.name} img={i.image} rank={i.trust_score_rank} url={i.url} />
))}
      </HStack>
        
</>
)}
   </Container>
  )
}

const ExchangeCard=({name,img,rank,url})=>(

<a href={url} target={'blank'}>
<VStack   w={"52"}
justifyContent={"space-evenly"}
      shadow={"lg"}
      p={"8"}
      borderRadius={"lg"}
      transition={"all 0.3s"}
      m={"4"}
      css={{
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}>
  <Image src={img} w={10} h={10} objectFit={"contain"} alt={"Exchange"}/>
  <Text>{name}</Text>

</VStack>

</a>

)

export default Exchange

