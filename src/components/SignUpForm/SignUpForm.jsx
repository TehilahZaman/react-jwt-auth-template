// SignUpForm.jsx

import { useState, useContext } from "react";
import { useNavigate } from "react-router";

// a. the context is how you can access the global state (user)
import { UserContext } from "../../contexts/UserContext";

import { signUp } from "../../services/authService";

const SignUpForm = () => {

  //b.  consume the context !
  // her ewe can destructure setUser or user state 
  const { setUser } = useContext(UserContext)

  // navigate is a function that takes in a path
  // that we define
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConf: "",
  });

  const { username, password, passwordConf } = formData;

  const handleChange = (evt) => {
    setMessage("");
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    // always have a try/catch when using async nad await
    try {
      evt.preventDefault();
      console.log(formData); // this line will print the form data to the console
      // signup in from our authService
      const newUser = await signUp(formData);
      // c. updating the UserContext user State 
      setUser(newUser)
      console.log(newUser, "<--- new user (decoed jwt token");
    } catch (err) {
      console.loog(err);
      setMessage(err.Message);
    }
  };

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <main>
      <h1>Sign Up</h1>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="name"
            value={username}
            name="username"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="confirm">Confirm Password:</label>
          <input
            type="password"
            id="confirm"
            value={passwordConf}
            name="passwordConf"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button disabled={isFormInvalid()}>Sign Up</button>
          <button onClick={() => navigate("/")}>Cancel</button>
        </div>
      </form>
    </main>
  );
};

export default SignUpForm;
