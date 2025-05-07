import styles from "./SignUp.module.css";
import Button from "../../components/Button/Button.jsx";
import { useRef, useState } from "react";
import useSignUpValidation from "../../hooks/useSignUpValidation.js";
import useAuth from "../../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { database } from "../../../FirebaseConfig.js";

const SignUp = () => {
  // Declare states and refs
  const [signUpFormData, setSignUpFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    profilePicture: null,
    previewUrl: "",
  });
  const fileInputRef = useRef(null);

  // Validation function
  const { validate, errors } = useSignUpValidation();

  // User sign up function
  const { signUp, signUpError } = useAuth();

  // Redirection
  const navigate = useNavigate();

  // Retrive values of input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignUpFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Retrive image file and create tmp url
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const previewUrl = URL.createObjectURL(file);
      setSignUpFormData((prevDetails) => ({
        ...prevDetails,
        profilePicture: file,
        previewUrl,
      }));
      console.log("Selected file: ", file);
    } else {
      setSignUpFormData((prevDetails) => ({
        ...prevDetails,
        profilePicture: null,
        previewUrl: null,
      }));
    }
  };

  // Remove image
  const handleRemoveImage = () => {
    setSignUpFormData((prevDetails) => ({
      ...prevDetails,
      profilePicture: null,
      previewUrl: null,
    }));
    fileInputRef.current.value = "";
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate(signUpFormData)) {
      console.log("Form submit failed");
      return;
    }

    try {
      const userCredentials = await signUp(
        signUpFormData.email,
        signUpFormData.password
      );
      const user = userCredentials.user;
      console.log("Account was created successfully", userCredentials.user);

      await setDoc(doc(database, "users", user.uid), {
        uid: user.uid,
        firstname: signUpFormData.firstname,
        lastname: signUpFormData.lastname,
        email: user.email,
        dateOfBirth: signUpFormData.dateOfBirth || "",
        profilePicture: null,
        createdAt: serverTimestamp(),
      });

      navigate("/verify-email");

      console.log("User added to the Firestore database");

      setSignUpFormData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        dateOfBirth: "",
        profilePicture: "",
        previewUrl: "",
      });
      fileInputRef.current.value = "";
    } catch (error) {
      console.log("Could not create user"), error.message;
    }
  };

  return (
    <div className={styles.formWrapper}>
      <form className={styles.signUpForm} noValidate onSubmit={handleSubmit}>
        <h2>Sign-Up Form</h2>
        <fieldset className={styles.formGroup}>
          <legend className={styles.FormGroupTitle}>
            Personal Information
          </legend>
          {/* ------- */}
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Enter your firstname"
            className={styles.formInput}
            maxLength={50}
            onChange={handleInputChange}
            value={signUpFormData.firstname}
          />
          {errors && <p className={styles.errorMessage}>{errors.firstname}</p>}
          {/* ------- */}
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Enter your lastname"
            className={styles.formInput}
            maxLength={50}
            onChange={handleInputChange}
            value={signUpFormData.lastname}
          />
          {errors && <p className={styles.errorMessage}>{errors.lastname}</p>}
          {/* ------- */}
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            className={styles.formInput}
            onChange={handleInputChange}
            value={signUpFormData.dateOfBirth}
          />
          {errors && (
            <p className={styles.errorMessage}>{errors.dateOfBirth}</p>
          )}

          {/* ------- */}
          <label htmlFor="profilePicture">Profile Picture</label>
          <input
            type="file"
            name="profilePicture"
            id="profilePicture"
            className={styles.formInput}
            accept=".jpg, .jpeg, .png, .webp"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          {signUpFormData.previewUrl && (
            <div className={styles.imagePreviewContainer}>
              <img
                src={signUpFormData.previewUrl}
                alt="Profile picture preview"
                className={styles.imagePreview}
              />
              <button
                className={styles.removeImageButton}
                onClick={handleRemoveImage}
              >
                Remove photo
              </button>
            </div>
          )}
        </fieldset>

        <fieldset className={styles.formGroup}>
          <legend className={styles.FormGroupTitle}>Account details</legend>
          {/* ------- */}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            className={styles.formInput}
            maxLength={50}
            onChange={handleInputChange}
            value={signUpFormData.email}
          />
          {errors && <p className={styles.errorMessage}>{errors.email}</p>}
          {/* ------- */}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            className={styles.formInput}
            maxLength={50}
            onChange={handleInputChange}
            value={signUpFormData.password}
          />
          {errors && <p className={styles.errorMessage}>{errors.password}</p>}

          {/* ------- */}
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Re-enter your confirmPassword"
            className={styles.formInput}
            maxLength={50}
            onChange={handleInputChange}
            value={signUpFormData.confirmPassword}
          />
          {errors && (
            <p className={styles.errorMessage}>{errors.confirmPassword}</p>
          )}
        </fieldset>
        <Button className={styles.createAccountButton}>Create Account</Button>
      </form>
    </div>
  );
};

export default SignUp;
