const Listing=require("../models/listing..js");
const Review=require("../models/review.js")
const{ReviewSchema}=require("../schema.js")
const User=require("../models/user.js")
const passport=require("passport")
module.exports.signup=(req,res)=>{
    res.render("user/signup.ejs")
}
module.exports.signupp=async(req,res)=>{
    try{
    let{email,username,password}=req.body
    const newuser=new User({email,username})
    const registered=await User.register(newuser,password)
    req.login(registered,((err)=>{
        if(err){
        return next(err)
    }
    req.flash("success","Welcome to Wanderlust!")
    res.redirect("/listings")
}
))
}
    catch(e){
        req.flash("error",e.message)
        res.redirect("/signup")
    }

}
module.exports.login=(req,res)=>{
    res.render("user/login.ejs")
}
module.exports.loginn=async(req,res)=>{
    req.flash("success","Welcome to Wanderlust! You are logged in !")
    let redirecturlss=res.locals.redirecturls || "/listings"
    res.redirect(redirecturlss)
}
module.exports.logout=(req,res)=>{
    req.logout((err)=>{
       if(err){
           return next(err)
       }
       req.flash("success","you are logged out!")
       res.redirect("/listings")
    })
}