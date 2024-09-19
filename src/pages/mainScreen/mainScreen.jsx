import React from "react";
import "./mainScreen.css";
import Form from "../../components/form/Form";
import copyright from "../../images/copyright.png";

const MainScreen = () => {
  return (
    <div className="mainContainer">
      <div className="container">
        <p className="heading">
          Novelgene <span style={{ color: "#385E37" }}>Technologies</span>
        </p>
        <p className="tagline">
          Advancing Metagenomics with Precision-Engineered Solutions.{" "}
        </p>
        <p className="about">
          Welcome to our comprehensive metagenomic analysis pipeline, designed
          to streamline the classification and functional annotation of
          microbial communities.
        </p>
        <p className="description">
          <span style={{ color: "red", fontWeight: "600" }}>Note</span> - To
          begin, please upload your dataset files. Click 'Choose File' to select
          files from your computer. Ensure that your files are in the correct
          format and do not exceed the maximum size limit (10 GB). Once your
          files are uploaded, review the file details and confirm before
          proceeding. After confirming all details, click the 'Submit' button.
          Upon submitting, you will receive an email with two links: one to
          start the analysis and another to cancel the process. Once the
          analysis is complete, we'll send you a link to download the results.
        </p>
        <Form />
        <div className="footer">
          <p className="middleText">Novelgene Technologies Private Limited</p>
          <div className="copyrightContainer">
            <img src={copyright} className="copyright" alt="" />
            <p className="middleText">
              2024 Novelgene Technologies All rights reserved{" "}
            </p>
          </div>
          <p className="middleText">info@novelgenetech.com</p>
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
