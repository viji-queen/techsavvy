import React, { useState, useRef } from "react";
import logo from "../../assets/Frame_4.png";
import dashoboard_icon from "../../assets/dashboard_icon.png";
import { FaRegCompass } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SideBar = () => {

  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
  <div>
  <div
      className={`sidebar ${isExpanded ? 'expanded' : ''}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <li className="card-header bg-white">
        <img src={logo} alt="logo" className="logo " />
        {isExpanded && <span className=" menu-item">TECHSAVVY</span>}
      </li>
      <li className="my-4" >
        <img src={dashoboard_icon} alt="logo" className="logo " />
        {isExpanded && (
          <span className="menu-item p-2" style={{backgroundColor:'#C7B8EA', borderRadius:'5px', color:'#660066', textDecoration:'none'}}>
           Dashboard
          </span>
        )}
      </li>
    </div>
  </div>
    </>
  );
};

export default SideBar;
