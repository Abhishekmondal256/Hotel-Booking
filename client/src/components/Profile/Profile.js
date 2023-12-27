import React ,{useEffect,useState}from "react";
import axios from "axios";
import "../Profile/Profile.css";
import {Tabs } from 'antd';
import Loader from '../Loader/Loader';
import {Tag,Divider} from "antd";
import Error from "../Error/Error";
import Swal from "sweetalert2";
const {TabPane} =Tabs;
const Profile=()=>{
    
    const user=JSON.parse(localStorage.getItem('currentUser')).data;
    useEffect(()=>{
    if(!user){
        window.location.href="/login";
    }

    },[])
return(
<div className="ml-3 mt-3">
<Tabs defaultActiveKey="1" >
<TabPane tab="profile" key="1">
    <h1>My Profile</h1>
    <br/>
    <h1>Name : {user.name}</h1>
    <h1>Email : {user.email}</h1>
    <h1>isAdmin : {user.isAdmin?'YES':'NO'}</h1>
</TabPane>
<TabPane tab="Bookings" key="2">
   <MyBooking/>
</TabPane>

</Tabs>


</div>


)

}

export default Profile;

const MyBooking=()=>{
    const user=JSON.parse(localStorage.getItem('currentUser')).data;
    const [bookings,setbookings]=useState([]);
    const [loading,setLoading]=useState(false);
const [error,setError]=useState();
    const fn=async()=>{
     const rooms=await axios.post('api/bookings/getbookingbyuserid',{userid:user._id})
    console.log(rooms.data);
    setbookings(rooms.data);
    }
useEffect(()=>{
    try{
        setLoading(true);
        fn();
        setLoading(false);

    }catch(error){
        setLoading(false);
        setError(error);
console.log(error);
    }


},[])
const cancelBooking=async(bookingid,roomid)=>{
try{
setLoading(true);
const result= (await axios.post("/api/bookings/cancelbooking",{bookingid,roomid})).data;
console.log(result);
setLoading(false);
Swal.fire('Congrats', 'Your booking has been cancelled','success').then(result=>{
window.location.reload();

});
}
catch(error){
console.log(error);
setLoading(false);
Swal.fire('Oops','Someething went wrong','error');
}


}
return( <div>
<div className="row">
<div className="col-md-6">
{loading &&(<Loader/>)}
{bookings && (bookings.map(booking=>{
return <div className="bs">
<h1>{booking.room}</h1>
<p><b>BookingId :</b> {booking._id}</p>
<p><b>CheckIn :</b> {booking.fromdate}</p>
<p><b>Checkout :</b> {booking.todate}</p>
<p><b>Amount :</b> {booking.totalamount}</p>
<p><b>Status: </b>{booking.status=='cancelled'?<Tag color='orange'>CANCELLED</Tag>:<Tag color="green">CONFIRMED</Tag>}</p>

{booking.status!=='cancelled' && (<div class="text-right">
<button class="btn btn-primary" onClick={()=>{cancelBooking(booking._id,booking.roomid)}}>CANCEL BOOKING</button>
</div>)}

</div>


}))}

</div>

</div>

</div>)

}