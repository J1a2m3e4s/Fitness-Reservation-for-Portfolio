import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import api from "../services/api";
import type { Reservation } from "../types/Reservation";
import { Link } from "react-router-dom";
import { useMsal } from "@azure/msal-react";

function ReservationPage() {
    const { instance, accounts } = useMsal();
    const handleLogout = async () => {
        await instance.logoutPopup();
    };
    const currentUser = accounts.length > 0 ? accounts[0] : null;
    const [keys, setKeys] = useState<any[]>([]);
    const [selectedKey, setSelectedKey] = useState("");
    const [name, setName] = useState("");
    useEffect(() => {
        if (
            currentUser?.name &&
            !name
        ) {
            setName(currentUser.name);
        }
    }, [currentUser]);
    const [department, setDepartment] = useState("");
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const timeSlots = [
        "06:00-07:00",
        "07:00-08:00",
        "17:00-18:00",
        "18:00-19:00",
        "19:00-20:00",
        "20:00-21:00",
    ];
    const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
    const [reservations, setReservations] = useState<Reservation[]>([]);


    useEffect(() => {
        api.get("/keys")
            .then(res => setKeys(res.data))
            .catch(console.error);

        loadReservations();
    }, []);
    useEffect(() => {
        const savedName =
            localStorage.getItem("fitnessName");

        const savedDepartment =
            localStorage.getItem("fitnessDepartment");

        if (savedName) setName(savedName);

        if (savedDepartment)
            setDepartment(savedDepartment);
    }, []);
    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };
    const isSameDate = (
        date1: string,
        date2: Date
    ) => {
        const d1 = new Date(date1);

        return (
            d1.getFullYear() === date2.getFullYear() &&
            d1.getMonth() === date2.getMonth() &&
            d1.getDate() === date2.getDate()
        );
    };
    const isReserved = (slot: string) => {
        if (!selectedKey) {
            return false;
        }

        const [start] = slot.split("-");

        return reservations.some(r => {

            const reservationHour =
                new Date(r.startTime)
                    .toTimeString()
                    .slice(0, 5);

            return (
                r.keyNumber ===
                keys.find(
                    k => k.id === Number(selectedKey)
                )?.keyNumber

                &&

                reservationHour === start

                &&

                isSameDate(
                    r.startTime,
                    selectedDate
                )
            );
        });
    };
    const handleReserve = async () => {
        if (
            !name ||
            !department ||
            !selectedKey ||
            selectedSlots.length === 0
        ) {
            alert("Please complete all fields.");
            return;
        }
        localStorage.setItem(
            "fitnessName",
            name
        );

        localStorage.setItem(
            "fitnessDepartment",
            department
        );
        try {
            for (const slot of selectedSlots) {
                const [start, end] = slot.split("-");

                const startTime =
                    `${formatDate(selectedDate)}T${start}:00`;

                const endTime =
                    `${formatDate(selectedDate)}T${end}:00`;

                await api.post("/reservations", {
                    name,
                    department,
                    keyId: Number(selectedKey),
                    startTime,
                    endTime
                });
            }

            alert("Reservation successful!");

            setSelectedSlots([]);
            loadReservations();
        }
        catch (error) {
            console.error(error);
            alert("Reservation failed.");
        }
    };
    const getReservationForSlot = (slot: string) => {
        if (!selectedKey) return null;

        const [start] = slot.split("-");

        return reservations.find(r => {
            const reservationHour =
                new Date(r.startTime)
                    .toTimeString()
                    .slice(0, 5);

            return (
                r.keyNumber ===
                keys.find(
                    k => k.id === Number(selectedKey)
                )?.keyNumber
                &&
                reservationHour === start
                &&
                isSameDate(
                    r.startTime,
                    selectedDate
                )
            );
        });
    };
    const loadReservations = async () => {
        try {
            const response = await api.get("/reservations");
            console.log(reservations);
            setReservations(response.data);
        }
        catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="container mt-4">

            <h1 className="text-center mb-4">
                Fitness Key Reservation
            </h1>

            <div className="text-center mb-4">

                <Link
                    to="/myreservations"
                    className="btn btn-outline-primary me-2"
                >
                    My Reservations
                </Link>

                <button
                    className="btn btn-outline-danger"
                    onClick={handleLogout}
                >
                    Sign Out
                </button>

            </div>


            <div className="row">

                <div className="col-lg-3">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <div className="mb-3">
                                <label>Name</label>
                                <input
                                    className="form-control"
                                    placeholder="Enter Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label>Department</label>

                                <select
                                    className="form-select"
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                >
                                    <option value="">
                                        Select Department
                                    </option>

                                    <option>ACC&FIN</option>
                                    <option>Planning</option>
                                    <option>DMT</option>
                                    <option>HR</option>
                                    <option>AIT</option>
                                    <option>WH&LG</option>
                                    <option>Management</option>
                                    <option>QA&QC</option>
                                    <option>Sale Admin</option>
                                    <option>Sale</option>
                                    <option>Supply Chain Imp</option>
                                    <option>Supply Chain PU</option>
                                </select>
                            </div>

                            <div className="mb-3">

                                <label>Key</label>

                                <select
                                    className="form-select"
                                    value={selectedKey}
                                    onChange={(e) => setSelectedKey(e.target.value)}
                                >
                                    <option value="">
                                        Select Key
                                    </option>

                                    {keys.map(key => (
                                        <option
                                            key={key.id}
                                            value={key.id}
                                        >
                                            {key.keyNumber}
                                        </option>
                                    ))}
                                </select>

                            </div>
                        </div>
                    </div>

                </div>

                <div className="col-lg-9">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <div className="d-flex justify-content-center" style={{ width: "100%" }}>

                                <Calendar
                                    value={selectedDate}
                                    onChange={(value) =>
                                        setSelectedDate(value as Date)}
                                        className="large-calendar"
                                />

                            </div>
                            <div className="mt-4">
                                <hr />
                                <h4 className="text-center mb-3">
                                    Available Time Slots
                                </h4>

                                <div className="d-flex flex-wrap gap-2 mt-3">
                                    {timeSlots.map((slot) => {

                                        const reserved = isReserved(slot);

                                        const reservation = getReservationForSlot(slot);
                                        return (

                                            <button
                                                key={slot}
                                                type="button"
                                                style={{
                                                    width: "120px",
                                                    minHeight: "75px",
                                                    fontSize: "17px"
                                                }}


                                                disabled={reserved}

                                                className={
                                                    reserved
                                                        ? "btn btn-dark"
                                                        : selectedSlots.includes(slot)
                                                            ? "btn btn-primary"
                                                            : "btn btn-outline-primary"
                                                }

                                                onClick={() => {

                                                    if (
                                                        selectedSlots.includes(slot)
                                                    ) {
                                                        setSelectedSlots(
                                                            selectedSlots.filter(
                                                                s => s !== slot
                                                            )
                                                        );
                                                    }
                                                    else {
                                                        setSelectedSlots([
                                                            ...selectedSlots,
                                                            slot
                                                        ]);
                                                    }
                                                }}
                                            >
                                                <div>{slot}</div>

                                                {reservation && (
                                                    <>
                                                        <small>
                                                            {reservation.name}
                                                        </small>

                                                        <br />

                                                        <small>
                                                            {reservation.department}
                                                        </small>
                                                    </>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className=" text-center mt-4">
                                <button
                                    className="btn btn-success"
                                    onClick={handleReserve}
                                >
                                    Reserve Key
                                </button>
                            </div>

                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default ReservationPage;