import React, { useState } from 'react'
import DashbaordLayout from '../../components/DashbaordLayout'

import { IoSearch } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";


import img from '../../assets/images/blog1.png'
import img1 from '../../assets/images/blog2.jpg'
import img2 from '../../assets/images/blog3.png'

import { useNavigate } from 'react-router-dom';
import { AddBannerModal } from '../../components/Modals/Modal';
import { MdOutlineCalendarToday } from "react-icons/md";



const cardData = [
    {
        id: 1,
        image: img,
        date: "October 19, 2023",
        readTime: "10 mins read",
        title: "Navigating the New York Rental Market",
        description:
            "Navigating the New York Rental Market Navigating the New York Rental Market Navigating the New York Rental Market Navigating the New York Rental Market",
    },
    {
        id: 2,
        image: img1,
        date: "October 19, 2023",
        readTime: "10 mins read",
        title: "Navigating the New York Rental Market",
        description:
            "Navigating the New York Rental Market Navigating the New York Rental Market Navigating the New York Rental Market Navigating the New York Rental Market",
    },
    {
        id: 3,
        image: img2,
        date: "October 19, 2023",
        readTime: "10 mins read",
        title: "Navigating the New York Rental Market",
        description:
            "Navigating the New York Rental Market Navigating the New York Rental Market Navigating the New York Rental Market Navigating the New York Rental Market",
    },
]






const BannerManagement = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [toggles, setToggles] = useState(
        cardData.reduce((acc, card) => ({ ...acc, [card.id]: true }), {})
    );

    const handleToggle = (id) => {
        setToggles((prev) => ({ ...prev, [id]: !prev[id] }));
    };
    return (
        <DashbaordLayout title="Banner"
            hedartitle="Banner"
            headerAction={
                <div className='flex items-center gap-2'>
                    <button onClick={() => setShowModal(true)} className='bg-[#164E62] flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white'>
                        Add Banner
                    </button>
                </div>
            }
        >
            <AddBannerModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
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
                <div className='overflow-x-auto min-h-screen'>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-2">
                        {cardData.map((card) => (
                            <div key={card.id} className="bg-white rounded-[8px] p-2.5 overflow-hidden shadow-sm hover:bg-[#E1F7FF]">
                                <img src={card.image} alt={card.title} className="w-full h-[250px] rounded-tr-[16px] rounded-tl-[16px] object-cover" />

                                <div className="pt-2 space-y-3">
                                    <div className='flex items-center gap-2'>
                                        <MdOutlineCalendarToday color='#1C1B1F' size={20} />
                                        <h6 className='font-manrope font-[500] text-[14px] text-[#484848] leading-[20px]'>From October 19, 2025</h6>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <MdOutlineCalendarToday color='#1C1B1F' size={20} />
                                        <h6 className='font-manrope font-[500] text-[14px] text-[#484848] leading-[20px]'>To October 30, 2025</h6>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <button className="font-roboto font-[500] text-[14px] text-[#5C5C5C] leading-[18px] flex items-center gap-1">
                                            <FiEdit /> Edit
                                        </button>

                                        {/* Toggle Switch */}
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only"
                                                checked={toggles[card.id]}
                                                onChange={() => handleToggle(card.id)}
                                            />
                                            <div className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 duration-300 ${toggles[card.id] ? 'bg-green-400' : 'bg-gray-300'}`}>
                                                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${toggles[card.id] ? 'translate-x-4' : ''}`}></div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashbaordLayout>
    )
}

export default BannerManagement