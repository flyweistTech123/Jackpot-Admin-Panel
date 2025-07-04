import React, { useState } from 'react'
import DashbaordLayout from '../../components/DashbaordLayout'
import { AddCancelReasonModal, ConfirmModal } from '../../components/Modals/Modal';

import { IoSearch } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineSummarize } from "react-icons/md";
import { MdOutlineNoteAlt } from "react-icons/md";


import { BiSolidMessageRounded } from "react-icons/bi";
import { FaPhoneAlt } from "react-icons/fa";
import { IoVideocam } from "react-icons/io5";
import { MdOutlineCalendarToday } from "react-icons/md";



import { useNavigate } from 'react-router-dom';



const chat = [
    {
        "id": 1,
        "adviser": "Abhishek",
        "userName": "Sharma",
        "type": "Chat",
        "dateTime": "21-May-2025 11:05 AM",
        "status": "Upcoming",
        "ratePerMin": 100,
        "durationMin": "-",
        "amount": "-",
        "action": "Cancel"
    },
    {
        "id": 2,
        "adviser": "Abhishek",
        "userName": "Sharma",
        "type": "Chat",
        "dateTime": "21-May-2025 11:05 AM",
        "status": "Upcoming",
        "ratePerMin": 100,
        "durationMin": "-",
        "amount": "-",
        "action": "Cancel"
    },
    {
        "id": 3,
        "adviser": "Suresh",
        "userName": "Ramesh",
        "type": "Chat",
        "dateTime": "21-May-2025 11:05 AM",
        "status": "Completed",
        "ratePerMin": 100,
        "durationMin": 10,
        "amount": 100,
        "action": "Summary"
    },
    {
        "id": 4,
        "adviser": "Ganesh",
        "userName": "Vignesh",
        "type": "Chat",
        "dateTime": "21-May-2025 11:05 AM",
        "status": "Cancelled",
        "ratePerMin": 100,
        "durationMin": "-",
        "amount": "-",
        "action": "Reason"
    }
]
const audio = [
    {
        "id": 1,
        "adviser": "Abhishek",
        "userName": "Sharma",
        "type": "Audio Call",
        "dateTime": "21-May-2025 11:05 AM",
        "status": "Upcoming",
        "ratePerMin": 100,
        "durationMin": "-",
        "amount": "-",
        "action": "Cancel"
    },
    {
        "id": 2,
        "adviser": "Abhishek",
        "userName": "Sharma",
        "type": "Audio Call",
        "dateTime": "21-May-2025 11:05 AM",
        "status": "Upcoming",
        "ratePerMin": 100,
        "durationMin": "-",
        "amount": "-",
        "action": "Cancel"
    },
    {
        "id": 3,
        "adviser": "Suresh",
        "userName": "Ramesh",
        "type": "Audio Call",
        "dateTime": "21-May-2025 11:05 AM",
        "status": "Completed",
        "ratePerMin": 100,
        "durationMin": 10,
        "amount": 100,
        "action": "Summary"
    },
    {
        "id": 4,
        "adviser": "Ganesh",
        "userName": "Vignesh",
        "type": "Audio Call",
        "dateTime": "21-May-2025 11:05 AM",
        "status": "Cancelled",
        "ratePerMin": 100,
        "durationMin": "-",
        "amount": "-",
        "action": "Reason"
    }
]
const video = [
    {
        "id": 1,
        "adviser": "Abhishek",
        "userName": "Sharma",
        "type": "Video Call",
        "dateTime": "21-May-2025 11:05 AM",
        "status": "Upcoming",
        "ratePerMin": 100,
        "durationMin": "-",
        "amount": "-",
        "action": "Cancel"
    },
    {
        "id": 2,
        "adviser": "Abhishek",
        "userName": "Sharma",
        "type": "Video Call",
        "dateTime": "21-May-2025 11:05 AM",
        "status": "Upcoming",
        "ratePerMin": 100,
        "durationMin": "-",
        "amount": "-",
        "action": "Cancel"
    },
    {
        "id": 3,
        "adviser": "Suresh",
        "userName": "Ramesh",
        "type": "Video Call",
        "dateTime": "21-May-2025 11:05 AM",
        "status": "Completed",
        "ratePerMin": 100,
        "durationMin": 10,
        "amount": 100,
        "action": "Summary"
    },
    {
        "id": 4,
        "adviser": "Ganesh",
        "userName": "Vignesh",
        "type": "Video Call",
        "dateTime": "21-May-2025 11:05 AM",
        "status": "Cancelled",
        "ratePerMin": 100,
        "durationMin": "-",
        "amount": "-",
        "action": "Reason"
    }
]







