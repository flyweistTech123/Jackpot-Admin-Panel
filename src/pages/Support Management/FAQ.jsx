import React, { useState } from 'react'
import DashbaordLayout from '../../components/DashbaordLayout'

import { FiEdit } from "react-icons/fi";
import { PiEyeBold } from "react-icons/pi";
import { GoPlus } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";

import { useNavigate } from 'react-router-dom';
import { AddFAQReplyModal} from '../../components/Modals/Modal';



const users = [
    {
        number: 1,
        ticketno: 7894,
        name: "Suresh",
        number: 78459612365,
        status: 'Open',
        createddate: '21-May-2025 11.05 AM',
        action: 'Add',
    },
    {
        number: 2,
        ticketno: 7894,
        name: "Suresh",
        number: 78459612365,
        status: 'Closed',
        createddate: '21-May-2025 11.05 AM',
        action: 'Edit',
    },
    {
        number: 3,
        ticketno: 7894,
        name: "Suresh",
        number: 78459612365,
        status: 'Closed',
        createddate: '21-May-2025 11.05 AM',
        action: 'Edit',
    },
];







const FAQ = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    return (
        <DashbaordLayout title="FAQ"
            hedartitle={`Support Management ${'>'} FAQ`}
            headerAction={
                <div className='flex items-center gap-2'>
                    <button onClick={() => setShowModal(true)} className='bg-[#164E62] flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white'>
                        Add Help Support
                    </button>
                </div>
            }
        >
            <AddFAQReplyModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
            <div className="mt-5">
                <div className='overflow-x-auto min-h-screen'>
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-white text-left font-urbanist text-md font-semibold text-[#0A0E15]">
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[10px] rounded-bl-[10px]">#</th>
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Faq</th>
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tr-[10px] rounded-br-[10px]">Action</th>
                            </tr>
                        </thead>
                        <tbody className="font-manrope text-[15px] font-[400] text-[#000000]">
                            {users.map((i, index) => (
                                <tr key={index} className=" bg-white space-y-10 transition-all  hover:bg-[#E1F7FF]">
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">{index + 1}</td>
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem.
                                    </td>
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => setShowModal(true)} className="font-manrope text-[15px] font-[400] text-[#484848] flex items-center gap-1">
                                                <GoPlus color='#484848' size={18} />
                                                Add
                                            </button>
                                            <button  className="font-manrope text-[15px] font-[400] text-[#11968A] flex items-center gap-1">
                                                <PiEyeBold color='#11968A' size={18} />
                                                View
                                            </button>
                                            <button className="font-manrope text-[15px] font-[400] text-[#484848] flex items-center gap-1">
                                                <FiEdit color='#484848' size={18} />
                                                Edit
                                            </button>
                                            <button  className="font-manrope text-[15px] font-[400] text-[#C33B3B] flex items-center gap-1">
                                                <RiDeleteBin6Line color='#C33B3B' size={18} />
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

export default FAQ