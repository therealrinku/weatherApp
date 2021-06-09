import React from "react";

const UserContext = React.createContext({
  userEmail: "",
  setUserEmail: () => {},
  userAccessToken: "",
  setUserAccessToken: () => {},
});

export default UserContext;
