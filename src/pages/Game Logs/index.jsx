import React, { useCallback, useEffect, useState } from 'react'
import DashbaordLayout from '../../components/DashbaordLayout'

import { FiEdit } from "react-icons/fi";

import { useNavigate } from 'react-router-dom';
import endPoints from '../../Repository/apiConfig';
import { getApi } from '../../Repository/Api';
import { formatDate } from '../../utils/utils';
import Pagination from '../../components/Pagination/Pagination';


const GameLogs = () => {
    const navigate = useNavigate();
    const [gamelogsData, setGameLogsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        limit: 10,
        totalPages: 1,
        page: 1,
        hasPrevPage: false,
        hasNextPage: false,
    });

    const [timeframe, setTimeframe] = useState("monthly");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [redeemedStatus, setRedeemedStatus] = useState("");





    const fetchData = async ({
        page = 1,
        limit = 10,
        timeframe = "",
        startDate = "",
        endDate = "",
        userId = "",
        redeemedStatus = "",
    }) => {
        const query = {
            page,
            limit,
            timeframe,
            startDate,
            endDate,
            userId,
            redeemedStatus,
        };

        await getApi(endPoints.getallgameslogs(query), {
            setResponse: setGameLogsData,
            setLoading: setLoading,
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
        fetchData({
            page: pagination.page,
            limit: pagination.limit,
            timeframe,
            startDate,
            endDate,
            redeemedStatus,
        });
    }, [pagination.page]);

    const applyFilters = () => {
        setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page
        fetchData({
            page: 1,
            limit: pagination.limit,
            timeframe,
            startDate,
            endDate,
            redeemedStatus,
        });
    };


    const resetFilters = () => {
        setTimeframe("");
        setStartDate("");
        setEndDate("");
        setRedeemedStatus("");
        setPagination((prev) => ({ ...prev, page: 1 }));
        fetchData({
            page: 1,
            limit: pagination.limit,
            timeframe: "",
            startDate: "",
            endDate: "",
            redeemedStatus: "",
        });
    };




    return (
        <DashbaordLayout title="Game Logs"
            hedartitle="Game Logs"
        >
            <div className="sm:mt-3 mt-2">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                    {/* Timeframe */}
                    <select
                        value={timeframe}
                        onChange={(e) => {
                            setTimeframe(e.target.value);
                            setPagination((prev) => ({ ...prev, page: 1 }));
                        }}
                        className="bg-white border px-4 py-2 rounded-md text-sm"
                    >
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

                <div className='overflow-x-auto'>
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-white text-left font-urbanist text-md font-semibold text-[#0A0E15]">
                                <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[10px] rounded-bl-[10px]">#</th>
                                <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">User Name</th>
                                <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">User Email</th>
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
                            {loading ?
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
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">{i?.userId?.fullName}</td>
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">{i?.userId?.email}</td>
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
                                                    <button onClick={() => navigate(`/users/details/${i?._id}`)} className="font-manrope cursor-pointer text-[15px] font-[400] text-[#11968A] flex items-center gap-1">
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
    )
}

export default GameLogs