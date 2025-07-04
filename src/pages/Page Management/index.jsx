import React, { useState } from 'react'
import DashbaordLayout from '../../components/DashbaordLayout'

import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";



import { useNavigate } from 'react-router-dom';
import {AddPageManagementModal } from '../../components/Modals/Modal';



const cardData = [
    {
        id: 1,
        title: "Privacy Policy (User)",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem.",
    },
    {
        id: 2,
        title: "Terms And Conditions (Adviser)",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem.",
    },
    {
        id: 3,
        title: "About us (Both)",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem.",
    },
    {
        id: 4,
        title: "Privacy Policy (User)",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem.",
    },
]






const PageManagement = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [toggles, setToggles] = useState(
        cardData.reduce((acc, card) => ({ ...acc, [card.id]: true }), {})
    );

    const handleToggle = (id) => {
        setToggles((prev) => ({ ...prev, [id]: !prev[id] }));
    };
    return (
        <DashbaordLayout title="Page Management"
            hedartitle="Page Management"
            headerAction={
                <div className='flex items-center gap-2'>
                    <button onClick={() => setShowModal(true)} className='bg-[#164E62] flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white'>
                        Add Page Management
                    </button>
                </div>
            }
        >

            <AddPageManagementModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />

            <div className="sm:mt-5 mt-2">
                <div className='overflow-x-auto min-h-screen'>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 pb-2">
                        {cardData.map((card) => {
                            return (
                                <div key={card.id} className="bg-white rounded-[8px] p-2.5 overflow-hidden shadow-sm hover:bg-[#E1F7FF]">
                                    <div className="flex justify-between items-center mb-2">
                                        <h6 className='font-urbanist font-[600] text-[18px] text-[#0A0E15] leading-[28px]'>{card.title}</h6>
                                        <div className='flex items-center gap-2'>
                                            {/* Toggle Switch */}
                                            <label className="inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only"
                                                    checked={toggles[card.id]}
                                                    onChange={() => handleToggle(card.id)} />
                                                <div className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 duration-300 ${toggles[card.id] ? 'bg-green-400' : 'bg-gray-300'}`}>
                                                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${toggles[card.id] ? 'translate-x-4' : ''}`}></div>
                                                </div>
                                            </label>

                                            <button className="font-manrope font-[400] text-[14px] text-[#484848] leading-[20px] flex items-center gap-1">
                                                <FiEdit /> Edit
                                            </button>
                                            <button onClick={() => setShowModal(true)} className="font-manrope text-[14px] font-[400] text-[#C23A3A] flex items-center gap-1">
                                                <RiDeleteBin6Line color='#C23A3A' size={20} />
                                                Delete
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="font-manrope font-[400] text-[15px] text-[#494949] leading-[18px] mb-10 line-clamp-3 tracking-normal align-middle">
                                            {card.description}
                                        </p>

                                        <p className="font-manrope font-[400] text-[15px] text-[#494949] leading-[18px]  line-clamp-3 tracking-normal align-middle">
                                            {card.description}
                                        </p>
                                    </div>


                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </DashbaordLayout>
    )
}

export default PageManagement