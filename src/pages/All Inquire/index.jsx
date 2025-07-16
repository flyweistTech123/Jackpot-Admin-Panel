import React, { useEffect, useState } from 'react'
import DashbaordLayout from '../../components/DashbaordLayout'


import { useNavigate } from 'react-router-dom';
import endPoints from '../../Repository/apiConfig';
import { getApi } from '../../Repository/Api';
import { formatDate } from '../../utils/utils';
import Pagination from '../../components/Pagination/Pagination';

import { IoSearch } from "react-icons/io5";

const Inquiry = () => {
    const navigate = useNavigate();
    const [inquiryData, setInquirysData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        limit: 10,
        totalPages: 1,
        page: 1,
        hasPrevPage: false,
        hasNextPage: false,
    });

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [search, setSearch] = useState('')





    const fetchData = async ({
        page = 1,
        limit = 10,
        startDate = "",
        endDate = "",
        search = ""
    }) => {
        const query = {
            page,
            limit,
            startDate,
            endDate,
            search
        };

        await getApi(endPoints.getallInquiry(query), {
            setResponse: setInquirysData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch inquiry logs!",
        });
    };


    useEffect(() => {
        setPagination((prevPagination) => ({
            ...prevPagination,
            totalPages: inquiryData?.data?.totalPages,
            hasPrevPage: inquiryData?.data?.hasPrevPage,
            hasNextPage: inquiryData?.data?.hasNextPage,
        }));
    }, [inquiryData]);


    useEffect(() => {
        fetchData({
            page: pagination.page,
            limit: pagination.limit,
            startDate,
            endDate,
            search
        });
    }, [pagination.page]);

    const applyFilters = () => {
        setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page
        fetchData({
            page: 1,
            limit: pagination.limit,
            startDate,
            endDate,
            search
        });
    };


    const resetFilters = () => {
        setStartDate("");
        setEndDate("");
        setPagination((prev) => ({ ...prev, page: 1 }));
        fetchData({
            page: 1,
            limit: pagination.limit,
            startDate: "",
            endDate: "",
            search: ""
        });
    };



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


    return (
        <DashbaordLayout title="All Inquiry"
            hedartitle="All Inquiry"
        >
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
                        {/* Date range if custom */}
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
                            onClick={applyFilters}
                            className="bg-primary cursor-pointer text-white font-semibold px-4 py-2 rounded-md text-sm"
                        >
                            Apply Filters
                        </button>
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
                                <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">Message</th>
                                <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">status</th>
                                <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0] rounded-tr-[10px] rounded-br-[10px]">Created At</th>
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
                                (!inquiryData?.data?.docs || inquiryData?.data?.docs?.length === 0) ? (
                                    <tr>
                                        <td colSpan="9" className='text-center'>
                                            <p className='font-urbanist text-md font-semibold text-[#0A0E15]'>No data available!</p>
                                        </td>
                                    </tr>
                                ) :
                                    inquiryData?.data?.docs?.map((i, index) => (
                                        <tr key={index} className=" bg-white space-y-10 transition-all hover:bg-[#E1F7FF]">
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">{index + 1}</td>
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">{i?.name}</td>
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">{i?.email}</td>
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">{i?.message}</td>
                                            <td
                                                className={`px-4 py-2.5 border-b-10 border-[#E2E8F0] 
                                                    ${i?.status === 'pending' ? "text-[#FFB000] font-bold" : "text-[#34C759] font-bold"}
                                                    `}
                                            >
                                                {i?.status}
                                            </td>
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">{formatDate(i?.createdAt)}</td>
                                        </tr>
                                    ))}
                        </tbody>
                    </table>
                </div>
                {inquiryData?.data?.docs?.length > 0 && (
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

export default Inquiry 