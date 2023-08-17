import React from 'react'
import { Container, HStack,VStack,Image ,Text} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function CoinCard({name,img,price,symbol,id ,currencysym="₹"}) {
  return (
    <Link to={`/coin/${id}`} target={'blank'}>
<VStack  
      justifyContent={"space-evenly"}
       w={"52"}
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
  <Text noOfLines={1}>{name}</Text>
  <Text>{symbol}</Text>
  <Text noOfLines={1}>{price?`${currencysym}${price}`: "NA"}</Text>

</VStack>

</Link>
  )
}

export default CoinCard
