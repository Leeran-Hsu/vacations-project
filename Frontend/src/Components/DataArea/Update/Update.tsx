import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationsModel";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import "./Update.css";
import { useEffect, useRef, useState } from "react";

function Update(): JSX.Element {
    const { register, handleSubmit, formState, reset } = useForm<VacationModel>();
    const [vacation, setVacation] = useState<VacationModel>();    
    const navigate = useNavigate();

    // Function to extract vacation ID from the URL
    function findVacationIdFromUrl() {
        const currentUrl = window.location.href;
        const segments = currentUrl.split("/");
        const lastPart = segments[segments.length - 1];
        return parseInt(lastPart);
    }

    // Fetch vacation details when the component mounts
    useEffect(() => {
        const vacationId = findVacationIdFromUrl();
        vacationsService.getVacationById(vacationId)
            .then(dbVacation => {
                setVacation(dbVacation);
                reset({
                    ...dbVacation,
                    startDate: new Date(dbVacation.startDate).toISOString().split("T")[0],
                    endDate: new Date(dbVacation.endDate).toISOString().split("T")[0],
                });
            })
            .catch(error => {
                console.error(error);
            });
    }, [reset]);

    // Submit updated vacation details
    async function send(vacation: VacationModel) {
        try {
            vacation.vacationId = findVacationIdFromUrl();
            vacation.image = (vacation.image as unknown as FileList)[0];
            await vacationsService.updateVacations(vacation);
            notifyService.success("Vacation updated successfully!");
            navigate("/list");
        } catch (err: any) {
            notifyService.error(err);
        }
    }

    // Function to format date in the required format
    const getFormattedDate = (datetime: string | undefined): string => {
        if (datetime) {
            const date = datetime.slice(0, -14);
            return date;
        }
        return "";
    };

    // Reference for the vacation image
    const imageRef = useRef<HTMLImageElement>(null);

    // Handle image change event
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            if (imageRef.current) {
                imageRef.current.src = imageUrl;
            }
        }
    };
    
    // Render the Update component
    return (
        <div className="Update">
            <h1>Update</h1>

            <form onSubmit={handleSubmit(send)}>
                
                {/* Input fields for updating vacation details */}
                <label>Destination:</label>
                <input
                    type="text"
                    {...register("destination", VacationModel.destinationValidation)}
                    defaultValue={vacation?.destination}
                />
                <span className="Error">{formState.errors.destination?.message}</span>

                <label>Description:</label>
                <textarea
                    rows={5}
                    {...register("description", VacationModel.descriptionValidation)}
                    defaultValue={vacation?.description}
                />
                <span className="Error">{formState.errors.description?.message}</span>

                <label>Start Date:</label>
                <input
                    type="date"
                    {...register("startDate", VacationModel.startDateValidation)}
                    defaultValue={getFormattedDate(vacation?.startDate)}
                />
                <span className="Error">{formState.errors.startDate?.message}</span>

                <label>End Date:</label>
                <input
                    type="date"
                    {...register("endDate", VacationModel.endDateValidation)}
                    defaultValue={getFormattedDate(vacation?.endDate)}
                />
                <span className="Error">{formState.errors.endDate?.message}</span>

                <label>Price:</label>
                <input
                    type="number"
                    {...register("price", VacationModel.priceValidation)}
                    defaultValue={vacation?.price}
                />
                <span className="Error">{formState.errors.price?.message}</span>
                
                {/* Input field for changing vacation image */}
                <label>Change image:</label>
                <img ref={imageRef} src={vacation?.imageUrl} alt="Vacation" />
                <input type="file" accept="image/*" {...register("image")} onChange={handleImageChange} />

                <button>UPDATE</button>
            </form>
        </div>
    );
}

export default Update;
