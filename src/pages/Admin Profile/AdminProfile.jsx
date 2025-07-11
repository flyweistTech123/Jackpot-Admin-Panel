import React, { useState } from 'react';
import DashbaordLayout from '../../components/DashbaordLayout';

import { IoArrowBack } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";

import { useNavigate } from 'react-router-dom';
import { useAdmin } from './AdminContext';
import endPoints from '../../Repository/apiConfig';
import { putApi } from '../../Repository/Api';

const AdminProfile = () => {
    const { adminProfile, refreshAdminData, loading } = useAdmin();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState(adminProfile?.firstName || "");
    const [lastName, setLastName] = useState(adminProfile?.lastName || "");
    const [phone, setPhone] = useState(adminProfile?.mobileNumber || "");
    const [email, setEmail] = useState(adminProfile?.email || "");
    const [password, setPassword] = useState("");
    const [editing, setEditing] = useState(false);
    const [loading1, setLoading1] = useState(false);


    const handleUpdate = async () => {
        const payload = {
            "fullName": `${firstName} ${lastName}`,
            "firstName": firstName,
            "lastName": lastName,
            "phone": phone,
            "email": email,
        };

        if (password) {
            payload.password = password;
        }

        await putApi(endPoints.updateadminprofile, payload, {
            setLoading: setLoading1,
            successMsg: 'Admin Profile updated successfully!',
            errorMsg: 'Failed to update admin profile!',
        });
        refreshAdminData();
    };


    return (
        <DashbaordLayout
            title="Admin Details"
            hedartitle="Admin Profile"
            titleAction={
                <IoArrowBack
                    size={25}
                    color="#1C1B1F"
                    className="cursor-pointer"
                    onClick={() => navigate(-1)}
                />
            }
            headerAction={
                <button
                    onClick={() => setEditing(!editing)}
                    className={`px-4 py-2 cursor-pointer rounded ${editing ? "bg-red-500" : "bg-green-500"} text-white`}
                >
                    {editing ? "Disable Editing" : "Enable Editing"}
                </button>
            }
        >

            {loading ? (
                <div className="flex flex-col items-center justify-center min-h-[50vh]">
                    <div className="w-16 h-16 border-4 border-[#FFB000] border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 font-semibold text-[#0A0E15]">Loading...</p>
                </div>
            ) : (
                <div className="mt-6 bg-white rounded-xl shadow-md p-6 space-y-8">
                    {/* Top Section: Profile & Contact */}
                    {!editing ? (
                        <div className="flex flex-col md:flex-row md:justify-between gap-8">
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-[#000]">Admin Profile</h2>
                                <div className="space-y-1">
                                    <p className="text-base text-black font-semibold">
                                        <span className="font-semibold text-[#FFB000]">First Name:</span>{' '}
                                        {firstName || '-'}
                                    </p>
                                    <p className="text-base text-black font-semibold">
                                        <span className="font-semibold text-[#FFB000]">Last Name:</span>{' '}
                                        {lastName || '-'}
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-[#000]">Contact Details</h2>
                                <div className="flex items-center gap-2 text-[#000]">
                                    <MdOutlineMailOutline size={20} color='#FFB000' />
                                    <span>{email || '-'}</span>
                                </div>
                                <div className="flex items-center gap-2 text-[#000]">
                                    <IoCallOutline size={20} color='#FFB000' />
                                    <span>{phone || '-'}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                            <div className="flex flex-col">
                                <label htmlFor="" className='block font-bold text-black mb-2'>First Name</label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="border p-2 rounded w-full max-w-md"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="" className='block font-bold text-black mb-2'>Last Name</label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="border p-2 rounded w-full max-w-md"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="" className='block font-bold text-black mb-2'>Email</label>
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="border p-2 rounded w-full max-w-md"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="" className='block font-bold text-black mb-2'>Mobile Number</label>
                                <input
                                    type="number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="border p-2 rounded w-full max-w-md"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="" className='block font-bold text-black mb-2'>Password</label>
                                <input
                                    type="text"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="border p-2 rounded w-full max-w-md"
                                />
                            </div>

                        </div>
                    )}

                    {editing && (
                        <button
                            onClick={handleUpdate}
                            disabled={loading1}
                            className="px-6 py-3 cursor-pointer bg-[#FFB000] text-white rounded shadow disabled:bg-gray-400"
                        >
                            {loading1 ? "Saving..." : "Save Changes"}
                        </button>
                    )}
                </div>
            )}
        </DashbaordLayout>
    );
};

export default AdminProfile;
