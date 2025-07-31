import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";
import { decodeToken } from "../../../Utils/TokenUtils";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Menu.css";

function Menu(): JSX.Element {

    const [decodedToken, setDecodedToken] = useState<any>(null);
    const token = authStore.getState().token;
    const location = useLocation();

    // Effect to update the decoded token when the authentication token changes
    useEffect(() => {
        const decodedToken = decodeToken(token);
        setDecodedToken(decodedToken);
    }, [token]);

    // Condition to determine whether to render the "+Add Vacation" and "Reports" links
    const shouldRenderInsert = decodedToken && decodedToken.user.roleId === 1 && (location.pathname === "/list" || location.pathname === "/home");

    return (
        <div className="Menu">

            <div>
                <NavLink to="/home">Home</NavLink>
                <NavLink to="/list">Vacations</NavLink>

                {/* Render "+Add Vacation" link if the condition is met */}
                {shouldRenderInsert && <NavLink to="/insert">+Add Vacation</NavLink>}
                {shouldRenderInsert && <NavLink to="/reports">Reports</NavLink>}
            </div>

            <div>
                <AuthMenu />
            </div>
        </div>
    );
}

export default Menu;
