import React, { useEffect, useRef, useState } from "react";

import { IoMdCloseCircleOutline } from "react-icons/io";
import { postApi, putApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";



const ConfirmModal = ({ isOpen, onClose, onConfirm, text, loading }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0  flex items-center justify-center z-50 bg-black/80">
            <div className="bg-white w-full max-w-md rounded-lg shadow-2xl p-3">
                {/* Close Button */}

                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-poppins text-[16px] font-bold text-[#000000]">Are you Sure</h2>
                    <IoMdCloseCircleOutline color="#C12D34" size={25} className="cursor-pointer" onClick={onClose} />
                </div>

                <p className="font-poppins text-[18px] font-bold text-[#FFB000] text-center mb-6">
                    Do you want to {text}
                </p>

                {/* Action Buttons */}
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onClose}
                        className="px-10 py-3 cursor-pointer bg-[#94919180] border border-[#00000080] rounded-[10px] font-poppins text-[16px] font-[500] text-black hover:bg-[#00000080]"
                    >
                        No
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-10 py-3 cursor-pointer bg-[#FFB0004D]  border border-[#FFB000] rounded-[10px] font-poppins text-[16px] font-[500] text-[#000000] hover:bg-[#FFB000]"
                    >
                        {loading ? "Deleting..." : "Yes"}
                    </button>
                </div>
            </div>
        </div>
    );
};
const AddRuleModal = ({ isOpen, onClose, edit, data, fetchdata }) => {
    if (!isOpen) return null;

    const id = data?._id;
    const [title, setTitle] = useState(data?.title || '');
    const [amount, setAmount] = useState(data?.amount || '');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    const MAX_FILE_SIZE_MB = 5;
    const VALID_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

    useEffect(() => {
        if (edit && data) {
            setTitle(data?.title || "");
            setAmount(data?.amount || "");
            setImage(null);
            setImagePreview(data?.image || null);
        } else if (!edit) {
            resetForm();
        }
    }, [edit, data]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!VALID_FILE_TYPES.includes(file.type)) {
                toast.error("Invalid file type! Only JPG, JPEG, and PNG are allowed.");
                return;
            }

            if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                toast.error(`File size should not exceed ${MAX_FILE_SIZE_MB} MB.`);
                return;
            }

            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleClearImage = () => {
        setImage(null);
        setImagePreview(null);
    };
    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };


    const resetForm = () => {
        setTitle("");
        setAmount("");
        setImage(null);
        setImagePreview("");
    };


    const handleSubmit = async () => {
        if (!title || !amount || !image) {
            toast.error("Please provide all the fields!");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("amount", amount);
        formData.append("image", image);

        await postApi(endPoints.addRules, formData, {
            setLoading,
            successMsg: "Rules added successfully!",
            errorMsg: "Failed to add rules!",
            additionalFunctions: [
                () => fetchdata(),
                () => resetForm(),
                () => onClose(),
            ],
        });
    };

    const handleupdate = async () => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("amount", amount);
        if (image) {
            formData.append("image", image);
        }

        await putApi(endPoints.updateRole(id), formData, {
            setLoading,
            successMsg: "Rules updated successfully!",
            errorMsg: "Failed to update rules!",
            additionalFunctions: [
                () => fetchdata(),
                () => resetForm(),
                () => onClose(),
            ],
        });
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-white rounded-xl w-full max-w-2xl p-3 relative shadow-lg">
                {/* Close Button */}
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-manrope text-[16px] font-bold text-[#000000]">
                        {edit ? "Edit Rule" : "Add New Rule"}
                    </h2>
                    <IoMdCloseCircleOutline
                        color="#C12D34"
                        size={25}
                        className="cursor-pointer"
                        onClick={onClose}
                    />
                </div>

                {/* Form Fields */}
                <div className="mb-4 space-y-4">
                    {/* Title */}
                    <div>
                        <label htmlFor="title" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            placeholder="Enter the title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#FFB000] focus:ring-1 focus:ring-[#FFB000]"
                        />
                    </div>

                    {/* Amount */}
                    <div>
                        <label htmlFor="title" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Amount
                        </label>
                        <input
                            type="text"
                            id="title"
                            placeholder="Enter the amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#FFB000] focus:ring-1 focus:ring-[#FFB000]"
                        />
                    </div>
                    {/* Feature Image */}
                    <div>
                        <label htmlFor="featureImage" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Feature Image
                        </label>

                        <div
                            className={`w-full border-2 border-dashed rounded-lg flex flex-col items-center justify-center  p-4 ${imagePreview ? "border-green-400 bg-green-50" : "border-[#00000080]"
                                }`}
                        >
                            {imagePreview ? (
                                <div className="flex flex-col items-center gap-3">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-40 h-40 object-fill rounded-lg border border-gray-300"
                                    />
                                    <button
                                        onClick={handleClearImage}
                                        type="button"
                                        className="inline-flex items-center px-4 py-2 cursor-pointer border border-red-400 text-red-600 text-sm font-medium rounded-md hover:bg-red-400 hover:text-black transition"
                                    >
                                        Clear Image
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-2">
                                    <p className="text-gray-500 text-sm">No image selected</p>
                                    <button
                                        onClick={handleUploadClick}
                                        type="button"
                                        className="bg-[#FFB0004D] border border-[#FFB000] cursor-pointer hover:bg-[#FFB000] text-black font-medium px-5 py-2 rounded-md"
                                    >
                                        Select Image
                                    </button>
                                </div>
                            )}

                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                hidden
                            />
                        </div>
                    </div>

                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-3 mt-4">
                    <button
                        onClick={onClose}
                        className="px-10 py-3 cursor-pointer bg-[#94919180] border border-[#00000080] rounded-[10px] font-poppins text-[16px] font-[500] text-black hover:bg-[#00000080]"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={edit ? handleupdate : handleSubmit}
                        disabled={loading}
                        className="px-10 py-3 cursor-pointer bg-[#FFB0004D]  border border-[#FFB000] rounded-[10px] font-poppins text-[16px] font-[500] text-[#000000] hover:bg-[#FFB000] disabled={loading}"
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
}

const AddRTPModal = ({ isOpen, onClose, data, fetchdata }) => {
    if (!isOpen) return null;

    const [targetRTP, setTargetRTP] = useState(data?.targetRTP || '');
    const [totalSpinSet, setTotalSpinSet] = useState(data?.totalSpinSet || '');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (data) {
            setTotalSpinSet(data?.totalSpinSet || "");
            setTargetRTP(data?.targetRTP || "");
        }
    }, [data]);


    const resetForm = () => {
        setTargetRTP("");
        setTotalSpinSet("");
    };


    const handleSubmit = async () => {
        if (!targetRTP || !totalSpinSet) {
            toast.error("Please provide all the fields!");
            return;
        }

        const payload = {
            targetRTP: targetRTP,
            totalSpinSet: totalSpinSet
        }


        await postApi(endPoints.addrtp, payload, {
            setLoading,
            successMsg: "New RTP added successfully!",
            errorMsg: "Failed to add new RTP!",
            additionalFunctions: [
                () => fetchdata(),
                () => resetForm(),
                () => onClose(),
            ],
        });
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-white rounded-xl w-full max-w-2xl p-3 relative shadow-lg">
                {/* Close Button */}
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-manrope text-[16px] font-bold text-[#000000]">
                        Add New RTP
                    </h2>
                    <IoMdCloseCircleOutline
                        color="#C12D34"
                        size={25}
                        className="cursor-pointer"
                        onClick={onClose}
                    />
                </div>

                {/* Form Fields */}
                <div className="mb-4 space-y-4">
                    {/* Title */}
                    <div>
                        <label htmlFor="title" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Target RTP
                        </label>
                        <input
                            type="number"
                            id="title"
                            placeholder="Enter the target rtp"
                            value={targetRTP}
                            onChange={(e) => setTargetRTP(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#FFB000] focus:ring-1 focus:ring-[#FFB000]"
                        />
                    </div>

                    {/* Amount */}
                    <div>
                        <label htmlFor="title" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Total Spin Set
                        </label>
                        <input
                            type="number"
                            id="title"
                            placeholder="Enter the total spin set"
                            value={totalSpinSet}
                            onChange={(e) => setTotalSpinSet(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#FFB000] focus:ring-1 focus:ring-[#FFB000]"
                        />
                    </div>

                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-3 mt-4">
                    <button
                        onClick={onClose}
                        className="px-10 py-3 cursor-pointer bg-[#94919180] border border-[#00000080] rounded-[10px] font-poppins text-[16px] font-[500] text-black hover:bg-[#00000080]"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-10 py-3 cursor-pointer bg-[#FFB0004D]  border border-[#FFB000] rounded-[10px] font-poppins text-[16px] font-[500] text-[#000000] hover:bg-[#FFB000]  disabled:cursor-not-allowed"
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
}
const AddContactDetailsModal = ({ isOpen, onClose, data, fetchdata }) => {
    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        customerCarePhone: '',
        address: '',
        fax: '',
        map: '',
        mapLink: '',
        fb: '',
        google: '',
        instagram: '',
        youtube: '',
        linkedIn: '',
        tikTok: '',
        image: null
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef();

    const MAX_FILE_SIZE_MB = 5;
    const VALID_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];


    useEffect(() => {
        if (data) {
            setFormData({
                name: data.name || '',
                email: data.email || '',
                customerCarePhone: data.customerCarePhone || '',
                address: data.address || '',
                fax: data.fax || '',
                map: data.map || '',
                mapLink: data.mapLink || '',
                fb: data.fb || '',
                google: data.google || '',
                instagram: data.instagram || '',
                youtube: data.youtube || '',
                linkedIn: data.linkedIn || '',
                tikTok: data.tikTok || '',
                image: null // don’t pre-fill file input
            });
            setImagePreview(data?.image || null)
        }
    }, [data]);



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!VALID_FILE_TYPES.includes(file.type)) {
                toast.error("Invalid file type! Only JPG, JPEG, and PNG are allowed.");
                return;
            }
            if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                toast.error(`File size should not exceed ${MAX_FILE_SIZE_MB} MB.`);
                return;
            }
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleClearImage = () => {
        setImage(null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    };

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            customerCarePhone: '',
            address: '',
            fax: '',
            map: '',
            mapLink: '',
            fb: '',
            google: '',
            instagram: '',
            youtube: '',
            linkedIn: '',
            tikTok: '',
            image: null
        });
    };


    const handleSubmit = async () => {
        const {
            name, email, customerCarePhone, address, map, mapLink
        } = formData;

        if (!name || !email || !customerCarePhone || !address || !map || !mapLink) {
            toast.error("Please fill all required fields!");
            return;
        }

        const payload = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value) payload.append(key, value);
        });

        await postApi(endPoints.addContactDetails, payload, {
            setLoading,
            successMsg: "Contact details saved successfully!",
            errorMsg: "Failed to save contact details!",
            additionalFunctions: [
                () => fetchdata(),
                () => resetForm(),
                () => onClose(),
            ],
        });
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-white rounded-xl w-full max-w-3xl p-5 relative shadow-lg overflow-y-auto max-h-[90vh]">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-manrope text-lg font-bold text-[#000000]">Update Contact Details</h2>
                    <IoMdCloseCircleOutline
                        color="#C12D34"
                        size={25}
                        className="cursor-pointer"
                        onClick={onClose}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { label: "Name", name: "name" },
                        { label: "Email", name: "email" },
                        { label: "Customer Care Phone", name: "customerCarePhone" },
                        { label: "Address", name: "address" },
                        { label: "Fax", name: "fax" },
                        { label: "Map", name: "map" },
                        { label: "Map Link", name: "mapLink" },
                        { label: "Facebook", name: "fb" },
                        { label: "Google", name: "google" },
                        { label: "Instagram", name: "instagram" },
                        { label: "YouTube", name: "youtube" },
                        { label: "LinkedIn", name: "linkedIn" },
                        { label: "TikTok", name: "tikTok" },
                    ].map(input => (
                        <div key={input.name}>
                            <label className="block text-sm font-semibold mb-1">{input.label}</label>
                            <input
                                name={input.name}
                                type="text"
                                placeholder={`Enter ${input.label}`}
                                value={formData[input.name]}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#FFB000] focus:ring-1 focus:ring-[#FFB000]"
                            />
                        </div>
                    ))}

                    {/* Image upload */}
                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-semibold mb-1">Image</label>
                        <div
                            className={`w-full border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-4 ${imagePreview ? "border-green-400 bg-green-50" : "border-[#00000080]"}`}
                        >
                            {imagePreview ? (
                                <div className="flex flex-col items-center gap-3">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-40 h-40 object-fill rounded-lg border border-gray-300"
                                    />
                                    <button
                                        onClick={handleClearImage}
                                        type="button"
                                        className="inline-flex items-center px-4 py-2 cursor-pointer border border-red-400 text-red-600 text-sm font-medium rounded-md hover:bg-red-400 hover:text-black transition"
                                    >
                                        Clear Image
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-2">
                                    <p className="text-gray-500 text-sm">No image selected</p>
                                    <button
                                        onClick={handleUploadClick}
                                        type="button"
                                        className="bg-[#FFB0004D] border border-[#FFB000] cursor-pointer hover:bg-[#FFB000] text-black font-medium px-5 py-2 rounded-md"
                                    >
                                        Select Image
                                    </button>
                                </div>
                            )}
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                hidden
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-3 mt-4">
                    <button
                        onClick={onClose}
                        className="px-10 py-3 cursor-pointer bg-[#94919180] border border-[#00000080] rounded-[10px] font-poppins text-[16px] font-[500] text-black hover:bg-[#00000080]"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-10 py-3 cursor-pointer bg-[#FFB0004D]  border border-[#FFB000] rounded-[10px] font-poppins text-[16px] font-[500] text-[#000000] hover:bg-[#FFB000] disabled={loading}"
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
}




export {
    ConfirmModal,
    AddRuleModal,
    AddRTPModal,
    AddContactDetailsModal
}