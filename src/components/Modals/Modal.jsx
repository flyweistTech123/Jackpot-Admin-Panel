import React, { useEffect, useRef, useState } from "react";

import { IoMdCloseCircleOutline } from "react-icons/io";
import { postApi, putApi } from "../../Repository/Api";
import endPoints from "../../Repository/apiConfig";

import { toast } from 'sonner';


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


const AddHowItWorkModal = ({ isOpen, onClose, edit, data, fetchdata }) => {
    if (!isOpen) return null;

    const id = data?._id;
    const [title, setTitle] = useState(data?.title || '');
    const [desc, setDesc] = useState(data?.desc || '');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    const MAX_FILE_SIZE_MB = 5;
    const VALID_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/svg"];

    useEffect(() => {
        if (edit && data) {
            setTitle(data?.title || "");
            setDesc(data?.desc || "");
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
        setDesc("");
        setImage(null);
        setImagePreview("");
    };


    const handleSubmit = async () => {
        if (!title || !desc || !image) {
            toast.error("Please provide all the fields!");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("desc", desc);
        formData.append("image", image);

        await postApi(endPoints.addHowItwork, formData, {
            setLoading,
            successMsg: "How It Works section added successfully!",
            errorMsg: "Failed to add How It Works section!",
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
        formData.append("desc", desc);
        if (image) {
            formData.append("image", image);
        }

        await putApi(endPoints.updateRole(id), formData, {
            setLoading,
            successMsg: "How It Works section updated successfully!",
            errorMsg: "Failed to update How It Works section!",
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
                        {edit ? "Edit How It Works Section" : "Add New How It Works Section"}
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
                            Description
                        </label>
                        <textarea
                            id="desc"
                            placeholder="Enter the description"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            rows={4}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#FFB000] focus:ring-1 focus:ring-[#FFB000]"
                        />
                    </div>
                    {/* Feature Image */}
                    <div>
                        <label htmlFor="featureImage" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Image
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
                                        className="w-40 h-40 object-contain rounded-lg border border-gray-300"
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


const AddSlotMasteryModal = ({ isOpen, onClose, edit, data, fetchdata }) => {
    if (!isOpen) return null;

    const id = data?._id;
    const [title, setTitle] = useState(data?.title || '');
    const [desc, setDesc] = useState(data?.desc || '');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    const MAX_FILE_SIZE_MB = 5;
    const VALID_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/svg"];

    useEffect(() => {
        if (edit && data) {
            setTitle(data?.title || "");
            setDesc(data?.desc || "");
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
        setDesc("");
        setImage(null);
        setImagePreview("");
    };


    const handleSubmit = async () => {
        if (!title || !desc || !image) {
            toast.error("Please provide all the fields!");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("desc", desc);
        formData.append("image", image);

        await postApi(endPoints.addSlotMasteryInHomePage, formData, {
            setLoading,
            successMsg: "Slot Mastery section added successfully!",
            errorMsg: "Failed to add Slot Mastery section!",
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
        formData.append("desc", desc);
        if (image) {
            formData.append("image", image);
        }

        await putApi(endPoints.updateRole(id), formData, {
            setLoading,
            successMsg: "How It Works section updated successfully!",
            errorMsg: "Failed to update How It Works section!",
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
                        {edit ? "Edit Slot Mastery Section" : "Add New Slot Mastery Section"}
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
                            Description
                        </label>
                        <textarea
                            id="desc"
                            placeholder="Enter the description"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            rows={4}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#FFB000] focus:ring-1 focus:ring-[#FFB000]"
                        />
                    </div>
                    {/* Feature Image */}
                    <div>
                        <label htmlFor="featureImage" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Image
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
                                        className="w-40 h-40 object-cover rounded-lg border border-gray-300"
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

const AddFeaturesBenefitsModal = ({ isOpen, onClose, edit, data, fetchdata }) => {
    if (!isOpen) return null;

    const id = data?._id;
    const [title, setTitle] = useState(data?.title || '');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    const MAX_FILE_SIZE_MB = 5;
    const VALID_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/svg"];

    useEffect(() => {
        if (edit && data) {
            setTitle(data?.title || "");
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
        setImage(null);
        setImagePreview("");
    };


    const handleSubmit = async () => {
        if (!title || !image) {
            toast.error("Please provide all the fields!");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("image", image);

        await postApi(endPoints.addMiddleDataInHomePage, formData, {
            setLoading,
            successMsg: "Features & Benefits section added successfully!",
            errorMsg: "Failed to add Features & Benefits section!",
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
        if (image) {
            formData.append("image", image);
        }

        await putApi(endPoints.updateRole(id), formData, {
            setLoading,
            successMsg: "Features & Benefits section updated successfully!",
            errorMsg: "Failed to update Features & Benefits section!",
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
                        {edit ? "Edit Features & Benefits Section" : "Add New Features & Benefits Section"}
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
                    {/* Feature Image */}
                    <div>
                        <label htmlFor="featureImage" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Image
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
                                        className="w-40 h-40 object-cover rounded-lg border border-gray-300"
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

const AddEngagingSlotsModal = ({ isOpen, onClose, edit, data, fetchdata }) => {
    if (!isOpen) return null;

    const id = data?._id;
    const [title, setTitle] = useState(data?.title || '');
    const [desc, setDesc] = useState(data?.desc || '');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    const MAX_FILE_SIZE_MB = 5;
    const VALID_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/svg"];

    useEffect(() => {
        if (edit && data) {
            setTitle(data?.title || "");
            setDesc(data?.desc || "");
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
        setImage(null);
        setImagePreview("");
    };


    const handleSubmit = async () => {
        if (!title || !image) {
            toast.error("Please provide all the fields!");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("desc", desc);
        formData.append("image", image);

        await postApi(endPoints.addEngagingSlotExperiencesInHomePage, formData, {
            setLoading,
            successMsg: "Engaging Slot Experiences section added successfully!",
            errorMsg: "Failed to add Engaging Slot Experiences section!",
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
        formData.append("desc", desc);
        if (image) {
            formData.append("image", image);
        }

        await putApi(endPoints.updateRole(id), formData, {
            setLoading,
            successMsg: "Features & Benefits section updated successfully!",
            errorMsg: "Failed to update Features & Benefits section!",
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
                        {edit ? "Edit Engaging Slot Experiences Section" : "Add New Engaging Slot Experiences Section"}
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
                    <div>
                        <label htmlFor="title" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Description
                        </label>
                        <textarea
                            id="desc"
                            placeholder="Enter the description"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            rows={4}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#FFB000] focus:ring-1 focus:ring-[#FFB000]"
                        />
                    </div>
                    {/* Feature Image */}
                    <div>
                        <label htmlFor="featureImage" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Image
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
                                        className="w-40 h-40 object-cover rounded-lg border border-gray-300"
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
const AddWhatWeGetModal = ({ isOpen, onClose, edit, data, fetchdata }) => {
    if (!isOpen) return null;

    const id = data?._id;
    const [title, setTitle] = useState(data?.title || '');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (edit && data) {
            setTitle(data?.title || "");
        } else if (!edit) {
            resetForm();
        }
    }, [edit, data]);

    const resetForm = () => {
        setTitle("");
    };


    const handleSubmit = async () => {
        if (!title) {
            toast.error("Please provide all the fields!");
            return;
        }

        const payload = {
            title: `✅ ${title}`
        }

        await postApi(endPoints.addWhatWeGetInHomePage, payload, {
            setLoading,
            successMsg: "What We Get section added successfully!",
            errorMsg: "Failed to add What We Get section!",
            additionalFunctions: [
                () => fetchdata(),
                () => resetForm(),
                () => onClose(),
            ],
        });
    };

    const handleupdate = async () => {
        const payload = {
            title: `✅ ${title}`
        }


        await putApi(endPoints.updateRole(id), payload, {
            setLoading,
            successMsg: "Features & Benefits section updated successfully!",
            errorMsg: "Failed to update Features & Benefits section!",
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
                        {edit ? "Edit What We Get Section" : "Add New What We Get Section"}
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

const AddSecurityAndComplianceModal = ({ isOpen, onClose, edit, data, fetchdata }) => {
    if (!isOpen) return null;

    const id = data?._id;
    const [title, setTitle] = useState(data?.title || '');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    const MAX_FILE_SIZE_MB = 5;
    const VALID_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/svg"];

    useEffect(() => {
        if (edit && data) {
            setTitle(data?.title || "");
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
        setImage(null);
        setImagePreview("");
    };


    const handleSubmit = async () => {
        if (!title || !image) {
            toast.error("Please provide all the fields!");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("image", image);

        await postApi(endPoints.addSecurityAndComplianceInHomePage, formData, {
            setLoading,
            successMsg: "Security And Compliance section added successfully!",
            errorMsg: "Failed to add Security And Compliance section!",
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
        if (image) {
            formData.append("image", image);
        }

        await putApi(endPoints.updateRole(id), formData, {
            setLoading,
            successMsg: "Security And Compliance section updated successfully!",
            errorMsg: "Failed to update Security And Compliance section!",
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
                        {edit ? "Edit Security And Compliance Section" : "Add New Security And Compliance Section"}
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
                    {/* Feature Image */}
                    <div>
                        <label htmlFor="featureImage" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Image
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
                                        className="w-40 h-40 object-cover rounded-lg border border-gray-300"
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

const AddGameCategoriesModal = ({ isOpen, onClose, edit, data, fetchdata }) => {
    if (!isOpen) return null;

    const id = data?._id;
    const [title, setTitle] = useState(data?.title || '');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    const MAX_FILE_SIZE_MB = 5;
    const VALID_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/svg"];

    useEffect(() => {
        if (edit && data) {
            setTitle(data?.title || "");
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
        setImage(null);
        setImagePreview("");
    };


    const handleSubmit = async () => {
        if (!title || !image) {
            toast.error("Please provide all the fields!");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("image", image);

        await postApi(endPoints.addGameCategoriesInHomePage, formData, {
            setLoading,
            successMsg: "Game Categories section added successfully!",
            errorMsg: "Failed to add Game Categories section!",
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
        if (image) {
            formData.append("image", image);
        }

        await putApi(endPoints.updateRole(id), formData, {
            setLoading,
            successMsg: "Game Categories section updated successfully!",
            errorMsg: "Failed to update Game Categories section!",
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
                        {edit ? "Edit Game Categories Section" : "Add New Game Categories Section"}
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
                    {/* Feature Image */}
                    <div>
                        <label htmlFor="featureImage" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Image
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
                                        className="w-40 h-40 object-cover rounded-lg border border-gray-300"
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

const EditHeroSectionModal = ({ isOpen, onClose, edit, data, fetchdata }) => {
    if (!isOpen) return null;
    const [title, setTitle] = useState(data?.title || '');
    const [buttonName, setButtonName] = useState(data?.subTitleButton || '');
    const [phonetitle, setPhoneTitle] = useState(data?.middleTitle || '');
    const [engagingSlotExperiencesTitle, setEngagingSlotExperiencesTitle] = useState(data?.engagingSlotExperiencesTitle || '');
    const [whatWeGetTitle, setWhatWeGetTitle] = useState(data?.whatWeGetTitle || '');
    const [securityAndComplianceTitle, setSecurityAndComplianceTitle] = useState(data?.securityAndComplianceTitle || '');
    const [gameCategoriesTitle, setGameCategoriesTitle] = useState(data?.gameCategoriesTitle || '');
    const [gameCategoriesButton, setGameCategoriesButton] = useState(data?.gameCategoriesButton || '');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageUpper, setImageUpper] = useState(null);
    const [imageUpperPreview, setImageUpperPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const imageInputRef = useRef(null);
    const imageEffectInputRef = useRef(null);


    const MAX_FILE_SIZE_MB = 5;
    const VALID_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/svg"];

    useEffect(() => {
        if (edit && data) {
            setTitle(data?.title || "");
            setButtonName(data?.subTitleButton || "");
            setPhoneTitle(data?.middleTitle || "");
            setEngagingSlotExperiencesTitle(data?.engagingSlotExperiencesTitle || "");
            setWhatWeGetTitle(data?.whatWeGetTitle || "");
            setSecurityAndComplianceTitle(data?.securityAndComplianceTitle || "");
            setGameCategoriesTitle(data?.gameCategoriesTitle || "");
            setGameCategoriesButton(data?.gameCategoriesButton || "");
            setImage(null);
            setImagePreview(data?.image || null);
            setImageUpper(null);
            setImageUpperPreview(data?.upperImage || null);
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

    const handleFileChangeEffect = (e) => {
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

            setImageUpper(file);
            setImageUpperPreview(URL.createObjectURL(file));
        }
    };

    const handleClearImage = () => {
        setImage(null);
        setImagePreview(null);
    };

    const handleClearImageEffect = () => {
        setImageUpper(null);
        setImageUpperPreview(null);
    };
    const handleUploadClick = () => {
        if (imageInputRef.current) imageInputRef.current.click();
    };

    const handleUploadClickEffect = () => {
        if (imageEffectInputRef.current) imageEffectInputRef.current.click();
    };


    const resetForm = () => {
        setTitle("");
        setButtonName("");
        setPhoneTitle("");
        setEngagingSlotExperiencesTitle("");
        setWhatWeGetTitle("");
        setSecurityAndComplianceTitle("");
        setGameCategoriesTitle("");
        setGameCategoriesButton("");
        setImage(null);
        setImagePreview(null);
        setImageUpper(null);
        setImageUpperPreview(null);
    };


    const handleSubmit = async () => {
        if (!title || (!image && !imagePreview) || (!imageUpper && !imageUpperPreview) || !buttonName) {
            toast.error("Please provide all the fields!");
            return;
        }


        const formData = new FormData();
        formData.append("title", title);
        formData.append("subTitleButton", buttonName);
        formData.append("middleTitle", phonetitle);
        formData.append("engagingSlotExperiencesTitle", engagingSlotExperiencesTitle);
        formData.append("whatWeGetTitle", whatWeGetTitle);
        formData.append("securityAndComplianceTitle", securityAndComplianceTitle);
        formData.append("gameCategoriesTitle", gameCategoriesTitle);
        formData.append("gameCategoriesButton", gameCategoriesButton);
        if (image) {
            formData.append("image", image);
        }
        if (imageUpper) {
            formData.append("upperImage", imageUpper);
        }

        await postApi(endPoints.addHomePage, formData, {
            setLoading,
            successMsg: "Hero Section and titles updated successfully!",
            errorMsg: "Failed to update hero section and titles!",
            additionalFunctions: [
                () => fetchdata(),
                () => resetForm(),
                () => onClose(),
            ],
        });
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-white rounded-xl w-full max-w-2xl p-3 relative shadow-lg h-[80vh] overflow-auto">
                {/* Close Button */}
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-manrope text-[16px] font-bold text-[#000000]">
                        {edit ? "Edit Hero Section and Page Titles" : "Add Hero Section and Page Titles"}
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
                    {/* Hero Title */}
                    <div>
                        <label className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Hero Title
                        </label>
                        <input
                            type="text"
                            placeholder="Enter the hero section title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#FFB000] focus:ring-1 focus:ring-[#FFB000]"
                        />
                    </div>

                    {/* Hero Button */}
                    <div>
                        <label className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Hero Button Text
                        </label>
                        <input
                            type="text"
                            placeholder="Enter the button name"
                            value={buttonName}
                            onChange={(e) => setButtonName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#FFB000] focus:ring-1 focus:ring-[#FFB000]"
                        />
                    </div>

                    {/* Phone Title */}
                    <div>
                        <label className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Phone Title (Middle Title)
                        </label>
                        <input
                            type="text"
                            placeholder="Enter the phone/middle title"
                            value={phonetitle}
                            onChange={(e) => setPhoneTitle(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#FFB000] focus:ring-1 focus:ring-[#FFB000]"
                        />
                    </div>

                    {/* Engaging Slot Experiences Title */}
                    <div>
                        <label className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Engaging Slot Experiences Title
                        </label>
                        <input
                            type="text"
                            placeholder="Enter the engaging slot experiences title"
                            value={engagingSlotExperiencesTitle}
                            onChange={(e) => setEngagingSlotExperiencesTitle(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#FFB000] focus:ring-1 focus:ring-[#FFB000]"
                        />
                    </div>

                    {/* What We Get Title */}
                    <div>
                        <label className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            What We Get Title
                        </label>
                        <input
                            type="text"
                            placeholder="Enter the What We Get section title"
                            value={whatWeGetTitle}
                            onChange={(e) => setWhatWeGetTitle(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#FFB000] focus:ring-1 focus:ring-[#FFB000]"
                        />
                    </div>

                    {/* Security & Compliance Title */}
                    <div>
                        <label className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Security & Compliance Title
                        </label>
                        <input
                            type="text"
                            placeholder="Enter the security and compliance title"
                            value={securityAndComplianceTitle}
                            onChange={(e) => setSecurityAndComplianceTitle(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#FFB000] focus:ring-1 focus:ring-[#FFB000]"
                        />
                    </div>

                    {/* Game Categories Title */}
                    <div>
                        <label className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Game Categories Title
                        </label>
                        <input
                            type="text"
                            placeholder="Enter the game categories title"
                            value={gameCategoriesTitle}
                            onChange={(e) => setGameCategoriesTitle(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#FFB000] focus:ring-1 focus:ring-[#FFB000]"
                        />
                    </div>

                    {/* Game Categories Button */}
                    <div>
                        <label className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Game Categories Button
                        </label>
                        <input
                            type="text"
                            placeholder="Enter the game categories button text"
                            value={gameCategoriesButton}
                            onChange={(e) => setGameCategoriesButton(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#FFB000] focus:ring-1 focus:ring-[#FFB000]"
                        />
                    </div>
                    <div>
                        <label htmlFor="featureImage" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Hero Back Image
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
                                        className="w-40 h-40 object-cover rounded-lg border border-gray-300"
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
                                ref={imageInputRef}
                                onChange={handleFileChange}
                                hidden
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="featureImage" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Hero Upper Image
                        </label>

                        <div
                            className={`w-full border-2 border-dashed rounded-lg flex flex-col items-center justify-center  p-4 ${imagePreview ? "border-green-400 bg-green-50" : "border-[#00000080]"
                                }`}
                        >
                            {imageUpperPreview ? (
                                <div className="flex flex-col items-center gap-3 ">
                                    <img
                                        src={imageUpperPreview}
                                        alt="Preview"
                                        className="w-40 h-40 object-contain rounded-lg border border-gray-300 bg-black"
                                    />
                                    <button
                                        onClick={handleClearImageEffect}
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
                                        onClick={handleUploadClickEffect}
                                        type="button"
                                        className="bg-[#FFB0004D] border border-[#FFB000] cursor-pointer hover:bg-[#FFB000] text-black font-medium px-5 py-2 rounded-md"
                                    >
                                        Select Image
                                    </button>
                                </div>
                            )}

                            <input
                                type="file"
                                ref={imageEffectInputRef}
                                onChange={handleFileChangeEffect}
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

const EditFooterModal = ({ isOpen, onClose, edit, data, fetchdata }) => {
    if (!isOpen) return null;
    const [title, setTitle] = useState(data?.footerBannerTitle || '');
    const [buttonName, setButtonName] = useState(data?.footerBannerButton || '');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageEffect, setImageEffect] = useState(null);
    const [imageEffectPreview, setImageEffectPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const imageInputRef = useRef(null);
    const imageEffectInputRef = useRef(null);


    const MAX_FILE_SIZE_MB = 5;
    const VALID_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/svg"];

    useEffect(() => {
        if (edit && data) {
            setTitle(data?.footerBannerTitle || "");
            setButtonName(data?.footerBannerButton || "");
            setImage(null);
            setImagePreview(data?.image || null);
            setImageEffect(null);
            setImageEffectPreview(data?.footerBannerImageEffect || null);
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

    const handleFileChangeEffect = (e) => {
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

            setImageEffect(file);
            setImageEffectPreview(URL.createObjectURL(file));
        }
    };

    const handleClearImage = () => {
        setImage(null);
        setImagePreview(null);
    };

    const handleClearImageEffect = () => {
        setImageEffect(null);
        setImageEffectPreview(null);
    };
    const handleUploadClick = () => {
        if (imageInputRef.current) imageInputRef.current.click();
    };

    const handleUploadClickEffect = () => {
        if (imageEffectInputRef.current) imageEffectInputRef.current.click();
    };


    const resetForm = () => {
        setTitle("");
        setButtonName("");
        setImage(null);
        setImagePreview("");
        setImageEffect("");
        setImageEffectPreview("");
    };


    const handleSubmit = async () => {
        if (!title || (!image && !imagePreview) || (!imageEffect && !imageEffectPreview) || !buttonName) {
            toast.error("Please provide all the fields!");
            return;
        }


        const formData = new FormData();
        formData.append("footerBannerTitle", title);
        formData.append("footerBannerButton", buttonName);
        if (image) {
            formData.append("image", image);
        }
        if (imageEffect) {
            formData.append("footerBannerImageEffect", imageEffect);
        }

        await postApi(endPoints.addFooterInHomePage, formData, {
            setLoading,
            successMsg: "Footer section updated successfully!",
            errorMsg: "Failed to update Footer section!",
            additionalFunctions: [
                () => fetchdata(),
                () => resetForm(),
                () => onClose(),
            ],
        });
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-white rounded-xl w-full max-w-2xl p-3 relative shadow-lg h-[80vh] overflow-auto">
                {/* Close Button */}
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-manrope text-[16px] font-bold text-[#000000]">
                        {edit ? "Edit Footer Section" : "Add New Footer Section"}
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
                            Footer Title
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
                    <div>
                        <label htmlFor="title" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Footer Button Title
                        </label>
                        <input
                            type="text"
                            id="buttontitle"
                            placeholder="Enter the button title"
                            value={buttonName}
                            onChange={(e) => setButtonName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#FFB000] focus:ring-1 focus:ring-[#FFB000]"
                        />
                    </div>
                    {/* Feature Image */}
                    <div>
                        <label htmlFor="featureImage" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Image
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
                                        className="w-40 h-40 object-cover rounded-lg border border-gray-300"
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
                                ref={imageInputRef}
                                onChange={handleFileChange}
                                hidden
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="featureImage" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Footer Image Effect
                        </label>

                        <div
                            className={`w-full border-2 border-dashed rounded-lg flex flex-col items-center justify-center  p-4 ${imagePreview ? "border-green-400 bg-green-50" : "border-[#00000080]"
                                }`}
                        >
                            {imageEffectPreview ? (
                                <div className="flex flex-col items-center gap-3 ">
                                    <img
                                        src={imageEffectPreview}
                                        alt="Preview"
                                        className="w-40 h-40 object-contain rounded-lg border border-gray-300 bg-black"
                                    />
                                    <button
                                        onClick={handleClearImageEffect}
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
                                        onClick={handleUploadClickEffect}
                                        type="button"
                                        className="bg-[#FFB0004D] border border-[#FFB000] cursor-pointer hover:bg-[#FFB000] text-black font-medium px-5 py-2 rounded-md"
                                    >
                                        Select Image
                                    </button>
                                </div>
                            )}

                            <input
                                type="file"
                                ref={imageEffectInputRef}
                                onChange={handleFileChangeEffect}
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



const EditHeroSectionDeveloperPageModal = ({ isOpen, onClose, edit, data, fetchdata }) => {
    if (!isOpen) return null;
    const [title, setTitle] = useState(data?.title || '');
    const [benefitsTitle, setBenefitsTitle] = useState(data?.benefitsTitle || '');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [topImageAfterEffect, setTopImageAfterEffect] = useState(null);
    const [topImageAfterEffectPreview, setTopImageAfterEffectPreview] = useState(null);
    const [topImageAfterEffect1, setTopImageAfterEffect1] = useState(null);
    const [topImageAfterEffectPreview1, setTopImageAfterEffectPreview1] = useState(null);
    const [topImageAfterEffect2, setTopImageAfterEffect2] = useState(null);
    const [topImageAfterEffectPreview2, setTopImageAfterEffectPreview2] = useState(null);
    const [loading, setLoading] = useState(false);
    const imageInputRef = useRef(null);
    const imageEffectInputRef = useRef(null);
    const imageEffectInputRef1 = useRef(null);
    const imageEffectInputRef2 = useRef(null);


    const MAX_FILE_SIZE_MB = 5;
    const VALID_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/svg"];

    useEffect(() => {
        if (edit && data) {
            setTitle(data?.title || "");
            setBenefitsTitle(data?.benefitsTitle || "");
            setImage(null);
            setImagePreview(data?.topImage || null);
            setTopImageAfterEffect(null);
            setTopImageAfterEffectPreview(data?.topImageAfterEffect || null);
            setTopImageAfterEffect1(null);
            setTopImageAfterEffectPreview1(data?.topImageAfterEffect1 || null);
            setTopImageAfterEffect2(null);
            setTopImageAfterEffectPreview2(data?.topImageAfterEffect2 || null);
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

    const handleFileChangeEffect = (e) => {
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

            setTopImageAfterEffect(file);
            setTopImageAfterEffectPreview(URL.createObjectURL(file));
        }
    };
    const handleFileChangeEffect1 = (e) => {
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
            setTopImageAfterEffect1(file);
            setTopImageAfterEffectPreview1(URL.createObjectURL(file));
        }
    };
    const handleFileChangeEffect2 = (e) => {
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

            setTopImageAfterEffect2(file);
            setTopImageAfterEffectPreview2(URL.createObjectURL(file));
        }
    };

    const handleClearImage = () => {
        setImage(null);
        setImagePreview(null);
    };

    const handleClearImageEffect = () => {
        setTopImageAfterEffect(null);
        setTopImageAfterEffectPreview(null);
    };
    const handleClearImageEffect1 = () => {
        setTopImageAfterEffect1(null);
        setTopImageAfterEffectPreview1(null);
    };
    const handleClearImageEffect2 = () => {
        setTopImageAfterEffect2(null);
        setTopImageAfterEffectPreview2(null);
    };


    const handleUploadClick = () => {
        if (imageInputRef.current) imageInputRef.current.click();
    };

    const handleUploadClickEffect = () => {
        if (imageEffectInputRef.current) imageEffectInputRef.current.click();
    };
    const handleUploadClickEffect1 = () => {
        if (imageEffectInputRef1.current) imageEffectInputRef1.current.click();
    };
    const handleUploadClickEffect2 = () => {
        if (imageEffectInputRef2.current) imageEffectInputRef2.current.click();
    };


    const resetForm = () => {
        setTitle("");
        setBenefitsTitle("");
        setImage(null);
        setImagePreview(null);
        setTopImageAfterEffect(null);
        setTopImageAfterEffectPreview(null);
        setTopImageAfterEffect1(null);
        setTopImageAfterEffectPreview1(null);
        setTopImageAfterEffect2(null);
        setTopImageAfterEffectPreview2(null);
    };


    const handleSubmit = async () => {
        if (!title || (!image && !imagePreview) || (!topImageAfterEffect && !topImageAfterEffectPreview)) {
            toast.error("Please provide all the fields!");
            return;
        }


        const formData = new FormData();
        formData.append("title", title);
        formData.append("benefitsTitle", benefitsTitle);
        if (image) {
            formData.append("topImage", image);
        }
        if (topImageAfterEffect) {
            formData.append("topImageAfterEffect", topImageAfterEffect);
        }
        if (topImageAfterEffect1) {
            formData.append("topImageAfterEffect1", topImageAfterEffect1);
        }
        if (topImageAfterEffect2) {
            formData.append("topImageAfterEffect2", topImageAfterEffect2);
        }

        await postApi(endPoints.addDeveloperPage, formData, {
            setLoading,
            successMsg: "Hero Section and titles updated successfully!",
            errorMsg: "Failed to update hero section and titles!",
            additionalFunctions: [
                () => fetchdata(),
                () => resetForm(),
                () => onClose(),
            ],
        });
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-white rounded-xl w-full max-w-2xl p-3 relative shadow-lg h-[80vh] overflow-auto">
                {/* Close Button */}
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-manrope text-[16px] font-bold text-[#000000]">
                        {edit ? "Edit Hero Section and Page Titles" : "Add Hero Section and Page Titles"}
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
                    {/* Hero Title */}
                    <div>
                        <label className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Hero Title
                        </label>
                        <input
                            type="text"
                            placeholder="Enter the hero section title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#FFB000] focus:ring-1 focus:ring-[#FFB000]"
                        />
                    </div>

                    {/* Phone Title */}
                    <div>
                        <label className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Benefits Title
                        </label>
                        <input
                            type="text"
                            placeholder="Enter the benefit title"
                            value={benefitsTitle}
                            onChange={(e) => setBenefitsTitle(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#FFB000] focus:ring-1 focus:ring-[#FFB000]"
                        />
                    </div>
                    <div>
                        <label htmlFor="featureImage" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Hero Top Image
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
                                        className="w-40 h-40 object-cover rounded-lg border border-gray-300"
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
                                ref={imageInputRef}
                                onChange={handleFileChange}
                                hidden
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="featureImage" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            1. Hero Top Image After Effect
                        </label>

                        <div
                            className={`w-full border-2 border-dashed rounded-lg flex flex-col items-center justify-center  p-4 ${imagePreview ? "border-green-400 bg-green-50" : "border-[#00000080]"
                                }`}
                        >
                            {topImageAfterEffectPreview ? (
                                <div className="flex flex-col items-center gap-3 ">
                                    <img
                                        src={topImageAfterEffectPreview}
                                        alt="Preview"
                                        className="w-40 h-40 object-contain rounded-lg border border-gray-300 bg-black"
                                    />
                                    <button
                                        onClick={handleClearImageEffect}
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
                                        onClick={handleUploadClickEffect}
                                        type="button"
                                        className="bg-[#FFB0004D] border border-[#FFB000] cursor-pointer hover:bg-[#FFB000] text-black font-medium px-5 py-2 rounded-md"
                                    >
                                        Select Image
                                    </button>
                                </div>
                            )}

                            <input
                                type="file"
                                ref={imageEffectInputRef}
                                onChange={handleFileChangeEffect}
                                hidden
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="featureImage" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            2. Hero Top Image After Effect
                        </label>

                        <div
                            className={`w-full border-2 border-dashed rounded-lg flex flex-col items-center justify-center  p-4 ${imagePreview ? "border-green-400 bg-green-50" : "border-[#00000080]"
                                }`}
                        >
                            {topImageAfterEffectPreview1 ? (
                                <div className="flex flex-col items-center gap-3 ">
                                    <img
                                        src={topImageAfterEffectPreview1}
                                        alt="Preview"
                                        className="w-40 h-40 object-contain rounded-lg border border-gray-300 bg-black"
                                    />
                                    <button
                                        onClick={handleClearImageEffect1}
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
                                        onClick={handleUploadClickEffect1}
                                        type="button"
                                        className="bg-[#FFB0004D] border border-[#FFB000] cursor-pointer hover:bg-[#FFB000] text-black font-medium px-5 py-2 rounded-md"
                                    >
                                        Select Image
                                    </button>
                                </div>
                            )}

                            <input
                                type="file"
                                ref={imageEffectInputRef1}
                                onChange={handleFileChangeEffect1}
                                hidden
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="featureImage" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            3. Hero Top Image After Effect
                        </label>

                        <div
                            className={`w-full border-2 border-dashed rounded-lg flex flex-col items-center justify-center  p-4 ${imagePreview ? "border-green-400 bg-green-50" : "border-[#00000080]"
                                }`}
                        >
                            {topImageAfterEffectPreview2 ? (
                                <div className="flex flex-col items-center gap-3 ">
                                    <img
                                        src={topImageAfterEffectPreview2}
                                        alt="Preview"
                                        className="w-40 h-40 object-contain rounded-lg border border-gray-300 bg-black"
                                    />
                                    <button
                                        onClick={handleClearImageEffect2}
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
                                        onClick={handleUploadClickEffect2}
                                        type="button"
                                        className="bg-[#FFB0004D] border border-[#FFB000] cursor-pointer hover:bg-[#FFB000] text-black font-medium px-5 py-2 rounded-md"
                                    >
                                        Select Image
                                    </button>
                                </div>
                            )}

                            <input
                                type="file"
                                ref={imageEffectInputRef2}
                                onChange={handleFileChangeEffect2}
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

const AddDataInDeveloperPage = ({ isOpen, onClose, edit, data, fetchdata }) => {
    if (!isOpen) return null;

    const id = data?._id;
    const [title, setTitle] = useState(data?.title || '');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (edit && data) {
            setTitle(data?.title || "");
        } else if (!edit) {
            resetForm();
        }
    }, [edit, data]);

    const resetForm = () => {
        setTitle("");
    };


    const handleSubmit = async () => {
        if (!title) {
            toast.error("Please provide all the fields!");
            return;
        }

        const payload = {
            title: title
        }

        await postApi(endPoints.addDataInDeveloperPage, payload, {
            setLoading,
            successMsg: "How It Works section added successfully!",
            errorMsg: "Failed to add  How It Works section!",
            additionalFunctions: [
                () => fetchdata(),
                () => resetForm(),
                () => onClose(),
            ],
        });
    };

    const handleupdate = async () => {
        const payload = {
            title: `✅ ${title}`
        }


        await putApi(endPoints.updateRole(id), payload, {
            setLoading,
            successMsg: " How It Works section updated successfully!",
            errorMsg: "Failed to update How It Works section!",
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
                        {edit ? "Edit How It Works Section" : "Add New  How It Works Section"}
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


const AddBannerDataModal = ({ isOpen, onClose, edit, data, fetchdata }) => {
    if (!isOpen) return null;

    const id = data?._id;
    const [title, setTitle] = useState(data?.title || '');
    const [desc, setDesc] = useState(data?.desc || '');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    const MAX_FILE_SIZE_MB = 5;
    const VALID_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/svg"];

    useEffect(() => {
        if (edit && data) {
            setTitle(data?.title || "");
            setDesc(data?.desc || "");
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
        setDesc("");
        setImage(null);
        setImagePreview("");
    };


    const handleSubmit = async () => {
        if (!title || !desc || !image) {
            toast.error("Please provide all the fields!");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("desc", desc);
        formData.append("image", image);

        await postApi(endPoints.addBannerDataInDeveloperPage, formData, {
            setLoading,
            successMsg: "Banner Data section added successfully!",
            errorMsg: "Failed to add Banner Data section!",
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
        formData.append("desc", desc);
        if (image) {
            formData.append("image", image);
        }

        await putApi(endPoints.updateRole(id), formData, {
            setLoading,
            successMsg: "Banner Data section updated successfully!",
            errorMsg: "Failed to update Banner Data section!",
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
                        {edit ? "Edit Banner Data Section" : "Add New Banner Data Section"}
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
                            Description
                        </label>
                        <textarea
                            id="desc"
                            placeholder="Enter the description"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            rows={4}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#FFB000] focus:ring-1 focus:ring-[#FFB000]"
                        />
                    </div>
                    {/* Feature Image */}
                    <div>
                        <label htmlFor="featureImage" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Image
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
                                        className="w-40 h-40 object-cover rounded-lg border border-gray-300"
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

const AddBenefitsDataModal = ({ isOpen, onClose, edit, data, fetchdata }) => {
    if (!isOpen) return null;

    const id = data?._id;
    const [title, setTitle] = useState(data?.title || '');
    const [desc, setDesc] = useState(data?.desc || '');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    const MAX_FILE_SIZE_MB = 5;
    const VALID_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/svg"];

    useEffect(() => {
        if (edit && data) {
            setTitle(data?.title || "");
            setDesc(data?.desc || "");
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
        setImage(null);
        setImagePreview("");
    };


    const handleSubmit = async () => {
        if (!title || !image) {
            toast.error("Please provide all the fields!");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("desc", desc);
        formData.append("image", image);

        await postApi(endPoints.addBenefitsDataInDeveloperPage, formData, {
            setLoading,
            successMsg: "Benefits Data section added successfully!",
            errorMsg: "Failed to add Benefits Data section!",
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
        formData.append("desc", desc);
        if (image) {
            formData.append("image", image);
        }

        await putApi(endPoints.updateRole(id), formData, {
            setLoading,
            successMsg: "Features & Benefits section updated successfully!",
            errorMsg: "Failed to update Features & Benefits section!",
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
                        {edit ? "Edit Benefits Data Section" : "Add New Benefits Data Section"}
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
                    <div>
                        <label htmlFor="title" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Description
                        </label>
                        <textarea
                            id="desc"
                            placeholder="Enter the description"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            rows={4}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#FFB000] focus:ring-1 focus:ring-[#FFB000]"
                        />
                    </div>
                    {/* Feature Image */}
                    <div>
                        <label htmlFor="featureImage" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Image
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
                                        className="w-40 h-40 object-cover rounded-lg border border-gray-300"
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

const EditaDeveloperCommunityModal = ({ isOpen, onClose, edit, data, fetchdata }) => {
    if (!isOpen) return null;
    const [title, setTitle] = useState(data?.developerCommunityTitle || '');
    const [description, setDescription] = useState(data?.developerCommunityDescription || '');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const imageInputRef = useRef(null);


    const MAX_FILE_SIZE_MB = 5;
    const VALID_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/svg"];

    useEffect(() => {
        if (edit && data) {
            setTitle(data?.developerCommunityTitle || "");
            setDescription(data?.developerCommunityDescription || "");
            setImage(null);
            setImagePreview(data?.developerCommunityImage || null);
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
        if (imageInputRef.current) imageInputRef.current.click();
    };

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setImage(null);
        setImagePreview(null);
    };


    const handleSubmit = async () => {
        if (!title || (!image && !imagePreview) || (!description)) {
            toast.error("Please provide all the fields!");
            return;
        }


        const formData = new FormData();
        formData.append("developerCommunityTitle", title);
        formData.append("developerCommunityDescription", description);
        if (image) {
            formData.append("topImage", image);
        }

        await postApi(endPoints.addDeveloperCommunityInDeveloperPage, formData, {
            setLoading,
            successMsg: "Developer Community section updated successfully!",
            errorMsg: "Failed to update Developer Community section!",
            additionalFunctions: [
                () => fetchdata(),
                () => resetForm(),
                () => onClose(),
            ],
        });
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-white rounded-xl w-full max-w-2xl p-3 relative shadow-lg h-[80vh] overflow-auto">
                {/* Close Button */}
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-manrope text-[16px] font-bold text-[#000000]">
                        {edit ? "Edit Developer Community Section" : "Add Developer Community Section"}
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
                    {/* Hero Title */}
                    <div>
                        <label className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Developer Community Title
                        </label>
                        <input
                            type="text"
                            placeholder="Enter the developer Community title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#FFB000] focus:ring-1 focus:ring-[#FFB000]"
                        />
                    </div>

                    {/* Phone Title */}
                    <div>
                        <label className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Developer Community Description
                        </label>
                        <textarea
                            id="desc"
                            placeholder="Enter the description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#FFB000] focus:ring-1 focus:ring-[#FFB000]"
                        />
                    </div>
                    <div>
                        <label htmlFor="featureImage" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Developer Community Image
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
                                        className="w-40 h-40 object-cover rounded-lg border border-gray-300"
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
                                ref={imageInputRef}
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

const EditFooterDeveloperModal = ({ isOpen, onClose, edit, data, fetchdata }) => {
    if (!isOpen) return null;
    const [title, setTitle] = useState(data?.footerBannerTitle || '');
    const [buttonName, setButtonName] = useState(data?.footerBannerButton || '');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageEffect, setImageEffect] = useState(null);
    const [imageEffectPreview, setImageEffectPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const imageInputRef = useRef(null);
    const imageEffectInputRef = useRef(null);


    const MAX_FILE_SIZE_MB = 5;
    const VALID_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/svg"];

    useEffect(() => {
        if (edit && data) {
            setTitle(data?.footerBannerTitle || "");
            setButtonName(data?.footerBannerButton || "");
            setImage(null);
            setImagePreview(data?.footerBannerImage || null);
            setImageEffect(null);
            setImageEffectPreview(data?.footerBannerImageEffect || null);
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

    const handleFileChangeEffect = (e) => {
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

            setImageEffect(file);
            setImageEffectPreview(URL.createObjectURL(file));
        }
    };

    const handleClearImage = () => {
        setImage(null);
        setImagePreview(null);
    };

    const handleClearImageEffect = () => {
        setImageEffect(null);
        setImageEffectPreview(null);
    };
    const handleUploadClick = () => {
        if (imageInputRef.current) imageInputRef.current.click();
    };

    const handleUploadClickEffect = () => {
        if (imageEffectInputRef.current) imageEffectInputRef.current.click();
    };


    const resetForm = () => {
        setTitle("");
        setButtonName("");
        setImage(null);
        setImagePreview("");
        setImageEffect("");
        setImageEffectPreview("");
    };


    const handleSubmit = async () => {
        if (!title || (!image && !imagePreview) || (!imageEffect && !imageEffectPreview) || !buttonName) {
            toast.error("Please provide all the fields!");
            return;
        }


        const formData = new FormData();
        formData.append("footerBannerTitle", title);
        formData.append("footerBannerButton", buttonName);
        if (image) {
            formData.append("image", image);
        }
        if (imageEffect) {
            formData.append("footerBannerImageEffect", imageEffect);
        }

        await postApi(endPoints.addFooterInDeveloperPage, formData, {
            setLoading,
            successMsg: "Footer section updated successfully!",
            errorMsg: "Failed to update Footer section!",
            additionalFunctions: [
                () => fetchdata(),
                () => resetForm(),
                () => onClose(),
            ],
        });
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-white rounded-xl w-full max-w-2xl p-3 relative shadow-lg h-[80vh] overflow-auto">
                {/* Close Button */}
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-manrope text-[16px] font-bold text-[#000000]">
                        {edit ? "Edit Footer Section" : "Add New Footer Section"}
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
                            Footer Title
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
                    <div>
                        <label htmlFor="title" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Footer Button Title
                        </label>
                        <input
                            type="text"
                            id="buttontitle"
                            placeholder="Enter the button title"
                            value={buttonName}
                            onChange={(e) => setButtonName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#FFB000] focus:ring-1 focus:ring-[#FFB000]"
                        />
                    </div>
                    {/* Feature Image */}
                    <div>
                        <label htmlFor="featureImage" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Image
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
                                        className="w-40 h-40 object-cover rounded-lg border border-gray-300"
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
                                ref={imageInputRef}
                                onChange={handleFileChange}
                                hidden
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="featureImage" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Footer Image Effect
                        </label>

                        <div
                            className={`w-full border-2 border-dashed rounded-lg flex flex-col items-center justify-center  p-4 ${imagePreview ? "border-green-400 bg-green-50" : "border-[#00000080]"
                                }`}
                        >
                            {imageEffectPreview ? (
                                <div className="flex flex-col items-center gap-3 ">
                                    <img
                                        src={imageEffectPreview}
                                        alt="Preview"
                                        className="w-40 h-40 object-contain rounded-lg border border-gray-300 bg-black"
                                    />
                                    <button
                                        onClick={handleClearImageEffect}
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
                                        onClick={handleUploadClickEffect}
                                        type="button"
                                        className="bg-[#FFB0004D] border border-[#FFB000] cursor-pointer hover:bg-[#FFB000] text-black font-medium px-5 py-2 rounded-md"
                                    >
                                        Select Image
                                    </button>
                                </div>
                            )}

                            <input
                                type="file"
                                ref={imageEffectInputRef}
                                onChange={handleFileChangeEffect}
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

const EditHeroSectionGamePageModal = ({ isOpen, onClose, edit, data, fetchdata }) => {
    if (!isOpen) return null;

    const id = data?._id;
    const [title, setTitle] = useState(data?.title || '');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (edit && data) {
            setTitle(data?.title || "");
        } else if (!edit) {
            resetForm();
        }
    }, [edit, data]);

    const resetForm = () => {
        setTitle("");
    };


    const handleSubmit = async () => {
        if (!title) {
            toast.error("Please provide all the fields!");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);


        await postApi(endPoints.addGamePage, formData, {
            setLoading,
            successMsg: "Hero section added successfully!",
            errorMsg: "Failed to add Hero section!",
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
                        {edit ? "Edit Hero Section" : "Add New Hero Section"}
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
                        className="px-10 py-3 cursor-pointer bg-[#FFB0004D]  border border-[#FFB000] rounded-[10px] font-poppins text-[16px] font-[500] text-[#000000] hover:bg-[#FFB000] disabled={loading}"
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
}

const AddGamesDataModal = ({ isOpen, onClose, edit, data, fetchdata }) => {
    if (!isOpen) return null;

    const id = data?._id;
    const [title, setTitle] = useState(data?.title || '');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    const MAX_FILE_SIZE_MB = 5;
    const VALID_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/svg"];

    useEffect(() => {
        if (edit && data) {
            setTitle(data?.title || "");
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
        setImage(null);
        setImagePreview("");
    };


    const handleSubmit = async () => {
        if (!title || !image) {
            toast.error("Please provide all the fields!");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("image", image);

        await postApi(endPoints.addDataInGamePage, formData, {
            setLoading,
            successMsg: "Games Data section added successfully!",
            errorMsg: "Failed to add Games Data section!",
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
        if (image) {
            formData.append("image", image);
        }

        await putApi(endPoints.updateRole(id), formData, {
            setLoading,
            successMsg: "Features & Benefits section updated successfully!",
            errorMsg: "Failed to update Features & Benefits section!",
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
                        {edit ? "Edit Games Data Section" : "Add New Games Data Section"}
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
                    {/* Feature Image */}
                    <div>
                        <label htmlFor="featureImage" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Image
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
                                        className="w-40 h-40 object-cover rounded-lg border border-gray-300"
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


const EditFooterGamePageModal = ({ isOpen, onClose, edit, data, fetchdata }) => {
    if (!isOpen) return null;
    const [title, setTitle] = useState(data?.footerBannerTitle || '');
    const [buttonName, setButtonName] = useState(data?.footerBannerButton || '');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageEffect, setImageEffect] = useState(null);
    const [imageEffectPreview, setImageEffectPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const imageInputRef = useRef(null);
    const imageEffectInputRef = useRef(null);


    const MAX_FILE_SIZE_MB = 5;
    const VALID_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/svg"];

    useEffect(() => {
        if (edit && data) {
            setTitle(data?.footerBannerTitle || "");
            setButtonName(data?.footerBannerButton || "");
            setImage(null);
            setImagePreview(data?.footerBannerImage || null);
            setImageEffect(null);
            setImageEffectPreview(data?.footerBannerImageEffect || null);
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

    const handleFileChangeEffect = (e) => {
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

            setImageEffect(file);
            setImageEffectPreview(URL.createObjectURL(file));
        }
    };

    const handleClearImage = () => {
        setImage(null);
        setImagePreview(null);
    };

    const handleClearImageEffect = () => {
        setImageEffect(null);
        setImageEffectPreview(null);
    };
    const handleUploadClick = () => {
        if (imageInputRef.current) imageInputRef.current.click();
    };

    const handleUploadClickEffect = () => {
        if (imageEffectInputRef.current) imageEffectInputRef.current.click();
    };


    const resetForm = () => {
        setTitle("");
        setButtonName("");
        setImage(null);
        setImagePreview("");
        setImageEffect("");
        setImageEffectPreview("");
    };


    const handleSubmit = async () => {
        if (!title || (!image && !imagePreview) || (!imageEffect && !imageEffectPreview) || !buttonName) {
            toast.error("Please provide all the fields!");
            return;
        }


        const formData = new FormData();
        formData.append("footerBannerTitle", title);
        formData.append("footerBannerButton", buttonName);
        if (image) {
            formData.append("image", image);
        }
        if (imageEffect) {
            formData.append("footerBannerImageEffect", imageEffect);
        }

        await postApi(endPoints.addGamePage, formData, {
            setLoading,
            successMsg: "Footer section updated successfully!",
            errorMsg: "Failed to update Footer section!",
            additionalFunctions: [
                () => fetchdata(),
                () => resetForm(),
                () => onClose(),
            ],
        });
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-white rounded-xl w-full max-w-2xl p-3 relative shadow-lg h-[80vh] overflow-auto">
                {/* Close Button */}
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-manrope text-[16px] font-bold text-[#000000]">
                        {edit ? "Edit Footer Section" : "Add New Footer Section"}
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
                            Footer Title
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
                    <div>
                        <label htmlFor="title" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Footer Button Title
                        </label>
                        <input
                            type="text"
                            id="buttontitle"
                            placeholder="Enter the button title"
                            value={buttonName}
                            onChange={(e) => setButtonName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#FFB000] focus:ring-1 focus:ring-[#FFB000]"
                        />
                    </div>
                    {/* Feature Image */}
                    <div>
                        <label htmlFor="featureImage" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Image
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
                                        className="w-40 h-40 object-cover rounded-lg border border-gray-300"
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
                                ref={imageInputRef}
                                onChange={handleFileChange}
                                hidden
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="featureImage" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Footer Image Effect
                        </label>

                        <div
                            className={`w-full border-2 border-dashed rounded-lg flex flex-col items-center justify-center  p-4 ${imagePreview ? "border-green-400 bg-green-50" : "border-[#00000080]"
                                }`}
                        >
                            {imageEffectPreview ? (
                                <div className="flex flex-col items-center gap-3 ">
                                    <img
                                        src={imageEffectPreview}
                                        alt="Preview"
                                        className="w-40 h-40 object-contain rounded-lg border border-gray-300 bg-black"
                                    />
                                    <button
                                        onClick={handleClearImageEffect}
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
                                        onClick={handleUploadClickEffect}
                                        type="button"
                                        className="bg-[#FFB0004D] border border-[#FFB000] cursor-pointer hover:bg-[#FFB000] text-black font-medium px-5 py-2 rounded-md"
                                    >
                                        Select Image
                                    </button>
                                </div>
                            )}

                            <input
                                type="file"
                                ref={imageEffectInputRef}
                                onChange={handleFileChangeEffect}
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


const EditHeroSectionLegalPageModal = ({ isOpen, onClose, edit, data, fetchdata }) => {
    if (!isOpen) return null;
    const [title, setTitle] = useState(data?.title || '');
    const [description, setDescription] = useState(data?.description || '');
    const [gameIntegrityTitle, setGameIntegrityTitle] = useState(data?.gameIntegrityTitle || '');
    const [gameIntegritydescription, setGameIntegrityDescription] = useState(data?.gameIntegrityDescription || '');
    const [dataProtectionTitle, setDataProtectionTitle] = useState(data?.dataProtectionTitle || '');
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const imageInputRef = useRef(null);


    const MAX_FILE_SIZE_MB = 5;
    const VALID_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/svg"];

    useEffect(() => {
        if (edit && data) {
            setTitle(data?.title || "");
            setDescription(data?.description || "");
            setGameIntegrityTitle(data?.gameIntegrityTitle || "");
            setGameIntegrityDescription(data?.gameIntegrityDescription || "");
            setDataProtectionTitle(data?.dataProtectionTitle || "");
            setImages([]);
            setImagePreviews(data?.gameIntegrityImage || []);
        } else if (!edit) {
            resetForm();
        }
    }, [edit, data]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        const validFiles = files.filter(file => {
            if (!VALID_FILE_TYPES.includes(file.type)) {
                toast.error(`Invalid file type: ${file.name}`);
                return false;
            }
            if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                toast.error(`File too large: ${file.name}`);
                return false;
            }
            return true;
        });

        if (validFiles.length) {
            const newPreviews = validFiles.map(file => URL.createObjectURL(file));
            setImages(prev => [...prev, ...validFiles]);
            setImagePreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const handleRemoveImage = (index) => {
        const newPreviews = [...imagePreviews];
        newPreviews.splice(index, 1);

        const newImages = [...images];
        // If this index corresponds to a newly added file, remove it from `images` too.
        if (index >= (imagePreviews.length - images.length)) {
            newImages.splice(index - (imagePreviews.length - images.length), 1);
        }

        setImagePreviews(newPreviews);
        setImages(newImages);
    };
    const handleUploadClick = () => {
        if (imageInputRef.current) imageInputRef.current.click();
    };


    const resetForm = () => {
        setTitle("");
        setDescription("");
        setGameIntegrityTitle("");
        setGameIntegrityDescription("");
        setDataProtectionTitle("");
        setImages([]);
        setImagePreviews([]);
    };


    const handleSubmit = async () => {
        if (!title || (!images && !imagePreviews.length)) {
            toast.error("Please provide all the fields!");
            return;
        }


        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("gameIntegrityTitle", gameIntegrityTitle);
        formData.append("gameIntegrityDescription", gameIntegritydescription);
        formData.append("dataProtectionTitle", dataProtectionTitle);
        let index = 0;

        // ✅ Then append new uploaded files
        images.forEach(file => {
            formData.append(`gameIntegrityImage`, file);
            index++;
        });

        await postApi(endPoints.addLegalPage, formData, {
            setLoading,
            successMsg: "Hero Section and titles updated successfully!",
            errorMsg: "Failed to update hero section and titles!",
            additionalFunctions: [
                () => fetchdata(),
                () => resetForm(),
                () => onClose(),
            ],
        });
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-white rounded-xl w-full max-w-2xl p-3 relative shadow-lg h-[80vh] overflow-auto">
                {/* Close Button */}
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-manrope text-[16px] font-bold text-[#000000]">
                        {edit ? "Edit Hero Section and Page Titles" : "Add Hero Section and Page Titles"}
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
                    {/* Hero Title */}
                    <div>
                        <label className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Hero Title
                        </label>
                        <input
                            type="text"
                            placeholder="Enter the hero section title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#FFB000] focus:ring-1 focus:ring-[#FFB000]"
                        />
                    </div>

                    {/* Hero Button */}
                    <div>
                        <label className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Hero Description
                        </label>
                        <textarea
                            id="desc"
                            placeholder="Enter the description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#FFB000] focus:ring-1 focus:ring-[#FFB000]"
                        />
                    </div>

                    {/* Phone Title */}
                    <div>
                        <label className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Game Integrity Title
                        </label>
                        <input
                            type="text"
                            placeholder="Enter the game integrity title"
                            value={gameIntegrityTitle}
                            onChange={(e) => setGameIntegrityTitle(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#FFB000] focus:ring-1 focus:ring-[#FFB000]"
                        />
                    </div>

                    {/* Engaging Slot Experiences Title */}
                    <div>
                        <label className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Game Integrity Description
                        </label>
                        <textarea
                            id="desc"
                            placeholder="Enter the game integrity description"
                            value={gameIntegritydescription}
                            onChange={(e) => setGameIntegrityDescription(e.target.value)}
                            rows={4}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#FFB000] focus:ring-1 focus:ring-[#FFB000]"
                        />
                    </div>

                    {/* What We Get Title */}
                    <div>
                        <label className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Data Protection Title
                        </label>
                        <input
                            type="text"
                            placeholder="Enter the data protection title"
                            value={dataProtectionTitle}
                            onChange={(e) => setDataProtectionTitle(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#FFB000] focus:ring-1 focus:ring-[#FFB000]"
                        />
                    </div>
                    {/* Multiple Images */}
                    <div>
                        <label className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Game Integrity Images
                        </label>

                        <div className="w-full border-2 border-dashed rounded-lg p-4 flex flex-wrap gap-4">
                            {imagePreviews.length ? (
                                imagePreviews.map((src, idx) => (
                                    <div key={idx} className="relative w-32 h-32">
                                        <img
                                            src={src}
                                            alt={`Preview ${idx}`}
                                            className="w-full h-full object-contain rounded-lg border"
                                        />
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm">No images selected</p>
                            )}

                            <button
                                onClick={handleUploadClick}
                                type="button"
                                className="h-32 w-32 flex items-center justify-center border-2 border-dashed border-[#00000080] hover:border-[#FFB000] text-[#000] hover:text-[#FFB000] rounded-lg"
                            >
                                + Add Images
                            </button>
                        </div>

                        <input
                            type="file"
                            ref={imageInputRef}
                            onChange={handleFileChange}
                            hidden
                            multiple // ✅ Allow multiple selection
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
                        className="px-10 py-3 cursor-pointer bg-[#FFB0004D]  border border-[#FFB000] rounded-[10px] font-poppins text-[16px] font-[500] text-[#000000] hover:bg-[#FFB000] disabled={loading}"
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
}


const AddDataProtectionInLegalPageDataModal = ({ isOpen, onClose, edit, data, fetchdata }) => {
    if (!isOpen) return null;

    const id = data?._id;
    const [title, setTitle] = useState(data?.title || '');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    const MAX_FILE_SIZE_MB = 5;
    const VALID_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/svg"];

    useEffect(() => {
        if (edit && data) {
            setTitle(data?.title || "");
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
        setImage(null);
        setImagePreview("");
    };


    const handleSubmit = async () => {
        if (!title) {
            toast.error("Please provide all the fields!");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("image", image);

        await postApi(endPoints.addDataProtectionInLegalPage, formData, {
            setLoading,
            successMsg: "Data protection section added successfully!",
            errorMsg: "Failed to add Data protection section!",
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
        if (image) {
            formData.append("image", image);
        }

        await putApi(endPoints.updateRole(id), formData, {
            setLoading,
            successMsg: "Features & Benefits section updated successfully!",
            errorMsg: "Failed to update Features & Benefits section!",
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
                        {edit ? "Edit Data protection Section" : "Add New Data protection Section"}
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
                    {/* Feature Image */}
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

const EditPrivacyPolicyLegalModal = ({ isOpen, onClose, edit, data, fetchdata }) => {
    if (!isOpen) return null;
    const [privacyPolicyTitle, setPrivacyPolicyTitle] = useState(data?.privacyPolicyTitle || '');
    const [privacyPolicyDescription, setPrivacyPolicyDescription] = useState(data?.privacyPolicyDescription || '');
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (edit && data) {
            setPrivacyPolicyTitle(data?.privacyPolicyTitle || "");
            setPrivacyPolicyDescription(data?.privacyPolicyDescription || "");
        } else if (!edit) {
            resetForm();
        }
    }, [edit, data]);

    const resetForm = () => {
        setPrivacyPolicyTitle("");
        setPrivacyPolicyDescription("");
    };


    const handleSubmit = async () => {
        if (!privacyPolicyTitle || (!privacyPolicyDescription)) {
            toast.error("Please provide all the fields!");
            return;
        }


        const formData = new FormData();
        formData.append("privacyPolicyTitle", privacyPolicyTitle);
        formData.append("privacyPolicyDescription", privacyPolicyDescription);

        await postApi(endPoints.addLegalPage, formData, {
            setLoading,
            successMsg: "Privacy Policy Section and titles updated successfully!",
            errorMsg: "Failed to update privacy policy section and titles!",
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
                        {edit ? "Edit Privacy Policy Section" : "Add Privacy Policy Section"}
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
                    {/* Hero Title */}
                    <div>
                        <label className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Privacy Policy Title
                        </label>
                        <input
                            type="text"
                            placeholder="Enter the privacy policy section title"
                            value={privacyPolicyTitle}
                            onChange={(e) => setPrivacyPolicyTitle(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#FFB000] focus:ring-1 focus:ring-[#FFB000]"
                        />
                    </div>

                    {/* Hero Button */}
                    <div>
                        <label className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Privacy Policy Description
                        </label>
                        <textarea
                            id="desc"
                            placeholder="Enter the description"
                            value={privacyPolicyDescription}
                            onChange={(e) => setPrivacyPolicyDescription(e.target.value)}
                            rows={4}
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
                        className="px-10 py-3 cursor-pointer bg-[#FFB0004D]  border border-[#FFB000] rounded-[10px] font-poppins text-[16px] font-[500] text-[#000000] hover:bg-[#FFB000] disabled={loading}"
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
}

const EditFooterInLegalPageModal = ({ isOpen, onClose, edit, data, fetchdata }) => {
    if (!isOpen) return null;
    const [title, setTitle] = useState(data?.footerBannerTitle || '');
    const [buttonName, setButtonName] = useState(data?.footerBannerButton || '');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageEffect, setImageEffect] = useState(null);
    const [imageEffectPreview, setImageEffectPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const imageInputRef = useRef(null);
    const imageEffectInputRef = useRef(null);


    const MAX_FILE_SIZE_MB = 5;
    const VALID_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/svg"];

    useEffect(() => {
        if (edit && data) {
            setTitle(data?.footerBannerTitle || "");
            setButtonName(data?.footerBannerButton || "");
            setImage(null);
            setImagePreview(data?.footerBannerImage || null);
            setImageEffect(null);
            setImageEffectPreview(data?.footerBannerImageEffect || null);
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

    const handleFileChangeEffect = (e) => {
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

            setImageEffect(file);
            setImageEffectPreview(URL.createObjectURL(file));
        }
    };

    const handleClearImage = () => {
        setImage(null);
        setImagePreview(null);
    };

    const handleClearImageEffect = () => {
        setImageEffect(null);
        setImageEffectPreview(null);
    };
    const handleUploadClick = () => {
        if (imageInputRef.current) imageInputRef.current.click();
    };

    const handleUploadClickEffect = () => {
        if (imageEffectInputRef.current) imageEffectInputRef.current.click();
    };


    const resetForm = () => {
        setTitle("");
        setButtonName("");
        setImage(null);
        setImagePreview("");
        setImageEffect("");
        setImageEffectPreview("");
    };


    const handleSubmit = async () => {
        if (!title || (!image && !imagePreview) || (!imageEffect && !imageEffectPreview) || !buttonName) {
            toast.error("Please provide all the fields!");
            return;
        }


        const formData = new FormData();
        formData.append("footerBannerTitle", title);
        formData.append("footerBannerButton", buttonName);
        if (image) {
            formData.append("image", image);
        }
        if (imageEffect) {
            formData.append("footerBannerImageEffect", imageEffect);
        }

        await postApi(endPoints.addFooterInLegalPage, formData, {
            setLoading,
            successMsg: "Footer section updated successfully!",
            errorMsg: "Failed to update Footer section!",
            additionalFunctions: [
                () => fetchdata(),
                () => resetForm(),
                () => onClose(),
            ],
        });
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-white rounded-xl w-full max-w-2xl p-3 relative shadow-lg h-[80vh] overflow-auto">
                {/* Close Button */}
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-manrope text-[16px] font-bold text-[#000000]">
                        {edit ? "Edit Footer Section" : "Add New Footer Section"}
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
                            Footer Title
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
                    <div>
                        <label htmlFor="title" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Footer Button Title
                        </label>
                        <input
                            type="text"
                            id="buttontitle"
                            placeholder="Enter the button title"
                            value={buttonName}
                            onChange={(e) => setButtonName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#FFB000] focus:ring-1 focus:ring-[#FFB000]"
                        />
                    </div>
                    {/* Feature Image */}
                    <div>
                        <label htmlFor="featureImage" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Image
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
                                        className="w-40 h-40 object-contain rounded-lg border border-gray-300 bg-black"
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
                                ref={imageInputRef}
                                onChange={handleFileChange}
                                hidden
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="featureImage" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Footer Image Effect
                        </label>

                        <div
                            className={`w-full border-2 border-dashed rounded-lg flex flex-col items-center justify-center  p-4 ${imagePreview ? "border-green-400 bg-green-50" : "border-[#00000080]"
                                }`}
                        >
                            {imageEffectPreview ? (
                                <div className="flex flex-col items-center gap-3 ">
                                    <img
                                        src={imageEffectPreview}
                                        alt="Preview"
                                        className="w-40 h-40 object-contain rounded-lg border border-gray-300 bg-black"
                                    />
                                    <button
                                        onClick={handleClearImageEffect}
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
                                        onClick={handleUploadClickEffect}
                                        type="button"
                                        className="bg-[#FFB0004D] border border-[#FFB000] cursor-pointer hover:bg-[#FFB000] text-black font-medium px-5 py-2 rounded-md"
                                    >
                                        Select Image
                                    </button>
                                </div>
                            )}

                            <input
                                type="file"
                                ref={imageEffectInputRef}
                                onChange={handleFileChangeEffect}
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
    AddContactDetailsModal,
    AddHowItWorkModal,
    AddSlotMasteryModal,
    AddFeaturesBenefitsModal,
    AddEngagingSlotsModal,
    AddWhatWeGetModal,
    AddSecurityAndComplianceModal,
    AddGameCategoriesModal,
    EditFooterModal,
    EditHeroSectionModal,
    EditHeroSectionDeveloperPageModal,
    AddDataInDeveloperPage,
    AddBannerDataModal,
    AddBenefitsDataModal,
    EditaDeveloperCommunityModal,
    EditFooterDeveloperModal,
    EditHeroSectionGamePageModal,
    AddGamesDataModal,
    EditFooterGamePageModal,
    EditHeroSectionLegalPageModal,
    AddDataProtectionInLegalPageDataModal,
    EditPrivacyPolicyLegalModal,
    EditFooterInLegalPageModal
}