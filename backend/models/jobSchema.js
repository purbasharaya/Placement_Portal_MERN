import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, "Please provide company."],
    minLength: [2, "Company must contian at least 2 characters!"],
    maxLength: [12, "Company cannot exceed 12 characters!"],
  },
  title: {
    type: String,
    required: [true, "Please provide a title."],
    minLength: [2, "Title must contain at least 2 Characters!"],
    maxLength: [30, "Title cannot exceed 30 Characters!"],
  },
  description: {
    type: String,
    required: [true, "Please provide the description of the job."],
    minLength: [40, "Description must contain at least 40 Characters!"],
    maxLength: [800, "Description cannot exceed 800 Characters!"],
  },
  joblink: {
    type: String,
    required: [true, "Please provide the link for the job."],
    minLength: [10, "Link must contain at least 10 Characters!"],
    maxLength: [400, "Link cannot exceed 400 Characters!"],
  },
  category: {
    type: String,
    required: [true, "Please provide a category."],
  },
  offer: {
    type: String,
    required: [true, "Please provide offer type."],
  },
  city: {
    type: String,
    required: [true, "Please provide a city name."],
  },
  branch: {
    type: String,
    required: [true, "Please provide eligible branches."],
  },
  fixedSalary: {
    type: Number,
    minLength: [4, "Salary must contain at least 4 digits"],
    maxLength: [10, "Salary cannot exceed 10 digits"],
  },
  salaryFrom: {
    type: Number,
    minLength: [4, "Salary must contain at least 4 digits"],
    maxLength: [10, "Salary cannot exceed 10 digits"],
  },
  salaryTo: {
    type: Number,
    minLength: [4, "Salary must contain at least 4 digits"],
    maxLength: [10, "Salary cannot exceed 10 digits"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  oadate: {
    type: Date,
  },
  interviewdate: {
    type: Date,
  },
});

export const Job = mongoose.model("Job", jobSchema);
