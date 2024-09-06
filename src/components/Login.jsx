import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Frame_4.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const initialState = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const validate = () => {
    const newErrors = {};

    if (!formData.password) {
      newErrors.password = "Please enter a valid password";
    }
    if (!formData.email) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (validate()) {
        const response = await fetch(
          "https://coreapi.hectorai.live/api/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        if (response.ok) {
          console.log("toast start");

          toast.success("Login successful!");
          console.log("toast end");

          const data = await response.json();
          // Store the JWT token in localStorage
          localStorage.setItem("jwtToken", data.token);
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        } else {
          const errMessage = await response.json();
          toast.error(errMessage.message || "Login failed!");
          console.log(errMessage);
        }
      }
    } catch {
      toast.error("An error occurred during login.");
      console.log("An Error has occured.");
    }
  };
  const navigate = useNavigate();

  return (
    <>
      <div className="login-page">
        <div className="logo-div bg-transparent b-none">
          <img src={logo} alt="logo" srcset="" width={"50px"} height={"50px"} />
          <span className=" ">
            <b>TECHSAVVY</b>
          </span>
        </div>
        <div className="card form-container">
          <div className="heading">
            <h1>Welcome Back!</h1>
          </div>
          <form onSubmit={handleLogin}>
            <div className="input-container">
              <label htmlFor="email" className="">
                <span style={{ fontSize: "small" }}>Email</span>{" "}
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={handleChange}
                name="email"
                className="input-field"
                placeholder="Email"
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="input-container">
              <label htmlFor="password">
                <span style={{ fontSize: "small" }}>Password</span>
              </label>
              <input
                placeholder="Password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                name="password"
                className="input-field"
              />
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>
            <div className="input-container">
              <button id="login-button">Sign in</button>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default Login;
