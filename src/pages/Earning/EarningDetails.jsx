import React, { useState } from 'react'
import DashbaordLayout from '../../components/DashbaordLayout'
import { AddCancelReasonModal, ConfirmModal } from '../../components/Modals/Modal';

import { IoSearch } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";


import { BiSolidMessageRounded } from "react-icons/bi";
import { FaPhoneAlt } from "react-icons/fa";
import { IoVideocam } from "react-icons/io5";
import { MdOutlineCalendarToday } from "react-icons/md";

import { LuBox } from "react-icons/lu";


import { useNavigate } from 'react-router-dom';



const chat = [
    {
        "id": 1,
        "userName": "Abhishek",
        "date": "21-May-2025",
        "time": "11.05 AM",
        "ratePerMin": 10,
        "duration": 10,
        "orderEarning": 100,
        "adviserEarning": 70,
        "adminEarning": 30
    },
    {
        "id": 2,
        "userName": "Suresh",
        "date": "21-May-2025",
        "time": "11.05 AM",
        "ratePerMin": 15,
        "duration": 10,
        "orderEarning": 150,
        "adviserEarning": 105,
        "adminEarning": 45
    },
    {
        "id": 3,
        "userName": "Ramesh",
        "date": "21-May-2025",
        "time": "11.05 AM",
        "ratePerMin": 15,
        "duration": 10,
        "orderEarning": 150,
        "adviserEarning": 105,
        "adminEarning": 45
    },
    {
        "id": 4,
        "userName": "Ganesh",
        "date": "21-May-2025",
        "time": "11.05 AM",
        "ratePerMin": 15,
        "duration": 10,
        "orderEarning": 150,
        "adviserEarning": 105,
        "adminEarning": 45
    },
    {
        "id": 5,
        "userName": "Vignesh",
        "date": "21-May-2025",
        "time": "11.05 AM",
        "ratePerMin": 15,
        "duration": 10,
        "orderEarning": 150,
        "adviserEarning": 105,
        "adminEarning": 45
    },
    {
        "id": 6,
        "userName": "Abhishek",
        "date": "21-May-2025",
        "time": "11.05 AM",
        "ratePerMin": 15,
        "duration": 10,
        "orderEarning": 100,
        "adviserEarning": 70,
        "adminEarning": 30
    }
]

const audio = [
    {
        "id": 1,
        "userName": "Abhishek",
        "date": "21-May-2025",
        "time": "11.05 AM",
        "ratePerMin": 10,
        "duration": 10,
        "orderEarning": 100,
        "adviserEarning": 70,
        "adminEarning": 30
    },
    {
        "id": 2,
        "userName": "Suresh",
        "date": "21-May-2025",
        "time": "11.05 AM",
        "ratePerMin": 15,
        "duration": 10,
        "orderEarning": 150,
        "adviserEarning": 105,
        "adminEarning": 45
    },
    {
        "id": 3,
        "userName": "Ramesh",
        "date": "21-May-2025",
        "time": "11.05 AM",
        "ratePerMin": 15,
        "duration": 10,
        "orderEarning": 150,
        "adviserEarning": 105,
        "adminEarning": 45
    },
    {
        "id": 4,
        "userName": "Ganesh",
        "date": "21-May-2025",
        "time": "11.05 AM",
        "ratePerMin": 15,
        "duration": 10,
        "orderEarning": 150,
        "adviserEarning": 105,
        "adminEarning": 45
    },
    {
        "id": 5,
        "userName": "Vignesh",
        "date": "21-May-2025",
        "time": "11.05 AM",
        "ratePerMin": 15,
        "duration": 10,
        "orderEarning": 150,
        "adviserEarning": 105,
        "adminEarning": 45
    },
    {
        "id": 6,
        "userName": "Abhishek",
        "date": "21-May-2025",
        "time": "11.05 AM",
        "ratePerMin": 15,
        "duration": 10,
        "orderEarning": 100,
        "adviserEarning": 70,
        "adminEarning": 30
    }
]
const video = [
    {
        "id": 1,
        "userName": "Abhishek",
        "date": "21-May-2025",
        "time": "11.05 AM",
        "ratePerMin": 10,
        "duration": 10,
        "orderEarning": 100,
        "adviserEarning": 70,
        "adminEarning": 30
    },
    {
        "id": 2,
        "userName": "Suresh",
        "date": "21-May-2025",
        "time": "11.05 AM",
        "ratePerMin": 15,
        "duration": 10,
        "orderEarning": 150,
        "adviserEarning": 105,
        "adminEarning": 45
    },
    {
        "id": 3,
        "userName": "Ramesh",
        "date": "21-May-2025",
        "time": "11.05 AM",
        "ratePerMin": 15,
        "duration": 10,
        "orderEarning": 150,
        "adviserEarning": 105,
        "adminEarning": 45
    },
    {
        "id": 4,
        "userName": "Ganesh",
        "date": "21-May-2025",
        "time": "11.05 AM",
        "ratePerMin": 15,
        "duration": 10,
        "orderEarning": 150,
        "adviserEarning": 105,
        "adminEarning": 45
    },
    {
        "id": 5,
        "userName": "Vignesh",
        "date": "21-May-2025",
        "time": "11.05 AM",
        "ratePerMin": 15,
        "duration": 10,
        "orderEarning": 150,
        "adviserEarning": 105,
        "adminEarning": 45
    },
    {
        "id": 6,
        "userName": "Abhishek",
        "date": "21-May-2025",
        "time": "11.05 AM",
        "ratePerMin": 15,
        "duration": 10,
        "orderEarning": 100,
        "adviserEarning": 70,
        "adminEarning": 30
    }
]

