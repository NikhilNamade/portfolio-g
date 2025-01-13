import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Datacontext from "../context/data/Datacontext";
import demo from "./demo.jpg"
const Portfolio1 = () => {
  const { fetchdata, userdata } = useContext(Datacontext);
  const { userId } = useParams()
  useEffect(() => {
    fetchdata(userId)
  }, [])
  return (
    <div>
      <header>
        <img src={userdata.image ? userdata.image : demo} alt="Profile Photo" />
        <h1>{userdata.name ? userdata.name : "Your Name"}</h1>
        <p>{userdata.Domain ? userdata.Domain +" | " + userdata.university + " | " + userdata.education + " |  Experience of " + userdata.experience + (userdata.experience > 1 ? "Years":"Year")   : "Frontend Developer | Problem Solver"}</p>
      </header>
      <nav>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>
      <section id="skills">
        <h2>Skills</h2>
        <ul>
          {userdata.Skills ? (
            userdata.Skills.map((skill) => <li>{skill.toUpperCase()}</li>)
          ) : "Skills Required"}
        </ul>
      </section>
      <section id="projects">
        <h2>Projects</h2>
        <ul>
        {userdata.project?(
          userdata.project.map((proj)=>
            (<li>
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
        <p style={{color:"#0D6EFD"}}>Email : {userdata.email}</p>
        <p><a href={userdata.LinkedinURL?userdata.LinkedinURL:("https://linkedin.com/in/yourusername")}>LinkedIn</a></p>
        <p><a href={userdata.GithubURL?userdata.GithubURL:("https://github.com/yourusername")}>GitHub</a></p>
        <p><a href={userdata.resume?userdata.resume:(demo)}  target="_blank" rel="noopener noreferrer">Resume</a></p>
      </section>
    </div>
  )
}

export default Portfolio1