import React, { useState, useRef, useEffect } from "react";
import { BsPerson } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { PiLetterCircleVFill } from "react-icons/pi";function TopBar() {
  const [showCard, setShowCard] = useState(false);
  const cardRef = useRef(null);
  const navigate = useNavigate();

  const handleAccount = () => {
    setShowCard(!showCard);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setShowCard(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cardRef]);
  const handleLogout = () => {
    navigate("/");
  };
  return (
    <>
      <div className=" top-bar">
       
          <li
            style={{ fontSize: "20px", cursor: "pointer" }}
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            <b>Dashboard</b>
          </li>
          <li
            style={{ fontSize: "20px", }}
            onClick={handleAccount}
          >
            <BsPerson />
            <MdKeyboardArrowDown />
          </li>
       
      </div>
      {showCard && (
        <div
          ref={cardRef}
          className="card"
          style={{
            position: "absolute",
            top: "100%",
            right: "0",
            zIndex: "1000",
            padding:'20px',
            height:'100px',
            width:'200px',
          }}
        >
          <div className="row">
            <span>
              <b> <PiLetterCircleVFill  style={{ fontSize: '34px' }} /> Vijayalakshmi</b>
            </span>
          </div>
          <div className="row">
            {" "}
            <button
              onClick={handleLogout}
              variant="outline-light"
              className="btn btn-light"
            >
              <FiLogOut /> Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default TopBar;
