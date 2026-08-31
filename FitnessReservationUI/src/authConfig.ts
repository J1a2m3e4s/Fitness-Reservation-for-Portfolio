export const msalConfig = {
    auth: {
        clientId: "f623f902-95c4-47c3-ac71-9cbedc1f6e6a",
        authority:
            "https://login.microsoftonline.com/5a12c187-c285-4bea-8b0d-bbad28317395",
        redirectUri: "http://localhost:5173"
    }
};

export const loginRequest = {
    scopes: ["User.Read"]
};