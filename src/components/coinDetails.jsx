import {
  Container,
  Box,
  VStack,
  HStack,
  Radio,
  RadioGroup,
  Image,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatArrow,
  StatHelpText,
  Badge,
  background,
  Progress,
  Button,
} from "@chakra-ui/react";
import React from "react";
import Loader from "./loader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../index";
import axios from "axios";
import ErrorComponent from "./errorComponent";
import Chart from "./chart";

function CoinDetails() {
  const [coin, setcoin] = useState({});
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);
 
  const [currency, setcurrency] = useState("inr");
  const [days, setdays] = useState("24");
  const [chartArr, setchartArray] = useState([]);
  

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];


  const currencysym = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const params = useParams();
  const switchChart=(key) => {
    switch (key) {
      case "24h":
        setdays("24h")
        
        break;
        case "7d":
          setloading(true)
        setdays("7d")
        
        break;
        case "14d":
          setloading(true)
        setdays("14d")
        
        break;
        case "30d":
          setloading(true)
        setdays("30d")
        
        break;
        case "60d":
          setloading(true)
        setdays("60d")
        
        break;
        case "200d":
          setloading(true)
        setdays("200d")
        
        break;
        case "1y":
          setloading(true)
        setdays("1y")
        
        break;
        case "max":
          setloading(true)
        setdays("max")
        
        break;
    
      default:
        break;
    }
  }

  useEffect(() => {
    const fechCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);

        const { data:dataChart } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)
      


        setchartArray(dataChart.prices)
        setcoin(data);

        setloading(false);
      } catch (error) {
        seterror(true);
        setloading(false);
      }
    };
    fechCoin();
  }, [params.id,currency,days]);

  if(error) return <ErrorComponent />

  return (
    <Container>
      <Box>
        {loading ? (
          <Loader />
        ) : (
          <>
      <Box>
           <Chart currency={currency} chartArr={chartArr} days={days}/>
      </Box>
         
         <HStack>
          {btns.map((i)=>(
          <Button key={i} onClick={()=>switchChart(i)}>{i}</Button>
          ))}
         </HStack>

            <Box>
              <RadioGroup value={currency} onChange={setcurrency} p={"8"}>
                <HStack spacing={"4"}>
                  <Radio value={"inr"}>inr</Radio>
                  <Radio value={"usd"}>usd</Radio>
                  <Radio value={"eur"}>eur</Radio>
                </HStack>
              </RadioGroup>

              <VStack>
                <Text>
                  last update on {""}
                  {Date(coin.market_data.last_updated).split("G")[0]}
                </Text>
                <Image
                  src={coin.image.large}
                  h={"16"}
                  w={"16"}
                  objectFit={"contain"}
                />
                <Stat>
                  <StatLabel>{coin.name}</StatLabel>
                  <StatNumber>
                    {currencysym}
                    {coin.market_data.current_price[currency]}
                  </StatNumber>
                  <StatHelpText>
                    <StatArrow
                      type={
                        coin.market_data.price_change_percentage_24h > 0
                          ? "increase"
                          : "decrease"
                      }
                    />
                    {coin.market_data.price_change_percentage_24h}
                  </StatHelpText>
                </Stat>

                <Badge
                  fontSize={"2xl"}
                  bgColor={"black"}
                >{`#${coin.market_cap_rank}`}</Badge>

                <CostumBar
                  high={`${currencysym}${coin.market_data.high_24h[currency]}`}
                  low={`${currencysym}${coin.market_data.low_24h[currency]}`}
                />
                <Box>
                  <Box w={"full"} p="4">
                    <Item
                      title={"Max Supply"}
                      value={coin.market_data.max_supply}
                    />
                    <Item
                      title={"Circulating Supply"}
                      value={coin.market_data.circulating_supply}
                    />
                    <Item
                      title={"Market Cap"}
                      value={`${currencysym}${coin.market_data.market_cap[currency]}`}
                    />
                    <Item
                      title={"All Time Low"}
                      value={`${currencysym}${coin.market_data.atl[currency]}`}
                    />
                    <Item
                      title={"All Time High"}
                      value={`${currencysym}${coin.market_data.ath[currency]}`}
                    />
                  </Box>
                </Box>
              </VStack>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
}

const CostumBar = ({ high, low }) => (
  <VStack>
    <Progress value={50} colorScheme={"teal"} w={"full"} />
    <HStack>
      <Badge children={low} colorScheme="red" />
      <Text fontSize={"sm"}></Text>
      <Badge children={high} colorScheme="green" />
    </HStack>
  </VStack>
);

const Item = ({ title, value }) => (
  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
      {title}
    </Text>
    <Text>{value}</Text>
  </HStack>
);
export default CoinDetails;
