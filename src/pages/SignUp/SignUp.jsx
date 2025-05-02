import styles from "./SignUp.module.css";

const SignUp = () => {
  // Declaring state variables
  const [signUpFormData, setSignUpFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    profilePicture: null, // Stores the actual file
    imageUrl: "", // Stores the preview URL
  });
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
          />
          <p className={styles.errorMessage}>Error</p>
          <label htmlFor="lastname">Last name</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            className={styles.formInput}
          />
          <p className={styles.errorMessage}>Error</p>
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            className={styles.formInput}
          />
          <label htmlFor="profilePicture">Profile picture</label>
          <input
            type="file"
            name="profilePicture"
            id="profilePicture"
            className={styles.formInput}
            accept=".jpg, .jpeg, .png"
          />
        </fieldset>
        <fieldset className={styles.formGroup}>
          <legend className={styles.formGroupTitle}>Account Details</legend>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className={styles.formInput}
          />
          <p className={styles.errorMessage}>Error</p>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className={styles.formInput}
          />
          <p className={styles.errorMessage}>Error</p>
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className={styles.formInput}
          />
          <p className={styles.errorMessage}>Error</p>
        </fieldset>
        <button className={styles.createAccountButton}>Create Account</button>
      </form>
    </div>
  );
};

export default SignUp;
