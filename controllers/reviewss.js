const Listing=require("../models/listing..js");
const Review=require("../models/review.js")
const{ReviewSchema}=require("../schema.js")
module.exports.add=async(req,res)=>{
    const{error,value}=ReviewSchema.validate(req.body)
    if(error){
        throw new Expresserror(404,error);
    }
    let {id}=req.params;
    let r=await Listing.findById(id);
    let{rating,comment}=req.body;
    let r1=new Review({rating,comment});
    r1.author=req.user._id
    r.reviews.push(r1)
    await r1.save();
    await r.save();
    req.flash("success","New Review Created!")
   res.redirect(`/listings/${id}/show`)
}
module.exports.delete=async(req,res)=>{
    let {id ,reId}=req.params
    await Listing.findByIdAndUpdate(id,{$pull :{reviews:reId}})
    await Review.findByIdAndDelete(reId)
    req.flash("success","Review Deleted!")
    res.redirect(`/listings/${id}/show`)
}