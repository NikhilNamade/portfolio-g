import React, { useContext, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useParams } from 'react-router-dom';
import Datacontext from "../context/data/Datacontext";
import demo from "./demo.jpg"
import "./portfolio2.css";
const Portfolio2 = () => {
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
        publicKey:process.env.REACT_APP_YOUR_USER_ID,
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
    <div className='portfolio2-container'>
      <header className='header'>
        <div className="container">
          <div>
            <h1>{userdata.user.name ? userdata.user.name : "Your Name"}</h1>
            <p>{userdata.user.Domain}</p>
          </div>
          <nav>
            <ul className="nav-links">
              <li><a href="#about">About</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <section id="about">
        <div className="container">
          <div className="about-content">
            <h2>About Me</h2>
            <div>
              <img src={userdata.user.image ? userdata.user.image : demo} alt="Your Photo" className="profile-pic" style={{ marginRight: "1vmin" }} />
              <p>
                {userdata.user.aboutyou?(userdata.user.aboutyou):("I am a passionate software engineer specializing in web developmentwith expertise in creating dynamic and responsive websites. My focusis on delivering high-quality solutions that solve real-world problems.")}
                and I have completed my  {userdata.user.education ? userdata.user.education : "B.E"} degree
                from {userdata.user.university ? userdata.user.university : "Mumbai University"} and I
                have work experience of {userdata.user.experience ? userdata.user.experience : "1"} {userdata.user.experience > 1 ? "Years" : "Year"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="skills">
        <div className="container">
          <h2>Skills</h2>
          <div className="skills-grid">
            {userdata.user.Skills && userdata.user.Skills.length > 0 ? (
              userdata.user.Skills.map((skill, index) => <div key={index} className='skill'>{skill}</div>)
            ) : (
              <div className='skill'>
                Skills Are Required
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="projects">
        <div className="container">
          <h2>Projects</h2>
          <div className="projects-grid">
            {
              userdata.user.project && userdata.user.project.length > 0 ?
                (
                  userdata.user.project.map((proj, index) => (
                    <div key={index} className="project-cards">
                      <h3>{proj.title}</h3>
                      <p>{proj.description}</p>
                      <a href={proj.Projectlink} target="_blank" rel="noopener noreferrer" className="btn">View Project</a>
                    </div>
                  ))
                ) :
                (
                  <div className="project-cards">
                    <h3>Project Title</h3>
                    <p>A brief description of your project goes here.</p>
                    <a href="#" target="_blank" className="btn">View Project</a>
                  </div>
                )
            }
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="container">
          <h2>Contact</h2>
          <form className="contact-form" ref={form} onSubmit={sendEmail}>
            <input value={userdata.user.email} name="to_email" style={{ display: "none" }}></input>
            <input value={userdata.user.name} name="to_name" style={{ display: "none" }}></input>
            <input type="text" placeholder="Your Name" name="from_name" required />
            <input type="email" placeholder="Your Email" name="from_email" required />
            <textarea placeholder="Your Message" required name='message'></textarea>
            <button type="submit" className="btn">Send Message</button>
          </form>
          <div className="contact-links">
            <a href={userdata.user.LinkedinURL}>LinkedIn</a>
            <a href={userdata.user.GithubURL}>GitHub</a>
            <a href={userdata.user.resume ? userdata.user.resume : (demo)} target="_blank" rel="noopener noreferrer">Resume</a>
          </div>
        </div>
      </section>

      <footer>
        <p>&copy; 2024 {userdata.user.name}. Designed with ❤️</p>
      </footer>
    </div>
  )
}

export default Portfolio2