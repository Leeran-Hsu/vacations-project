import axios from "axios";
import VacationModel from "../Models/VacationsModel";
import { authStore } from "../Redux/AuthState";
import appConfig from "../Utils/AppConfig";

class VacationsService {
    // Get all vacations from the server
    public async getAllVacations(): Promise<VacationModel[]> {

        const options = {
            headers: { "Authorization": "Bearer " + authStore.getState().token }
        };

        const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl, options);

        const vacations = response.data;

        return vacations;
    }

    // Add a new vacation to the server
    public async addVacation(vacation: VacationModel): Promise<void> {

        const options = {
            headers: {
                "Authorization": "Bearer " + authStore.getState().token,
                "Content-Type": "multipart/form-data"
            }
        };

        await axios.post<VacationModel>(appConfig.vacationsUrl, vacation, options);
    }

    // Update an existing vacation on the server
    public async updateVacations(vacation: VacationModel): Promise<void> {

        const options = {
            headers: {
                "Authorization": "Bearer " + authStore.getState().token,
                "Content-Type": "multipart/form-data"
            }
        };

        await axios.put<VacationModel>(appConfig.vacationsUrl + vacation.vacationId, vacation, options);
    }

    // Delete a vacation from the server
    public async deleteVacation(vacationId: number): Promise<void> {

        const options = {
            headers: { "Authorization": "Bearer " + authStore.getState().token }
        };

        await axios.delete<VacationModel>(appConfig.vacationsUrl + vacationId, options);
    }

    // Get vacations that a user is currently following
    public async getFollowedVacations(userId: number): Promise<VacationModel[]> {

        const options = {
            headers: { "Authorization": "Bearer " + authStore.getState().token }
        };

        const response = await axios.get<VacationModel[]>(appConfig.followedVacationsByUserUrl + userId, options);

        const vacations = response.data;

        return vacations;
    }

    // Get vacations that have not started yet
    public async getFutureVacations(): Promise<VacationModel[]> {

        const options = {
            headers: { "Authorization": "Bearer " + authStore.getState().token }
        };

        const response = await axios.get<VacationModel[]>(appConfig.futureVacationsUrl, options);

        const vacations = response.data;

        return vacations;
    }

    // Get vacations that are currently ongoing
    public async getOngoingVacations(): Promise<VacationModel[]> {

        const options = {
            headers: { "Authorization": "Bearer " + authStore.getState().token }
        };

        const response = await axios.get<VacationModel[]>(appConfig.ongoingVacationsUrl, options);

        const vacations = response.data;

        return vacations;
    }

    // Get details of a specific vacation by its ID
    public async getVacationById(vacationId: number): Promise<VacationModel> {

        const options = {
            headers: { "Authorization": "Bearer " + authStore.getState().token }
        };

        const response = await axios.get<VacationModel>(appConfig.vacationByIdUrl + vacationId, options);

        const vacation = response.data;

        return vacation;
    }
}

const vacationsService = new VacationsService();

export default vacationsService;
