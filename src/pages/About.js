import React, { Component } from "react";
import "./About.css";
import profile_pic from "../assets/pranish.png";

export default class About extends Component {
  render() {
    return (
      <div>
         <div>
    <div class="split left">
      <div className="centered">
        <img 
          className="profile_image"
          // Image goes here
          alt="Profile Pic"
          src={profile_pic}
          ></img>
      </div>
    </div>
    <div className="split right">
      <div className="centered">
        <div className="name_title">Pranish Pantha</div>
        <div className="brief_description">
          Student at UNC Chapel Hill Studying Computer Science and Business
        </div>
      </div>
    </div>
  </div>
      </div>
    );
  }
}
