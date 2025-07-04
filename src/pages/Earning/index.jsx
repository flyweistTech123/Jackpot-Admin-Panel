import React, { useState } from 'react'
import DashbaordLayout from '../../components/DashbaordLayout'

import { IoSearch } from "react-icons/io5";
import { PiEyeBold } from "react-icons/pi";
import { MdOutlineCalendarToday } from "react-icons/md";


import { useNavigate } from 'react-router-dom';
import { ConfirmModal } from '../../components/Modals/Modal';



const earning = [
    {
        "id": 1,
        "adviser": "Abhishek",
        "category": "Health",
        "totalEarning": "₹85,000",
        "chatEarning": "₹5,000",
        "audioEarning": "₹10,000",
        "videoEarning": "₹20,000",
        "packageEarning": "₹50,000",
        "action": "View"
    },
    {
        "id": 2,
        "adviser": "Suresh",
        "category": "Legal",
        "totalEarning": "₹85,000",
        "chatEarning": "₹5,000",
        "audioEarning": "₹10,000",
        "videoEarning": "₹20,000",
        "packageEarning": "₹50,000",
        "action": "View"
    },
    {
        "id": 3,
        "adviser": "Ramesh",
        "category": "Health",
        "totalEarning": "₹85,000",
        "chatEarning": "₹5,000",
        "audioEarning": "₹10,000",
        "videoEarning": "₹20,000",
        "packageEarning": "₹50,000",
        "action": "View"
    },
    {
        "id": 4,
        "adviser": "Ganesh",
        "category": "Legal",
        "totalEarning": "₹85,000",
        "chatEarning": "₹5,000",
        "audioEarning": "₹10,000",
        "videoEarning": "₹20,000",
        "packageEarning": "₹50,000",
        "action": "View"
    },
    {
        "id": 5,
        "adviser": "Vignesh",
        "category": "Health",
        "totalEarning": "₹85,000",
        "chatEarning": "₹5,000",
        "audioEarning": "₹10,000",
        "videoEarning": "₹20,000",
        "packageEarning": "₹50,000",
        "action": "View"
    },
    {
        "id": 6,
        "adviser": "Abhishek",
        "category": "Legal",
        "totalEarning": "₹85,000",
        "chatEarning": "₹5,000",
        "audioEarning": "₹10,000",
        "videoEarning": "₹20,000",
        "packageEarning": "₹50,000",
        "action": "View"
    }
]







const Earning = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleConfirm = () => {
        console.log("Suspension confirmed!");
        setShowModal(false);
    };
    return (
        <DashbaordLayout title="Total Earning"
            hedartitle="Total Earning"
        >
            <ConfirmModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleConfirm}
                text="Delete"
            />
            <div className="sm:mt-5 mt-2">
                <div className='flex items-center justify-between mb-4 flex-wrap gap-2'>
                    <div className='flex items-center gap-2 flex-wrap'>
                        <div className='bg-white py-2 px-5 flex items-center justify-between rounded-[8px] w-full sm:w-min'>
                            <input
                                type="text"
                                placeholder='Search....'
                                className='flex-1 border-0 outline-0 font-urbanist placeholder:text-[15px] font-semibold placeholder:text-[#9EACBF]'
                            />
                            <IoSearch color='#000000' size={20} />
                        </div>
                        <button className='bg-[#164E62] flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white'>
                            Search
                        </button>
                        <button className='sm:hidden bg-[#164E62] flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white'>
                            PDF
                        </button>
                        <button className='sm:hidden bg-[#164E62] flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white'>
                            CSV
                        </button>
                        <button className='sm:hidden bg-[#164E62] flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white'>
                            Filter
                            <MdOutlineCalendarToday />
                        </button>
                    </div>
                    <div className='sm:flex items-center gap-2 hidden'>
                        <button className='bg-[#164E62] flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white'>
                            PDF
                        </button>
                        <button className='bg-[#164E62] flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white'>
                            CSV
                        </button>
                        <button className='bg-[#164E62] flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white'>
                            Filter
                            <MdOutlineCalendarToday />
                        </button>
                    </div>
                </div>
                <div className='overflow-x-auto min-h-screen'>
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-white text-left font-urbanist text-md font-semibold text-[#0A0E15]">
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[10px] rounded-bl-[10px]">#</th>
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Adviser</th>
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Category</th>
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Total  Earning</th>
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Chat Earning</th>
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Audio Earning</th>
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Video Earning</th>
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Package Earning</th>
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tr-[10px] rounded-br-[10px]">Action</th>
                            </tr>
                        </thead>
                        <tbody className="font-manrope text-[15px] font-[400] text-[#000000]">
                            {earning.map((i, index) => (
                                <tr key={index} className=" bg-white space-y-10 transition-all hover:bg-[#E1F7FF]">
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">{index + 1}</td>
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.adviser}</td>
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.category}</td>
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.totalEarning}</td>
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.chatEarning}</td>
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.audioEarning}</td>
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.videoEarning}</td>
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.packageEarning}</td>
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">
                                        <button onClick={() => navigate(`/earning/details/${index + 1}`)} className="font-manrope text-[15px] font-[400] text-[#0000FF] flex items-center gap-1">
                                            <PiEyeBold color='#0000FF' size={20} />
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashbaordLayout>
    )
}

export default Earning