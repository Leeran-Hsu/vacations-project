import React from 'react';
import "./PageNotFound.css";
import pageNotFoundSrc from "../../../Assets/Images/PageNotFound/page-not-found.jpg";

function PageNotFound(): JSX.Element {
    // Function to navigate back
    const goBack = () => {
        window.history.back();
    };

    return (
        <div className="PageNotFound">
            <img src={pageNotFoundSrc} alt="Page Not Found" />
            <button className="goBackButton" onClick={goBack}>Go back</button>
        </div>
    );
}

export default PageNotFound;
