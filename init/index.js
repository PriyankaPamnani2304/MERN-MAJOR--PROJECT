const mongoose=require("mongoose");
const Listing=require("../models/listing..js");
const initdata=require("./data.js")
main()
.then(()=>{
    console.log("successful connection")
})
.catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}
const initdb=async()=>{
   await Listing.deleteMany({});
   initdata.data=initdata.data.map((obj)=>({...obj,owner:"67b02f0e60ab3faba9c28b06"}))
   await Listing.insertMany(initdata.data)
   console.log("data saved")
}
initdb()