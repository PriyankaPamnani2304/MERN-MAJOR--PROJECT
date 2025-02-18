const express=require("express")
const router=express.Router();
const User=require("../models/user.js")
const passport=require("passport")
const {savedurl}=require("../middleware.js")
const usercontroller=require("../controllers/userr.js")
// router.get("/signup",(req,res)=>{
//     res.render("user/signup.ejs")
// })
router.get("/signup",usercontroller.signup)
// router.post("/signup",async(req,res)=>{
//     try{
//     let{email,username,password}=req.body
//     const newuser=new User({email,username})
//     const registered=await User.register(newuser,password)
//     req.login(registered,((err)=>{
//         if(err){
//         return next(err)
//     }
//     req.flash("success","Welcome to Wanderlust!")
//     res.redirect("/listings")
// }
// ))
// }
//     catch(e){
//         req.flash("error",e.message)
//         res.redirect("/signup")
//     }

// })
router.post("/signup",usercontroller.signupp)
// router.get("/login",(req,res)=>{
//     res.render("user/login.ejs")
// })
router.get("/login",usercontroller.login)
// router.post("/login",savedurl,
//     passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),
//     async(req,res)=>{
//     req.flash("success","Welcome to Wanderlust! You are logged in !")
//     let redirecturlss=res.locals.redirecturls || "/listings"
//     res.redirect(redirecturlss)
// })
router.post("/login",savedurl,
    passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),
usercontroller.loginn)
// router.get("/logout",(req,res)=>{
//      req.logout((err)=>{
//         if(err){
//             return next(err)
//         }
//         req.flash("success","you are logged out!")
//         res.redirect("/listings")
//      })
// })
router.get("/logout",usercontroller.logout)
module.exports=router;