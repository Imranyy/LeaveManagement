const express=require('express'),
 mongoose=require('mongoose'),
 app=express();
require('dotenv').config();
 
//connect to mongodb
mongoose.connect(process.env.LOCALURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    //listening to port
    const port=process.env.PORT||5000;
    app.listen(port,()=>{
        console.log(`server running on port ${port}`)
    })
}).catch(err=>{
    console.log("Error:",err.message)
})
mongoose.Promise=global.Promise;

//view engine set
app.set('view engine','ejs');
//serving status
app.use(express.static('public'));
//using bodyparse
app.use(express.urlencoded({extended:true}));

//api route
app.use(require('./routes/api'));
//error handling
app.use((err,req,res,next)=>{
    res.status(422).send({error:err.message});
});


  // app.get("/student/:id", ensureAuthenticated, (req, res) => {
  //   Student.findById(req.params.id)
  //     .populate("leaves")
  //     .exec((err, foundStudent) => {
  //       if (err || !foundStudent) {
  //         req.flash("error", "Student not found");
  //         res.redirect("back");
  //       } else {
  //         res.render("profilestud", { student: foundStudent });
  //       }
  //     });
  // });
  // app.get("/student/:id/edit", ensureAuthenticated, (req, res) => {
  //   Student.findById(req.params.id, (err, foundStudent) => {
  //     res.render("editS", { student: foundStudent });
  //   });
  // });
  // app.put("/student/:id", ensureAuthenticated, (req, res) => {
  //   console.log(req.body.student);
  //   Student.findByIdAndUpdate(
  //     req.params.id,
  //     req.body.student,
  //     (err, updatedStudent) => {
  //       if (err) {
  //         req.flash("error", err.message);
  //         res.redirect("back");
  //       } else {
  //         req.flash("success", "Succesfully updated");
  //         res.redirect("/student/" + req.params.id);
  //       }
  //     }
  //   );
  // });
  
  // app.get("/student/:id/apply", (req, res) => {
  //   Student.findById(req.params.id, (err, foundStud) => {
  //     if (err) {
  //       console.log(err);
  //       res.redirect("back");
  //     } else {
  //       res.render("leaveApply", { student: foundStud });
  //     }
  //   });
  // });
  
  // app.post("/student/:id/apply", (req, res) => {
  //   Student.findById(req.params.id)
  //     .populate("leaves")
  //     .exec((err, student) => {
  //       if (err) {
  //         res.redirect("/student/home");
  //       } else {
  //         date = new Date(req.body.leave.from);
  //         todate = new Date(req.body.leave.to);
  //         year = date.getFullYear();
  //         month = date.getMonth() + 1;
  //         dt = date.getDate();
  //         todt = todate.getDate();
  
  //         if (dt < 10) {
  //           dt = "0" + dt;
  //         }
  //         if (month < 10) {
  //           month = "0" + month;
  //         }
  //         console.log(todt - dt);
  //         req.body.leave.days = todt - dt;
  //         console.log(year + "-" + month + "-" + dt);
  //         // req.body.leave.to = req.body.leave.to.substring(0, 10);
  //         console.log(req.body.leave);
  //         // var from = new Date(req.body.leave.from);
  //         // from.toISOString().substring(0, 10);
  //         // console.log("from date:", strDate);
  //         Leave.create(req.body.leave, (err, newLeave) => {
  //           if (err) {
  //             req.flash("error", "Something went wrong");
  //             res.redirect("back");
  //             console.log(err);
  //           } else {
  //             newLeave.stud.id = req.user._id;
  //             newLeave.stud.username = req.user.username;
  //             console.log("leave is applied by--" + req.user.username);
  
  //             // console.log(newLeave.from);
  //             newLeave.save();
  
  //             student.leaves.push(newLeave);
  
  //             student.save();
  //             req.flash("success", "Successfully applied for leave");
  //             res.render("homestud", { student: student, moment: moment });
  //           }
  //         });
  //       }
  //     });
  // });
  // app.get("/student/:id/track", (req, res) => {
  //   Student.findById(req.params.id)
  //     .populate("leaves")
  //     .exec((err, foundStud) => {
  //       if (err) {
  //         req.flash("error", "No student with requested id");
  //         res.redirect("back");
  //       } else {
          
  //         res.render("trackLeave", { student: foundStud, moment: moment });
  //       }
  //     });
  // });
  app.get("/hod/login", (req, res) => {
    res.render("hodlogin");
  });
  
  // app.post(
  //   "/hod/login",
  //   passport.authenticate("hod", {
  //     successRedirect: "/hod/home",
  //     failureRedirect: "/hod/login",
  //     failureFlash: true
  //   }),
  //   (req, res) => {
  //     res.redirect("/hod/home");
  //   }
  // );
  // app.get("/hod/home", ensureAuthenticated, (req, res) => {
  //   Hod.find({}, (err, hod) => {
  //     if (err) {
  //       console.log("err");
  //     } else {
  //       res.render("homehod", {
  //         hod: req.user
  //       });
  //     }
  //   });
  // });
  // app.get("/hod/:id", ensureAuthenticated, (req, res) => {
  //   console.log(req.params.id);
  //   Hod.findById(req.params.id).exec((err, foundHod) => {
  //     if (err || !foundHod) {
  //       req.flash("error", "Hod not found");
  //       res.redirect("back");
  //     } else {
  //       res.render("profilehod", { hod: foundHod });
  //     }
  //   });
  // });
  // app.get("/hod/:id/edit", ensureAuthenticated, (req, res) => {
  //   Hod.findById(req.params.id, (err, foundHod) => {
  //     res.render("editH", { hod: foundHod });
  //   });
  // });
  // app.put("/hod/:id", ensureAuthenticated, (req, res) => {
  //   console.log(req.body.hod);
  //   Hod.findByIdAndUpdate(req.params.id, req.body.hod, (err, updatedHod) => {
  //     if (err) {
  //       req.flash("error", err.message);
  //       res.redirect("back");
  //     } else {
  //       req.flash("success", "Succesfully updated");
  //       res.redirect("/hod/" + req.params.id);
  //     }
  //   });
  // });
  // app.get("/hod/:id/leave", (req, res) => {
  //   Hod.findById(req.params.id).exec((err, hodFound) => {
  //     if (err) {
  //       req.flash("error", "hod not found with requested id");
  //       res.redirect("back");
  //     } else {
  //       Student.find({ department: hodFound.department })
  //         .populate("leaves")
  //         .exec((err, students) => {
  //           if (err) {
  //             req.flash("error", "student not found with your department");
  //             res.redirect("back");
  //           } else {
  //             res.render("hodLeaveSign", {
  //               hod: hodFound,
  //               students: students,
  //               moment: moment
  //             });
              
  //           }
  //         });
  //     }
  //   });
  // });
  
  // app.get("/hod/:id/leave/:stud_id/info", (req, res) => {
  //   Hod.findById(req.params.id).exec((err, hodFound) => {
  //     if (err) {
  //       req.flash("error", "hod not found with requested id");
  //       res.redirect("back");
  //     } else {
  //       Student.findById(req.params.stud_id)
  //         .populate("leaves")
  //         .exec((err, foundStudent) => {
  //           if (err) {
  //             req.flash("error", "student not found with this id");
  //             res.redirect("back");
  //           } else {
  //             res.render("moreinfostud", {
  //               student: foundStudent,
  //               hod: hodFound,
  //               moment: moment
  //             });
  //           }
  //         });
  //     }
  //   });
  // });
  
  // app.post("/hod/:id/leave/:stud_id/info", (req, res) => {
  //   Hod.findById(req.params.id).exec((err, hodFound) => {
  //     if (err) {
  //       req.flash("error", "hod not found with requested id");
  //       res.redirect("back");
  //     } else {
  //       Student.findById(req.params.stud_id)
  //         .populate("leaves")
  //         .exec((err, foundStudent) => {
  //           if (err) {
  //             req.flash("error", "student not found with this id");
  //             res.redirect("back");
  //           } else {
  //             if (req.body.action === "Approve") {
  //               foundStudent.leaves.forEach(function(leave) {
  //                 if (leave.status === "pending") {
  //                   leave.status = "approved";
  //                   leave.approved = true;
  //                   leave.save();
  //                 }
  //               });
  //             } else {
  //               console.log("u denied");
  //               foundStudent.leaves.forEach(function(leave) {
  //                 if (leave.status === "pending") {
  //                   leave.status = "denied";
  //                   leave.denied = true;
  //                   leave.save();
  //                 }
  //               });
  //             }
  //             res.render("moreinfostud", {
  //               student: foundStudent,
  //               hod: hodFound,
  //               moment: moment
  //             });
  //           }
  //         });
  //     }
  //   });
  // });
  
  // app.get("/warden/login", (req, res) => {
  //   res.render("wardenlogin");
  // });
  
  // app.post(
  //   "/warden/login",
  //   passport.authenticate("warden", {
  //     successRedirect: "/warden/home",
  //     failureRedirect: "/warden/login",
  //     failureFlash: true
  //   }),
  //   (req, res) => {
  //     res.redirect("/warden/home");
  //   }
  // );
  // app.get("/warden/home", ensureAuthenticated, (req, res) => {
  //   Warden.find({}, (err, hod) => {
  //     if (err) {
  //       console.log("err");
  //     } else {
  //       res.render("homewarden", {
  //         warden: req.user
  //       });
  //     }
  //   });
  // });
  
  // app.get("/warden/:id", ensureAuthenticated, (req, res) => {
  //   console.log(req.params.id);
  //   Warden.findById(req.params.id).exec((err, foundWarden) => {
  //     if (err || !foundWarden) {
  //       req.flash("error", "Warden not found");
  //       res.redirect("back");
  //     } else {
  //       res.render("profilewarden", { warden: foundWarden });
  //     }
  //   });
  // });
  // app.get("/warden/:id/edit", ensureAuthenticated, (req, res) => {
  //   Warden.findById(req.params.id, (err, foundWarden) => {
  //     res.render("editW", { warden: foundWarden });
  //   });
  // });
  
  // app.put("/warden/:id", ensureAuthenticated, (req, res) => {
  //   console.log(req.body.warden);
  //   Warden.findByIdAndUpdate(
  //     req.params.id,
  //     req.body.warden,
  //     (err, updatedWarden) => {
  //       if (err) {
  //         req.flash("error", err.message);
  //         res.redirect("back");
  //       } else {
  //         req.flash("success", "Succesfully updated");
  //         res.redirect("/warden/" + req.params.id);
  //       }
  //     }
  //   );
  // });
  
  // app.get("/warden/:id/leave", (req, res) => {
  //   Warden.findById(req.params.id).exec((err, wardenFound) => {
  //     if (err) {
  //       req.flash("error", "hod not found with requested id");
  //       res.redirect("back");
  //     } else {
  //       // console.log(hodFound);
  //       Student.find({ hostel: wardenFound.hostel })
  //         .populate("leaves")
  //         .exec((err, students) => {
  //           if (err) {
  //             req.flash("error", "student not found with your department");
  //             res.redirect("back");
  //           } else {
  //             res.render("wardenLeaveSign", {
  //               warden: wardenFound,
  //               students: students,
  
  //               moment: moment
  //             });
  //           }
  //         });
  //     }
  //   });
  // });
  // app.get("/warden/:id/leave/:stud_id/info", (req, res) => {
  //   Warden.findById(req.params.id).exec((err, wardenFound) => {
  //     if (err) {
  //       req.flash("error", "warden not found with requested id");
  //       res.redirect("back");
  //     } else {
  //       Student.findById(req.params.stud_id)
  //         .populate("leaves")
  //         .exec((err, foundStudent) => {
  //           if (err) {
  //             req.flash("error", "student not found with this id");
  //             res.redirect("back");
  //           } else {
  //             res.render("Wardenmoreinfostud", {
  //               student: foundStudent,
  //               warden: wardenFound,
  //               moment: moment
  //             });
  //           }
  //         });
  //     }
  //   });
  // });
  
  // app.post("/warden/:id/leave/:stud_id/info", (req, res) => {
  //   Warden.findById(req.params.id).exec((err, wardenFound) => {
  //     if (err) {
  //       req.flash("error", "warden not found with requested id");
  //       res.redirect("back");
  //     } else {
  //       Student.findById(req.params.stud_id)
  //         .populate("leaves")
  //         .exec((err, foundStudent) => {
  //           if (err) {
  //             req.flash("error", "student not found with this id");
  //             res.redirect("back");
  //           } else {
  //             if (req.body.action === "Approve") {
  //               foundStudent.leaves.forEach(function(leave) {
  //                 if (leave.wardenstatus === "pending") {
  //                   leave.wardenstatus = "approved";
  
  //                   leave.save();
  //                 }
  //               });
  //             } else {
  //               console.log("u denied");
  //               foundStudent.leaves.forEach(function(leave) {
  //                 if (leave.wardenstatus === "pending") {
  //                   leave.wardenstatus = "denied";
  
  //                   leave.save();
  //                 }
  //               });
  //             }
  //             res.render("Wardenmoreinfostud", {
  //               student: foundStudent,
  //               warden: wardenFound,
  //               moment: moment
  //             });
  //           }
  //         });
  //     }
  //   });
  // });

  // //logout for student
  // app.get("/logout", (req, res) => {
  //   req.logout();
  //   res.redirect("/");
  // });
  
  
  