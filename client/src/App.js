import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import { Route, Link,Routes} from "react-router-dom";
import Home from "./components/Home/Home";
import Booking from "./components/Booking/Booking";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Admin from "./components/Admin/Admin";
import Landing from './components/Landing/Landing';
function App() {
  return (
    <div className="App">
     <Navbar/>
    <Routes>
    <Route path="/home" element={<Home/>}/>
    <Route path="/book/:roomid/:fromdate/:todate" element={<Booking/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/profile" element={<Profile/>}/>
    <Route path="/admin" element={<Admin/>}/>
    <Route path="/" element={<Landing/>}/>
    </Routes>

    

    
    </div>
  );
}

export default App;
