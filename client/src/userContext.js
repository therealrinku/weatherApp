import React from "react";

const UserContext = React.createContext({
  userEmail: "",
  userAccessToken: "",
});

export default UserContext;
