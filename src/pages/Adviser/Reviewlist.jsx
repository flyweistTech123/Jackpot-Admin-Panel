import React, { useState } from 'react'
import DashbaordLayout from '../../components/DashbaordLayout'
import { ConfirmModal, ReviewModal } from '../../components/Modals/Modal';


import { IoArrowBack } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { PiEyeBold } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineStarPurple500 } from "react-icons/md";


import img from '../../assets/images/Adviser1.png'
import img1 from '../../assets/images/Adviser2.png'
import img2 from '../../assets/images/Adviser3.png'
import { useNavigate } from 'react-router-dom';


const users = [
    {
        number: 1,
        img: img, // make sure img is imported or defined elsewhere
        name: "Abhishek Sharma",
        date: '21-May-2025 11.05 AM',
        type: 'Chat',
        duration: '70 min',
        rating: '4',
    },
    {
        number: 2,
        img: img1, // make sure img is imported or defined elsewhere
        name: "Jane Cooper",
        date: '21-May-2025 11.05 AM',
        type: 'Video',
        duration: '70 min',
        rating: '4',
    },
    {
        number: 3,
        img: img2, // make sure img is imported or defined elsewhere
        name: "Jenny Wilson",
        date: '21-May-2025 11.05 AM',
        type: 'Audio',
        duration: '70 min',
        rating: '5',
    },
];



const Reviewlist = () => {
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);


    const handleConfirm = () => {
        console.log("Suspension confirmed!");
        setShowModal(false);
    };



    return (
        <DashbaordLayout title="Review list"
            hedartitle={`Adviser Profile ${'>'} Review`}
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

            <ReviewModal
                isOpen={showModal1}
                onClose={() => setShowModal1(false)}
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
                    </div>
                    <div className='sm:flex items-center gap-2 hidden'>
                        <button className='bg-[#164E62] flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white'>
                            PDF
                        </button>
                        <button className='bg-[#164E62] flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white'>
                            CSV
                        </button>
                    </div>
                </div>
                <div className='overflow-x-auto'>
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-white text-left font-urbanist text-md font-semibold text-[#0A0E15]">
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[10px] rounded-bl-[10px]">#</th>
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Profile</th>
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">User Name</th>
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Date & Time</th>
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Type</th>
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Duration</th>
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Rating</th>
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tr-[10px] rounded-br-[10px]">Action</th>
                            </tr>
                        </thead>
                        <tbody className="font-manrope text-[15px] font-[400] text-[#000000]">
                            {users.map((i, index) => (
                                <tr key={index} className=" bg-white space-y-10 transition-all hover:bg-[#E1F7FF]">
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">{index + 1}</td>
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">
                                        <img
                                            src={i.img}
                                            alt="Profile"
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    </td>
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.name}</td>
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.date}</td>
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.type}</td>
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.duration}</td>
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">
                                        <div className="flex items-center gap-2">
                                            <button className="font-manrope text-[15px] font-[400] text-[#000000] flex items-center gap-1">
                                                {i.rating}
                                                <MdOutlineStarPurple500 color='#FFB400' size={20} />
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => setShowModal1(true)} className="font-manrope text-[15px] font-[400] text-[#0000FF] flex items-center gap-1">
                                                <PiEyeBold color='#0000FF' size={20} />
                                                Review
                                            </button>
                                            <button onClick={() => setShowModal(true)} className="font-manrope text-[15px] font-[400] text-[#C23A3A] flex items-center gap-1">
                                                <RiDeleteBin6Line color='#C23A3A' size={20} />
                                                Delete
                                            </button>
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

export default Reviewlist