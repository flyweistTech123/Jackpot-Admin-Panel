import React, { useState } from 'react'
import DashbaordLayout from '../../components/DashbaordLayout'

import { FiEdit } from "react-icons/fi";
import { MdOutlineShare } from "react-icons/md";


import { useNavigate } from 'react-router-dom';
import { AddNotificationModal, ConfirmModal, ShareNotificationModal } from '../../components/Modals/Modal';



const users = [
    {
        number: 1,
        title: 'Welcome Note',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem.",
    },
    {
        number: 2,
        title: 'Festival',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem.",
    },
    {
        number: 3,
        title: 'Offer',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem.",
    },
];







const Notification = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);


    return (
        <DashbaordLayout title="Notification"
            hedartitle="Notification"
            headerAction={
                <div className='flex items-center gap-2'>
                    <button onClick={() => setShowModal1(true)} className='bg-[#164E62] flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white'>
                        Add Notification
                    </button>
                </div>
            }
        >
            <ShareNotificationModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
            <AddNotificationModal
                isOpen={showModal1}
                onClose={() => setShowModal1(false)}
            />
            <div className="mt-5">
                <div className='overflow-x-auto min-h-screen'>
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-white text-left font-urbanist text-md font-semibold text-[#0A0E15]">
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[10px] rounded-bl-[10px]">#</th>
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Title</th>
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Description</th>
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tr-[10px] rounded-br-[10px]">Action</th>
                            </tr>
                        </thead>
                        <tbody className="font-manrope text-[15px] font-[400] text-[#000000]">
                            {users.map((i, index) => (
                                <tr key={index} className=" bg-white space-y-10 transition-all">
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">{index + 1}</td>
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.title}</td>
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.description}</td>
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => setShowModal(true)} className="font-manrope text-[15px] font-[400] text-[#273143] flex items-center gap-1">
                                                <MdOutlineShare color='#273143' size={20} />
                                                Share
                                            </button>
                                            <button  className="font-manrope text-[15px] font-[400] text-[#484848] flex items-center gap-1">
                                                <FiEdit color='#273143' size={20} />
                                                Edit
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

export default Notification