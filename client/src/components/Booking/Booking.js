import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios";
import Loader from '../Loader/Loader';
import Error from "../Error/Error";
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';
const Booking = () => {
const [loading,setLoading]=useState(true);
const [error,setError]=useState();
const [room,setRoom] =useState();
const [totalamount,Settotalamount]=useState();
let {roomid,fromdate,todate}=useParams();
const first=moment(fromdate,'DD-MM-YYYY');
const last=moment(todate,'DD-MM-YYYY');
const totaldays=moment.duration(last.diff(first)).asDays()+1;

const fn=async()=>{

  const data=(await axios.post("/api/rooms/getroombyid",{roomid:roomid})).data;
  setRoom(data);
  Settotalamount(data.rentperday*totaldays);
}
    useEffect(()=>{
if(!localStorage.getItem('currentUser')){
  window.location.reload='/login';
}

try{
    setLoading(true);
    fn();
    setLoading(false);
 
  
  

}catch(error){
    setError(true);
    console.log(error);
    setLoading(false);

}

    },[])
  
 const bookRoom=async()=>{
  const bookingDetails={
    room,
    userid:JSON.parse(localStorage.getItem('currentUser')).data._id,
    fromdate,
    todate,
    totalamount,
    totaldays
    
    
    }
    try{
    
      const result=await axios.post('/api/bookings/bookroom',bookingDetails);
     
      }catch(error){
      
      
      }


 }





  return (
    <div className='m-5'>
   {loading?(<Loader/>):room?(<div>
   <div className='row justify-content-center mt-5 bs'>
     <div className='col-md-5'>
    <h1>{room.name}</h1>
    <img src={room.imageurls[0]} className="bigimg"/>
     </div>
<div className='col-md-5'>
<div style={{textAlign:'right'}}>
<h1>
Booking Details

</h1>
<hr/>
<b>
<p>Name : {JSON.parse(localStorage.getItem('currentUser')).data.name}</p>
<p>From Date : {fromdate}</p>
<p>To Date : {todate}</p>
<p>Max Count : {room.maxcount}</p>
</b>
</div>
<div style={{textAlign:'right'}}>
<b>
<h1>Amount</h1>
<hr/>
<p>Total Days : {totaldays}</p>
<p>Rent per day : {room.rentperday}</p>
<p>Total Amount : {totalamount}</p>
</b>
</div>
<div style={{float:'right'}}>


      <button className="btn btn-primary" onClick={bookRoom} >Pay Now</button>
      

</div>
</div>
   </div>
   </div>):(
    <Error/>
   )}
    </div>
  )
}

export default Booking