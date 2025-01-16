import React, { useContext, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser';
import demo from "./demo.jpg"
import Datacontext from "../context/data/Datacontext";
import { useParams } from 'react-router-dom';
const Portfolio3 = () => {
  const form = useRef();
  const { fetchdata, userdata } = useContext(Datacontext);
  const { userId } = useParams()
  useEffect(() => {
    fetchdata(userId)
  }, [])

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(process.env.REACT_APP_YOUR_SERVICE_ID, process.env.REACT_APP_YOUR_TEMPLATE_ID, form.current, {
        publicKey: process.env.REACT_APP_YOUR_USER_ID,
      })
      .then(
        () => {
          alert("Email Send SUCCESSFULLY");
        },
        (error) => {
          alert("FAILED to send eamil");
        },
      );
  };
  return (
    <div className='bodys'>
      <main className="split-layout">
        <section className="left-section">
          <div className="branding">
            <img src={userdata.image ? userdata.image : demo} />
            <h4>{userdata.name ? userdata.name : "Your Name"}</h4>
            <p>Creative Developer</p>

          </div>
          <nav className="nav-link">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#work">Work</a>
            <a href="#contact">Contact</a>
          </nav>
          <footers className="social-links">
            <a href={userdata.GithubURL} target="_blank">GitHub</a>
            <a href={userdata.LinkedinURL} target="_blank">LinkedIn</a>
            <a href={userdata.resume} target="_blank">Resume</a>
          </footers>
        </section>

        <section className="right-section">
          <div id="about" className="section-content">
            <h2>About Me</h2>
            <p>
                Hello! {userdata.aboutyou?(userdata.aboutyou):("I am a passionate software engineer specializing in web developmentwith expertise in creating dynamic and responsive websites. My focusis on delivering high-quality solutions that solve real-world problems.")}
                and I have completed my  {userdata.education ? userdata.education : "B.E"} degree
                from {userdata.university ? userdata.university : "Mumbai University"} and I
                have work experience of {userdata.experience ? userdata.experience : "1"} {userdata.experience > 1 ? "Years" : "Year"}
              </p>
          </div>

          <div id="skills" className="section-content">
            <h2 style={{ textAlign: "center" }}>Skills</h2>
            <div className="skills-grid">
              {
                userdata.Skills && userdata.Skills.length > 0 ? (
                  userdata.Skills.map((skill) => <div className='skill-card'><h5>{skill.toUpperCase()}</h5></div>)
                ) : (
                  <div className="skill-card">
                    <h3>Skills Required</h3>
                  </div>
                )
              }
            </div>
          </div>
          <div id="work" className="section-content">
            <h2>Work</h2>
            <div className="projects">
              {
                userdata.project && userdata.project.length > 0 ?
                  (
                    userdata.project.map((proj) =>
                    (
                      <div className="project-card">
                        <h3>{proj.title}</h3>
                        <p>{proj.description}</p>
                        <a href={proj.Projectlink} target="_blank" className="btn">View</a>
                      </div>
                    )
                    )
                  )
                  :
                  (
                    <div className="project-card">
                      <h3>Project A</h3>
                      <p>An innovative solution to an exciting problem.</p>
                      <a href="#" target="_blank" className="btn">View</a>
                    </div>
                  )
              }
            </div>
          </div>
          <div id="contact" className="section-content">
            <h2>Contact</h2>
            <p>Have a question or want to collaborate? Let's connect!</p>
            <form className="contact-form" ref={form} onSubmit={sendEmail}>
              <input value={userdata.email} name="to_email" style={{ display: "none" }}></input>
              <input value={userdata.name} name="to_name" style={{ display: "none" }}></input>
              <input type="text" placeholder="Your Name" name="from_name" required />
              <input type="email" placeholder="Your Email" name="from_email" required />
              <textarea placeholder="Your Message" required name='message'></textarea>
              <button type="submit" className="btn">Send Message</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Portfolio3