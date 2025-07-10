import React, { useCallback, useEffect, useState } from 'react'
import DashbaordLayout from '../../../components/DashbaordLayout'

import { IoSearch } from "react-icons/io5";
import { PiEyeBold } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";



import { useNavigate } from 'react-router-dom';
import { ConfirmModal } from '../../../components/Modals/Modal';
import endPoints from '../../../Repository/apiConfig';
import { deleteApi, getApi } from '../../../Repository/Api';
import Pagination from '../../../components/Pagination/Pagination';


const JobsPage = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [jobData, setJobData] = useState([]);
    const [departmentData, setDepartmentData] = useState([]);
    const [locationData, setLocationData] = useState([]);
    const [employmentTypeData, setEmploymentTypeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [loading3, setLoading3] = useState(false);
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
    const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
    const [selectedLocationId, setSelectedLocationId] = useState("");
    const [selectedEmployeeTypeId, setSelectedEmployeeTypeId] = useState("");


    const fetchData = useCallback(async () => {
        setJobData([])
        await getApi(endPoints.getallJobList(pagination.page, pagination.limit, searchQuery, selectedDepartmentId, selectedLocationId, selectedEmployeeTypeId), {
            setResponse: setJobData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch jobs data!",
        })
    }, [pagination.page, pagination.limit, searchQuery, selectedDepartmentId, selectedLocationId, selectedEmployeeTypeId]);

    useEffect(() => {
        setPagination((prevPagination) => ({
            ...prevPagination,
            totalPages: jobData?.data?.totalPages,
            hasPrevPage: jobData?.data?.hasPrevPage,
            hasNextPage: jobData?.data?.hasNextPage,
        }));
    }, [jobData]);


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
            successMsg: "Job deleted successfully!",
            errorMsg: "Failed to delete job!",
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


    const fetchDepartmentData = useCallback(async () => {
        setDepartmentData([])
        await getApi(endPoints.getAllDepartment, {
            setResponse: setDepartmentData,
            setLoading: setLoading1,
            errorMsg: "Failed to fetch department data!",
        })
    }, []);
    const fetchLocationData = useCallback(async () => {
        setLocationData([])
        await getApi(endPoints.getAllLocation, {
            setResponse: setLocationData,
            setLoading: setLoading2,
            errorMsg: "Failed to fetch location data!",
        })
    }, []);
    const fetchEmploymentTypeData = useCallback(async () => {
        setEmploymentTypeData([])
        await getApi(endPoints.getAllEmploymentType, {
            setResponse: setEmploymentTypeData,
            setLoading: setLoading3,
            errorMsg: "Failed to fetch employee type data!",
        })
    }, []);

    useEffect(() => {
        fetchDepartmentData();
        fetchLocationData();
        fetchEmploymentTypeData();
    }, [fetchDepartmentData, fetchLocationData, fetchEmploymentTypeData]);


    return (
        <DashbaordLayout title="All Jobs"
            hedartitle="All Jobs"
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
                                placeholder="Search by job title"
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
                        <select
                            value={selectedDepartmentId}
                            onChange={(e) => setSelectedDepartmentId(e.target.value)}
                            className="bg-white border px-4 py-2 rounded-md text-sm"
                        >
                            <option value="">
                                {loading1
                                    ? "Loading departments..."
                                    : departmentData?.data?.length === 0
                                        ? "No departments found"
                                        : "Select Department"}
                            </option>

                            {!loading1 && departmentData?.data?.length > 0 &&
                                departmentData?.data?.map((dept) => (
                                    <option key={dept._id} value={dept._id}>
                                        {dept.title}
                                    </option>
                                ))
                            }
                        </select>

                        <select
                            value={selectedLocationId}
                            onChange={(e) => setSelectedLocationId(e.target.value)}
                            className="bg-white border px-4 py-2 rounded-md text-sm"
                        >
                            <option value="">
                                {loading2
                                    ? "Loading locations..."
                                    : locationData?.data?.length === 0
                                        ? "No location found"
                                        : "Select Location"}
                            </option>

                            {!loading2 && locationData?.data?.length > 0 &&
                                locationData?.data?.map((dept) => (
                                    <option key={dept._id} value={dept._id}>
                                        {dept.title}
                                    </option>
                                ))
                            }
                        </select>
                        <select
                            value={selectedEmployeeTypeId}
                            onChange={(e) => setSelectedEmployeeTypeId(e.target.value)}
                            className="bg-white border px-4 py-2 rounded-md text-sm"
                        >
                            <option value="">
                                {loading3
                                    ? "Loading employmentType..."
                                    : employmentTypeData?.data?.length === 0
                                        ? "No employment type  found"
                                        : "Select Employment Type"}
                            </option>

                            {!loading3 && employmentTypeData?.data?.length > 0 &&
                                employmentTypeData?.data?.map((dept) => (
                                    <option key={dept._id} value={dept._id}>
                                        {dept.title}
                                    </option>
                                ))
                            }
                        </select>

                    </div>


                </div>
                <div className='overflow-x-auto'>
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-white text-left font-urbanist text-md font-semibold text-[#0A0E15]">
                                <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[10px] rounded-bl-[10px]">#</th>
                                <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">Job Title</th>
                                <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">Type Of Job</th>
                                <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">Remote</th>
                                <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">Location</th>
                                <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">Employment Type</th>
                                <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">Department</th>
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
                                (!jobData?.data || jobData?.data?.length === 0) ? (
                                    <tr>
                                        <td colSpan="9" className='text-center'>
                                            <p className='font-urbanist text-md font-semibold text-[#0A0E15]'>No jobs found!</p>
                                        </td>
                                    </tr>
                                ) :
                                    jobData?.data?.map((i, index) => (
                                        <tr key={index} className=" bg-white space-y-10 transition-all hover:bg-[#E1F7FF]">
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">{index + 1}</td>
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">{i?.title}</td>
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">{i?.typeOfJob}</td>
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">{i?.remote}</td>
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">{i?.locationId?.title}</td>
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">{i?.employmentTypeId?.title}</td>
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">{i?.departmentId?.title}</td>
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
                {jobData?.data?.docs?.length > 0 && (
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

export default JobsPage