const package1 = [
    {
        "id": 1,
        "userName": "Abhishek",
        "date": "21-May-2025",
        "time": "11.05 AM",
        "adviserEarning": 7000,
        "Type": "Basic",
        "Price": "10,000",
        "adminEarning": 3000
    },
    {
        "id": 2,
        "userName": "Abhishek",
        "date": "21-May-2025",
        "time": "11.05 AM",
        "adviserEarning": 70,
        "Type": "Pro",
        "Price": "10,000",
        "adminEarning": 3000
    },
    {
        "id": 3,
        "userName": "Abhishek",
        "date": "21-May-2025",
        "time": "11.05 AM",
        "adviserEarning": 7000,
        "Type": "Economy",
        "Price": "10,000",
        "adminEarning": 3000
    },
    {
        "id": 4,
        "userName": "Abhishek",
        "date": "21-May-2025",
        "time": "11.05 AM",
        "adviserEarning": 7000,
        "Type": "Pro",
        "Price": "10,000",
        "adminEarning": 3000
    },
    {
        "id": 5,
        "userName": "Abhishek",
        "date": "21-May-2025",
        "time": "11.05 AM",
        "adviserEarning": 7000,
        "Type": "Economy",
        "Price": "10,000",
        "adminEarning": 3000
    },
    {
        "id": 6,
        "userName": "Abhishek",
        "date": "21-May-2025",
        "time": "11.05 AM",
        "adviserEarning": 7000,
        "Type": "Basic",
        "Price": "10,000",
        "adminEarning": 3000
    }
]






