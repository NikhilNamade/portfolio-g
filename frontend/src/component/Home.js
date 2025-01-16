import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
const Home = (props) => {
  const navigate = useNavigate();
  const [submit, setSubmit] = useState(false);
  const [image, setImg] = useState("");
  const [resume, setResume] = useState("");
  const [domain, setDomain] = useState("");
  const [education, setEducation] = useState("");
  const [Skills, setSkills] = useState([""]);
  const [project, setProject] = useState([{ title: "", description: "", Projectlink: "" }]);
  const [credincials, setcredincials] = useState({
    name: "",
    email: "",
    university: "",
    experience: "",
    LinkedinURL: "",
    GithubURL: "",
    aboutyou:""
  });
  //for skills
  const onchangeSkils = (index, e) => {
    const newSkills = [...Skills];
    newSkills[index] = e.target.value;
    setSkills(newSkills);
  };
  const handleSkills = () => {
    setSkills([...Skills, ""]);
  };
  //for project
  const onchangeproject = (index, e) => {
    const { name, value } = e.target
    const newProject = [...project];
    newProject[index][name] = value;
    setProject(newProject);
  }
  const handleProject = () => {
    setProject([...project, { title: "", description: "", Projectlink: "" }])
  }


  const handledropedu = (e) => {
    setEducation(e.target.value);
  };
  const handledropdomain = (e) => {
    setDomain(e.target.value);
  };
  // submitting data
  const handleSubmit = async (e) => {
    e.preventDefault();
    { props.setProgress(10) }
    // Additional validation can be done here if necessary
    if (credincials.name.length < 5) {
      alert("Name must be at least 5 characters long.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", credincials.name);
      formData.append("email", credincials.email);
      formData.append("education", education);
      formData.append("university", credincials.university);
      formData.append("experience", credincials.experience);
      Skills.forEach((skill, index) => {
        formData.append(`Skills[${index}]`, skill);
      });
      formData.append("project", JSON.stringify(project));
      formData.append("LinkedinURL", credincials.LinkedinURL);
      formData.append("GithubURL", credincials.GithubURL);
      formData.append("aboutyou",credincials.aboutyou);
      formData.append("Domain", domain);
      formData.append("image", image);
      formData.append("resume", resume);
      const response = await fetch(`http://localhost:5000/api/data/adddata`, {
        method: 'POST',
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
        body: formData, // Use FormData to include the image
      });
      const data = await response.json();
      setSubmit(true);
      if(data.success)
      {
        navigate("/about")
      }else{
        alert("Unable")
      }
      { props.setProgress(100) }
    } catch (error) {
      console.error('Error :', error);
    }
  };

  //base64 or multer
  const onchangeImg = (e) => {
    const file = e.target.files[0];
    setImg(file); // Set the file object directly
  };
  const onchangeResume = (e) => {
    const file = e.target.files[0];
    setResume(file); // Set the file object directly
  };

  const onchange = (e) => {
    setcredincials({ ...credincials, [e.target.name]: e.target.value });
  };



  return (
    <div className="container formContainer">
      <p className="fs-1 fw-bolder mt-5">User Details</p>
      <form onSubmit={handleSubmit}>
          <div className="formbox">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Name
              </label>
              <input
                type="text"
                disabled={!localStorage.getItem("token")}
                className="form-control"
                id="name"
                name="name"
                value={credincials.name}
                onChange={onchange}
                style={{ width: "60vmin" }}
                placeholder="User Name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="text"
                disabled={!localStorage.getItem("token")}
                className="form-control"
                id="email"
                name="email"
                onChange={onchange}
                value={credincials.email}
                style={{ width: "60vmin" }}
                aria-describedby="emailHelp"
                placeholder="User Email Address"
              />
            </div>
          </div>

          <div className="formbox">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label" style={{marginBottom:"-3vmin"}}  >
                Eduaction
              </label>
              <br />
              <select
                value={education}
                onChange={handledropedu}
                style={{
                  width: "60vmin",
                  padding: ".375rem .75rem",
                  borderRadius: "1vmin",
                  border: "1px solid #dee2e6",
                }}
                disabled={!localStorage.getItem("token")}
              >
                <option value="">Education</option>
                <option value="B.E.">B.E.</option>
                <option value="B.TECH.">B.TECH.</option>
                <option value="M.E.">M.E.</option>
                <option value="M.TECH">M.TECH</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                University
              </label>
              <input
                type="text"
                disabled={!localStorage.getItem("token")}
                className="form-control"
                id="university"
                name="university"
                value={credincials.university}
                onChange={onchange}
                style={{ width: "60vmin" }}
                placeholder="Mumbai University"
              />
            </div>
          </div>

          <div className="formbox">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label" style={{marginBottom:"-3vmin"}}>
                Domain
              </label>
              <br />
              <select
                value={domain}
                onChange={handledropdomain}
                style={{
                  width: "60vmin",
                  padding: ".375rem .75rem",
                  borderRadius: "1vmin",
                  border: "1px solid #dee2e6",
                }}
                disabled={!localStorage.getItem("token")}
              >
                <option value="">Domain</option>
                <option value="Full Satck Developer">
                  Full Stack Developer
                </option>
                <option value="AI/ML">AI/ML</option>
                <option value="Frontend Developer">
                  Frontend Developer
                </option>
                <option value="Backend Developer">Backend Developer</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Experience
              </label>
              <br />
              <input
                type="text"
                disabled={!localStorage.getItem("token")}
                className="form-control"
                id="experience"
                name="experience"
                value={credincials.experience}
                onChange={onchange}
                style={{ width: "60vmin" }}
                placeholder="Years Of Experinece"
              />
            </div>
          </div>
          <div className="formbox">
          <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                About You
              </label>
              <input
                type="text"
                disabled={!localStorage.getItem("token")}
                className="form-control"
                id="aboutyou"
                name="aboutyou"
                value={credincials.aboutyou}
                onChange={onchange}
                style={{ width: "60vmin" }}
                placeholder="About You"
              />
            </div>
          </div>
          <div className="formbox">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Skills{" "}
                <i
                  className="fa-solid fa-plus mx-2"
                  style={{ cursor: "pointer" }}
                  onClick={handleSkills}
                ></i>
              </label>
              <div
                id="skillsInput"
                className="d-flex align-item-center justify-content-start flex-wrap"
                style={{ width: "100%" }}
              >
                {Skills.map((skill, index) => (
                  <input
                    key={index}
                    type="text"
                    className="form-control  mx-2 "
                    name="skills"
                    value={skill}
                    onChange={(e) => onchangeSkils(index, e)}
                    placeholder="html experince"
                    style={{ width: "60vmin", marginBottom: "10px" }}
                    disabled={!localStorage.getItem("token")}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="formbox">
            <div className="mb-3 row">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Projects{" "}
                <i
                  className="fa-solid fa-plus mx-2"
                  style={{ cursor: "pointer" }}
                  onClick={handleProject}
                ></i>
              </label>
              <div
                id="projectInput"
                className="d-flex align-item-center justify-content-start flex-wrap col-md-3"
                style={{ width: "130vmin" }}
              >
                {project.map((project, index) => (
                  <>
                    <React.Fragment >
                      <input
                        key={`${index}-title`}
                        type="text"
                        className="form-control "
                        name="title"
                        value={project.title}
                        onChange={(e) => onchangeproject(index, e)}
                        placeholder="Project Title"
                        style={{ width: "40vmin", marginBottom: "10px" }}
                        disabled={!localStorage.getItem("token")}
                      />
                      <input
                        key={`${index}-description`}
                        type="text"
                        className="form-control "
                        name="description"
                        value={project.description}
                        onChange={(e) => onchangeproject(index, e)}
                        placeholder="Project description"
                        style={{ width: "40vmin", marginBottom: "10px", marginLeft: "10px" }}
                        disabled={!localStorage.getItem("token")}
                      />
                      <input
                        key={`${index}-Projectlink`}
                        type="text"
                        className="form-control "
                        name="Projectlink"
                        value={project.Projectlink}
                        onChange={(e) => onchangeproject(index, e)}
                        placeholder="Project link"
                        style={{ width: "40vmin", marginBottom: "10px", marginLeft: "10px" }}
                        disabled={!localStorage.getItem("token")}
                      />
                    </React.Fragment>
                  </>
                ))}
              </div>
            </div>
          </div>

          <div className="formbox">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                LinkedinURL
              </label>
              <input
                type="text"
                disabled={!localStorage.getItem("token")}
                className="form-control"
                id="LinkedinURL"
                name="LinkedinURL"
                value={credincials.LinkedinURL}
                onChange={onchange}
                style={{ width: "60vmin" }}
                placeholder="User LinkedinURL"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                GithubURL
              </label>
              <input
                type="text"
                disabled={!localStorage.getItem("token")}
                className="form-control"
                id="GithubURL"
                name="GithubURL"
                value={credincials.GithubURL}
                onChange={onchange}
                style={{ width: "60vmin" }}
                placeholder="User GithubURL"
              />
            </div>
          </div>

          <div className="formbox">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Profile Image
              </label>
              <input
                accept="image/*"
                type="file"
                disabled={!localStorage.getItem("token")}
                className="form-control"
                id="img"
                name="img"
                onChange={onchangeImg}
                style={{ width: "60vmin" }}
                placeholder="User Profile Image"
              />
              <p
                className="fs-6 fw-light"
                style={{ letterSpacing: "0.2vmin" }}
              >
              </p>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Resume
              </label>
              <input
                type="file"
                disabled={!localStorage.getItem("token")}
                className="form-control"
                id="resume"
                name="resume"
                onChange={onchangeResume}
                style={{ width: "60vmin" }}
                placeholder="User Resume"
              />
              <p
                className="fs-6 fw-light"
                style={{ letterSpacing: "0.2vmin" }}
              >
              </p>
            </div>
          </div>
        <button type="submit" className="btn btn-primary submitbtn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Home;
