import { Link } from "react-router-dom";
import VacationModel from "../../../Models/VacationsModel";
import "./AdminCard.css";
import deleteImageSrc from "../../../Assets/Images/Icons/delete-icon.png";
import editImageSrc from "../../../Assets/Images/Icons/edit-icon.png";
import calendarImage from "../../../Assets/Images/Icons/calendar-icon.jpeg";
import { useState } from "react";

// Define the props interface for the AdminCard component
interface AdminCardProps {
    vacation: VacationModel;  
    deleteMe: (vacationId: number) => void;  
}

function AdminCard(props: AdminCardProps): JSX.Element {

    // State to track whether the description is expanded or not
    const [isExpanded, setIsExpanded] = useState(false);

    // Toggle the description expansion state
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    // Function to delete the vacation
    function deleteMe() {
        props.deleteMe(props.vacation.vacationId);
    }

    // Format the date in the required format
    function getFormattedDate(oldDate: string): string {
        const date = new Date(oldDate);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();

        const formattedDate = `${day}.${month}.${year}`;

        return formattedDate;
    }

    return (
        <div className="CardContainer">

            <div className="AdminCard">

                {/* Vacation Image Section */}
                <div className="card-image-container">
                    <img src={props.vacation.imageUrl} alt={props.vacation.destination} />
                    {/* Delete Button */}
                    <button onClick={deleteMe} className="delete-button">
                        <img src={deleteImageSrc} className="delete-image" alt="Delete"></img>
                    </button>
                    {/* Update Button */}
                    <Link to={`/update/${props.vacation.vacationId}`}>
                        <button className="update-button">
                            <img src={editImageSrc} className="update-image" alt="Edit"></img>
                        </button>
                    </Link>
                    <span className="destination">{props.vacation.destination}</span>
                </div>

                {/* Vacation Dates Section */}
                <div className="dates-container">
                    <img src={calendarImage} alt="Calendar"></img>
                    <span className="dates">{getFormattedDate(props.vacation.startDate)} - {getFormattedDate(props.vacation.endDate)}</span>
                </div>

                {/* Vacation Description Section */}
                <div className="description-container">
                    {/* Description Text (with optional Read More/Less button) */}
                    <span style={{ whiteSpace: isExpanded ? 'normal' : 'nowrap' }}>{props.vacation.description}</span>
                    {props.vacation.description.length > 100 && (
                        <button className="read-more-button" onClick={toggleExpand}>
                            {isExpanded ? 'Read Less' : 'Read More'}
                        </button>
                    )}
                </div>

                {/* Vacation Price Section */}
                <span>Price: {props.vacation.price} $</span>

            </div>

        </div>
    );
}

export default AdminCard;
