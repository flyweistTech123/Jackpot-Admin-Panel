import React, { useCallback, useEffect, useState } from 'react'
import DashbaordLayout from '../../components/DashbaordLayout'


import { useNavigate } from 'react-router-dom';
import endPoints from '../../Repository/apiConfig';
import { getApi } from '../../Repository/Api';

import {FaCoins, FaWallet, FaChartPie, FaBullseye } from "react-icons/fa";
import { IoGameController } from "react-icons/io5";
import { AddRTPModal } from '../../components/Modals/Modal';


const Rtp = () => {
    const navigate = useNavigate();
    const [rtpData, setRTPData] = useState({});
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const fetchData = useCallback(async () => {
        setRTPData({})
        await getApi(endPoints.getRTP, {
            setResponse: setRTPData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch data!",
        })
    }, []);


    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <DashbaordLayout title="RTP"
            hedartitle="RTP"
            headerAction={
                <div className='flex items-center gap-2'>
                    <button onClick={()=>setShowModal(true)} className='bg-primary cursor-pointer  flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white'>
                        Add New RTP
                    </button>
                </div>
            }
        >
            <AddRTPModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                fetchdata={fetchData}
                data={rtpData?.data}
            />
            {loading ?
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#FFB000] border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-[#0A0E15] font-[600]">Loading...</p>
                </div>
                :
                <div className="sm:mt-5 mt-2 bg-white rounded-2xl p-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-6">
                        <div className="p-4 border rounded-lg flex items-center gap-4">
                            <IoGameController size={30} className="text-[#FFB000]" />
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Game</p>
                                <p className="text-lg font-semibold text-[#000]">{rtpData?.data?.totalGame || 0}</p>
                            </div>
                        </div>
                        <div className="p-4 border rounded-lg flex items-center gap-4">
                            <FaWallet size={30} className="text-[#FFB000]" />
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Amount</p>
                                <p className="text-lg font-semibold text-[#000]">{rtpData?.data?.totalAmount || 0}</p>
                            </div>
                        </div>
                        <div className="p-4 border rounded-lg flex items-center gap-4">
                            <FaCoins size={30} className="text-[#FFB000]" />
                            <div>
                                <p className="text-sm font-medium text-gray-500">Payout</p>
                                <p className="text-lg font-semibold text-[#000]">{rtpData?.data?.payout || 0}</p>
                            </div>
                        </div>
                        <div className="p-4 border rounded-lg flex items-center gap-4">
                            <FaChartPie size={30} className="text-[#FFB000]" />
                            <div>
                                <p className="text-sm font-medium text-gray-500">RTP</p>
                                <p className="text-lg font-semibold text-[#000]">{rtpData?.data?.rtp || 0}</p>
                            </div>
                        </div>
                        <div className="p-4 border rounded-lg flex items-center gap-4">
                            <FaChartPie size={30} className="text-[#FFB000]" />
                            <div>
                                <p className="text-sm font-medium text-gray-500">Target RTP</p>
                                <p className="text-lg font-semibold text-[#000]">{rtpData?.data?.targetRTP || 0}</p>
                            </div>
                        </div>
                        <div className="p-4 border rounded-lg flex items-center gap-4">
                            <FaBullseye size={30} className="text-[#FFB000]" />
                            <div>
                                <p className="text-sm font-medium text-gray-500">Spin</p>
                                <p className="text-lg font-semibold text-[#000]">{rtpData?.data?.spin || 0}</p>
                            </div>
                        </div>

                        <div className="p-4 border rounded-lg flex items-center gap-4">
                            <FaBullseye size={30} className="text-[#FFB000]" />
                            <div>
                                <p className="text-sm font-medium text-gray-500">Remaining Spin</p>
                                <p className="text-lg font-semibold text-[#000]">{rtpData?.data?.remainingSpin || 0}</p>
                            </div>
                        </div>
                        <div className="p-4 border rounded-lg flex items-center gap-4">
                            <FaBullseye size={30} className="text-[#FFB000]" />
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Spin Set</p>
                                <p className="text-lg font-semibold text-[#000]">{rtpData?.data?.totalSpinSet || 0}</p>
                            </div>
                        </div>


                    </div>
                </div>
            }
        </DashbaordLayout>
    )
}

export default Rtp