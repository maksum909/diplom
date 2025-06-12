import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-n4h6byrcjwasuswo.us.auth0.com"
     //domain="http://localhost:8000"
     //clientId="RXlGXkr49Ev5MHpvAC6vKkZ4bVn11iwl"
      clientId="ZPjCNx5vEgkbX2YPTEk9hEcepRspuqVV"
     authorizationParams={{
       //redirect_uri: "https://full-stack-real-estate-youtube-sooty.vercel.app"https://dev-n4h6byrcjwasuswo.us.auth0.com/api/v2/
      redirect_uri: "http://localhost:5173"
     }}
     audience="http://localhost:8000"
     scope="openid profile email"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
