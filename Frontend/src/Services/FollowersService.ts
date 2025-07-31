import axios from "axios";
import FollowerModel from "../Models/FollowerModel";
import appConfig from "../Utils/AppConfig";
import { authStore } from "../Redux/AuthState";

class FollowersService {
    // Add a new follower to a vacation
    public async addFollower(follower: FollowerModel): Promise<void> {

        const options = {
            headers: { "Authorization": "Bearer " + authStore.getState().token }
        };

        await axios.post<FollowerModel>(appConfig.followersUrl, follower, options);
    }

    // Get the total number of followers for a specific vacation
    public async getFollowersByVacationId(vacationId: number): Promise<number> {

        const options = {
            headers: { "Authorization": "Bearer " + authStore.getState().token }
        };

        const response = await axios.get<number>(appConfig.followersByVacationUrl + vacationId, options);

        const totalFollowers = response.data;

        return totalFollowers;
    }

    // Check if a user is following a specific vacation
    public async isFollowing(userId: number, vacationId: number): Promise<boolean> {

        const options = {
            headers: { "Authorization": "Bearer " + authStore.getState().token }
        };

        const url = `${appConfig.isFollowingByUserUrl}${userId}/${vacationId}`;

        const response = await axios.get<boolean>(url, options);

        return response.data;
    }
}

const followersService = new FollowersService();

export default followersService;
