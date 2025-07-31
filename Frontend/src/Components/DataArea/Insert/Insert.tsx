import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationsModel";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import "./Insert.css";
import { useEffect, useState } from "react";
import { authStore } from "../../../Redux/AuthState";
import { decodeToken } from "../../../Utils/TokenUtils";
import uploadImageIconSrc from "../../../Assets/Images/Icons/upload-image-icon.png";

function Insert(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<VacationModel>();
    const navigate = useNavigate();

    // If the user is not admin => Login page
    const token = authStore.getState().token;

    useEffect(() => {
        const decodedToken = decodeToken(token);

        if (!decodedToken) {
            notifyService.error("You have to admin. Please log in as admin");
            navigate("/login");
        } else if (decodedToken.user.roleId !== 1) {
            notifyService.error("You have to admin. Please log in as admin");
            navigate("/login");
        }
    }, [token, navigate]);

    async function send(vacation: VacationModel) {
        try {
            vacation.image = (vacation.image as unknown as FileList)[0];
            await vacationsService.addVacation(vacation);
            notifyService.success("Vacation added successfully!");
            navigate("/list");
        }
        catch(err: any) {
            notifyService.error(err);
        }
    }

    function getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // Handle image selection
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImagePreview(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    }
    
    return (
        <div className="Update">

            <h1>Add Vacation</h1>
			
            <form onSubmit={handleSubmit(send)}>

            <label>Destination:</label>
            <input type="text" {...register("destination", VacationModel.destinationValidation)}/>
            <span className="Error">{formState.errors.destination?.message}</span>

            <label>Description:</label>
            <textarea rows={5} {...register("description", VacationModel.descriptionValidation)}/>
            <span className="Error">{formState.errors.description?.message}</span>

            <label>Start Date:</label>
            <input type="date" {...register("startDate", VacationModel.startDateValidation)} min={getCurrentDate()}/>
            <span className="Error">{formState.errors.startDate?.message}</span>

            <label>End Date:</label>
            <input type="date" {...register("endDate", VacationModel.endDateValidation)} min={getCurrentDate()}/>
            <span className="Error">{formState.errors.endDate?.message}</span>

            <label>Price:</label>
            <input type="number" {...register("price", VacationModel.priceValidation)}/>
            <span className="Error">{formState.errors.price?.message}</span>

            <label>Cover Image:</label>
                <div className="file-upload">
                    <input
                        type="file"
                        accept="image/*"
                        {...register("image")}
                        onChange={handleImageChange}
                    />
                    <label htmlFor="file-upload-input">
                        <div className="upload-button">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Selected Image" />
                            ) : (
                                <img src={uploadImageIconSrc} alt="Upload Icon" />
                            )}
                        </div>
                    </label>
                </div>

            <button>ADD</button>
            </form>
        </div>
    );
}

export default Insert;
