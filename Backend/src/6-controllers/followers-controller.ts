import express, { NextFunction, Request, Response } from "express";
import FollowerModel from "../3-models/follower-model";
import StatusCode from "../3-models/status-code";
import followersService from "../5-services/followers-service";
import verifyUser from "../4-middleware/verify-user";

const router = express.Router();

// Get followers for a specific vacation
router.get("/followers-by-vacation/:vacationId", verifyUser, async (request: Request, response: Response, next: NextFunction) => {
    try {
        // Extract vacationId from the request parameters
        const vacationId = +request.params.vacationId;

        // Retrieve followers for the specified vacation
        const followers = await followersService.getFollowersByVacationId(vacationId);

        response.json(followers);
    }
    catch(err: any) {
        next(err);
    }
});

// Add a follower for the authenticated user to a specific vacation
router.post("/followers", verifyUser, async (request: Request, response: Response, next: NextFunction) => {
    try {
        // Create a FollowerModel instance from the request body
        const follower = new FollowerModel(request.body);

        // Add a follower for the authenticated user to the specified vacation
        const addedFollower = await followersService.addFollower(follower.userId, follower.vacationId);

        addedFollower ?
            response.status(StatusCode.Created).json(addedFollower) :
            response.sendStatus(StatusCode.NoContent);
    }
    catch(err: any) {
        next(err);
    }
});

// Delete a follower for the authenticated user from a specific vacation
router.delete("/followers", verifyUser, async (request: Request, response: Response, next: NextFunction) => {
    try {
        // Create a FollowerModel instance from the request body
        const follower = new FollowerModel(request.body);

        // Delete the follower for the authenticated user from the specified vacation
        await followersService.deleteFollower(follower.userId, follower.vacationId);

        response.status(StatusCode.NoContent);
    }
    catch(err: any) {
        next(err);
    }
});

// Check if the authenticated user is following a specific vacation
router.get("/is-following-by-user/:userId/:vacationId", verifyUser, async (request: Request, response: Response, next: NextFunction) => {
    try {
        // Extract userId and vacationId from the request parameters
        const userId = +request.params.userId;
        const vacationId = +request.params.vacationId;

        // Check if the authenticated user is following the specified vacation
        const isFollowing = await followersService.checkFollower(userId, vacationId);

        response.json(isFollowing);
    }
    catch(err: any) {
        next(err);
    }
});

export default router;
