const mongoose = require("mongoose");
const Schema=mongoose.Schema;
const leaveSchema = new Schema({
    subject: { 
      type: String, 
      required: true },
    from: Date,
    to: Date,
    days: Number,
    status: {
      type: String,
      enum: ["pending", "approved", "denied"],
      default: "pending"
    },
    wardenstatus: {
      type: String,
      enum: ["pending", "approved", "denied"],
      default: "pending"
    },
    finalstatus: {
      type: String,
      enum: ["pending", "approved", "denied"],
      default: "pending"
    },
    approved: {
      type: Boolean,
      default: false
    },
    denied: {
      type: Boolean,
      default: false
    },
    stud: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
      },
      username: String
    }
  },
  { timestamps: {} }
);

module.exports = mongoose.model("Leave", leaveSchema);
