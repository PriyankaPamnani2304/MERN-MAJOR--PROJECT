const express=require("express")
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js")
const Expresserror=require("../utils/expresserror.js")
const Listing=require("../models/listing..js");
const Review=require("../models/review.js")
const{ListingSchema}=require("../schema.js")
const {logedin}=require("../middleware.js")
const listingcontroller=require("../controllers/listings.js")
const multer  = require('multer')
const{storage}=require("../cloudconfig.js")
const upload = multer({storage})
// router.get("/",wrapAsync(async (req,res,next)=>{
//     try{
//     let r= await Listing.find({});
//     res.render("./listing/lists.ejs",{r});
//     }
//    catch(err){
//     next(err);
// }
// }))
router.get("/",wrapAsync(listingcontroller.index))
// router.get("/:id/show",wrapAsync(async(req,res)=>{
//     let {id}=req.params;
//     let ro= await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner")
//     if(!ro){
//         req.flash("error","Listing you requested for does not exist!")
//         res.redirect("/listings")
//     }
//     res.render("listing/lists1.ejs",{ro})
// }))
router.get("/:id/show",wrapAsync(listingcontroller.show))
// router.get("/new",logedin,(req,res)=>{
//    res.render("listing/form.ejs")
// })
router.get("/new",logedin,listingcontroller.newform)

// router.post("/add",upload.single("image"),wrapAsync(listingcontroller.add))
//     let {title,description,image,price,location,country}=req.body
//     let list1=new Listing({title,description,image,price,location,country})
//     list1.owner=req.user._id
//     await list1.save(); 
//     req.flash("success","New Listing Created!")
//     res.redirect("/listings");
//     }
// ))
router.post("/add",upload.single("image"),wrapAsync(listingcontroller.add))
// router.post("/add",upload.single("image"),(req,res)=>{
//     res.send(req.file)
// })
// router.get("/:id/edit",logedin,wrapAsync(async(req,res)=>{
//     let {id}=req.params
//     let rt=await Listing.findById(id)
//     if(!rt){
//         req.flash("error","Listing you requested for does not exist!")
//         res.redirect("/listings")
//     }
    
//     res.render("listing/formm.ejs",{rt})
// }))
router.get("/:id/edit",logedin,wrapAsync(listingcontroller.editform))
// router.put("/:id",wrapAsync(async(req,res)=>{
//     let {id}=req.params
//     let {title,description,image,price,location,country}=req.body
//     let ri=await Listing.findByIdAndUpdate(id,{title,description,image,price,location,country},{runValidators:true,new:true})
//     req.flash("success","Listing Updated!")
//     res.redirect(`/listings/${id}/show`)
// }))
router.put("/:id",upload.single("image"),wrapAsync(listingcontroller.edit))
// router.delete("/:id/",logedin,wrapAsync(async(req,res)=>{
//     let {id}=req.params
//      await Listing.findByIdAndDelete(id)
//      req.flash("success","Listing Deleted!")
//      res.redirect("/listings")
// }))
router.delete("/:id",logedin,wrapAsync(listingcontroller.delete))
module.exports=router;