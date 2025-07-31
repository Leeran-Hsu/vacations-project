class VacationModel {
    public vacationId: number;
    public destination: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public imageUrl: string;
    public image: File;

    // Validation rules for destination
    public static destinationValidation = {
        required: { value: true, message: "Must be filled" },
        maxLength: { value: 30, message: "Must be no more than 30 characters" },
    };

    // Validation rules for description
    public static descriptionValidation = {
        required: { value: true, message: "Must be filled" },
        maxLength: { value: 1000, message: "Must be no more than 1,000 characters" },
    };

    // Validation rules for start date
    public static startDateValidation = {
        required: { value: true, message: "Must be chosen" },
    };

    // Validation rules for end date
    public static endDateValidation = {
        required: { value: true, message: "Must be chosen" },
        // Custom validation to ensure end date is greater than start date
        validate: (value: string, { startDate }: { startDate: string }) => {
            if (!value || !startDate) return true;
            const endDate = new Date(value);
            const start = new Date(startDate);
            return endDate > start || "End date must be greater than start date";
        },
    };

    // Validation rules for price
    public static priceValidation = {
        required: { value: true, message: "Must be filled" },
        max: { value: 10000, message: "Price must be less or equal to 10,000" },
    };
}

export default VacationModel;
