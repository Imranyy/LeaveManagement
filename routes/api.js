const express=require('express');
const Warden = require("../models/warden"),
  flash = require("connect-flash"),
  Hod = require("../models/hod"),
Student = require("../models/student"),
bcrypt=require('bcryptjs'),
jwt=require('jsonwebtoken');
const router=express.Router();
const {
    Hodlogin,
    Wrdlogin,
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
router.get("/student/home", (req, res) => {
  res.render("homestud")
});


//post
router.post('/student/register',async(req,res)=>{
  try {
  const type = req.body.type;
  //std register
  if(type=='student'){
     try {
      const {name,username,password,type,password2,hostel,department,image}=req.body;
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
          const {name,username,password,type,password2,hostel,department,image}=req.body;
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
    res.render('homestud',{student:std});
    }else{
    res.status(400).send('Invalid Credentials')
    }
});

router.post('/hod/login',async(req,res)=>{
  const {username,password}=req.body;
  const hod=await Hod.findOne({username})
  if(hod&&(await bcrypt.compare(password,hod.password))){
  res.render('homehod',{hod:hod});
  }else{
  res.status(400).send('Invalid Credentials')
  }
});

router.post('/warden/login',async(req,res)=>{
  const {username,password}=req.body;
  const wrd=await Warden.findOne({username})
  if(wrd&&(await bcrypt.compare(password,wrd.password))){
  res.render("homewarden",{warden:wrd});
  }else{
  res.status(400).send('Invalid Credentials')
  }
});

  
 



router.get('/verify',protect);
//logout
router.get('/logout',(req,res)=>{
  res.redirect('/')
});
 //generate token
 const generateToken=(id)=>{
  return jwt.sign({id},process.env.JWT_SECRET,{
      expiresIn:'30d'
  })
};

module.exports=router;