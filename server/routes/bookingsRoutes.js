const express=require("express");
const router=express.Router();
const Booking=require("../model/booking");
const Room =require("../model/room");
const moment=require("moment");
const { v4: uuidv4 } = require('uuid');
const stripe=require("stripe")("sk_test_51ORd0tSEyeAoYFPrhFjrI8O4WfIOfCqjacd9QY8iCoFNUq5gp4cDTAAuGwzWhm6f1HoXbdbu1i9EeZZx2Iwc412C009tLWuK6k");
router.post("/bookroom",async(req,res)=>{
    
const {
    room,
userid,
fromdate,
todate,
totalamount,
totaldays,

}=req.body;


try{

    
        const newbooking=new Booking({
        room:room.name,
        roomid:room._id,
        userid,
        fromdate,
        todate,
        totalamount,
        totaldays,
        transactionid:'1234'
        
        })
        const booking= await newbooking.save();
        const roomtemp=await Room.findOne({_id:room._id})
        roomtemp.currentbookings.push({bookingid: booking._id,fromdate:fromdate,todate:todate,userid:userid,status:booking.status});
        await roomtemp.save();
        
        
       
        





res.send('Payment Successfull,Your Room is booked');
    
}catch(error){
res.status(400).json({error});
}




})
router.post('/getbookingbyuserid',async(req,res)=>{
const userid=req.body.userid;
try{
const booking= await Booking.find({userid:userid});
res.send(booking);

}catch(error){
res.status(400).json({error});
}


})
router.post('/cancelbooking',async(req,res)=>{
const {bookingid,roomid}=req.body;
try{
const bookingitem=await Booking.findOne({_id:bookingid});
bookingitem .status='cancelled';
await bookingitem.save();
const room =await Room.findOne({_id:roomid});
const bookings=room.currentbookings;
const temp=bookings.filter(booking=>booking.bookingid.toString()!==bookingid)
room.currentbookings=temp;
await room.save();
res.send('Your Booking Cancelled Successfully');


}catch(error){

    console.log(error);
}



})
router.get("/getallbookings",async(req,res)=>{

try{
const bookings=await Booking.find({});
res.send(bookings);
}catch(error){
return res.status(400).json({error});

}

})
module.exports=router;