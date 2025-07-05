import React, { useCallback, useEffect, useState } from 'react';
import DashbaordLayout from '../../components/DashbaordLayout';

import { IoArrowBack } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { FaPlayCircle, FaTrophy, FaCoins, FaWallet, FaCreditCard, FaChartPie, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

import { useNavigate, useParams } from 'react-router-dom';
import { RechargeWalletModal } from '../../components/Modals/Modal';
import endPoints from '../../Repository/apiConfig';
import { getApi } from '../../Repository/Api';
import { formatDate } from '../../utils/utils';

const UserDetails = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(false);

    const { id } = useParams();

    const fetchData = useCallback(async () => {
        setUserData([]);
        await getApi(endPoints.getuserbyid(id), {
            setResponse: setUserData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch user data!",
        });
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const kycStatus = userData?.data?.isKyc;

    return (
        <DashbaordLayout
            title="User Details"
            hedartitle={`User ${'>'} User Profile`}
            titleAction={
                <IoArrowBack
                    size={25}
                    color="#1C1B1F"
                    className="cursor-pointer"
                    onClick={() => navigate('/users')}
                />
            }
        >
            <RechargeWalletModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />

            {loading ? (
                <div className="flex flex-col items-center justify-center min-h-[50vh]">
                    <div className="w-16 h-16 border-4 border-[#FFB000] border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 font-semibold text-[#0A0E15]">Loading...</p>
                </div>
            ) : (
                <div className="mt-6 bg-white rounded-xl shadow-md p-6 space-y-8">
                    {/* Top Section: Profile & Contact */}
                    <div className="flex flex-col md:flex-row md:justify-between gap-8">
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-[#000]">User Profile</h2>
                            <div className="space-y-1">
                                <p className="text-base text-black font-semibold">
                                    <span className="font-semibold text-[#FFB000]">Name:</span>{' '}
                                    {userData?.data?.fullName || '-'}
                                </p>
                                <p className="text-base text-black font-semibold">
                                    <span className="font-semibold text-[#FFB000]">Joining Date:</span>{' '}
                                    {formatDate(userData?.data?.createdAt) || '-'}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                    {kycStatus === true || kycStatus === 'approved' ? (
                                        <span className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                                            <FaCheckCircle className="text-green-500" />
                                            KYC Verified
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium text-red-700 bg-red-100 rounded-full">
                                            <FaTimesCircle className="text-red-500" />
                                            KYC Pending
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-[#000]">Contact Details</h2>
                            <div className="flex items-center gap-2 text-[#000]">
                                <MdOutlineMailOutline size={20} color='#FFB000' />
                                <span>{userData?.data?.email || '-'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[#000]">
                                <IoCallOutline size={20} color='#FFB000' />
                                <span>{userData?.data?.mobileNumber || '-'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <hr className="border-[#000000B2]" />

                    {/* Middle Section: Game Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        <div className="p-4 border rounded-lg flex items-center gap-4">
                            <FaPlayCircle size={30} className="text-[#FFB000]" />
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Play</p>
                                <p className="text-lg font-semibold text-[#000]">{userData?.data?.totalPlay || 0}</p>
                            </div>
                        </div>
                        <div className="p-4 border rounded-lg flex items-center gap-4">
                            <FaTrophy size={30} className="text-[#FFB000]" />
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Win</p>
                                <p className="text-lg font-semibold text-[#000]">{userData?.data?.totalWin || 0}</p>
                            </div>
                        </div>
                        <div className="p-4 border rounded-lg flex items-center gap-4">
                            <FaCoins size={30} className="text-[#FFB000]" />
                            <div>
                                <p className="text-sm font-medium text-gray-500">Crypto Balance</p>
                                <p className="text-lg font-semibold text-[#000]">{userData?.data?.cryptoBalance || 0}</p>
                            </div>
                        </div>
                        <div className="p-4 border rounded-lg flex items-center gap-4">
                            <FaWallet size={30} className="text-[#FFB000]" />
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Earning</p>
                                <p className="text-lg font-semibold text-[#000]">{userData?.data?.earning || 0}</p>
                            </div>
                        </div>
                        <div className="p-4 border rounded-lg flex items-center gap-4">
                            <FaCreditCard size={30} className="text-[#FFB000]" />
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Credit</p>
                                <p className="text-lg font-semibold text-[#000]">{userData?.data?.credit || 0}</p>
                            </div>
                        </div>
                        <div className="p-4 border rounded-lg flex items-center gap-4">
                            <FaChartPie size={30} className="text-[#FFB000]" />
                            <div>
                                <p className="text-sm font-medium text-gray-500">RTP</p>
                                <p className="text-lg font-semibold text-[#000]">{userData?.data?.rtp || 0}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </DashbaordLayout>
    );
};

export default UserDetails;
