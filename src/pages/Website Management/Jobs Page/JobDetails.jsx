import React, { useCallback, useEffect, useState } from 'react';
import DashbaordLayout from '../../../components/DashbaordLayout';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

import { IoArrowBack } from "react-icons/io5";
import { FaBuilding, FaUserTie } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";

import { useNavigate, useParams } from 'react-router-dom';
import endPoints from '../../../Repository/apiConfig';
import { getApi, putApi } from '../../../Repository/Api';




const remoteTitles = {
    remote: "Remote",
    onSite: "On-site",
    hybrid: "Hybrid",
};


const JobDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [jobData, setJobData] = useState({});
    const [departmentData, setDepartmentData] = useState([]);
    const [locationData, setLocationData] = useState([]);
    const [employmentTypeData, setEmploymentTypeData] = useState([]);
    const [loading, setLoading] = useState(false);
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


    const fetchData = useCallback(async () => {
        setJobData({});
        await getApi(endPoints.getJobbyid(id), {
            setResponse: setJobData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch job data!",
        });
    }, [id]);

    useEffect(() => {
        if (jobData?.data) {
            setTitle(jobData?.data?.title || "");
            setTypeOfJob(jobData?.data?.typeOfJob || "");
            setRemote(jobData?.data?.remote || "");
            setContent(jobData?.data?.description || "");
            setSelectedDepartmentId(jobData?.data?.departmentId?._id || "");
            setSelectedLocationId(jobData?.data?.locationId?._id || "");
            setSelectedEmployeeTypeId(jobData?.data?.employmentTypeId?._id || "");
        }
    }, [jobData]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

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


        const payload = {
            title: title,
            locationId: selectedLocationId,
            employmentTypeId: selectedEmployeeTypeId,
            departmentId: selectedDepartmentId,
            typeOfJob: typeOfJob,
            remote: remote,
            description: content
        };

        await putApi(endPoints.updateJobbyid(id), payload, {
            setLoading: setLoading4,
            successMsg: "Job details updated successfully!",
            errorMsg: "Failed to update job details!",
            additionalFunctions: [fetchData, () => setEditing(false)],
        });
    };

    return (
        <DashbaordLayout
            title="Job Details"
            hedartitle={`Website > Jobs > Job Details`}
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
                    onClick={() => setEditing(!editing)}
                    className={`px-4 py-2 cursor-pointer rounded ${editing ? "bg-red-500" : "bg-green-500"} text-white`}
                >
                    {editing ? "Disable Editing" : "Enable Editing"}
                </button>
            }
        >
            {loading ? (
                <div className="flex flex-col items-center justify-center min-h-[50vh]">
                    <div className="w-16 h-16 border-4 border-[#FFB000] border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 font-semibold text-[#0A0E15]">Loading...</p>
                </div>
            ) : (
                <div className="mt-6 bg-white rounded-xl shadow-md p-6 space-y-8">
                    {/* Top Section */}
                    {!editing ? (
                        <div className="space-y-4">
                            <div>
                                <span className="font-bold text-[#FFB000]">Job Title:</span>{" "}
                                <span className='font-semibold'>{title || "-"}</span>
                            </div>
                            <div>
                                <span className="font-bold text-[#FFB000]">Type Of Job:</span>{" "}
                                <span className='font-semibold'>{typeOfJob || "-"}</span>
                            </div>
                            <div>
                                <span className="font-bold text-[#FFB000]">Remote:</span>{" "}
                                <span className='font-semibold'>{remoteTitles[remote] || "-"}</span>
                            </div>
                        </div>
                    ) : (
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
                                    <option value="Remote">Remote</option>
                                    <option value="On-Site">On-site</option>
                                    <option value="Hybrid">Hybrid</option>
                                </select>
                            </div>
                        </div>
                    )}
                    {/* Divider */}
                    <hr className="border-[#000000B2]" />
                    {!editing ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                            <div className="p-4 border rounded-lg flex items-center gap-4">
                                <FaBuilding size={30} className="text-[#FFB000]" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Department</p>
                                    <p className="text-lg font-semibold text-[#000]">{jobData?.data?.departmentId?.title || 0}</p>
                                </div>
                            </div>
                            <div className="p-4 border rounded-lg flex items-center gap-4">
                                <FaUserTie size={30} className="text-[#FFB000]" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Employment Type</p>
                                    <p className="text-lg font-semibold text-[#000]">{jobData?.data?.employmentTypeId?.title || 0}</p>
                                </div>
                            </div>
                            <div className="p-4 border rounded-lg flex items-center gap-4">
                                <IoLocation size={30} className="text-[#FFB000]" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Location</p>
                                    <p className="text-lg font-semibold text-[#000]">{jobData?.data?.locationId?.title || 0}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
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
                    )}

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
                                readOnly={!editing}
                                className={`${editing ? "opacity-100 border border-black" : "opacity-70"}`}
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

                    {/* Save Button */}
                    {editing && (
                        <button
                            onClick={handleSave}
                            disabled={loading4}
                            className="px-6 py-3 cursor-pointer bg-[#FFB000] text-white rounded shadow disabled:bg-gray-400"
                        >
                            {loading4 ? "Saving..." : "Save Changes"}
                        </button>
                    )}
                </div>
            )}
        </DashbaordLayout>
    );
};

export default JobDetails;
