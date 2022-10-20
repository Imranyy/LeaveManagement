const express=require('express');
const Warden = require("../models/warden"),
mongoose=require('mongoose'),  
Hod = require("../models/hod"),
Leave = require("../models/leave"),
Student = require("../models/student"),
bcrypt=require('bcryptjs'),
jwt=require('jsonwebtoken');
const router=express.Router();
const {
    protect
}=require('../controller/controller')
 
//view routes
router.get('/',(req,res)=>{
  res.render('home');
});
router.get("/register", (req, res) => {
  res.render("register");
});
router.get("/std/login", (req, res) => {
  res.render("login");
});
router.get("/h.o.d/login", (req, res) => {
  res.render("hodlogin");
});
router.get("/wrdn/login", (req, res) => {
  res.render("wardenlogin");
});



//post
router.post('/student/register',async(req,res)=>{
  try {
  const type = req.body.type;
  //std register
  if(type=='student'){
     try {
      const {name,username,password,type,password2,hostel,department,image,leaves}=req.body;
      if(!name||!username||!type||!password||!password2||!hostel||!image||!department){
          res.status(400).send('Please add fields')
        }
        //check if user exist
        const userExist=await Student.findOne({name});
        if(userExist){
          res.status(400).send('Student already Exists!!')
        }
        if(password!==password2){
          res.send('Password doesnot match!')
        }
        //Hashing password 
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt);
        //create user
        const StdReg=await Student.create({
          leaves,
          name,
          username,
          password,
          type,
          hostel,
          image,
          department,
          password:hashedPassword
          
        })
        if(StdReg){
          res.redirect("/std/login");
        }else{
          res.status(400).send('Invalid User Data')
        }
     } catch (error) {
      console.log(error.message)
     }
  }
  //hod register
  else if(type=='hod'){
      try {
          const {name,username,password,type,password2,hostel,department,image,leaves}=req.body;
          if(!name||!username||!type||!password||!password2||!hostel||!image||!department){
              res.status(400).send('Please add fields')
            }
            //check if user exist
            const userExist=await Hod.findOne({name});
            if(userExist){
              res.status(400).send('HOD already Exists!!')
            }
            if(password!==password2){
              res.send('Password doesnot match!')
            }
            //Hashing password 
            const salt=await bcrypt.genSalt(10)
            const hashedPassword=await bcrypt.hash(password,salt);
            //create user
            const HodReg=await Hod.create({
              leaves,
              name,
              username,
              password,
              type,
              hostel,
              image,
              department,
              password:hashedPassword
              
            })
            if(HodReg){
              res.redirect('/h.o.d/login')
            }else{
              res.status(400).send('Invalid User Data')
            }
      } catch (error) {
          console.log(error.message)
      }
  }
  //warden register
  else if(type=='warden'){
      try {
          const {name,username,password,type,password2,hostel,department,image}=req.body;
          if(!name||!username||!type||!password||!password2||!hostel||!image||!department){
              res.status(400).send('Please add fields')
            }
            //check if user exist
            const userExist=await Warden.findOne({name});
            if(userExist){
              res.status(400).send('Warden already Exists!!')
            }
            if(password!==password2){
              res.send('Password doesnot match!')
            }
            //Hashing password 
            const salt=await bcrypt.genSalt(10)
            const hashedPassword=await bcrypt.hash(password,salt);
            //create user
            const WrdReg=await Warden.create({
              name,
              username,
              password,
              type,
              hostel,
              image,
              department,
              password:hashedPassword
              
            })
            if(WrdReg){
                res.redirect("/wrdn/login");
            }else{
              res.status(400).send('Invalid User Data')
            }
      } catch (error) {
          console.log(error.message)
      }
  }
  } catch (error) {
      console.log(error.message)
  }
});



router.post('/student/login',async(req,res)=>{
  //login
    const {username,password}=req.body;
    const std=await Student.findOne({username})
    if(std&&(await bcrypt.compare(password,std.password))){
    res.redirect('/student/home/'+std.id);
    }else{
    res.status(400).send('Invalid Credentials')
    }
});

router.post('/hod/login',async(req,res)=>{
  const {username,password}=req.body;
  const hod=await Hod.findOne({username})
  if(hod&&(await bcrypt.compare(password,hod.password))){
  res.redirect('/hod/home/'+hod.id);
  }else{
  res.status(400).send('Invalid Credentials')
  }
});

