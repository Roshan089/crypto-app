

import Header from './components/header';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Home from './components/home';
import Exchange from './components/exchange';
import Coins from './components/coins';
import CoinDetails from './components/coinDetails';



function App() {
  return (
 <Router>
  <Header/>
  <Routes>
  <Route path="/" element={<Home />} />
  <Route path="exchange" element={<Exchange />} />
  <Route path="coin" element={<Coins />} />
  <Route path="/coin/:id" element={<CoinDetails />} />
  </Routes>
 </Router>
  );
}

export default App;
