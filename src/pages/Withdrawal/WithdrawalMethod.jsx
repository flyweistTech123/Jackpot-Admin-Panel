import React, { useState } from 'react'
import DashbaordLayout from '../../components/DashbaordLayout'

import { FiEdit } from "react-icons/fi";


import { useNavigate } from 'react-router-dom';
import { ConfirmModal } from '../../components/Modals/Modal';



const methods = [
    {
        id: 1,
        methodname: 'Bank Account',
    },
    {
        id: 2,
        methodname: 'Upi',
    },
    {
        id: 3,
        methodname: 'Cash',
    },
];







const WithdrawalMethod = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleConfirm = () => {
        console.log("Suspension confirmed!");
        setShowModal(false);
    };

    const [toggles, setToggles] = useState(
        methods.reduce((acc, card) => ({ ...acc, [card.id]: true }), {})
    );

    const handleToggle = (id) => {
        setToggles((prev) => ({ ...prev, [id]: !prev[id] }));
    };
    return (
        <DashbaordLayout title="Withdraw Method"
            hedartitle="Withdraw Method"
        >
            <ConfirmModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleConfirm}
                text="Delete"
            />
            <div className="sm:mt-5 mt-2">
                <div className='overflow-x-auto'>
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-white text-left font-urbanist text-md font-semibold text-[#0A0E15]">
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[10px] rounded-bl-[10px]">#</th>
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Method Name</th>
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Status</th>
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tr-[10px] rounded-br-[10px]">Action</th>
                            </tr>
                        </thead>
                        <tbody className="font-manrope text-[15px] font-[400] text-[#000000]">
                            {methods.map((i, index) => (
                                <tr key={index} className=" bg-white space-y-10 transition-all hover:bg-[#E1F7FF]">
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">{index + 1}</td>
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.methodname}</td>
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">
                                        {/* Toggle Switch */}
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only"
                                                checked={toggles[methods.id]}
                                                onChange={() => handleToggle(methods.id)}
                                            />
                                            <div className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 duration-300 ${toggles[methods.id] ? 'bg-green-400' : 'bg-gray-300'}`}>
                                                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${toggles[methods.id] ? 'translate-x-4' : ''}`}></div>
                                            </div>
                                        </label>
                                    </td>

                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">
                                        <div className="flex items-center gap-2">
                                            <button className="font-manrope text-[15px] font-[400] text-[#273143] flex items-center gap-1">
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

export default WithdrawalMethod