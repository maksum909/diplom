import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-rg1xwvj44wl04jbz.us.auth0.com"
      clientId="TNMfEmtrj8v23fvfmqAMsBKNFT6dGSqV"
     authorizationParams={{
      redirect_uri: "https://estatora.online"
     }}
     audience="https://estatora.online/api"
     scope="openid profile email"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
