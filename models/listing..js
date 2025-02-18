const mongoose=require("mongoose");
const { ListingSchema } = require("../schema");
const Review=require("./review.js")
const User=require("./user.js")
const listingSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    image:{
        url:String,
        filename:String
    },
    price:{
        type:Number
    },
    location:{
        type:String
    },
    country:{
        type:String
    },
    reviews:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review"
        }
    ],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})
listingSchema.post("findOneAndDelete",async(data)=>{
     if(data.reviews.length){
          await Review.deleteMany({_id:{$in :data.reviews}})
     }
})
const Listing=mongoose.model("Listing",listingSchema)
module.exports=Listing;

