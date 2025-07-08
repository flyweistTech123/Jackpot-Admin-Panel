import React, { useCallback, useEffect, useState } from 'react'
import DashbaordLayout from '../../components/DashbaordLayout'

import { IoSearch } from "react-icons/io5";
import { PiEyeBold } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";


import { useNavigate } from 'react-router-dom';
import { ConfirmModal } from '../../components/Modals/Modal';
import endPoints from '../../Repository/apiConfig';
import { deleteApi, getApi } from '../../Repository/Api';
import Pagination from '../../components/Pagination/Pagination';


const AllUsers = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('')
    const [searchQuery, setSearchQuery] = useState("");
    const [pagination, setPagination] = useState({
        limit: 10,
        totalPages: 1,
        page: 1,
        hasPrevPage: false,
        hasNextPage: false,
    });
    const [itemToDelete, setItemToDelete] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [kycFilter, setKycFilter] = useState("");


    const fetchData = useCallback(async () => {
        setUserData([])
        await getApi(endPoints.getallUser(pagination.page, pagination.limit, searchQuery, kycFilter), {
            setResponse: setUserData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch user data!",
        })
    }, [pagination.page, pagination.limit, searchQuery, kycFilter]);

    useEffect(() => {
        setPagination((prevPagination) => ({
            ...prevPagination,
            totalPages: userData?.data?.totalPages,
            hasPrevPage: userData?.data?.hasPrevPage,
            hasNextPage: userData?.data?.hasNextPage,
        }));
    }, [userData]);


    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);

        if (value === "") {
            setSearchQuery("");
            setPagination((prev) => ({ ...prev, page: 1 }));
        }
    };

    const handleSearch = () => {
        setSearchQuery(search);
        setPagination((prev) => ({ ...prev, page: 1 }));
    };

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleConfirm = async () => {
        if (!itemToDelete) return;
        await deleteApi(endPoints.deleteuser(itemToDelete), {
            setLoading: setDeleteLoading,
            successMsg: "User deleted successfully!",
            errorMsg: "Failed to delete user!",
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


    return (
        <DashbaordLayout title="User"
            hedartitle="User"
        >
            <ConfirmModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleConfirm}
                loading={deleteLoading}
                text="Delete"
            />
            <div className="sm:mt-3 mt-2">
                <div className='flex items-center justify-between mb-2 flex-wrap gap-2'>
                    <div className='flex items-center gap-2 flex-wrap'>
                        <div className='bg-white py-2 px-5 flex items-center justify-between rounded-[8px] w-full sm:w-sm'>
                            <input
                                type="search"
                                placeholder="Search by name, email or number"
                                value={search}
                                onChange={handleSearchChange}
                                className='flex-1 border-0 outline-0 font-urbanist placeholder:text-[15px] font-semibold placeholder:text-[#9EACBF]'
                            />
                            <IoSearch color='#000000' size={20} />
                        </div>
                        <button
                            onClick={handleSearch}
                            className='bg-primary cursor-pointer flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white'>
                            Search
                        </button>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <button
                            onClick={() => {
                                setKycFilter("");
                                setPagination((prev) => ({ ...prev, page: 1 }));
                            }}
                            className={`px-4 py-2 cursor-pointer rounded-full border text-sm font-semibold transition ${kycFilter === ""
                                    ? "bg-primary text-white border-primary"
                                    : "bg-white text-gray-700 border-gray-300 hover:bg-primary/10"
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => {
                                setKycFilter("true");
                                setPagination((prev) => ({ ...prev, page: 1 }));
                            }}
                            className={`px-4 py-2 cursor-pointer rounded-full border text-sm font-semibold transition ${kycFilter === "true"
                                    ? "bg-primary text-white border-primary"
                                    : "bg-white text-gray-700 border-gray-300 hover:bg-primary/10"
                                }`}
                        >
                            Verified
                        </button>
                        <button
                            onClick={() => {
                                setKycFilter("false");
                                setPagination((prev) => ({ ...prev, page: 1 }));
                            }}
                            className={`px-4 py-2 cursor-pointer rounded-full border text-sm font-semibold transition ${kycFilter === "false"
                                    ? "bg-primary text-white border-primary"
                                    : "bg-white text-gray-700 border-gray-300 hover:bg-primary/10"
                                }`}
                        >
                            Not Verified
                        </button>
                    </div>


                </div>
                <div className='overflow-x-auto'>
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-white text-left font-urbanist text-md font-semibold text-[#0A0E15]">
                                <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[10px] rounded-bl-[10px]">#</th>
                                <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">Name</th>
                                <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">Email</th>
                                <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">Contact</th>
                                <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">KYC</th>
                                <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">Earning</th>
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
                                (!userData?.data?.docs || userData?.data?.docs?.length === 0) ? (
                                    <tr>
                                        <td colSpan="9" className='text-center'>
                                            <p className='font-urbanist text-md font-semibold text-[#0A0E15]'>No data available!</p>
                                        </td>
                                    </tr>
                                ) :
                                    userData?.data?.docs?.map((i, index) => (
                                        <tr key={index} className=" bg-white space-y-10 transition-all hover:bg-[#E1F7FF]">
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">{index + 1}</td>
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">{i.fullName}</td>
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">{i.email}</td>
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">{i.mobileNumber}</td>
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">
                                                {i.isKyc ? <FaCheck color='#34C759' size={20} /> : <IoClose color='#F04D58' size={20} />}
                                            </td>
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">{i.earning}</td>
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">
                                                <div className="flex items-center gap-2">
                                                    <button onClick={() => navigate(`/users/details/${i?._id}`)} className="font-manrope cursor-pointer text-[15px] font-[400] text-[#11968A] flex items-center gap-1">
                                                        <PiEyeBold color='#FFB000' size={20} />
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
                {userData?.data?.docs?.length > 0 && (
                    <Pagination
                        currentPage={pagination.page}
                        totalPages={pagination.totalPages}
                        hasPrevPage={pagination.hasPrevPage}
                        hasNextPage={pagination.hasNextPage}
                        onPageChange={(newPage) => {
                            setPagination((prev) => ({ ...prev, page: newPage }));
                        }}
                    />
                )}

            </div>


        </DashbaordLayout>
    )
}

export default AllUsers