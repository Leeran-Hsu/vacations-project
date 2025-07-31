import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import "./AuthMenu.css";
import { authStore } from "../../../Redux/AuthState";
import { NavLink } from "react-router-dom";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import logoutImageSrc from "../../../Assets/Images//Icons/logout-icon.png";

// The AuthMenu component provides a dynamic navigation menu based on user authentication status.

function AuthMenu(): JSX.Element {
    // State to manage the current user
    const [user, setUser] = useState<UserModel | null>(authStore.getState().user);

    // Subscribe to changes in the authentication state to update the user information
    useEffect(() => {
        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });

        return unsubscribe;
    }, []);

    // Handles the logout action when the "Logout" link is clicked
    function logoutMe(e: React.MouseEvent<HTMLAnchorElement>) {
        if (window.confirm("Are you sure you want to log off?")) {
            authService.logout();
            notifyService.success("Thanks for visiting");
        } else {
            // Prevent the default action if the user cancels the logout
            e.preventDefault();
        }
    }

    return (
        <div className="AuthMenu">
            {/* Display the login and register links for guests */}
            {!user && (
                <div className="auth-menu-item">
                    <span>Hello Guest | </span>
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/register">Register</NavLink>
                </div>
            )}

            {/* Display the user information and logout link for authenticated users */}
            {user && (
                <div className="auth-menu-item">
                    <span>Hello {user.firstName} {user.lastName} | </span>
                    <NavLink to={"/home"} onClick={logoutMe}>
                        Logout
                        <img src={logoutImageSrc} alt="Logout" />
                    </NavLink>
                </div>
            )}
        </div>
    );
}

export default AuthMenu;
