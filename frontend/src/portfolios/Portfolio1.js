import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Datacontext from "../context/data/Datacontext";
import demo from "./demo.jpg"
import "./portfolio1.css";
const Portfolio1 = () => {
  const { fetchdata, userdata } = useContext(Datacontext);
  const { userId } = useParams()
  useEffect(() => {
    fetchdata(userId)
  }, [])
  return (
    <div className="portfolio1-container">
      <header>
        <img src={userdata.user.image ? userdata.user.image : demo} alt="Profile Photo" />
        <h1>{userdata.user.name ? userdata.user.name : "Your Name"}</h1>
        <p>{userdata.user.Domain ? userdata.user.Domain +" | " + userdata.user.university + " | " + userdata.user.education + " |  Experience of " + userdata.user.experience + (userdata.user.experience > 1 ? "Years":"Year")   : "Frontend Developer | Problem Solver"}</p>
      </header>
      <nav>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>
      <section id="skills">
        <h2>Skills</h2>
        <ul>
          {userdata.user.Skills ? (
            userdata.user.Skills.map((skill, index) => <li key={index}>{skill.toUpperCase()}</li>)
          ) : "Skills Required"}
        </ul>
      </section>
      <section id="projects">
        <h2>Projects</h2>
        <ul>
        {userdata.user.project?(
          userdata.user.project.map((proj, index)=>
            (<li key={index}>
              <p>
              <a href={proj.Projectlink}>{proj.title}</a> - {proj.description}
            </p>
            </li>)
          )
        ):(<p><a href="https://github.com/yourusername/project1">Project 1</a> - A description of your project.</p>)}
      
        </ul>
        </section>
      <section id="contact">
        <h2>Contact</h2>
        <p style={{color:"#0D6EFD"}}>Email : {userdata.user.email}</p>
        <p><a href={userdata.user.LinkedinURL?userdata.user.LinkedinURL:("https://linkedin.com/in/yourusername")}>LinkedIn</a></p>
        <p><a href={userdata.user.GithubURL?userdata.user.GithubURL:("https://github.com/yourusername")}>GitHub</a></p>
        <p><a href={userdata.user.resume?userdata.user.resume:(demo)}  target="_blank" rel="noopener noreferrer">Resume</a></p>
      </section>
    </div>
  )
}

export default Portfolio1