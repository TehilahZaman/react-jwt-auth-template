// src/services/authService.js

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth`;

// 1. need formData from the signUp form copmonent
// when do wwe want to call this function ?  - when the user submits the sign up form
// where do we want it ? - call it in sign up - in handle submit 
    // could also be called in app.jsx and passed as a prop 

const signUp = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/sign-up`, {
      method: "POST",
      // telling the server, we are sending json
      headers: { "Content-Type": "application/json" },
      // makes formData json string
      body: JSON.stringify(formData),
    });
    // server creates payload for token and token
    // and responds with the token

    // parse the data
    const data = await res.json();

    if (data.err) {
        // throw new error jumps straight to the catch block 
      throw new Error(data.err);
    }

    // the data has a token
    // we store it in local storage
    //- where we can store key/value pairs
    // key: "token", value: data.token
    if (data.token) {
      localStorage.setItem("token", data.token);
      // this takes the token payload, opens it,  decodes it, and splits it so we can look at it
      // inside the payload is the username and _id
      return JSON.parse(atob(data.token.split(".")[1])).payload;
    }

    throw new Error("Invalid response from server");
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export { signUp };
