import React, { useCallback, useEffect, useState } from 'react';
import DashbaordLayout from '../../components/DashbaordLayout';

import { IoArrowBack } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { FaPlayCircle, FaTrophy, FaCoins, FaWallet, FaCreditCard, FaChartPie, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

import { useNavigate, useParams } from 'react-router-dom';
import endPoints from '../../Repository/apiConfig';
import { getApi } from '../../Repository/Api';
import { formatDate } from '../../utils/utils';
import Pagination from '../../components/Pagination/Pagination';
import { UpdateGameLogsModal } from '../../components/Modals/Modal';

const UserDetails = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [gamelogsData, setGameLogsData] = useState([]);
    const [timeframe, setTimeframe] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [redeemedStatus, setRedeemedStatus] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);



    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);

    const [pagination, setPagination] = useState({
        limit: 10,
        totalPages: 1,
        page: 1,
        hasPrevPage: false,
        hasNextPage: false,
    });


    const { id } = useParams();

    const userId = id;

    const fetchData = useCallback(async () => {
        setUserData({});
        await getApi(endPoints.getuserbyid(id), {
            setResponse: setUserData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch user data!",
        });
    }, [id]);

    const fetchGameHistoryData = async ({
        page = 1,
        limit = 10,
        timeframe = "",
        startDate = "",
        endDate = "",
        userId: passedUserId,
        redeemedStatus = "",
    }) => {
        const query = {
            page,
            limit,
            timeframe,
            startDate,
            endDate,
            userId: passedUserId || userId, // ✅ fallback to outer scope userId!
            redeemedStatus,
        };

        await getApi(endPoints.getallgameslogs(query), {
            setResponse: setGameLogsData,
            setLoading: setLoading1,
            errorMsg: "Failed to fetch game logs!",
        });
    };


    useEffect(() => {
        setPagination((prevPagination) => ({
            ...prevPagination,
            totalPages: gamelogsData?.data?.totalPages,
            hasPrevPage: gamelogsData?.data?.hasPrevPage,
            hasNextPage: gamelogsData?.data?.hasNextPage,
        }));
    }, [gamelogsData]);



    useEffect(() => {
        fetchGameHistoryData({
            page: pagination.page,
            limit: pagination.limit,
            timeframe,
            startDate,
            endDate,
            userId, // ✅ here it's correct
            redeemedStatus,
        });
    }, [pagination.page]);


    const applyFilters = () => {
        setPagination((prev) => ({ ...prev, page: 1 }));
        fetchGameHistoryData({
            page: 1,
            limit: pagination.limit,
            timeframe,
            startDate,
            endDate,
            redeemedStatus,
            userId, // ✅ always include it!
        });
    };



    const resetFilters = () => {
        setTimeframe("");
        setStartDate("");
        setEndDate("");
        setRedeemedStatus("");
        setPagination((prev) => ({ ...prev, page: 1 }));
        fetchGameHistoryData({
            page: 1,
            limit: pagination.limit,
            timeframe: "",
            startDate: "",
            endDate: "",
            redeemedStatus: "",
            userId, // ✅ always include this!
        });
    };


    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const kycStatus = userData?.data?.isKyc;



    const openEditModal = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

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
            <UpdateGameLogsModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                fetchdata={fetchData}
                data={selectedItem}
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

                    {/* Divider */}
                    {/* <hr className="border-[#000000B2]" /> */}

                </div>
            )}

            <div className='space-y-5 mt-5'>
                <div className='flex items-center justify-between flex-wrap gap-3'>
                    <h2 className="font-urbanist text-[18px] font-[600] text-[#0A0E15] whitespace-nowrap">
                        Game Play History
                    </h2>
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Timeframe */}
                        <select
                            value={timeframe}
                            onChange={(e) => {
                                setTimeframe(e.target.value);
                                setPagination((prev) => ({ ...prev, page: 1 }));
                            }}
                            className="bg-white border px-4 py-2 rounded-md text-sm"
                        >
                            <option value="">Select Time Frame</option>
                            <option value="monthly">Monthly</option>
                            <option value="weekly">Weekly</option>
                            <option value="custom">Custom</option>
                        </select>

                        {/* Date range if custom */}
                        {timeframe === "custom" && (
                            <>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="bg-white border px-4 py-2 rounded-md text-sm"
                                />
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="bg-white border px-4 py-2 rounded-md text-sm"
                                />
                            </>
                        )}
                        {/* Redeemed Status */}
                        <select
                            value={redeemedStatus}
                            onChange={(e) => setRedeemedStatus(e.target.value)}
                            className="bg-white border px-4 py-2 rounded-md text-sm"
                        >
                            <option value="">All</option>
                            <option value="notAllowed">Not Allowed</option>
                            <option value="pending">Pending</option>
                            <option value="request">Request</option>
                            <option value="redeemed">Redeemed</option>
                        </select>

                        <button
                            onClick={applyFilters}
                            className="bg-primary cursor-pointer text-white font-semibold px-4 py-2 rounded-md text-sm"
                        >
                            Apply Filters
                        </button>
                        <button
                            onClick={resetFilters}
                            className="bg-gray-500 text-white font-semibold cursor-pointer px-4 py-2 rounded-md text-sm"
                        >
                            Reset Filters
                        </button>
                    </div>
                </div>
                <div className='overflow-x-auto'>
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-white text-left font-urbanist text-md font-semibold text-[#0A0E15]">
                                <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[10px] rounded-bl-[10px]">#</th>
                                <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">Amount Played</th>
                                <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">Follow Me Price</th>
                                <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">Amount Won</th>
                                <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">Game Status</th>
                                <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">Redeemed Status</th>
                                <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">Created At</th>
                                <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0] rounded-tr-[10px] rounded-br-[10px]">Action</th>
                            </tr>
                        </thead>
                        <tbody className="font-manrope text-[15px] font-[400] text-[#000000]">
                            {loading1 ?
                                <tr>
                                    <td colSpan="9">
                                        <div className="text-center">
                                            <div className="w-16 h-16 border-4 border-[#FFB000] border-t-transparent rounded-full animate-spin mx-auto"></div>
                                            <p className="mt-4 text-[#0A0E15] font-[600]">Loading...</p>
                                        </div>
                                    </td>
                                </tr>
                                :
                                (!gamelogsData?.data?.docs || gamelogsData?.data?.docs?.length === 0) ? (
                                    <tr>
                                        <td colSpan="9" className='text-center'>
                                            <p className='font-urbanist text-md font-semibold text-[#0A0E15]'>No data available!</p>
                                        </td>
                                    </tr>
                                ) :
                                    gamelogsData?.data?.docs?.map((i, index) => (
                                        <tr key={index} className=" bg-white space-y-10 transition-all hover:bg-[#E1F7FF]">
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">{index + 1}</td>
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">{i?.amountPlayed}</td>
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">{i?.followMePrice}</td>
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">{i?.amountWon}</td>
                                            <td
                                                className={`px-4 py-2.5 border-b-10 border-[#E2E8F0] 
                                                                        ${i?.gameStatus === 'lose' ? "text-[#F04D58] font-bold" : "text-[#34C759] font-bold"}
                                                                        `}
                                            >
                                                {i?.gameStatus}
                                            </td>
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">{i?.redeemedStatus}</td>
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">{formatDate(i?.createdAt)}</td>

                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">
                                                <div className="flex items-center gap-2">
                                                    <button onClick={() => openEditModal(i)} className="font-manrope cursor-pointer text-[15px] font-[400] text-[#11968A] flex items-center gap-1">
                                                        <FiEdit color='#FFB000' size={20} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                        </tbody>
                    </table>
                </div>
                {gamelogsData?.data?.docs?.length > 0 && (
                    <Pagination
                        currentPage={pagination.page}
                        totalPages={pagination.totalPages}
                        hasPrevPage={pagination.hasPrevPage}
                        hasNextPage={pagination.hasNextPage}
                        onPageChange={(newPage) => {
                            setPagination((prev) => ({ ...prev, page: newPage }));
                        }}
                    />
                )}
            </div>
        </DashbaordLayout>
    );
};

export default UserDetails;
