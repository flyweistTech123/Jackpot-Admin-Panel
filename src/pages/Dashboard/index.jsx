import React, { useCallback, useEffect, useState } from 'react'
import DashbaordLayout from '../../components/DashbaordLayout'


import { PiEyeBold } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { FaRegUser, FaHourglassHalf } from "react-icons/fa";
import { GrGamepad } from "react-icons/gr";
import { GrMoney } from "react-icons/gr";
import { GiReceiveMoney } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";
import { GiPayMoney } from "react-icons/gi";



import { Link, useNavigate } from 'react-router-dom';
import { getApi } from '../../Repository/Api';
import endPoints from '../../Repository/apiConfig';
import { formatDate } from '../../utils/utils';
import { UpdateGameLogsModal } from '../../components/Modals/Modal';








const Dashboard = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);
    const [gamelogsData, setGameLogsData] = useState([]);
    const [countData, setCountData] = useState({});
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [pagination, setPagination] = useState({
        limit: 5,
        totalPages: 1,
        page: 1,
        hasPrevPage: false,
        hasNextPage: false,
    });

    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);



    const fetchData = useCallback(async () => {
        setUserData([])
        await getApi(endPoints.getallUser(pagination.page, pagination.limit), {
            setResponse: setUserData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch user data!",
        })
    }, [pagination.page, pagination.limit]);


    const fetchGamesLogsData = useCallback(async () => {
        setGameLogsData([])
        await getApi(endPoints.getallgameslogs(pagination.page, pagination.limit), {
            setResponse: setGameLogsData,
            setLoading: setLoading1,
            errorMsg: "Failed to fetch game logs!",
        })
    }, [pagination.page, pagination.limit]);


    const fetchCountData = useCallback(async () => {
        setCountData({})
        await getApi(endPoints.getAllCount, {
            setResponse: setCountData,
            setLoading: setLoading2,
            errorMsg: "Failed to fetch data!",
        })
    }, []);


    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        fetchGamesLogsData();
    }, [fetchGamesLogsData]);


    useEffect(() => {
        fetchCountData();
    }, [fetchCountData]);


    const stats = [
        {
            label: "Total User",
            value: countData?.data?.totalUser ?? 0,
            icon: <FaRegUser className="text-[#4CAF50]" />,
            link: '/users',
        },
        {
            label: "KYC Done",
            value: countData?.data?.userKycDone ?? 0,
            icon: <FaCheck className="text-[#2196F3]" />,
            link: '/users',
        },
        {
            label: "KYC Pending",
            value: countData?.data?.userKycPending ?? 0,
            icon: <FaHourglassHalf className="text-[#FFC107]" />, // Amber
            link: '/users',
        },
        {
            label: "Total Games",
            value: countData?.data?.totalGame ?? 0,
            icon: <GrGamepad className="text-[#9C27B0]" />, // Purple
            link: '/game-logs',
        },
        {
            label: "Payout Request (Game)",
            value: countData?.data?.totalPayoutRequestGame ?? 0,
            icon: <GrMoney className="text-[#FF5722]" />, // Deep Orange
            link: '/game-logs',
        },
        {
            label: "Payout Request (Redeemed)",
            value: countData?.data?.totalPayoutRequestRedeemed ?? 0,
            icon: <GiPayMoney className="text-[#3F51B5]" />, // Indigo
            link: '/game-logs',
        },
        {
            label: "Total Earning Redeemed",
            value: countData?.data?.totalEarningRedeemed ?? 0,
            icon: <GiTakeMyMoney className="text-[#00BCD4]" />, // Cyan
        },
        {
            label: "Admin Earning",
            value: countData?.data?.totalAdminEarning ?? 0,
            icon: <GiReceiveMoney className="text-[#E91E63]" />, // Pink
        },
    ];


    const openEditModal = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };


    return (
        <DashbaordLayout
            hedartitle="Dashboard"
        >
            <UpdateGameLogsModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                fetchdata={fetchData}
                data={selectedItem}
            />
            {loading || loading1 || loading2 ?
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#FFB000] border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-[#0A0E15] font-[600]">Loading...</p>
                </div>
                :
                <div className='mb-5'>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-5">
                        {stats.map((item, index) => (
                            <Link to={item.link} key={index}>
                                <div className="bg-white shadow-md rounded-[8px] px-4 py-3 flex flex-col items-start cursor-pointer">
                                    <div className="text-3xl mb-1">{item.icon}</div>
                                    <div>
                                        <h2 className="font-manrope text-lg sm:text-[24px] font-bold text-[#000000]">
                                            {item.value}
                                        </h2>
                                        <p className="font-manrope text-sm font-[500] text-[#000000]">
                                            {item.label}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mb-5">
                        <div className='flex items-center justify-between mb-4'>
                            <label htmlFor="" className='block font-manrope text-sm font-bold text-[#000000]'>New Users</label>
                            <button onClick={() => navigate("/users")} className='bg-primary cursor-pointer flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white hover:underline'>
                                View All Users
                            </button>
                        </div>
                        <div className='overflow-x-auto'>
                            <table className="min-w-full border-collapse">
                                <thead>
                                    <tr className="bg-white text-left font-urbanist text-md font-semibold text-[#0A0E15]">
                                        <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[10px] rounded-bl-[10px]">#</th>
                                        <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">Name</th>
                                        <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">Email</th>
                                        <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">Contact</th>
                                        <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">KYC</th>
                                        <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">Earning</th>
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
                                        (!userData?.data?.docs || userData?.data?.docs?.length === 0) ? (
                                            <tr>
                                                <td colSpan="9" className='text-center'>
                                                    <p className='font-urbanist text-md font-semibold text-[#0A0E15]'>No data available!</p>
                                                </td>
                                            </tr>
                                        ) :
                                            userData?.data?.docs?.map((i, index) => (
                                                <tr key={index} className=" bg-white space-y-10 transition-all hover:bg-[#E1F7FF]">
                                                    <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">{index + 1}</td>
                                                    <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">{i.fullName}</td>
                                                    <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">{i.email}</td>
                                                    <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">{i.mobileNumber}</td>
                                                    <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">
                                                        {i.isKyc ? <FaCheck color='#34C759' size={20} /> : <IoClose color='#F04D58' size={20} />}
                                                    </td>
                                                    <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">{i.earning}</td>
                                                    <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">
                                                        <div className="flex items-center gap-2">
                                                            <button onClick={() => navigate(`/users/details/${i?._id}`)} className="font-manrope cursor-pointer text-[15px] font-[400] text-[#11968A] flex items-center gap-1">
                                                                <PiEyeBold color='#FFB000' size={20} />
                                                            </button>
                                                            <button onClick={() => handleDeleteClick(i?._id)} className="font-manrope cursor-pointer text-[15px] font-[400] text-[#C23A3A] flex items-center gap-1">
                                                                <RiDeleteBin6Line color='#C23A3A' size={20} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="">
                        <div className='flex items-center justify-between mb-4'>
                            <label htmlFor="" className='block font-manrope text-sm font-bold text-[#000000]'>Game Logs</label>
                            <button onClick={() => navigate("/game-logs")} className='bg-primary cursor-pointer flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white hover:underline'>
                                View All Game Logs
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
                    </div>
                </div>
            }
        </DashbaordLayout>
    )
}

export default Dashboard