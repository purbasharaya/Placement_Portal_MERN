import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [joblink, setJoblink] = useState("");
  const [category, setCategory] = useState("");
  const [offer, setOffer] = useState("");
  const [city, setCity] = useState("");
  const [company, setcompany] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");
  const [oadate, setOadate] = useState("default");
  const [interviewdate, setInterviewdate] = useState("");
  const [branch, setBranch] = useState("");

  const { isAuthorized, user } = useContext(Context);

  const handleJobPost = async (e) => {
    e.preventDefault();
    if (salaryType === "Fixed Salary") {
      setSalaryFrom("");
      setSalaryFrom("");
    } 
    else if (salaryType === "Ranged Salary") {
      setFixedSalary("");
    } 
    else {
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
    }
    await axios
      .post(
        "http://localhost:4000/api/v1/job/post",
        fixedSalary.length >= 4
          ? {
              title,
              description,
              joblink,
              category,
              offer,
              city,
              company,
              fixedSalary,
              oadate, 
              interviewdate,
              branch,
            }
          : {
              title,
              description,
              joblink,
              category,
              offer,
              city,
              company,
              salaryFrom,
              salaryTo,
              oadate, 
              interviewdate,
              branch,
            },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateTo = useNavigate();
  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  return (
    <>
      <div className="job_post page">
        <div className="container">
          <h2>Post New Job</h2>
          <form onSubmit={handleJobPost}>
            <input
              type="text"
              value={company}
              onChange={(e) => setcompany(e.target.value)}
              placeholder="Company"
            />
            <div className="wrapper">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Job Title"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Software Development">
                  Software Development
                </option>
                <option value="Web Development">
                  Web Development
                </option>
                <option value="Data Scientist">
                  Data Scientist
                </option>
                <option value="Mobile App Development">
                  Mobile App Development
                </option>
                <option value="Cloud Computing">
                  Cloud Computing
                </option>
                <option value="Machine Learning">
                  Machine Learning
                </option>
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
                <option value="Graphics & Design">
                  Graphics & Design
                </option>
                <option value="Accounts & Finance">
                  Accounts & Finance
                </option>
                <option value="Data Entry Operator">
                  Data Entry Operator
                </option>
                <option value="Video Animation">
                  Video Animation
                </option>
              </select>
            </div>
            <div className="wrapper">
              <select
                value={offer}
                onChange={(e) => setOffer(e.target.value)}
              >
                <option value="">Offer Type</option>
                <option value="Intern">
                  Intern (6 months)
                </option>
                <option value="Intern + PPO">
                  Intern + PPO
                </option>
                <option value="Intern + FTE">
                  Intern + FTE
                </option>
                <option value="Full Time Employment">
                  Full Time Employment
                </option>
              </select>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
              />
            </div>
            <div className="wrapper">
              <p className="date-title">Eligible Branch(s) :</p>
              <input
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                placeholder="Eligible Branch"
              />
            </div>
            <div className="wrapper">
              <p className="date-title">Online Test Date :</p>
              <input
                type="date"
                value={oadate}
                onChange={(e) => setOadate(e.target.value)}
                placeholder="Online Test Date"
              />
            {/* </div>
            <div className="wrapper"> */}
              <p className="date-title">Interview Date :</p>
              <input
                type="date"
                value={interviewdate}
                onChange={(e) => setInterviewdate(e.target.value)}
                placeholder="Interview Date"
              />
            </div>
            <div className="salary_wrapper">
              <select
                value={salaryType}
                onChange={(e) => setSalaryType(e.target.value)}
              >
                <option value="default">Select Salary Type</option>
                <option value="Fixed Salary">FTE Salary</option>
                <option value="Fixed Salary">Intern Salary</option>
                <option value="Ranged Salary">Intern + FTE Salary</option>
                <option value="Ranged Salary">Intern + PPO Salary</option>
              </select>
              <div>
                {salaryType === "default" ? (
                  <p>Please provide salary per year *</p>
                ) : salaryType === "Fixed Salary" ? (
                  <input
                    type="number"
                    placeholder="Enter CTC per Year"
                    value={fixedSalary}
                    onChange={(e) => setFixedSalary(e.target.value)}
                  />
                ) : (
                  <div className="ranged_salary">
                    <input
                      type="number"
                      placeholder="Intern Stipend per Month"
                      value={salaryFrom}
                      onChange={(e) => setSalaryFrom(e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Enter CTC per Year"
                      value={salaryTo}
                      onChange={(e) => setSalaryTo(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
            <textarea
              rows="4"
              value={joblink}
              onChange={(e) => setJoblink(e.target.value)}
              placeholder="Job Link"
            />
            <textarea
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Job Description"
            />
            <button type="submit">Create Job</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostJob;
