const Listing=require("./models/listing..js");
const Review=require("./models/review.js")
module.exports.logedin=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirecturl=req.originalUrl
        req.flash("error","you must be logged in to create/edit/delete  listing")
        res.redirect("/login")
    }
    next()
}
module.exports.savedurl=(req,res,next)=>{
    if(req.session.redirecturl){
        res.locals.redirecturls=req.session.redirecturl
    }
    next()
}  
module.exports.ownerin=async(req,res,next)=>{
    let{id,reId}=req.params
    let rer=await Review.findById(reId)
    if(!rer.author._id.equals(res.locals.curuser._id)){
        req.flash("error","You are not the author of this review")
        return res.redirect(`/listings/${id}/show`)
    }
    next();
}