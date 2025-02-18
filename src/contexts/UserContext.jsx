// src/contexts/UserContext.jsx

import { createContext, useState } from "react";

const UserContext = createContext();

// what this does:
// if there is a token in the local storage it takes it
// and parses it
// then input token into the user state as an initial state
// otherwise it's null
function getUserFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  return JSON.parse(atob(token.split(".")[1])).payload;
}

function UserProvider({ children }) {
  // Create state just like you normally would in any other component
  // auto set to token if token exists in local storage
  const [user, setUser] = useState(getUserFromToken);

  // This is the user state and the setUser function that will update it!
  // This variable name isn't special; it's just convention to use `value`.
  const value = { user, setUser };

  return (
    <UserContext.Provider value={value}>
      {/* The data we pass to the value prop above is now available to */}
      {/* all the children of the UserProvider component. */}
      {children}
    </UserContext.Provider>
  );
}

// When components need to use the value of the user context, they will need
// access to the UserContext object to know which context to access.
// Therefore, we export it here.
export { UserProvider, UserContext };

// NOTES:
/*
in main we import userProvider and wrap App component in UserProvider component 
inside of UserConext file we create a state (user)
and deconstruct that state to = value (variable )
and pass value to UserContent.Provider component  
now all component wrapped in UserProdiver (just App)
have the props we passed in (value/ user state)

then to use value 
import UserContent in the file yo uwant to access it in 
*/
