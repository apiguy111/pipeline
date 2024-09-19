import React, { useEffect, useState } from "react";
import "./form.css";
import Lottie from "lottie-react";
import anime from "../../images/anime.json";

const databases = [
  { label: "SILVA (for ribosomal RNA gene sequences)", value: "SILVA" },
  { label: "RefSeq (for curated reference sequences)", value: "RefSeq" },
  { label: "Greengenes (for 16S rRNA gene sequences)", value: "Greengenes" },
];

const Form = () => {
  const [jobName, setJobName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const [R1, setR1] = useState("");
  const [R2, setR2] = useState("");
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setUploadPercentage((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsLoading(false);
            setIsUploadComplete(true);
            return 100;
          }
          return prev + 0.01;
        });
      }, 10);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isSubmitLoading) {
      const interval = setTimeout(() => {
        setIsSubmitLoading(false);
        setModal(true);
      }, 3000);
      return () => clearTimeout(interval);
    }
  }, [isSubmitLoading]);

  const validateInput = (value, type) => {
    if (type === "jobName") {
      return value.length < 3 || value.length > 30
        ? "Job Name must be between 3 and 30 characters."
        : /^[a-zA-Z\s]*$/.test(value)
        ? ""
        : "Job Name can only contain letters and spaces.";
    }
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ? ""
      : "Please enter a valid email address.";
  };

  const handleInputChange = (e, type) => {
    const value = e.target.value;
    type === "jobName" ? setJobName(value) : setEmail(value);
    setErrors((prev) => ({ ...prev, [type]: validateInput(value, type) }));
  };

  const handleUploadClick = () => {
    setIsLoading(true);
    setUploadPercentage(0);
    setIsUploadComplete(false);
  };

  const handleFileChange = (e, setFileState) => {
    const file = e.target.files[0];
    if (file) setFileState(file.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const jobNameError = validateInput(jobName, "jobName");
    const emailError = validateInput(email, "email");
    if (!jobNameError && !emailError) {
      setIsSubmitLoading(true);
    } else {
      setErrors({ jobName: jobNameError, email: emailError });
    }
  };

  const handleClose = () => {
    setModal(false);
    setJobName("");
    setEmail("");
    setErrors({});
    setIsLoading(false);
    setUploadPercentage(0);
    setIsSubmitLoading(false);
    setIsUploadComplete(false);
    setR1("");
    setR2("");
  };

  return (
    <div className="formContainer">
      <p className="queue">
        Number of jobs in the queue -{" "}
        <span style={{ color: "#4AC448", fontWeight: "600" }}>2</span>
      </p>
      <div className="nameContainer">
        <p className="name">Job Name*</p>
        <input
          className="nameValue"
          placeholder="You can give a custom name to your submission"
          style={{ width: "50%" }}
          value={jobName}
          onChange={(e) => handleInputChange(e, "jobName")}
        />
        {errors.jobName && <p className="error2">{errors.jobName}</p>}
      </div>
      <div className="secondContainer">
        <div className="secondNameContainer">
          <p className="name">Email*</p>
          <input
            className="nameValue"
            placeholder="example@gmail.com"
            style={{ letterSpacing: "0.5px" }}
            value={email}
            onChange={(e) => handleInputChange(e, "email")}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="secondNameContainer">
          <span className="name">Choose database</span>
          <select className="nameValue">
            <option value="" disabled>
              Select Reference Database
            </option>
            {databases.map(({ value, label }) => (
              <option key={value} value={value} className="options">
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p className="uploadText">
        Choose any one option to upload files (either FASTA file or FASTQ files
        R1 and R2) *
      </p>
      <div className="secondContainer">
        <div className="secondNameContainer">
          <p className="name">FASTA File</p>
          <input
            className="nameValue"
            placeholder="Select Your FASTA file"
            readOnly
            disabled
            style={{ background: "#DDDDDD" }}
          />
          <label
            className="button3"
            style={{
              cursor: "default",
              background: "#A9A9A9",
            }}
          >
            Choose File
            <input type="file" disabled style={{ display: "none" }} />
          </label>
        </div>
        <div className="secondNameContainer">
          <p className="name">FASTQ File</p>
          <input
            className="nameValue"
            placeholder="Select Your FASTQ R1 file"
            readOnly
            value={R1}
          />
          <label className="button3">
            Choose File
            <input
              type="file"
              onChange={(e) => handleFileChange(e, setR1)}
              style={{ display: "none" }}
            />
          </label>
        </div>
        <div className="secondNameContainer">
          <p className="name">FASTQ File</p>
          <input
            className="nameValue"
            placeholder="Select Your FASTQ R2 file"
            readOnly
            value={R2}
          />
          <label className="button3">
            Choose File
            <input
              type="file"
              onChange={(e) => handleFileChange(e, setR2)}
              style={{ display: "none" }}
            />
          </label>
        </div>
      </div>
      <button
        className="uploadButton"
        disabled={isLoading || !R1 || !R2}
        onClick={handleUploadClick}
        style={{
          background:
            !R1 || !R2
              ? "gray"
              : `linear-gradient(
        to right, 
        #41B06E ${uploadPercentage}%, 
        #000 ${uploadPercentage}%
      )`,
          color: "white",
          position: "relative",
          cursor: !R1 || !R2 ? "default" : "pointer",
        }}
      >
        {isUploadComplete
          ? "File Uploaded"
          : isLoading
          ? `${uploadPercentage.toFixed(2)}%`
          : "Upload File"}{" "}
      </button>
      <button
        className="button2"
        onClick={handleSubmit}
        disabled={!isUploadComplete}
        style={{
          background: isUploadComplete ? "#2455d2" : "gray",
          cursor: isUploadComplete ? "pointer" : "default",
        }}
      >
        {isSubmitLoading ? <div className="loader"></div> : "Submit"}
      </button>
      {modal && (
        <>
          <div className="modalBackdrop"></div>
          <div className="modalContainer">
            <div className="lottieContainer">
              <Lottie
                animationData={anime}
                loop={false}
                className="modalImage"
              />
            </div>
            <div className="modalText">
              Your data has been successfully submitted. We will send you an
              email shortly with the download link for the results.
            </div>
            <button className="modalButton" onClick={handleClose}>
              Continue
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Form;
