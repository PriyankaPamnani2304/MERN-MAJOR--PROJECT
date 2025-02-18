if(process.env.NODE_ENV != "production"){
require('dotenv').config()
}
const express=require("express")
const app=express();
const path=require("path")
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"/views"))
const port=8080;
app.use(express.urlencoded({extended:true}));
const methodOverride=require("method-override")
app.use(methodOverride("_method"));
 ejsMate=require("ejs-mate")
app.engine("ejs",ejsMate)
app.use(express.static(path.join(__dirname,"/public")))
const wrapAsync=require("./utils/wrapAsync.js")
const expresserror=require("./utils/expresserror.js")
const Listing=require("./models/listing..js");
const User=require("./models/user.js")
const passport=require("passport")
const Localstratergy=require("passport-local")
const Review=require("./models/review.js")
const{ListingSchema}=require("./schema.js")
const{ReviewSchema}=require("./schema.js")
const listingss=require("./routes/listing.js")
const reviewss=require("./routes/reviews.js")
const users=require("./routes/users.js")
const session=require("express-session")
const MongoStore=require("connect-mongo")
const flash=require("connect-flash")
let dburl=process.env.ATLASDB_URL;
const store=MongoStore.create({
    mongoUrl:dburl,
    crypto:{
        secret:process.env.SECRET
    },
    touchafter:24*3600
})
store.on("error",()=>{
    console.log("ERROR in MONGO SESSION STORE",err)
})
const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
    }
}
app.use(session(sessionOptions))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
passport.use(new Localstratergy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success=req.flash("success")
    res.locals.error=req.flash("error")
    res.locals.curuser=req.user
    next();
})

const mongoose=require("mongoose");
main()
.then(()=>{
    console.log("successful connection")
})
.catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(process.env.ATLASDB_URL);
}
app.use("/listings",listingss);
app.use("/listing/:id/review",reviewss);
app.use("/",users);

app.all("*",(req,res,next)=>{
    next(new expresserror(404,"Page not found"));
    });
app.use((err,req,res,next)=>{
        let{status,message}=err;
        res.status(status).render("./listing/error.ejs",{err});
    });
app.listen(port,()=>{
        console.log(`listening on  ${port}`)
    });