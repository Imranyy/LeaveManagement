const Warden = require("./models/warden"),
  flash = require("connect-flash"),
  Hod = require("./models/hod"),
Student = require("./models/student"),
Leave = require("./models/leave");
bcrypt=require('bcryptjs'),
jwt=require('jsonwebtoken'),
require('dotenv').config();

const register=async(req,res)=>{
    try {
    const type = req.body.type;
    //std register
    if(type=='student'){
       try {
        const {name,username,password,type,password2,hostel,department,image}=req.body;
        if(!name||!username||!type||!password||password2||hostel||image||!department){
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
            res.status(201).send({
                _id:StdReg.id,
                name:StdReg.name,
                username:StdReg.username,
                type:StdReg.type,
                hostel:StdReg.hostel,
                image:StdReg.image,
                department:StdReg.department,
                token:generateToken(StdReg.id)
            })
            req.flash("success", "you are registered successfully,now you can login");
            res.redirect("/student/login");
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
            if(!name||!username||!type||!password||password2||hostel||image||!department){
                res.status(400).send('Please add fields')
              }
              //check if user exist
              const userExist=await Hod.findOne({name});
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
                res.status(201).send({
                    _id:HodReg.id,
                    name:HodReg.name,
                    username:HodReg.username,
                    type:HodReg.type,
                    hostel:HodReg.hostel,
                    image:HodReg.image,
                    department:HodReg.department,
                    token:generateToken(HodReg.id)
                })
                req.flash("success", "you are registered successfully,now you can login");
                res.redirect("/hod/login");
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
            if(!name||!username||!type||!password||password2||hostel||image||!department){
                res.status(400).send('Please add fields')
              }
              //check if user exist
              const userExist=await Warden.findOne({name});
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
                res.status(201).send({
                    _id:WrdReg.id,
                    name:WrdReg.name,
                    username:WrdReg.username,
                    type:WrdReg.type,
                    hostel:WrdReg.hostel,
                    image:WrdReg.image,
                    department:WrdReg.department,
                    token:generateToken(WrdReg.id)
                })
                req.flash("success", "you are registered successfully,now you can login");
                res.redirect("/warden/login");
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
}

//login
const Stdlogin=async(req,res)=>{
    const {username,password}=req.body;
    const std=await Student.findOne({username})
    if(std&&(await bcrypt.compare(password,std.password))){
    res.send({
        _id:std.id,
        name:std.name,
        username:std.username,
        type:std.type,
        hostel:std.hostel,
        image:std.image,
        department:std.department,
        token:generateToken(std.id)
    })
    res.redirect("/student/home");
    }else{
    res.status(400).send('Invalid Credentials')
    }
}
const Hodlogin=async(req,res)=>{
    const {username,password}=req.body;
    const hod=await Hod.findOne({username})
    if(hod&&(await bcrypt.compare(password,hod.password))){
    res.send({
        _id:hod.id,
        name:hod.name,
        username:hod.username,
        type:hod.type,
        hostel:hod.hostel,
        image:hod.image,
        department:hod.department,
        token:generateToken(hod.id)
    })
    }else{
    res.status(400).send('Invalid Credentials')
    }
}
const Wrdlogin=async(req,res)=>{
    const {username,password}=req.body;
    const wrd=await Warden.findOne({username})
    if(wrd&&(await bcrypt.compare(password,wrd.password))){
    res.send({
        _id:wrd.id,
        name:wrd.name,
        username:wrd.username,
        type:wrd.type,
        hostel:wrd.hostel,
        image:wrd.image,
        department:wrd.department,
        token:generateToken(wrd.id)
    })
    res.redirect("/student/home");
    }else{
    res.status(400).send('Invalid Credentials')
    }
}

//auth Middlerware
const protect=async(req,res)=>{
    let token
    try{
            if(req.headers.authorization&&req.headers.authorization.startsWith('Bearer')){
            //get token from headers
            token=req.headers.authorization.split(' ')[1]
            //verify token
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            //get user from the token
            req.user=await User.findById(decoded.id).select('password');
            res.status(200).send(true);   
        }
        else if(!token){
          res.status(401).send(false);
        }
        }catch (error){
            console.log(error)
            res.status(402).send('not authorised!');
        }
  };
  
  //generate token
  const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
  };
module.exports={
    register,
    Stdlogin,
    Hodlogin,
    Wrdlogin,
    protect
}