const Appointment = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [activeTab, setActiveTab] = useState("chat");

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
    ];
    const handleConfirm = () => {
        console.log("Suspension confirmed!");
        setShowModal(false);
    };
    return (
        <DashbaordLayout title="Appointment Detail"
            hedartitle="Appointment Detail"
            headerAction={
                <div className='flex items-center gap-2'>
                    <button className='bg-[#164E62] flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white'>
                        PDF
                    </button>
                    <button className='bg-[#164E62] flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white'>
                        CSV
                    </button>
                </div>
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
            <div className="sm:mt-5 mt-2">
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
                <div className='flex items-center justify-between mb-4 mt-6 flex-wrap gap-2'>
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
                            Filter
                            <MdOutlineCalendarToday />
                        </button>
                    </div>
                    <div className='sm:flex items-center gap-2 hidden'>
                        <button className='bg-[#164E62] flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white'>
                            Filter
                            <MdOutlineCalendarToday />
                        </button>
                    </div>
                </div>
                {activeTab === "chat" &&
                    <div className='overflow-x-auto'>
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr className="bg-white text-left font-urbanist text-md font-semibold text-[#0A0E15]">
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[10px] rounded-bl-[10px]">#</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Adviser</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">User Name</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Type</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Date & Time</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Status</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">₹/min</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Duration (min)</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Amount ₹</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tr-[10px] rounded-br-[10px]">Action</th>
                                </tr>
                            </thead>
                            <tbody className="font-manrope text-[15px] font-[400] text-[#000000]">
                                {chat.map((i, index) => (
                                    <tr key={index} className=" bg-white space-y-10 transition-all hover:bg-[#E1F7FF]">
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">{index + 1}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.adviser}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.userName}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.type}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.dateTime}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0] font-[600]"
                                            style={{
                                                color: i.status === "Upcoming" ? '#FFC107'
                                                    : i.status === "Completed" ? '#008000' : '#FF0000'
                                            }
                                            }
                                        >
                                            {i.status}
                                        </td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.ratePerMin}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.durationMin}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.amount}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">
                                            {i.action === 'Summary' ?
                                                <button className="font-manrope text-[15px] font-[400] text-[#006F29] flex items-center gap-1">
                                                    <MdOutlineSummarize color='#006F29' size={20} />
                                                    Summary
                                                </button>
                                                : i.action === 'Cancel' ?
                                                    <button onClick={() => setShowModal1(true)} className="font-manrope text-[15px] font-[400] text-[#C23A3A] flex items-center gap-1">
                                                        <RiDeleteBin6Line color='#C23A3A' size={20} />
                                                        Cancel
                                                    </button>
                                                    :
                                                    <button className="font-manrope text-[15px] font-[400] text-[#362695] flex items-center gap-1">
                                                        <MdOutlineNoteAlt color='#362695' size={20} />
                                                        Reason
                                                    </button>
                                            }
                                        </td>
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
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Adviser</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">User Name</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Type</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Date & Time</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Status</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">₹/min</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Duration (min)</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Amount ₹</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tr-[10px] rounded-br-[10px]">Action</th>
                                </tr>
                            </thead>
                            <tbody className="font-manrope text-[15px] font-[400] text-[#000000]">
                                {audio.map((i, index) => (
                                    <tr key={index} className=" bg-white space-y-10 transition-all hover:bg-[#E1F7FF]">
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">{index + 1}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.adviser}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.userName}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.type}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.dateTime}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0] font-[600]"
                                            style={{
                                                color: i.status === "Upcoming" ? '#FFC107'
                                                    : i.status === "Completed" ? '#008000' : '#FF0000'
                                            }
                                            }
                                        >
                                            {i.status}
                                        </td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.ratePerMin}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.durationMin}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.amount}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">
                                            {i.action === 'Summary' ?
                                                <button className="font-manrope text-[15px] font-[400] text-[#006F29] flex items-center gap-1">
                                                    <MdOutlineSummarize color='#006F29' size={20} />
                                                    Summary
                                                </button>
                                                : i.action === 'Cancel' ?
                                                    <button onClick={() => setShowModal1(true)} className="font-manrope text-[15px] font-[400] text-[#C23A3A] flex items-center gap-1">
                                                        <RiDeleteBin6Line color='#C23A3A' size={20} />
                                                        Cancel
                                                    </button>
                                                    :
                                                    <button className="font-manrope text-[15px] font-[400] text-[#362695] flex items-center gap-1">
                                                        <MdOutlineNoteAlt color='#362695' size={20} />
                                                        Reason
                                                    </button>
                                            }
                                        </td>
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
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Adviser</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">User Name</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Type</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Date & Time</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Status</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">₹/min</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Duration (min)</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Amount ₹</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tr-[10px] rounded-br-[10px]">Action</th>
                                </tr>
                            </thead>
                            <tbody className="font-manrope text-[15px] font-[400] text-[#000000] ">
                                {video.map((i, index) => (
                                    <tr key={index} className=" bg-white space-y-10 transition-all hover:bg-[#E1F7FF]">
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">{index + 1}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.adviser}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.userName}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.type}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.dateTime}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0] font-[600]"
                                            style={{
                                                color: i.status === "Upcoming" ? '#FFC107'
                                                    : i.status === "Completed" ? '#008000' : '#FF0000'
                                            }
                                            }
                                        >
                                            {i.status}
                                        </td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.ratePerMin}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.durationMin}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.amount}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">
                                            {i.action === 'Summary' ?
                                                <button className="font-manrope text-[15px] font-[400] text-[#006F29] flex items-center gap-1">
                                                    <MdOutlineSummarize color='#006F29' size={20} />
                                                    Summary
                                                </button>
                                                : i.action === 'Cancel' ?
                                                    <button onClick={() => setShowModal1(true)} className="font-manrope text-[15px] font-[400] text-[#C23A3A] flex items-center gap-1">
                                                        <RiDeleteBin6Line color='#C23A3A' size={20} />
                                                        Cancel
                                                    </button>
                                                    :
                                                    <button className="font-manrope text-[15px] font-[400] text-[#362695] flex items-center gap-1">
                                                        <MdOutlineNoteAlt color='#362695' size={20} />
                                                        Reason
                                                    </button>
                                            }
                                        </td>
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

export default Appointment