import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationsModel";
import { authStore } from "../../../Redux/AuthState";
import notifyService from "../../../Services/NotifyService";
import { decodeToken } from "../../../Utils/TokenUtils";
import "./Reports.css";
import vacationsService from "../../../Services/VacationsService";
import Chart from "chart.js/auto";
import followersService from "../../../Services/FollowersService";

// Functional component for generating and exporting vacation reports
function Reports(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const navigate = useNavigate();
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const token = authStore.getState().token;

    // Fetch all vacations when the component mounts
    useEffect(() => {
        const decodedToken = decodeToken(token);

        if (!decodedToken) {
            notifyService.error("You have to be an admin. Please log in as an admin");
            navigate("/login");
        } else if (decodedToken.user.roleId !== 1) {
            notifyService.error("You have to be an admin. Please log in as an admin");
            navigate("/login");
        } else {
            vacationsService.getAllVacations()
                .then((dbVacations) => {
                    setVacations(dbVacations);
                    setDataLoaded(true);
                })
                .catch((err) => {
                    notifyService.error(err);
            });
        }
    }, [token, navigate]);

    // Create the chart once data is loaded
    useEffect(() => {
        if (dataLoaded) {
            createChart();
        }
    }, [dataLoaded]);

    // Fetch followers count for each vacation
    const promises = vacations.map((vacation) =>
        followersService.getFollowersByVacationId(vacation.vacationId)
    );

    // Create and render the chart
    const createChart = async () => {
        if (chartRef.current) {
            const destinations = vacations.map((vacation) => vacation.destination);

            const data = await Promise.all(promises);

            const ctx = chartRef.current.getContext("2d");

            new Chart(ctx, {
                type: "bar",
                data: {
                    labels: destinations,
                    datasets: [
                        {
                            label: "Followers by Vacation",
                            data: data,
                            backgroundColor: "rgba(75, 192, 192, 0.2)",
                            borderColor: "rgba(75, 192, 192, 1)",
                            borderWidth: 1,
                        },
                    ],
                },
            });
        }
    };

    // Export data to CSV
    const exportToCSV = async () => {
        const promiseResults = await Promise.all(promises);
        const csvContent = "data:text/csv;charset=utf-8," +
            "Destination,Followers\n" +
            vacations.map((vacation, index) => `${vacation.destination},${promiseResults[index]}\n`)
            .join("");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "vacation_followers.csv");
        document.body.appendChild(link);
        link.click();
    };

    return (
        <div className="Reports">
            <canvas ref={chartRef} id="vacationsChart"></canvas>
            <button onClick={exportToCSV}>Export to CSV</button>
        </div>
    );
}

export default Reports;
