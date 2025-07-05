/** @format */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};


const formatDate = (dateString) => {
    const date = new Date(dateString); // Parse the ISO string to a Date object

    // Extract day, month, and year
    const day = date.getDate().toString().padStart(2, '0'); // Ensure two-digit day
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ensure two-digit month (0-based index)
    const year = date.getFullYear(); // Get the full year

    // Format as 'DD/MM/YYYY'
    return `${day}/${month}/${year}`;
};

export {
    ScrollToTop,
    formatDate

};