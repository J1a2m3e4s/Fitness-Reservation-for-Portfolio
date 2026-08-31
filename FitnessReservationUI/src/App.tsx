import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useMsal } from "@azure/msal-react";

import { loginRequest } from "./authConfig";

import ReservationPage from "./pages/ReservationPage";
import MyReservationsPage from "./pages/MyReservationsPage";

function App() {
    const { instance, accounts } = useMsal();

    const login = async () => {
        await instance.loginRedirect(loginRequest);
    };

    const account =
        accounts.length > 0
            ? accounts[0]
            : null;

    if (!account) {
        return (
            <div className="container mt-5">
                <h1>Fitness Reservation</h1>

                <button
                    className="btn btn-primary"
                    onClick={login}
                >
                    Sign In With Microsoft
                </button>
            </div>
        );
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<ReservationPage />}
                />

                <Route
                    path="/myreservations"
                    element={<MyReservationsPage />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;