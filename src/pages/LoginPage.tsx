import React from "react";
import Login from "../components/Login";

const LoginPage: React.FC = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh",}}>
      <Login />
    </div>
  );
};

export default LoginPage;