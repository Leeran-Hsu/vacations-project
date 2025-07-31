import express, { NextFunction, Request, Response } from "express";
import vacationsService from "../5-services/vacations-service";
import verifyUser from "../4-middleware/verify-user";
import VacationModel from "../3-models/vacation-model";
import StatusCode from "../3-models/status-code";
import path from "path";
import verifyAdmin from "../4-middleware/verify-admin";

const router = express.Router();

// Get all vacations
router.get("/vacations", verifyUser, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacations = await vacationsService.getAllVacations();

        response.json(vacations);
    }
    catch(err: any) {
        next(err);
    }
});

// Add a new vacation (admin only)
router.post("/vacations", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {

        request.body.image = request.files?.image;

        // Create a VacationModel instance from the request body
        const vacation = new VacationModel(request.body);

        // Add the vacation and respond with the added vacation data
        const addedVacation = await vacationsService.addVacation(vacation);

        response.status(StatusCode.Created).json(addedVacation);
    }
    catch(err: any) {
        next(err);
    }
});

// Serve vacation images
router.get("/vacations/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        // Retrieve the image name from the request parameters
        const imageName = request.params.imageName;

        // Construct the absolute path to the image
        const absolutePath = path.join(__dirname, "../1-assets/images/vacation-images/", imageName);

        response.sendFile(absolutePath);
    }
    catch(err: any) {
        next(err);
    }
});

// Update an existing vacation (admin only)
router.put("/vacations/:id([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.vacationId = +request.params.id;

        request.body.image = request.files?.image;

        // Create a VacationModel instance from the request body
        const vacation = new VacationModel(request.body);

        // Update the vacation and respond with the updated vacation data
        const updateProduct = await vacationsService.updateVacation(vacation);

        response.json(updateProduct);
    }
    catch (err: any) {
        next(err);
    }
});

// Delete a vacation (admin only)
router.delete("/vacations/:id([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.id;

        // Delete the vacation and respond with NoContent status
        await vacationsService.deleteVacation(vacationId);

        response.sendStatus(StatusCode.NoContent);
    }
    catch (err: any) {
        next(err);
    }
});

// Get vacations followed by a user
router.get("/followed-vacations/:userId", verifyUser, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = +request.params.userId;

        // Get vacations followed by the user
        const followedVacations = await vacationsService.getFollowedVacations(userId);

        response.json(followedVacations);
    }
    catch(err: any) {
        next(err);
    }
});

// Get future vacations
router.get("/future-vacations", verifyUser, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacations = await vacationsService.getFutureVacations();

        response.json(vacations);
    }
    catch(err: any) {
        next(err);
    }
});

// Get ongoing vacations
router.get("/ongoing-vacations", verifyUser, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacations = await vacationsService.getOngoingVacations();

        response.json(vacations);
    }
    catch(err: any) {
        next(err);
    }
});

// Get vacation by ID
router.get("/vacation-by-id/:id([0-9]+)", verifyUser, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.id;

        // Get the vacation by ID
        const vacation = await vacationsService.getVacationById(vacationId);

        // Respond with the vacation data or a not found message
        if (!vacation) {
            response.status(StatusCode.NotFound).json({ message: "Vacation not found" });
        } else {
            response.json(vacation);
        }
    }
    catch (err: any) {
        next(err);
    }
});

export default router;
