import React, { useState } from 'react'
import DashbaordLayout from '../../components/DashbaordLayout'

import { FiEdit } from "react-icons/fi";
import { PiEyeBold } from "react-icons/pi";
import { GoPlus } from "react-icons/go";

import { useNavigate } from 'react-router-dom';
import { AddTicketModal, ConfirmModal, EditTicketModal, ViewTicketModal } from '../../components/Modals/Modal';



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







const Tickets = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);

    return (
        <DashbaordLayout title="Tickets"
            hedartitle={`Support Management ${'>'} Tickets`}
        >
            <AddTicketModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
            <EditTicketModal
                isOpen={showModal1}
                onClose={() => setShowModal1(false)}
            />
            <ViewTicketModal
                isOpen={showModal2}
                onClose={() => setShowModal2(false)}
            />
            <div className="mt-5">
                <div className='overflow-x-auto min-h-screen'>
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-white text-left font-urbanist text-md font-semibold text-[#0A0E15]">
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[10px] rounded-bl-[10px]">#</th>
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Ticket No</th>
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Name</th>
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Number</th>
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Status</th>
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Created Date</th>
                                <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tr-[10px] rounded-br-[10px]">Action</th>
                            </tr>
                        </thead>
                        <tbody className="font-manrope text-[15px] font-[400] text-[#000000]">
                            {users.map((i, index) => (
                                <tr key={index} className=" bg-white space-y-10 transition-all  hover:bg-[#E1F7FF]">
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">{index + 1}</td>
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.ticketno}</td>
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.name}</td>
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.number}</td>
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.status}</td>
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.createddate}</td>
                                    <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">
                                        <div className="flex items-center gap-2">
                                            {i.action === "Add" ?
                                                <button onClick={()=>setShowModal(true)} className="font-manrope text-[15px] font-[400] text-[#000000] flex items-center gap-1">
                                                    <GoPlus color='#484848' size={18} />
                                                    Add
                                                </button>
                                                :
                                                <button onClick={()=>setShowModal1(true)} className="font-manrope text-[15px] font-[400] text-[#000000] flex items-center gap-1">
                                                    <FiEdit color='#484848' size={18} />
                                                    Edit
                                                </button>
                                            }
                                            <button onClick={()=>setShowModal2(true)}className="font-manrope text-[15px] font-[400] text-[#000000] flex items-center gap-1">
                                                <PiEyeBold color='#1C1B1F' size={18} />
                                                Review
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

export default Tickets