const Listing=require("../models/listing..js");
const{ListingSchema}=require("../schema.js")
module.exports.index=async (req,res,next)=>{
    try{
    let r= await Listing.find({});
    res.render("./listing/lists.ejs",{r});
    }
   catch(err){
    next(err);
}
}
module.exports.show=async(req,res)=>{
    let {id}=req.params;
    let ro= await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner")
    if(!ro){
        req.flash("error","Listing you requested for does not exist!")
        res.redirect("/listings")
    }
    res.render("listing/lists1.ejs",{ro})
}
module.exports.newform=(req,res)=>{
    res.render("listing/form.ejs")
}
module.exports.add=async(req,res,next)=>{
   let url=req.file.path
    let filename=req.file.filename
    console.log(url,"...",filename)
    // const {error,value}=ListingSchema.validate(req.body);
    // if(error){
    //     throw new Expresserror(404,error);
    // }
    let {title,description,image,price,location,country}=req.body
    let list1=new Listing({title,description,image,price,location,country})
    list1.owner=req.user._id
    list1.image={url,filename}
    await list1.save(); 
    req.flash("success","New Listing Created!")
    res.redirect("/listings");
}

module.exports.editform=async(req,res)=>{
    let {id}=req.params
    let rt=await Listing.findById(id)
    if(!rt){
        req.flash("error","Listing you requested for does not exist!")
        res.redirect("/listings")
    }
    let original=rt.image.url
    original=original.replace("/upload","/upload/h_300,w_250")
    
    res.render("listing/formm.ejs",{rt,original})
}
module.exports.edit=async(req,res)=>{
    let {id}=req.params
    let {title,description,image,price,location,country}=req.body
    let ri=await Listing.findByIdAndUpdate(id,{title,description,image,price,location,country},{runValidators:true,new:true})
    if(typeof req.file !== "undefined"){
        let url=req.file.path
        let filename=req.file.filename
        ri.image={url,filename}
        ri.save()
    }
    req.flash("success","Listing Updated!")
    res.redirect(`/listings/${id}/show`)
}
module.exports.delete=async(req,res)=>{
    let {id}=req.params
     await Listing.findByIdAndDelete(id)
     req.flash("success","Listing Deleted!")
     res.redirect("/listings")
}
