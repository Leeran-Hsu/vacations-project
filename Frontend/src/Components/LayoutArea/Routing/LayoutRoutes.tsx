import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import List from "../../DataArea/List/List";
import Insert from "../../DataArea/Insert/Insert";
import Update from "../../DataArea/Update/Update";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import Reports from "../../DataArea/Reports/Reports";

function LayoutRoutes(): JSX.Element {

    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/list" element={<List />} />
            <Route path="/insert" element={<Insert />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/update/*" element={<Update />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default LayoutRoutes;
