import { useEffect, useState } from "react";
import api from "../services/api";
import type { Reservation } from "../types/Reservation";
import { Link } from "react-router-dom";
import { useMsal } from "@azure/msal-react";

function MyReservationsPage() {
    const { accounts } = useMsal();
    const currentUser = accounts.length > 0 ? accounts[0] : null;

    const [reservations, setReservations] = useState<Reservation[]>([]);

    const loadReservations = async () => {
        try {
            if (!currentUser?.name) return;

            const response = await api.get(
                `/reservations/user/${encodeURIComponent(
                    currentUser.name
                )}`
            );

            setReservations(response.data);
        }
        catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        if (currentUser?.name) {
            loadReservations();
        }
    }, [currentUser?.name]);

    const cancelReservation = async (id: number) => {

        const confirmed = window.confirm(
            "Are you sure you want to cancel this reservation?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await api.delete(`/reservations/${id}`);

            await loadReservations();

            alert("Reservation cancelled successfully.");
        }
        catch (error) {
            console.error(error);

            alert("Failed to cancel reservation.");
        }
    };
    const mergedReservations = [];

    const sortedReservations = [...reservations]
        .sort(
            (a, b) =>
                new Date(a.startTime).getTime() -
                new Date(b.startTime).getTime()
        );

    for (const reservation of sortedReservations) {

        const last =
            mergedReservations[
                mergedReservations.length - 1
            ];

        if (
            last &&
            last.keyNumber === reservation.keyNumber &&
            last.name === reservation.name &&
            last.department === reservation.department &&
            new Date(last.endTime).getTime() ===
            new Date(reservation.startTime).getTime()
        ) {
            last.endTime =
                reservation.endTime;
        }
        else {
            mergedReservations.push({
                ...reservation
            });
        }
    }

    return (
        <div className="container mt-4">
            <h1 className="mb-4">My Reservations</h1>
            <h5 className="text-muted mb-4">
                {currentUser?.name}
            </h5>
            <div className="text-center mb-4">
                <Link
                    to="/"
                    className="btn btn-outline-secondary"
                >
                    Back to Reservation Page
                </Link>
            </div>

            {mergedReservations.map(r => (

                <div
                    key={r.id}
                    className="card mb-3"
                >
                    <div className="card-body">

                        <h5 className="card-title">
                            Key {r.keyNumber}
                        </h5>

                        <p className="mb-1">
                            <strong>Name:</strong> {r.name}
                        </p>

                        <p className="mb-1">
                            <strong>Department:</strong> {r.department}
                        </p>

                        <p className="mb-2">
                            <strong>Date:</strong>{" "}
                            {new Date(r.startTime).toLocaleDateString()}
                        </p>

                        <p className="mb-3">
                            <strong>Time:</strong>{" "}
                            {new Date(r.startTime).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false
                            })}
                            {" - "}
                            {new Date(r.endTime).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false
                            })}
                        </p>

                        <button
                            className="btn btn-danger"
                            onClick={() => cancelReservation(r.id)}
                        >
                            Cancel Reservation
                        </button>

                    </div>
                </div>

            ))}

        </div>
    );
}

export default MyReservationsPage;