router.post('/warden/login',async(req,res)=>{
  const {username,password}=req.body;
  const wrd=await Warden.findOne({username})
  if(wrd&&(await bcrypt.compare(password,wrd.password))){
  res.redirect("/warden/home/"+wrd.id);
  }else{
  res.status(400).send('Invalid Credentials')
  }
});

  
router.get("/student/home/:id",async(req, res) => {
  try {
    const {id}=req.params;
   if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).send({error:'No such User'})
    } 
  const home= await Student.findById({_id:id})
  res.render("homestud", { student: home });
  } catch (error) {
    res.send('Error:',error.message)
  }
});
//get std profile
router.get("/student/:id",async(req, res) => {
  try {
    const {id}=req.params;
   if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).send({error:'No such User'})
    } 
  const profile= await Student.findById({_id:id})
  res.render("profilestud", { student: profile });
  } catch (error) {
    res.send('Error:',error.message)
  }
});
//edit std profile
router.get("/student/:id/edit", async(req, res) => {
  try {
    const {id}=req.params;
   if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).send({error:'No such User'})
    } 
  const profileEdit= await Student.findById({_id:id})
  res.render("editS", { student: profileEdit });
  } catch (error) {
    res.send('Error:',error.message)
  }
});
//submit std edit profile
router.patch("/student/:id",async(req, res) => {
  try {
    const {id}=req.params;
   if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).send({error:'No such User'})
    } 
  const profileEditSubmit= await Student.findOneAndUpdate({_id:id},{
    ...req.body
  })
  if(!profileEditSubmit){
    return res.status(400).send({error:'No such User'})
  }
  res.redirect("/student/" + req.params.id);
} catch (error) {
    res.redirect('back');
    res.send(error.message)
  }
});

//apply for leave std
router.get("/student/:id/apply", async(req, res) => {
  try {
    const {id}=req.params;
   if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).send({error:'No such User'})
    } 
  const leave= await Student.findById({_id:id})
  res.render("leaveApply", { student: leave });
  } catch (error) {
    console.send('Error:',error.message)
    res.redirect("back")
  }
});
 //submitting leave
 router.post("/student/apply/:id", (req, res) => {
  Student.findById(req.params.id)
    .populate("leaves")
    .exec((err, student) => {
      if (err) {
        res.redirect("/student/home" +req.params.id);
      } else {
        date = new Date(req.body.leave.from);
        todate = new Date(req.body.leave.to);
        year = date.getFullYear();
        month = date.getMonth() + 1;
        dt = date.getDate();
        todt = todate.getDate();

        if (dt < 10) {
          dt = "0" + dt;
        }
        if (month < 10) {
          month = "0" + month;
        }
        console.log(todt - dt);
        req.body.leave.days = todt - dt;
        console.log(year + "-" + month + "-" + dt);
        console.log(req.body.leave);
        Leave.create(req.body.leave, (err, newLeave) => {
          if (err) {
            req.flash("error", "Something went wrong");
            res.redirect("back");
            console.log(err);
          } else {
            newLeave.stud.id = req.user._id;
            newLeave.stud.username = req.user.username;
            console.log("leave is applied by--" + req.user.username);

            newLeave.save();

            student.leaves.push(newLeave);

            student.save();
            req.flash("success", "Successfully applied for leave");
            res.render("homestud", { student: student, moment: moment });
          }
        });
      }
    });
});
//track leave
router.get("/student/:id/track", async(req, res) => {
  try {
    const {id}=req.params;
   if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).send({error:'No such User'})
    } 
  const leaveTrack= await Student.findById({_id:id})
  res.render("trackLeave", { student: leaveTrack, moment: moment });
  } catch (error) {
    res.status(500).send(error.message)
    res.redirect("back")
  }
});

