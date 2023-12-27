import React,{useState,useEffect} from 'react';
import axios from "axios";
import "../Home/Home.css";
import Room from "../Room/Room";
import 'antd/dist/reset.css';
import moment, { fn } from "moment";
import Loader from '../Loader/Loader';
import Error from "../Error/Error";
import {DatePicker, Space} from 'antd';
const {RangePicker} =DatePicker;
const Home = () => {
const [rooms,setRooms]=useState([]);
const [loading,setLoading]=useState();
const [error,setError]=useState();
const[fromdate,Setfromdate] =useState();
const[todate,Settodate] =useState();
const[duplicaterooms,setDuplicaterooms]=useState([]);
const [searchkey,Setsearchkey]=useState('');
const [type,settype]=useState('all');

const fn=async()=>{
  const data=(await axios.get("/api/rooms/getallrooms")).data;
  setRooms(data);
  setDuplicaterooms(data);
  setLoading(false);


}

useEffect(()=>{

try{
setLoading(true);
fn();
 
}catch(error){
  setError(true);
console.log(error);
setLoading(false);
}

},[])

const filterBySearch=async()=>{
const temprooms=duplicaterooms.filter(room=>room.name.toLowerCase().includes(searchkey.toLowerCase()))
setRooms(temprooms);


}
const filterByType=async(e)=>{
  settype(e);
  if(e!=='all'){
const temprooms=duplicaterooms.filter(room=>room.type.toLowerCase()==e.toLowerCase())
setRooms(temprooms);}
else{
  setRooms(duplicaterooms);
}
}

// function filterByDate(dates){
// console.log(dates[0].format('DD-MM-YYYY'));
// console.log(dates[1].format('DD-MM-YYYY'));
// Setfromdate(dates[0].format('DD-MM-YYYY'));
// Settodate(dates[1].format('DD-MM-YYYY'));

// console.log(fromdate);
// console.log(todate);
// }
// const firstdate=fromdate.format('DD-MM-YYYY');
// const lastdate=todate.format('DD-MM-YYYY');
// console.log((firstdate));
// console.log((lastdate));
  return (
    <div className='container'>
   <div className='row mt-5 bs'>
   <div className='col-md-3'>
    
<RangePicker format='DD-MM-YYYY' onChange={(dates)=>{
Setfromdate(dates[0].format('DD-MM-YYYY'));
 Settodate(dates[1].format('DD-MM-YYYY'));
var temprooms=[];

for(const room of duplicaterooms){
  var available=false;
if(room.currentbookings.length>0){
for(const booking of room.currentbookings){
if(!moment(moment(dates[0]).format('DD-MM-YYYY')).isBetween(booking.fromdate,booking.todate) && !moment(moment(dates[1]).format('DD-MM-YYYY')).isBetween(booking.fromdate,booking.todate)) 
{
if(dates[0].format('DD-MM-YYYY')!==booking.fromdate && dates[0].format('DD-MM-YYYY')!==booking.todate && dates[1].format('DD-MM-YYYY')!==booking.fromdate
&& dates[1].format('DD-MM-YYYY')!==booking.todate)
{
  available=true;
}
}

}
}
else{
  available=true;
}
if(available===true){
  temprooms.push(room);
}
setRooms(temprooms);
}

}}/>

   </div>
<div className="col-md-5">
  <input type="text" className="form-control" placeholder="Search Rooms" value={searchkey} onChange={(e)=>{
    Setsearchkey(e.target.value) }} onKeyUp={filterBySearch}/>

 
</div>
<div className="col-md-3">
<select className='form-control' value={type} onChange={(e)=>{filterByType(e.target.value)}}>
  <option value="all">All</option>
  <option value="delux">Delux</option>
  <option value="non-delux">Non-Delux</option>
</select>
</div>

   </div>


    <div className='row justify-content-center mt-5'>
{loading?(<Loader/>):(rooms.map(room=>{
return <div className='col-md-9 mt-2'> <Room  room={room} fromdate={fromdate} todate={todate}/></div>

}))}

    </div></div>
      )
}

export default Home