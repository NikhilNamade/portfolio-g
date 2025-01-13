import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Datacontext from "../context/data/Datacontext";
const About = () => {
  const navigate = useNavigate()
  const { setShowNavbar ,fetchId,datas} = useContext(Datacontext);
  useEffect(() => {
    fetchId()
  }, [])
  return (
    <>
      <div className="bxos">
        <div className="box">
          <h1>Portfolio</h1>
          <div>
          <button className="preview" onClick={() => {setShowNavbar(false); navigate("/portfolio1")}}>Preview</button>
          <button className="select" onClick={() => {setShowNavbar(false); navigate(`/portfolio1/${datas.userId}`)}}>Select</button>
          </div>
        </div>
        <div className="box">
        <h1>Portfolio</h1>
          <div>
          <button className="preview" onClick={() => {setShowNavbar(false); navigate("/portfolio2")}}>Preview</button>
          <button className="select" onClick={() => {setShowNavbar(false); navigate(`/portfolio2/${datas.userId}`)}}>Select</button>
          </div>
        </div>
        <div className="box">
        <h1>Portfolio</h1>
          <div>
          <button className="preview" onClick={() => {setShowNavbar(false); navigate("/portfolio3")}}>Preview</button>
          <button className="select" onClick={() =>{setShowNavbar(false); navigate(`/portfolio3/${datas.userId}`)}}>Select</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
