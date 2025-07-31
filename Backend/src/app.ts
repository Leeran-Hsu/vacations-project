import cors from "cors";
import express from "express";
import expressFileUpload from "express-fileupload";
import appConfig from "./2-utils/app-config";
import catchAll from "./4-middleware/catch-all";
import routeNotFound from "./4-middleware/route-not-found";
import authController from "./6-controllers/auth-controller";
import followersController from "./6-controllers/followers-controller";
import vacationsController from "./6-controllers/vacations-controller";

const server = express();

server.use(cors());
server.use(express.json());
server.use(expressFileUpload())
server.use("/api", vacationsController);
server.use("/api", followersController);
server.use("/api", authController);
server.use(routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, () => console.log("Listening on http://localhost:" + appConfig.port));
