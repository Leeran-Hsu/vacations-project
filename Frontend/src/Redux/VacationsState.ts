import { createStore } from "redux";
import VacationModel from "../Models/VacationsModel";

// 1. Global State:
export class VacationsState {
    public vacations: VacationModel[] = []; 
}

// 2. Action Type:
export enum VacationsActionType {
    SetVacations = "SetVacations",
    AddVacation = "AddVacation",
    UpdateVacation = "UpdateVacation",
    DeleteVacation = "DeleteVacation",
    ClearAll = "ClearAll"
}

// 3. Action:
export interface VacationsAction {
    type: VacationsActionType; // Action Type.
    payload?: any; // The data related to that action.
}

// 4. Reducer (invoked by redux library): 
export function vacationsReducer(currentState = new VacationsState(), action: VacationsAction): VacationsState {

    const newState = { ...currentState }; // Duplicate the global state using Spread Operator.

    // Change the duplicated global state according the action:
    switch (action.type) {

        case VacationsActionType.SetVacations: // Here the payload is products array to set.
            newState.vacations = action.payload; // Save all products into global state.
            break;

        case VacationsActionType.AddVacation: // Here the payload is a single product to add:
            newState.vacations.push(action.payload); // Add that product into global state.
            break;

        case VacationsActionType.UpdateVacation: // Here the payload is a single product to update.
            const indexToUpdate = newState.vacations.findIndex(vac => vac.vacationId === action.payload.id);
            if (indexToUpdate >= 0) newState.vacations[indexToUpdate] = action.payload;
            break;

        case VacationsActionType.DeleteVacation: // Here the payload is the id of the product to delete.
            const indexToDelete = newState.vacations.findIndex(vac => vac.vacationId === action.payload);
            if (indexToDelete >= 0) newState.vacations.splice(indexToDelete, 1);
            break;

        case VacationsActionType.ClearAll: // Here there is no payload.
            newState.vacations = [];
            break;
    }

    return newState; // Return the changed duplicated global state.
}

// 5. Store:
export const vacationStore = createStore(vacationsReducer);
