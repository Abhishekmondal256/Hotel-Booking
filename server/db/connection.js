const mongoose=require("mongoose");
const DB="mongodb+srv://abhi:afgh34@cluster0.m0kpux9.mongodb.net/hotelbooking?retryWrites=true&w=majority"

mongoose.connect(DB
    ).then(()=>{
        console.log("successful connection");
    }).catch((err)=>console.log("no connection"));