//hod home
router.get("/hod/home/:id",async(req, res) => {
  try {
    const {id}=req.params;
   if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).send({error:'No such User'})
    } 
  const hod= await Hod.findById({_id:id})
  res.render("homehod", { hod: hod });
  } catch (error) {
    res.send('Error:',error.message)
  }
});
//get hod profile
router.get("/hod/:id",async(req, res) => {
  try {
    const {id}=req.params;
   if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).send({error:'No such User'})
    } 
  const Hodprofile= await Hod.findById({_id:id})
  res.render("profilehod", { hod: Hodprofile });
  } catch (error) {
    res.send('Error:',error.message)
  }
});
//edit hod profile
router.get("/hod/:id/edit", async(req, res) => {
  try {
    const {id}=req.params;
   if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).send({error:'No such User'})
    } 
  const HodprofileEdit= await Hod.findById({_id:id})
  res.render("editH", { hod: HodprofileEdit });
  } catch (error) {
    res.send('Error:',error.message)
  }
});
//submit hod edit profile
router.put("/hod/:id",async(req, res) => {
  try {
    const {id}=req.params;
   if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).send({error:'No such User'})
    } 
  const profileEditSubmit= await Hod.findOneAndUpdate({_id:id},{
    ...req.body
  })
  if(!profileEditSubmit){
    return res.status(400).send({error:'No such User'})
  }
  res.redirect("/hod/" + req.params.id);
} catch (error) {
    res.redirect('back');
    res.send(error.message)
  }
});
//get leaves for hod
router.get("/hod/:id/leave", async(req, res) => {
  try {
    const {id}=req.params;
   if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).send({error:'No such User'})
    } 
  const hod= await Hod.findById({_id:id})
  if(hod){
    try{
      const leaves=await Student.find({ department: hod.department });
      res.render("hodLeaveSign", {
                      hod: hod,
                      students: leaves,
                      //moment: moment
                    });
    }catch (err){
      console.log(err.message);
      res.redirect("back");
    }
  }
  } catch (error) {
    res.status(503).send(error.message)
    res.redirect("back")
  }
});

//get warden home
router.get("/warden/home/:id",async(req, res) => {
  try {
    const {id}=req.params;
   if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).send({error:'No such User'})
    } 
  const homeWrd= await Warden.findById({_id:id})
  res.render("homewarden", { warden: homeWrd });
  } catch (error) {
    res.send('Error:',error.message)
  }
});
//get warden profile
router.get("/warden/:id",async(req, res) => {
  try {
    const {id}=req.params;
   if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).send({error:'No such User'})
    } 
  const Wrdnprofile= await Warden.findById({_id:id})
  res.render("profilewarden", { warden: Wrdnprofile });
  } catch (error) {
    res.send('Error:',error.message)
  }
});
//edit warden profile
router.get("/warden/:id/edit", async(req, res) => {
  try {
    const {id}=req.params;
   if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).send({error:'No such User'})
    } 
  const WrdnprofileEdit= await Warden.findById({_id:id})
  res.render("editW", { warden: WrdnprofileEdit });
  } catch (error) {
    res.redirect('back')
    console.log(error.message)
  }
});
//submit warden edit profile
router.put("/warden/:id",async(req, res) => {
  try {
    const {id}=req.params;
   if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).send({error:'No such User'})
    } 
  const profileEditSubmit= await Hod.findOneAndUpdate({_id:id},{
    ...req.body
  })
  if(!profileEditSubmit){
    return res.status(400).send({error:'No such User'})
  }
  res.redirect("/hod/" + req.params.id);
} catch (error) {
    res.redirect('back');
    res.send(error.message)
  }
});
//apply for leave warden
router.get("/warden/:id/leave", async(req, res) => {
  try {
    const {id}=req.params;
   if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).send({error:'No such User'})
    } 
  const Wrdn= await Warden.findById({_id:id})
  if(Wrdn){
   try{
    const std=await Student.find({ hostel: Wrdn.hostel })
    res.render("wardenLeaveSign", {
      warden: Wrdn,
      students: std,

     // moment: moment
    });
   }catch(err){
    res.redirect("back");
    console.log(err.message)
   }
  }
  } catch (error) {
    res.redirect('back')
    console.log(error.message)
  }
});
//track leave warden
router.get("/warden/:id/track", async(req, res) => {
  try {
    const {id}=req.params;
   if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).send({error:'No such User'})
    } 
  const leaveTrackWrdn= await Warden.findById({_id:id})
  res.render("trackLeave", { warden: leaveTrackWrdn, moment: moment });
  } catch (error) {
    res.status(500).send(error.message)
    res.redirect("back")
  }
});

router.get('/verify',protect);
//logout
router.get('/logout',(req,res)=>{
  //req.logout();
  res.redirect('/')
});
 //generate token
 const generateToken=(id)=>{
  return jwt.sign({id},process.env.JWT_SECRET,{
      expiresIn:'30d'
  })
};

module.exports=router;