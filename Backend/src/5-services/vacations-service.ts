import dal from "../2-utils/dal";
import { OkPacket } from "mysql";
import VacationModel from "../3-models/vacation-model";
import appConfig from "../2-utils/app-config";
import imageHandler from "../2-utils/image-handler";
import { ResourceNotFoundError } from "../3-models/client-errors";

async function getAllVacations(): Promise<VacationModel[]> {
    const sql = `SELECT 
                    vacation_id AS vacationId,
                    destination,
                    description,
                    start_date AS startDate,
                    end_date AS endDate,
                    price,
                    CONCAT('${appConfig.domainName}/api/vacations/', image_name) AS imageUrl
                 FROM vacations
                 ORDER BY start_date ASC`;

    const vacations = await dal.execute(sql);
    
    return vacations;
}

async function addVacation(vacation: VacationModel): Promise<VacationModel> {

    vacation.validate();

    const imageName = await imageHandler.saveImage(vacation.image);

    const sql = `INSERT INTO vacations VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)`;

    const info: OkPacket = await dal.execute(sql, [vacation.destination, vacation.description, vacation.startDate,
                                                   vacation.endDate, vacation.price, imageName]);

    vacation.vacationId = info.insertId;

    vacation.imageUrl = `${appConfig.domainName}/api/vacations/${imageName}`;

    delete vacation.image;

    return vacation;
}

async function updateVacation(vacation: VacationModel): Promise<VacationModel> {

    vacation.validate();

    let sql = "";
    let imageName = "no-image-available.png";

    const oldImage = await getOldImage(vacation.vacationId);

    const params = [
        vacation.destination,
        vacation.description,
        vacation.startDate,
        vacation.endDate,
        vacation.price,
    ];

    if (vacation.image) {
        imageName = await imageHandler.updateImage(vacation.image, oldImage);
        sql = `UPDATE vacations SET 
                  destination = ?,
                  description = ?,
                  start_date = ?,
                  end_date = ?,
                  price = ?,
                  image_name = ?
               WHERE vacation_id = ?`;
        params.push(imageName);
        params.push(vacation.vacationId)
    }
    else {
        sql = `UPDATE vacations SET 
                  destination = ?,
                  description = ?,
                  start_date = ?,
                  end_date = ?,
                  price = ?
               WHERE vacation_id = ?`;
               params.push(vacation.vacationId)

    }

    const info: OkPacket = await dal.execute(sql, params);

    if (info.affectedRows === 0) throw new ResourceNotFoundError(vacation.vacationId);

    vacation.imageUrl = `${appConfig.domainName}/api/vacations/${imageName}`;

    delete vacation.image;

    return vacation;
}


async function deleteVacation(vacationId: number): Promise<void> {

    const oldImage = await getOldImage(vacationId);

    await imageHandler.deleteImage(oldImage);

    const sql = `DELETE FROM vacations WHERE vacation_id = '${vacationId}'`;

    const info: OkPacket = await dal.execute(sql);

    if (info.affectedRows === 0) throw new ResourceNotFoundError(vacationId);
}

async function getOldImage(vacationId: number): Promise<string> {
    const sql = `SELECT image_name FROM vacations WHERE vacation_id = ${vacationId}`;
    const vacations = await dal.execute(sql);
    const vacation = vacations[0];

    if (!vacation) return null;
    const imageName = vacation.imageName;
    console.log(imageName)
    return imageName;
}

async function getFollowedVacations(userId: number): Promise<VacationModel[]> {
    const sql = `
        SELECT 
            V.vacation_id AS vacationId,
            V.start_date AS startDate,
            V.end_date AS endDate,
            CONCAT('${appConfig.domainName}/api/vacations/', V.image_name) AS imageUrl,
            V.*  -- Include all other columns from the vacations table
        FROM vacations AS V
        INNER JOIN followers AS F ON V.vacation_id = F.vacationId
        WHERE F.userId = ?
        ORDER BY V.start_date ASC;

    `;

    const vacations = await dal.execute(sql, [userId]);

    return vacations;
}

async function getFutureVacations(): Promise<VacationModel[]> {
    
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' '); 
    
    const sql = `
        SELECT 
            vacation_id AS vacationId,
            destination,
            description,
            start_date AS startDate,
            end_date AS endDate,
            price,
            CONCAT('${appConfig.domainName}/api/vacations/', image_name) AS imageUrl
        FROM vacations
        WHERE start_date > ? 
        ORDER BY start_date ASC
    `;

    const vacations = await dal.execute(sql, [currentDate]);

    return vacations;
}

async function getOngoingVacations(): Promise<VacationModel[]> {
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const sql = `
        SELECT 
            vacation_id AS vacationId,
            destination,
            description,
            start_date AS startDate,
            end_date AS endDate,
            price,
            CONCAT('${appConfig.domainName}/api/vacations/', image_name) AS imageUrl
        FROM vacations
        WHERE start_date <= ? AND end_date >= ?
        ORDER BY start_date ASC
    `;

    const vacations = await dal.execute(sql, [currentDate, currentDate]);

    return vacations;
}

async function getVacationById(vacationId: number): Promise<VacationModel | null> {
    const sql = `
        SELECT 
            vacation_id AS vacationId,
            destination,
            description,
            start_date AS startDate,
            end_date AS endDate,
            price,
            CONCAT('${appConfig.domainName}/api/vacations/', image_name) AS imageUrl
        FROM vacations
        WHERE vacation_id = ?
    `;

    const vacations = await dal.execute(sql, [vacationId]);

    if (vacations.length === 0) {
        return null;
    }

    const vacation = vacations[0];

    return vacation;
}

export default {
    getAllVacations,
    addVacation,
    updateVacation,
    deleteVacation, 
    getFollowedVacations,
    getFutureVacations,
    getOngoingVacations,
    getVacationById
};

