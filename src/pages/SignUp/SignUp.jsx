import { useState, useRef } from "react";
import styles from "./SignUp.module.css";

const SignUp = () => {
  // Declaring state variables
  const [signUpFormData, setSignUpFormData] = useState({
    id: null,
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    profilePicture: null,
    previewUrl: "",
  });
  const [signUpErrors, setSignUpErros] = useState(null);
  const fileInputRef = useRef(null);
  // Retrieving the input values except the file input
  const handleInputChange = (e) => {
    if (e.target.type === "file") return;
    const { name, value } = e.target;
    setSignUpFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  // Retrieving the image and creating a temporary URL
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const previewUrl = URL.createObjectURL(file);
      setSignUpFormData((prevDetails) => ({
        ...prevDetails,
        profilePicture: file,
        previewUrl: previewUrl,
      }));
      console.log("File selected:", file);
    } else {
      setSignUpFormData((prevDetails) => ({
        ...prevDetails,
        profilePicture: null,
        previewUrl: null,
      }));
    }
  };
  // Removing the selected image
  const handleRemoveImage = () => {
    setSignUpFormData((prevDetails) => ({
      ...prevDetails,
      profilePicture: null,
      previewUrl: null,
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clears file input
    }
  };
  return (
    <div className={styles.formWrapper}>
      <form className={styles.signUpForm}>
        <h1>Sign-up Form</h1>
        <fieldset className={styles.formGroup}>
          <legend className={styles.formGroupTitle}>
            Personal Information
          </legend>
          <label htmlFor="firstname">First name</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            className={styles.formInput}
            placeholder="Enter your first name"
            value={signUpFormData.firstname}
            onChange={handleInputChange}
          />
          {signUpErrors && <p className={styles.errorMessage}>Error</p>}
          <label htmlFor="lastname">Last name</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            className={styles.formInput}
            placeholder="Enter your last name"
            value={signUpFormData.lastname}
            onChange={handleInputChange}
          />
          {signUpErrors && <p className={styles.errorMessage}>Error</p>}
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            className={styles.formInput}
            value={signUpFormData.dateOfBirth}
            onChange={handleInputChange}
          />
          <label htmlFor="profilePicture">Profile picture</label>
          <input
            type="file"
            name="profilePicture"
            id="profilePicture"
            className={styles.formInput}
            accept=".jpg, .jpeg, .png"
            onChange={handleImageChange}
            ref={fileInputRef}
          />
          {signUpFormData.previewUrl && (
            <div className={styles.imagePreviewContainer}>
              <img
                src={signUpFormData.previewUrl}
                alt="Recipe Preview"
                className={styles.imagePreview}
              />
              <button
                type="button"
                className={styles.removeImageButton}
                onClick={handleRemoveImage}
              >
                Remove Photo
              </button>
            </div>
          )}
        </fieldset>
        <fieldset className={styles.formGroup}>
          <legend className={styles.formGroupTitle}>Account Details</legend>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className={styles.formInput}
            placeholder="Enter your email address"
            value={signUpFormData.email}
            onChange={handleInputChange}
          />
          {signUpErrors && <p className={styles.errorMessage}>Error</p>}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className={styles.formInput}
            placeholder="Create a strong password (min 8 characters)"
            value={signUpFormData.password}
            onChange={handleInputChange}
          />
          {signUpErrors && <p className={styles.errorMessage}>Error</p>}
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className={styles.formInput}
            placeholder="Re-enter your password"
            value={signUpFormData.confirmPassword}
            onChange={handleInputChange}
          />
          {signUpErrors && <p className={styles.errorMessage}>Error</p>}
        </fieldset>
        <button className={styles.createAccountButton}>Create Account</button>
      </form>
    </div>
  );
};

export default SignUp;
