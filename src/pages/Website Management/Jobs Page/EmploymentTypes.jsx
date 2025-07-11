import React, { useCallback, useEffect, useState } from 'react'
import DashbaordLayout from '../../../components/DashbaordLayout'

import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoArrowBack } from "react-icons/io5";


import { useNavigate } from 'react-router-dom';
import { AddNewEmployeeTypeModal, ConfirmModal } from '../../../components/Modals/Modal';
import endPoints from '../../../Repository/apiConfig';
import { deleteApi, getApi } from '../../../Repository/Api';
import { formatDate } from '../../../utils/utils';


const EmploymentTypes = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [employmenttypesData, setEmploymentTypesData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const fetchData = useCallback(async () => {
        setEmploymentTypesData([])
        await getApi(endPoints.getAllEmploymentType, {
            setResponse: setEmploymentTypesData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch user data!",
        })
    }, []);


    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleConfirm = async () => {
        if (!itemToDelete) return;
        await deleteApi(endPoints.deleteEmploymentType(itemToDelete), {
            setLoading: setDeleteLoading,
            successMsg: "Employment Type deleted successfully!",
            errorMsg: "Failed to delete employment type!",
            additionalFunctions: [
                () => setShowModal(false),
                () => fetchData(),
            ],
        });
    };


    const handleDeleteClick = (id) => {
        setItemToDelete(id);
        setShowModal(true);
    };

    const openAddModal = () => {
        setSelectedItem(null);
        setIsEditMode(false);
        setShowModal1(true);
    };


    const openEditModal = (item) => {
        setSelectedItem(item);
        setIsEditMode(true);
        setShowModal1(true);
    };


    return (
        <DashbaordLayout
            title="Employment Types"
            hedartitle={`Website > Jobs > Employment Types`}
            titleAction={
                <div className="flex gap-4 items-center">
                    <IoArrowBack
                        size={25}
                        color="#1C1B1F"
                        className="cursor-pointer"
                        onClick={() => navigate("/website/jobs-page")}
                    />

                </div>
            }
            headerAction={
                <div className='flex items-center gap-2'>
                    <button onClick={openAddModal} className='bg-primary cursor-pointer  flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white'>
                        Add New Employment Type
                    </button>
                </div>
            }
        >
            <ConfirmModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleConfirm}
                loading={deleteLoading}
                text="Delete"
            />
            <AddNewEmployeeTypeModal
                isOpen={showModal1}
                onClose={() => setShowModal1(false)}
                fetchdata={fetchData}
                data={selectedItem}
                edit={isEditMode}
            />
            <div className="sm:mt-3 mt-2">
                <div className='overflow-x-auto'>
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-white text-left font-urbanist text-md font-semibold text-[#0A0E15]">
                                <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[10px] rounded-bl-[10px]">#</th>
                                <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">Title</th>
                                <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">Created At</th>
                                <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0] rounded-tr-[10px] rounded-br-[10px]">Action</th>
                            </tr>
                        </thead>
                        <tbody className="font-manrope text-[15px] font-[400] text-[#000000]">
                            {loading ?
                                <tr>
                                    <td colSpan="9">
                                        <div className="text-center">
                                            <div className="w-16 h-16 border-4 border-[#FFB000] border-t-transparent rounded-full animate-spin mx-auto"></div>
                                            <p className="mt-4 text-[#0A0E15] font-[600]">Loading...</p>
                                        </div>
                                    </td>
                                </tr>
                                :
                                (!employmenttypesData?.data || employmenttypesData?.data?.length === 0) ? (
                                    <tr>
                                        <td colSpan="9" className='text-center'>
                                            <p className='font-urbanist text-md font-semibold text-[#0A0E15]'>No data available!</p>
                                        </td>
                                    </tr>
                                ) :
                                    employmenttypesData?.data?.map((i, index) => (
                                        <tr key={index} className=" bg-white space-y-10 transition-all hover:bg-[#E1F7FF]">
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">{index + 1}</td>
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">{i.title}</td>
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">{formatDate(i.createdAt)}</td>
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">
                                                <div className="flex items-center gap-2">
                                                    <button onClick={() => openEditModal(i)} className="font-manrope cursor-pointer text-[15px] font-[400] text-[#11968A] flex items-center gap-1">
                                                        <FiEdit color='#FFB000' size={20} />
                                                    </button>
                                                    <button onClick={() => handleDeleteClick(i?._id)} className="font-manrope cursor-pointer text-[15px] font-[400] text-[#C23A3A] flex items-center gap-1">
                                                        <RiDeleteBin6Line color='#C23A3A' size={20} />
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

export default EmploymentTypes