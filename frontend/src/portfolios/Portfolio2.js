import React, { useContext, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useParams } from 'react-router-dom';
import Datacontext from "../context/data/Datacontext";
import demo from "./demo.jpg"
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
    <div className='body'>
      <header className='navbar navbar-expand-lg header'>
        <div className="container">
          <div>
            <h1 style={{ color: "black", fontSize: "4vmin" }}>{userdata.name ? userdata.name : "Your Name"}</h1>
            <p style={{ textAlign: "start",color:"black"}}>{userdata.Domain}</p>
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
              <img src={userdata.image ? userdata.image : demo} alt="Your Photo" className="profile-pic" style={{ marginRight: "1vmin" }} />
              <p>
                I am a passionate software engineer specializing in web development,
                with expertise in creating dynamic and responsive websites. My focus
                is on delivering high-quality solutions that solve real-world problems.
                I have completed my  {userdata.education ? userdata.education : "B.E"} degree
                from {userdata.university ? userdata.university : "Mumbai University"} and I
                have work experience of {userdata.experience ? userdata.experience : "1"} {userdata.experience > 1 ? "Years" : "Year"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="skills">
        <div className="container">
          <h2>Skills</h2>
          <div className="skills-grid">
            {userdata.Skills && userdata.Skills.length > 0 ? (
              userdata.Skills.map((skill) => <div className='skill'>{skill}</div>)
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
              userdata.project && userdata.project.length > 0 ?
                (
                  userdata.project.map((proj) => (
                    <div className="project-cards">
                      <h3>{proj.title}</h3>
                      <p>{proj.description}</p>
                      <a href={proj.Projectlink} target="_blank" className="btn">View Project</a>
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
            <input value={userdata.email} name="to_email" style={{ display: "none" }}></input>
            <input value={userdata.name} name="to_name" style={{ display: "none" }}></input>
            <input type="text" placeholder="Your Name" name="from_name" required />
            <input type="email" placeholder="Your Email" name="from_email" required />
            <textarea placeholder="Your Message" required name='message'></textarea>
            <button type="submit" className="btn">Send Message</button>
          </form>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", marginTop: '2vmin' }}>
            <a href={userdata.LinkedinURL}>Linkindin</a>
            <a href={userdata.GithubURL}>Github</a>
            <a href={userdata.resume ? userdata.resume : (demo)} target="_blank" rel="noopener noreferrer">Resume</a>
          </div>
        </div>
      </section>

      <footer>
        <p>&copy; 2024 {userdata.name}. Designed with ❤️</p>
      </footer>
    </div>
  )
}

export default Portfolio2