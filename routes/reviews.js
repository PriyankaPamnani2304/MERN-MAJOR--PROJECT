const express=require("express")
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js")
const Expresserror=require("../utils/expresserror.js")
const Listing=require("../models/listing..js");
const Review=require("../models/review.js")
const{ListingSchema}=require("../schema.js")
const{ReviewSchema}=require("../schema.js")
const {logedin}=require("../middleware.js")
const {ownerin}=require("../middleware.js")
const reviewcontroller=require("../controllers/reviewss.js")
// router.post("/",logedin,wrapAsync(async(req,res)=>{
//     const{error,value}=ReviewSchema.validate(req.body)
//     if(error){
//         throw new Expresserror(404,error);
//     }
//     let {id}=req.params;
//     let r=await Listing.findById(id);
//     let{rating,comment}=req.body;
//     let r1=new Review({rating,comment});
//     r1.author=req.user._id
//     r.reviews.push(r1)
//     await r1.save();
//     await r.save();
//     req.flash("success","New Review Created!")
//    res.redirect(`/listings/${id}/show`)
// })
// )
 router.post("/",logedin,wrapAsync(reviewcontroller.add))
// router.delete("/:reId",logedin,ownerin,wrapAsync(async(req,res)=>{
//     let {id ,reId}=req.params
//     await Listing.findByIdAndUpdate(id,{$pull :{reviews:reId}})
//     await Review.findByIdAndDelete(reId)
//     req.flash("success","Review Deleted!")
//     res.redirect(`/listings/${id}/show`)
// }))
router.delete("/:reId",logedin,ownerin,wrapAsync(reviewcontroller.delete))
module.exports=router;
