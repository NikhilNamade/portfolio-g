import React, { useState } from "react";
import Datacontext from "./Datacontext";

const UseData = (props) => { // Accept props here
  const Data = []
  const [userdata,setUserdata] = useState(Data)
  const [datas, setDatas] = useState(""); // Initialize datas state as null or empty
  const [showNavbar, setShowNavbar] = useState(true);
  const fetchId = async () => {
    try {
      const response = await fetch(`https://portfolio-generator-backend-kvqx.onrender.com/api/data/fetchid`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"), // Ensure token is correct
        },
      });

      const data = await response.json();
      setDatas(data)
    } catch (error) {
      alert("Error ");
    }
  };

const fetchdata  = async (userId) =>{
  try {
    const response = await fetch(`https://portfolio-generator-backend-kvqx.onrender.com/api/data/fetch/${userId}`,{
      method: "POST",
    })
    const data = await  response.json()
    setUserdata(data)
  } catch (error) {
    alert("error");
  }
}

  return (
    <Datacontext.Provider value={{ datas, showNavbar, fetchId, setShowNavbar,fetchdata,userdata }}>
      {props.children} {/* Pass children components */}
    </Datacontext.Provider>
  );
};

export default UseData;

