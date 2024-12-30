import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });
  }, []);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <section className="jobDetail page">
      <div className="container">
        <h2>Job Details</h2>
        <div className="banner">
          <p>
            Company: <span>{job.company}</span>
          </p>
          <p>
            Job Title: <span> {job.title}</span>
          </p>
          <p>
            Category: <span>{job.category}</span>
          </p>
          <p>
            Offer Type: <span>{job.offer}</span>
          </p>
          <p>
            Eligible Branch(s): <span>{job.branch}</span>
          </p>
          <p>
            Salary:{" "}
            {job.fixedSalary ? (
              <span>{job.fixedSalary}</span>
            ) : (
              <span>
                {job.salaryFrom} (Stipend per Month) + {job.salaryTo} (CTC per Year)
              </span>
            )}
          </p>
          <p>
            Online Test Date: <span>{job.oadate}</span>
          </p>
          <p>
            Interview Date: <span>{job.interviewdate}</span>
          </p>
          <p>
            City: <span>{job.city}</span>
          </p>
          <p>
            Description: <span>{job.description}</span>
          </p>
          <p>
            Job Link: <a className="job-link" target="_blank" href={job.joblink}>Fill this form!</a>
          </p>
          <p>
            Job Posted On: <span>{job.jobPostedOn}</span>
          </p>
          {user && user.role === "Employer" ? (
            <></>
          ) : (
            <Link to={`/application/${job._id}`}>Apply Now</Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
