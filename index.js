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

  
  
  
  