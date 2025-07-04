import React, { useState } from 'react'
import DashbaordLayout from '../../components/DashbaordLayout'

import { IoSearch } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";


import img from '../../assets/images/Adviser1.png'
import img1 from '../../assets/images/Adviser2.png'
import img2 from '../../assets/images/Adviser3.png'
import { useNavigate } from 'react-router-dom';
import { ConfirmModal } from '../../components/Modals/Modal';



const users = [
    {
        number: 1,
        img: img,
        name: "Abhishek Sharma",
        role: 'User',
        number: '6847839417',
        email: 'email@gmail.com',
        requesteddate: '21-May-2025 11.05 AM',
        action: 'Approve',
    },
    {
        number: 2,
        img: img1,
        name: "Jane Cooper",
        role: 'Adviser',
        number: '6847839417',
        email: 'email@gmail.com',
        requesteddate: '21-May-2025 11.05 AM',
        action: 'Approved',
    },
    {
        number: 3,
        img: img2,
        name: "Jenny Wilson",
        role: 'User',
        number: '6847839417',
        email: 'email@gmail.com',
        requesteddate: '21-May-2025 11.05 AM',
        action: 'Approved',
    },
];







const DeleteAccountRequest = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleConfirm = () => {
        console.log("Suspension confirmed!");
        setShowModal(false);
    };
    return (
        <DashbaordLayout title="Delete Account request"
            hedartitle={`Support Management ${'>'} Delete Account request`}
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
                    </div>

                </div>
                <div className='overflow-x-auto'>
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-white text-left font-urbanist text-md font-semibold text-[#0A0E15]">
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[10px] rounded-bl-[10px]">#</th>
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Profile</th>
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Name</th>
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Role</th>
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Number</th>
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Email</th>
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Requested Date</th>
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tr-[10px] rounded-br-[10px]">Action</th>
                            </tr>
                        </thead>
                        <tbody className="font-manrope text-[15px] font-[400] text-[#000000]">
                            {users.map((i, index) => (
                                <tr key={index} className=" bg-white space-y-10 transition-all cursor-pointer hover:bg-[#E1F7FF]" onClick={() => navigate('/adviser/list/details/1')}>
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">{index + 1}</td>
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">
                                        <img
                                            src={i.img}
                                            alt="Profile"
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    </td>
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.name}</td>
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.role}</td>
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.number}</td>
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.email}</td>
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.requesteddate}</td>
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">
                                        <div className="flex items-center gap-2">
                                            {i.action === "Approve" ?
                                                <button onClick={() => setShowModal(true)} className="font-manrope text-[15px] font-[400] text-[#11968A] flex items-center gap-1">
                                                    <FaCheck color='#11968A' size={20} />
                                                    Approve
                                                </button>
                                                :
                                                <button className="font-manrope text-[15px] font-[400] text-[#000000] flex items-center gap-1">
                                                    Approved
                                                </button>
                                            }
                                        </div>
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

export default DeleteAccountRequest