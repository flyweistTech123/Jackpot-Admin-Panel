import React, { useCallback, useEffect, useState } from 'react';
import DashbaordLayout from '../../../components/DashbaordLayout';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

import { IoArrowBack } from "react-icons/io5";

import { useNavigate } from 'react-router-dom';
import endPoints from '../../../Repository/apiConfig';
import { getApi, postApi } from '../../../Repository/Api';

import { toast } from 'sonner';


const AddJob = () => {
    const navigate = useNavigate();

    const [departmentData, setDepartmentData] = useState([]);
    const [locationData, setLocationData] = useState([]);
    const [employmentTypeData, setEmploymentTypeData] = useState([]);
    const [editing, setEditing] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [loading3, setLoading3] = useState(false);
    const [loading4, setLoading4] = useState(false);

    // Editable fields:
    const [title, setTitle] = useState("");
    const [typeOfJob, setTypeOfJob] = useState("");
    const [remote, setRemote] = useState("");
    const [content, setContent] = useState("");
    const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
    const [selectedLocationId, setSelectedLocationId] = useState("");
    const [selectedEmployeeTypeId, setSelectedEmployeeTypeId] = useState("");


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


    const handleSave = async () => {
        if (!title || !selectedLocationId || !selectedEmployeeTypeId || !selectedDepartmentId || !typeOfJob || !remote || !content) {
            toast.error("Please provide all the fields!");
            return;
        }

        const payload = {
            title: title,
            locationId: selectedLocationId,
            employmentTypeId: selectedEmployeeTypeId,
            departmentId: selectedDepartmentId,
            typeOfJob: typeOfJob,
            remote: remote,
            description: content
        };

        await postApi(endPoints.addNewJob, payload, {
            setLoading: setLoading4,
            successMsg: "Job details Added successfully!",
            errorMsg: "Failed to add job details!",
            additionalFunctions: [() => navigate('/website/jobs-page')],
        });
    };

    return (
        <DashbaordLayout
            title="Add New Job"
            hedartitle={`Website > Jobs > Add New Job`}
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
                <button
                    onClick={handleSave}
                    disabled={loading4}
                    className="px-6 py-3 cursor-pointer bg-[#FFB000] text-white rounded shadow disabled:bg-gray-400"
                >
                    {loading4 ? "Saving..." : "Save Changes"}
                </button>
            }
        >
            <div className="mt-6 bg-white rounded-xl shadow-md p-6 space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    <div className="flex flex-col">
                        <label htmlFor="" className='block font-bold text-black mb-2'>Job Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border p-2 rounded w-full max-w-md"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className='block font-bold text-black mb-2'>Type Of Job</label>
                        <input
                            type="text"
                            value={typeOfJob}
                            onChange={(e) => setTypeOfJob(e.target.value)}
                            className="border p-2 rounded w-full max-w-md"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className='block font-bold text-black mb-2'>Remote</label>
                        <select
                            value={remote}
                            onChange={(e) => setRemote(e.target.value)}
                            className="border p-2 rounded w-full max-w-md"
                        >
                            <option value="">Select...</option>
                            <option value="remote">Remote</option>
                            <option value="onSite">On-site</option>
                            <option value="hybrid">Hybrid</option>
                        </select>
                    </div>
                </div>
                {/* Divider */}
                <hr className="border-[#000000B2]" />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    <div className="flex flex-col">
                        <label htmlFor="" className='block font-bold text-black mb-2'>Department</label>
                        <select
                            value={selectedDepartmentId}
                            onChange={(e) => setSelectedDepartmentId(e.target.value)}
                            className="bg-white w-full border px-4 py-2 rounded-md text-sm"
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
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className='block font-bold text-black mb-2'>Employment Type</label>
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
                    <div className="flex flex-col">
                        <label htmlFor="" className='block font-bold text-black mb-2'>Location</label>
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
                    </div>
                </div>
                {/* Divider */}
                <hr className="border-[#000000B2]" />
                {/* Editor */}
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 border p-4 rounded shadow bg-white">
                        <h2 className="text-xl font-bold mb-4">Job Description</h2>
                        <ReactQuill
                            theme="snow"
                            value={content}
                            onChange={setContent}
                            className="opacity-100 border border-black"
                        />
                    </div>

                    <div className="flex-1 border p-4 rounded shadow bg-white">
                        <h2 className="text-xl font-bold mb-4">Preview</h2>
                        <div
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    </div>
                </div>
            </div>
        </DashbaordLayout>
    );
};

export default AddJob;
