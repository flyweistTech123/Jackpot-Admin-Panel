import React, { useCallback, useEffect, useState } from 'react'
import DashbaordLayout from '../../../components/DashbaordLayout'

import { IoSearch } from "react-icons/io5";
import { PiEyeBold } from "react-icons/pi";
import { IoArrowBack } from "react-icons/io5";


import { useNavigate } from 'react-router-dom';
import endPoints from '../../../Repository/apiConfig';
import { getApi } from '../../../Repository/Api';
import Pagination from '../../../components/Pagination/Pagination';
import { formatDate } from '../../../utils/utils';
import { ResumeViewModal } from '../../../components/Modals/Modal';


const Applicants = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [applicantData, setApplicantData] = useState([]);
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
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);


    const fetchData = useCallback(async () => {
        setApplicantData([])
        await getApi(endPoints.getallApplicantList(pagination.page, pagination.limit, searchQuery, startDate, endDate), {
            setResponse: setApplicantData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch user data!",
        })
    }, [pagination.page, pagination.limit, searchQuery, startDate, endDate]);

    useEffect(() => {
        setPagination((prevPagination) => ({
            ...prevPagination,
            totalPages: applicantData?.data?.totalPages,
            hasPrevPage: applicantData?.data?.hasPrevPage,
            hasNextPage: applicantData?.data?.hasNextPage,
        }));
    }, [applicantData]);


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

    const resetFilters = () => {
        setStartDate("");
        setEndDate("");
        setPagination((prev) => ({ ...prev, page: 1 }));
        fetchData({
            page: 1,
            limit: pagination.limit,
            startDate: "",
            endDate: "",
        });
    };

    const openResumeModal = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };


    return (
        <DashbaordLayout
            title="Applicant List"
            hedartitle={`Website > Jobs > Applicant List`}
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
        >
            <ResumeViewModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                data={selectedItem}
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
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="bg-white border px-4 py-2 rounded-md text-sm"
                        />
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="bg-white border px-4 py-2 rounded-md text-sm"
                        />
                        <button
                            onClick={resetFilters}
                            className="bg-gray-500 text-white font-semibold cursor-pointer px-4 py-2 rounded-md text-sm"
                        >
                            Reset Filters
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
                                <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">Applied Date</th>
                                <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">Job Title</th>
                                <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0] rounded-tr-[10px] rounded-br-[10px]">Resume</th>
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
                                (!applicantData?.data || applicantData?.data?.length === 0 || applicantData?.data?.docs?.length === 0) ? (
                                    <tr>
                                        <td colSpan="9" className='text-center'>
                                            <p className='font-urbanist text-md font-semibold text-[#0A0E15]'>No data available!</p>
                                        </td>
                                    </tr>
                                ) :
                                    applicantData?.data?.docs?.map((i, index) => (
                                        <tr key={index} className=" bg-white space-y-10 transition-all hover:bg-[#E1F7FF]">
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">{index + 1}</td>
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">{i.name}</td>
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">{i.email}</td>
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">{i.mobileNumber}</td>
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">{formatDate(i.createdAt)}</td>
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">{i?.jobsId?.title}</td>
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">
                                                <div className="flex items-center gap-2">
                                                    <button onClick={() => openResumeModal(i)} className="font-manrope cursor-pointer text-[15px] font-[400] text-[#11968A] flex items-center gap-1">
                                                        <PiEyeBold color='#FFB000' size={20} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                        </tbody>
                    </table>
                </div>
                {applicantData?.data?.docs?.length > 0 && (
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

export default Applicants