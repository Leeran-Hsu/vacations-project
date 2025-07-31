import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationsModel";
import { authStore } from "../../../Redux/AuthState";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import { decodeToken } from "../../../Utils/TokenUtils";
import AdminCard from "../AdminCard/AdminCard";
import Card from "../Card/Card";
import "./List.css";

function List(): JSX.Element {
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [decodedToken, setDecodedToken] = useState<any>(null);
    const [activeButton, setActiveButton] = useState<string | null>(null);
    const navigate = useNavigate();

    const token = authStore.getState().token;

    // Fetch and set vacations based on the active button and user role
    useEffect(() => {
        const decodedToken = decodeToken(token);
        setDecodedToken(decodedToken);

        if (activeButton === "followed") {
            vacationsService.getFollowedVacations(decodedToken.user.userId)
                .then((dbVacations) => setVacations(dbVacations))
                .catch((err) => {
                    notifyService.error(err);
                });
        } else if (activeButton === "future") {
            vacationsService.getFutureVacations()
                .then((dbVacations) => setVacations(dbVacations))
                .catch((err) => {
                    notifyService.error(err);
                });
        } else if (activeButton === "current") {
            vacationsService.getOngoingVacations()
                .then((dbVacations) => setVacations(dbVacations))
                .catch((err) => {
                    notifyService.error(err);
                });
        } else {
            vacationsService.getAllVacations()
                .then((dbVacations) => setVacations(dbVacations))
                .catch((err) => {
                    notifyService.error("You have to be logged in");
                    if (err.response.status === 401) navigate("/login");
                });
        }
    }, [token, activeButton]);

    // Delete a vacation by its ID
    async function deleteVacation(vacationId: number) {
        try {
            if (window.confirm("Are you sure you want to delete this vacation?")) {
                await vacationsService.deleteVacation(vacationId);
                setVacations(vacations.filter((vac) => vac.vacationId !== vacationId));
                notifyService.success("Deleted successfully");
            }
        } catch (err: any) {
            notifyService.error(err);
        }
    }

    // Handle button clicks to filter vacations
    function handleButtonClick(buttonType: string) {
        setActiveButton((prevButton) => (prevButton === buttonType ? null : buttonType));
    }

    // Pagination
    const [page, setPage] = useState(1);
    const vacationsPerPage = 9;
    const startIndex = (page - 1) * vacationsPerPage;
    const endIndex = page * vacationsPerPage;

    const displayedVacations = vacations.slice(startIndex, endIndex);

    // Move to the next page
    function nextPage() {
        const totalPages = Math.ceil(vacations.length / vacationsPerPage);
        if (page < totalPages) {
            setPage(page + 1);
        }
    }

    // Move to the previous page
    function prevPage() {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    // Render based on user role
    if (!decodedToken) {
        return <div>Loading...</div>;
    }

    const roleId = decodedToken.user.roleId;

    if (roleId === 1) {
        // Admin view
        return (
            <div className="List">
                {vacations.map((vac) => (<AdminCard key={vac.vacationId} vacation={vac} deleteMe={deleteVacation} />))}
            </div>
        )
    }

    if (roleId === 2) {
        // User view
        return (
            <div className="List">
                <br />
                <div className="buttons">
                    {/* Filter buttons */}
                    <button
                        onClick={() => handleButtonClick("followed")}
                        className={activeButton === "followed" ? "active-button" : ""}
                    >Followed Vacations</button>
                    <button
                        onClick={() => handleButtonClick("future")}
                        className={activeButton === "future" ? "active-button" : ""}
                    >Future Vacations</button>
                    <button
                        onClick={() => handleButtonClick("current")}
                        className={activeButton === "current" ? "active-button" : ""}
                    >Current Vacations</button>
                </div>

                <br />

                {/* Displayed vacations */}
                {displayedVacations.map(vac => <Card key={vac.vacationId} vacation={vac} />)}

                {/* Pagination */}
                <div className="pagination">
                    <button onClick={prevPage}>Previous Page</button>
                    <button onClick={nextPage}>Next Page</button>
                </div>
            </div>
        )
    }
}

export default List;
