const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: 100,
    },
    role: {
      type: String,
      trim: true,
      default: "Member",
    },
    text: {
      type: String,
      required: [true, "Review text is required"],
      maxlength: 500,
    },
    stars: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    approved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Testimonial", testimonialSchema);
