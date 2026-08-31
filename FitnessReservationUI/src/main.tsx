import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import "bootstrap/dist/css/bootstrap.min.css";

import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "./msalInstance";

msalInstance.initialize().then(() => {
    ReactDOM.createRoot(
        document.getElementById("root")!
    ).render(
        <React.StrictMode>
            <MsalProvider instance={msalInstance}>
                <App />
            </MsalProvider>
        </React.StrictMode>
    );
});