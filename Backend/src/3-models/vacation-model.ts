import Joi from "joi";
import { ValidationError } from "./client-errors";
import { UploadedFile } from "express-fileupload";

class VacationModel {
    // Properties for vacation details
    public vacationId: number;
    public destination: string;
    public description: string;
    public startDate: Date;
    public endDate: Date;
    public price: number;
    public imageUrl: string;
    public image: UploadedFile;

    // Constructor to initialize vacation properties with an object
    public constructor(vacation: VacationModel) {
        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.imageUrl = vacation.imageUrl;
        this.image = vacation.image;
    }

    // Validation schema using Joi for vacation properties
    private static validationScheme = Joi.object({
        vacationId: Joi.number().optional().integer().positive(),
        destination: Joi.string().required().max(30),
        description: Joi.string().required().max(1000),
        startDate: Joi.date().iso().required(),
        endDate: Joi.date().iso().required().greater(Joi.ref('startDate')).message("End date must be after start date"),
        price: Joi.number().required().positive().max(10000).precision(2),
        imageUrl: Joi.string().optional().min(40).max(200),
        image: Joi.object().optional()
    })

    // Validate the current instance of the VacationModel
    public validate(): void {
        const validationResult = VacationModel.validationScheme.validate(this);
        // If validation fails, throw a ValidationError with the error message
        if(validationResult.error?.message) throw new ValidationError(validationResult.error.message);
    }
}

export default VacationModel;
