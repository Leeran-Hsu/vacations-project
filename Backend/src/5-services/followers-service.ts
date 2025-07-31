import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import FollowerModel from "../3-models/follower-model";
import { ResourceNotFoundError } from "../3-models/client-errors";

// Get the total number of followers for a given vacation
async function getFollowersByVacationId(vacationId: number): Promise<number> {
    const sql = `SELECT COUNT(*) AS totalFollowers FROM followers WHERE vacationId = ?`;
    const followers = await dal.execute(sql, [vacationId]);
    const totalFollowers = followers[0]?.totalFollowers;
    return totalFollowers;
}

// Add a follower for a given user and vacation
async function addFollower(userId: number, vacationId: number): Promise<FollowerModel> {
    // Check if the user is already a follower
    const existingFollower = await getFollower(userId, vacationId);
    // If already a follower, delete and return
    if (existingFollower) {
        deleteFollower(existingFollower.userId, existingFollower.vacationId);
        return;
    }
    // Insert new follower
    const sql = `INSERT INTO followers (userId, vacationId) VALUES (?, ?)`;
    const follower = await dal.execute(sql, [userId, vacationId]);
    return follower;
}

// Delete a follower for a given user and vacation
async function deleteFollower(userId: number, vacationId: number): Promise<void> {
    const sql = `DELETE FROM followers WHERE userId = ${userId} AND vacationId = ${vacationId}`;
    const info: OkPacket = await dal.execute(sql);
    // If no follower is deleted, throw an error
    if (info.affectedRows === 0) throw new ResourceNotFoundError(userId);
}

// Get follower details for a given user and vacation
async function getFollower(userId: number, vacationId: number): Promise<FollowerModel | null> {
    const sql = `SELECT * FROM followers WHERE userId = ? AND vacationId = ?`;
    const followers = await dal.execute(sql, [userId, vacationId]);
    // Return null if no follower is found
    if (followers.length === 0) return null;
    return followers[0];
}

// Check if a user is a follower for a given vacation
async function checkFollower(userId: number, vacationId: number): Promise<boolean> {
    const sql = `SELECT * FROM followers WHERE userId = ? AND vacationId = ?`;
    const followers = await dal.execute(sql, [userId, vacationId]);
    return followers.length ? true : false;
}

export default {
    getFollowersByVacationId,
    addFollower,
    deleteFollower,
    checkFollower
}
