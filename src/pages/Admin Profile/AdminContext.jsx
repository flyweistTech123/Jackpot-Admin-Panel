import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [adminProfile, setAdminProfile] = useState(() => {
        const savedProfile = localStorage.getItem("adminProfile");
        return savedProfile ? JSON.parse(savedProfile) : null;
    });

    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const refreshAdminData = () => {
        setRefresh((prev) => !prev);
    };

    const fetchAdminData = useCallback(async () => {
        await getApi(endPoints.getadminprofile, {
            setResponse: (data) => {
                setAdminProfile(data.data); // ✅ store only `data`
                localStorage.setItem("adminProfile", JSON.stringify(data.data));
            },
            setLoading: setLoading,
            errorMsg: "Failed to fetch admin data!",
        });
    }, []);


    useEffect(() => {
        fetchAdminData();
    }, [fetchAdminData, refresh]);

    console.log(adminProfile, "adkhak")

    return (
        <AdminContext.Provider value={{ adminProfile, loading, refreshAdminData }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => useContext(AdminContext);