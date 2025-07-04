import React, { useState } from 'react'
import DashbaordLayout from '../../components/DashbaordLayout'

import { IoSearch } from "react-icons/io5";
import { PiEyeBold } from "react-icons/pi";
import { MdOutlineCalendarToday } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";


import { useNavigate } from 'react-router-dom';
import { ConfirmModal } from '../../components/Modals/Modal';



const earning = [
    {
        "id": 1,
        "adviser": "Abhishek",
        "category": "Health",
        "username": "Ramesh",
        "price": "₹100",
        "type": "Call",
        "datetime": "21-May-2025 11.05 AM",
        "status": "Active",
    },
    {
        "id": 2,
        "adviser": "Suresh",
        "category": "Legal",
        "username": "Ramesh",
        "price": "₹100",
        "type": "Call",
        "datetime": "21-May-2025 11.05 AM",
        "status": "Expired",
    },
    {
        "id": 3,
        "adviser": "Ramesh",
        "category": "Health",
        "username": "Ramesh",
        "price": "₹100",
        "type": "Call",
        "datetime": "21-May-2025 11.05 AM",
        "status": "Active",
    },
    {
        "id": 4,
        "adviser": "Ganesh",
        "category": "Legal",
        "username": "Ramesh",
        "price": "₹100",
        "type": "Call",
        "datetime": "21-May-2025 11.05 AM",
        "status": "Expired",
    },
    {
        "id": 5,
        "adviser": "Vignesh",
        "category": "Health",
        "username": "Ramesh",
        "price": "₹100",
        "type": "Call",
        "datetime": "21-May-2025 11.05 AM",
        "status": "Active",
    },
    {
        "id": 6,
        "adviser": "Abhishek",
        "category": "Legal",
        "username": "Ramesh",
        "price": "₹100",
        "type": "Call",
        "datetime": "21-May-2025 11.05 AM",
        "status": "Active",
    }
]







const PackageEarning = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleConfirm = () => {
        console.log("Suspension confirmed!");
        setShowModal(false);
    };
    return (
        <DashbaordLayout title="Package Earning"
            hedartitle="Package Earning"
            titleAction={
                <IoArrowBack size={25} color='#1C1B1F' className='cursor-pointer' onClick={() => navigate(-1)} />
            }
        >
            <ConfirmModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleConfirm}
                text="Delete"
            />
            <div className="mt-5">
                <div className='flex items-center justify-between mb-4'>
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
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Adviser Name</th>
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Category</th>
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">User Name</th>
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Price</th>
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Type</th>
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Date &Time</th>
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tr-[10px] rounded-br-[10px]">Status</th>
                            </tr>
                        </thead>
                        <tbody className="font-manrope text-[15px] font-[400] text-[#000000]">
                            {earning.map((i, index) => (
                                <tr key={index} className=" bg-white space-y-10 transition-all">
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">{index + 1}</td>
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.adviser}</td>
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.category}</td>
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.username}</td>
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.price}</td>
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.type}</td>
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.datetime}</td>
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0] font-[600]"
                                        style={{
                                            color: i.status === "Upcoming" ? '#FFC107'
                                                : i.status === "Active" ? '#008000' : '#FF0000'
                                        }
                                        }
                                    >
                                        {i.status}
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

export default PackageEarning