const EarningDetails = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [activeTab, setActiveTab] = useState("chat");

    const tabLabels = {
        chat: "Chat",
        audio: "Audio",
        video: "Video",
        package: "Package",
    };
    const activeTabLabel = tabLabels[activeTab] || "";


    const tabs = [
        {
            key: "chat",
            icon: BiSolidMessageRounded,
            value: 360,
            label: "Chat",
        },
        {
            key: "audio",
            icon: FaPhoneAlt,
            value: 120,
            label: "Audio",
        },
        {
            key: "video",
            icon: IoVideocam,
            value: 120,
            label: "Video",
        },
        {
            key: "package",
            icon: LuBox,
            value: 120,
            label: "Package",
        },
    ];
    const handleConfirm = () => {
        console.log("Suspension confirmed!");
        setShowModal(false);
    };
    return (
        <DashbaordLayout title="Total Earning"
            hedartitle={`Earning > ${activeTabLabel} Earning`}
            titleAction={
                <IoArrowBack size={25} color='#1C1B1F' className='cursor-pointer' onClick={() => navigate('/adviser/list')} />
            }
        >
            <ConfirmModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleConfirm}
                text="Delete"
            />

            <AddCancelReasonModal
                isOpen={showModal1}
                onClose={() => setShowModal1(false)}
            />
            <div className="mt-5">
                {/* Tabs */}
                <div className="flex items-center justify-between gap-2 overflow-hidden">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab.key)}
                            className={`w-full px-4 py-2 rounded-[8px] flex flex-col gap-2 items-start ${activeTab === tab.key ? "bg-[linear-gradient(161.63deg,_#002E78_15.02%,_#C8161A_146.66%)] text-white" : "bg-white text-[#000000]"
                                } transition duration-300`}
                        >
                            <tab.icon size={20} />
                            <h6 className='font-manrope font-[700] text-[24px] leading-[20px]'>{tab.value}</h6>
                            <p className='font-manrope font-[400] text-[12px] leading-[20px]'>{tab.label}</p>
                        </button>
                    ))}
                </div>
                <div className='flex items-center justify-between mb-4 mt-6'>
                    <div className='flex items-center gap-2'>
                        <div className='bg-white py-2 px-5 flex items-center justify-between rounded-[8px]'>
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
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='flex items-center gap-2'>
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
                </div>
                {activeTab === "chat" &&
                    <div className='overflow-x-auto min-h-screen'>
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr className="bg-white text-left font-urbanist text-md font-semibold text-[#0A0E15]">
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[10px] rounded-bl-[10px]">#</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">User Name</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Date & Time</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">₹/min</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Duration (min)</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Order Earning</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Adviser Earning</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tr-[10px] rounded-br-[10px]">Admin Earning</th>
                                </tr>
                            </thead>
                            <tbody className="font-manrope text-[15px] font-[400] text-[#000000]">
                                {chat.map((i, index) => (
                                    <tr key={index} className=" bg-white space-y-10 transition-all cursor-pointer" onClick={() => navigate('/adviser/list/details/1')}>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">{index + 1}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.userName}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.date}{i.time}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">₹{i.ratePerMin}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.duration}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">₹{i.orderEarning}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">₹{i.adviserEarning}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tr-[10px] rounded-br-[10px]">₹{i.adminEarning}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
                {activeTab === "audio" &&
                    <div className='overflow-x-auto min-h-screen'>
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr className="bg-white text-left font-urbanist text-md font-semibold text-[#0A0E15]">
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[10px] rounded-bl-[10px]">#</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">User Name</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Date & Time</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">₹/min</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Duration (min)</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Order Earning</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Adviser Earning</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]  rounded-tr-[10px] rounded-br-[10px]">Admin Earning</th>
                                </tr>
                            </thead>
                            <tbody className="font-manrope text-[15px] font-[400] text-[#000000]">
                                {audio.map((i, index) => (
                                    <tr key={index} className=" bg-white space-y-10 transition-all cursor-pointer" onClick={() => navigate('/adviser/list/details/1')}>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">{index + 1}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.userName}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.date}{i.time}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">₹{i.ratePerMin}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.duration}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">₹{i.orderEarning}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">₹{i.adviserEarning}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tr-[10px] rounded-br-[10px]">₹{i.adminEarning}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
                {activeTab === "video" &&
                    <div className='overflow-x-auto min-h-screen'>
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr className="bg-white text-left font-urbanist text-md font-semibold text-[#0A0E15]">
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[10px] rounded-bl-[10px]">#</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">User Name</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Date & Time</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">₹/min</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Duration (min)</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Order Earning</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Adviser Earning</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]  rounded-tr-[10px] rounded-br-[10px]">Admin Earning</th>
                                </tr>
                            </thead>
                            <tbody className="font-manrope text-[15px] font-[400] text-[#000000]">
                                {video.map((i, index) => (
                                    <tr key={index} className=" bg-white space-y-10 transition-all cursor-pointer" onClick={() => navigate('/adviser/list/details/1')}>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">{index + 1}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.userName}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.date}{i.time}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">₹{i.ratePerMin}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.duration}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">₹{i.orderEarning}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">₹{i.adviserEarning}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tr-[10px] rounded-br-[10px]">₹{i.adminEarning}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
                {activeTab === "package" &&
                    <div className='overflow-x-auto min-h-screen'>
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr className="bg-white text-left font-urbanist text-md font-semibold text-[#0A0E15]">
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[10px] rounded-bl-[10px]">#</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">User Name</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Price</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Type</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Date &Time</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Adviser Earning</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]  rounded-tr-[10px] rounded-br-[10px]">Admin Earning</th>
                                </tr>
                            </thead>
                            <tbody className="font-manrope text-[15px] font-[400] text-[#000000]">
                                {package1.map((i, index) => (
                                    <tr key={index} className=" bg-white space-y-10 transition-all cursor-pointer" onClick={() => navigate('/adviser/list/details/1')}>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">{index + 1}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.userName}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">₹{i.Price}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.Type}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.date}{i.time}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">₹{i.adviserEarning}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tr-[10px] rounded-br-[10px]">₹{i.adminEarning}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </DashbaordLayout>
    )
}

export default EarningDetails