import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-rg1xwvj44wl04jbz.us.auth0.com"
     //domain="http://localhost:8000"
     //clientId="RXlGXkr49Ev5MHpvAC6vKkZ4bVn11iwl"
      clientId="TNMfEmtrj8v23fvfmqAMsBKNFT6dGSqV"
     authorizationParams={{
       //redirect_uri: "https://full-stack-real-estate-youtube-sooty.vercel.app"https://dev-n4h6byrcjwasuswo.us.auth0.com/api/v2/
      redirect_uri: "https://homyz-estate.xyz"
     }}
     audience="https://homyz-estate.xyz"
     scope="openid profile email"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
