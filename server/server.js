const mongoose=require("mongoose");
const express=require("express");
const app=express();
require("./db/connection");
const port=process.env.PORT || 5000;
const roomsRoute=require("./routes/roomsRoutes");
const usersRoute=require("./routes/usersRoutes");
const bookingsRoute=require("./routes/bookingsRoutes");
app.use(express.json());
app.use("/api/rooms",roomsRoute);
app.use("/api/users",usersRoute);
app.use("/api/bookings",bookingsRoute);
app.listen(port,()=>
console.log(`server running on port ${port}`)
)
