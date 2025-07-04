import React, { useState } from "react";

import { IoMdCloseCircleOutline } from "react-icons/io";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // default styling



const ConfirmModal = ({ isOpen, onClose, onConfirm, text }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0  flex items-center justify-center z-50 bg-black/80">
            <div className="bg-white w-full max-w-md rounded-lg shadow-2xl p-6">
                {/* Close Button */}

                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-manrope text-[16px] font-bold text-[#000000]">Are you Sure</h2>
                    <IoMdCloseCircleOutline color="#C12D34" size={25} className="cursor-pointer" onClick={onClose} />
                </div>

                <p className="font-manrope text-[18px] font-bold text-[#362695] text-center mb-6">
                    Do you want to {text}
                </p>

                {/* Action Buttons */}
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onClose}
                        className="px-20 py-3.5  border border-[#4F4F4F] font-manrope text-[16px] font-[400] text-[#4C4C4C]"
                    >
                        No
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-20 py-3.5 bg-[#FEECEC]  border border-solid
         [border-image-source:linear-gradient(90deg,#C82D30_1.89%,#362695_67.23%,#B12F31_136.79%)]
         [border-image-slice:1] font-manrope text-[16px] font-[400] text-[#000000]"
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
};


const RechargeWalletModal = ({ isOpen, onClose, onSubmit }) => {
    const [amount, setAmount] = useState("");

    if (!isOpen) return null;

    const handleClear = () => {
        setAmount("");
        onClose()
    };

    const handleAddMoney = () => {
        // onSubmit(amount);
        setAmount("");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-white rounded-xl w-full max-w-lg p-6 relative shadow-lg">
                {/* Close Button */}

                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-manrope text-[16px] font-bold text-[#000000]">Recharge Wallet</h2>
                    <IoMdCloseCircleOutline color="#C12D34" size={25} className="cursor-pointer" onClick={onClose} />
                </div>

                {/* Input */}
                <div className="mb-4">
                    <label className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">Amount</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter Amount"
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-3 mt-4">
                    <button
                        onClick={handleClear}
                        className="px-5 py-1 rounded-[4px] bg-[#EBEFF4] border border-[#E5EBF1] font-urbanist text-[14px] font-semibold text-[#64748B]"
                    >
                        Clear
                    </button>
                    <button
                        onClick={handleAddMoney}
                        className="bg-[#164E62] flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white"
                    >
                        Add Money
                    </button>
                </div>
            </div>
        </div>
    );
}


const AddRejectReasonModal = ({ isOpen, onClose, onSubmit }) => {
    const [reason, setReason] = useState("condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem.");

    if (!isOpen) return null;

    const handleClear = () => {
        onClose()
    };

    const handleAddMoney = () => {
        // onSubmit(amount);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-white rounded-xl w-full max-w-lg p-6 relative shadow-lg">
                {/* Close Button */}

                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-manrope text-[16px] font-bold text-[#000000]">Add Reject Reason</h2>
                    <IoMdCloseCircleOutline color="#C12D34" size={25} className="cursor-pointer" onClick={onClose} />
                </div>

                {/* Input */}
                <div className="mb-4">
                    <label className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">Reason</label>
                    <textarea
                        type="text"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-3 mt-4">
                    <button
                        onClick={handleClear}
                        className="px-5 py-1 rounded-[4px] bg-[#EBEFF4] border border-[#E5EBF1] font-urbanist text-[14px] font-semibold text-[#64748B]"
                    >
                        Clear
                    </button>
                    <button
                        onClick={handleAddMoney}
                        className="bg-[#164E62] flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

const RejectReasonModal = ({ isOpen, onClose, onSubmit }) => {
    const [reason, setReason] = useState("condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem.");

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-white rounded-xl w-full max-w-lg p-6 relative shadow-lg">
                {/* Close Button */}

                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-manrope text-[16px] font-bold text-[#000000]">Reason</h2>
                    <IoMdCloseCircleOutline color="#C12D34" size={25} className="cursor-pointer" onClick={onClose} />
                </div>

                {/* Input */}
                <div className="mb-4">
                    <textarea
                        type="text"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        rows={4}
                        readOnly
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>
            </div>
        </div>
    );
}


const AddCancelReasonModal = ({ isOpen, onClose, onSubmit }) => {
    const [reply, setReply] = useState("");


    if (!isOpen) return null;

    const handleClear = () => {
        onClose()
    };

    const handleAddMoney = () => {
        // onSubmit(amount);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-white rounded-xl w-full max-w-2xl p-6 relative shadow-lg">
                {/* Close Button */}

                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-manrope text-[16px] font-bold text-[#000000]">Add Cancel Reason</h2>
                    <IoMdCloseCircleOutline color="#C12D34" size={25} className="cursor-pointer" onClick={onClose} />
                </div>

                {/* Input */}
                <div className="mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Advisor Name */}
                        <div>
                            <label className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">Advisor Name</label>
                            <select className="w-full px-4 py-2 border rounded-lg">
                                <option>Rahul</option>
                            </select>
                        </div>

                        {/* User Name */}
                        <div>
                            <label className="bblock font-manrope text-[14px] font-semibold text-[#000000] mb-1">User Name</label>
                            <input
                                type="text"
                                value="Varun"
                                className="w-full px-4 py-2 border rounded-lg"
                                readOnly
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">Category</label>
                            <select className="w-full px-4 py-2 border rounded-lg">
                                <option>Select Category</option>
                            </select>
                        </div>

                        {/* Sub Category */}
                        <div>
                            <label className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">Sub Category</label>
                            <select className="w-full px-4 py-2 border rounded-lg">
                                <option>Select Sub Category</option>
                            </select>
                        </div>

                        {/* Date */}
                        <div>
                            <label className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">Date</label>
                            <input
                                type="date"
                                className="w-full px-4 py-2 border rounded-lg"
                                defaultValue="2025-05-12"
                            />
                        </div>

                        {/* Time */}
                        <div>
                            <label className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">Time</label>
                            <input
                                type="text"
                                value="11.00 AM - 12.00 PM"
                                className="w-full px-4 py-2 border rounded-lg"
                                readOnly
                            />
                        </div>
                    </div>

                    {/* Reply */}
                    <div className="mt-6">
                        <label className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">Reply</label>
                        <ReactQuill
                            value={reply}
                            onChange={setReply}
                            className="bg-white rounded-lg"
                            theme="snow"
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-3 mt-20">
                    <button
                        onClick={handleClear}
                        className="px-5 py-1 rounded-[4px] bg-[#EBEFF4] border border-[#E5EBF1] font-urbanist text-[14px] font-semibold text-[#64748B]"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAddMoney}
                        className="bg-[#164E62] flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

const SummaryModal = ({ isOpen, onClose, onSubmit }) => {
    const [reply, setReply] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem.");


    if (!isOpen) return null;


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-white rounded-xl w-full max-w-2xl p-6 relative shadow-lg">
                {/* Close Button */}

                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-manrope text-[16px] font-bold text-[#000000]">Summary</h2>
                    <IoMdCloseCircleOutline color="#C12D34" size={25} className="cursor-pointer" onClick={onClose} />
                </div>

                {/* Input */}
                <div className="mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Advisor Name */}
                        <div>
                            <label className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">Advisor Name</label>
                            <select className="w-full px-4 py-2 border rounded-lg">
                                <option>Rahul</option>
                            </select>
                        </div>

                        {/* User Name */}
                        <div>
                            <label className="bblock font-manrope text-[14px] font-semibold text-[#000000] mb-1">User Name</label>
                            <input
                                type="text"
                                value="Varun"
                                className="w-full px-4 py-2 border rounded-lg"
                                readOnly
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">Category</label>
                            <select className="w-full px-4 py-2 border rounded-lg">
                                <option>Select Category</option>
                            </select>
                        </div>

                        {/* Sub Category */}
                        <div>
                            <label className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">Sub Category</label>
                            <select className="w-full px-4 py-2 border rounded-lg">
                                <option>Select Sub Category</option>
                            </select>
                        </div>

                        {/* Date */}
                        <div>
                            <label className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">Date</label>
                            <input
                                type="date"
                                className="w-full px-4 py-2 border rounded-lg"
                                defaultValue="2025-05-12"
                            />
                        </div>

                        {/* Time */}
                        <div>
                            <label className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">Time</label>
                            <input
                                type="text"
                                value="11.00 AM - 12.00 PM"
                                className="w-full px-4 py-2 border rounded-lg"
                                readOnly
                            />
                        </div>
                    </div>

                    {/* Reply */}
                    <div className="mt-6">
                        <label className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">Reply</label>
                        <ReactQuill
                            value={reply}
                            onChange={setReply}
                            className="bg-white rounded-lg"
                            theme="snow"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

const AddBlogModal = ({ isOpen, onClose, onSubmit }) => {
    const [reply, setReply] = useState("");


    if (!isOpen) return null;

    const handleClear = () => {
        onClose()
    };

    const handleAddMoney = () => {
        // onSubmit(amount);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-white rounded-xl w-full max-w-2xl p-6 relative shadow-lg">
                {/* Close Button */}
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-manrope text-[16px] font-bold text-[#000000]">Add Blog</h2>
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
                            placeholder="Blog post title"
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                        <p className="font-inter text-[14px] font-medium text-[#828F9B] text-end mt-0.5">Title 150</p>
                    </div>

                    {/* Category */}
                    <div>
                        <label htmlFor="category" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Category
                        </label>
                        <select id="category" className="w-full px-4 py-2 border rounded-lg">
                            <option>Select Category</option>
                        </select>
                    </div>

                    {/* Feature Image */}
                    <div>
                        <label htmlFor="featureImage" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Feature Image
                        </label>
                        <div className="w-full px-4 py-2 border rounded-lg flex items-center justify-end">
                            <button
                                type="button"
                                className="bg-[#175CD3] flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white"
                            >
                                Select
                            </button>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Description
                        </label>
                        <ReactQuill
                            value={reply}
                            onChange={setReply}
                            className="bg-white rounded-lg"
                            theme="snow"
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-3 mt-4">
                    <button
                        onClick={handleClear}
                        className="px-5 py-1 rounded-[4px] bg-[#EBEFF4] border border-[#E5EBF1] font-urbanist text-[14px] font-semibold text-[#64748B]"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAddMoney}
                        className="bg-[#164E62] flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

const AddCategoryModal = ({ isOpen, onClose, onSubmit }) => {
    const [category, setCategory] = useState("");

    if (!isOpen) return null;

    const handleClear = () => {
        setCategory("");
        onClose()
    };

    const handleAddMoney = () => {
        // onSubmit(amount);
        setCategory("");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-white rounded-xl w-full max-w-lg p-6 relative shadow-lg">
                {/* Close Button */}

                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-manrope text-[16px] font-bold text-[#000000]">Add Category</h2>
                    <IoMdCloseCircleOutline color="#C12D34" size={25} className="cursor-pointer" onClick={onClose} />
                </div>

                {/* Input */}
                <div className="mb-4">
                    <label className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">Category</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Enter Category"
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-3 mt-4">
                    <button
                        onClick={handleClear}
                        className="px-5 py-1 rounded-[4px] bg-[#EBEFF4] border border-[#E5EBF1] font-urbanist text-[14px] font-semibold text-[#64748B]"
                    >
                        Clear
                    </button>
                    <button
                        onClick={handleAddMoney}
                        className="bg-[#164E62] flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}


const AddSubCategoryModal = ({ isOpen, onClose, onSubmit }) => {
    const [category, setCategory] = useState("");

    if (!isOpen) return null;

    const handleClear = () => {
        setCategory("");
        onClose()
    };

    const handleAddMoney = () => {
        // onSubmit(amount);
        setCategory("");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-white rounded-xl w-full max-w-lg p-6 relative shadow-lg">
                {/* Close Button */}

                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-manrope text-[16px] font-bold text-[#000000]">Add  Sub Category</h2>
                    <IoMdCloseCircleOutline color="#C12D34" size={25} className="cursor-pointer" onClick={onClose} />
                </div>

                {/* Input */}
                <div className="mb-4">
                    <label htmlFor="category" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                        Select Category
                    </label>
                    <select id="category" className="w-full px-4 py-2 border rounded-lg">
                        <option>Select Category</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">Sub Category</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Enter Sub Category"
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-3 mt-4">
                    <button
                        onClick={handleClear}
                        className="px-5 py-1 rounded-[4px] bg-[#EBEFF4] border border-[#E5EBF1] font-urbanist text-[14px] font-semibold text-[#64748B]"
                    >
                        Clear
                    </button>
                    <button
                        onClick={handleAddMoney}
                        className="bg-[#164E62] flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}

const AddSkillModal = ({ isOpen, onClose, onSubmit }) => {
    const [category, setCategory] = useState("");

    if (!isOpen) return null;

    const handleClear = () => {
        setCategory("");
        onClose()
    };

    const handleAddMoney = () => {
        // onSubmit(amount);
        setCategory("");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-white rounded-xl w-full max-w-lg p-6 relative shadow-lg">
                {/* Close Button */}

                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-manrope text-[16px] font-bold text-[#000000]">Add Skill</h2>
                    <IoMdCloseCircleOutline color="#C12D34" size={25} className="cursor-pointer" onClick={onClose} />
                </div>

                {/* Input */}
                <div className="mb-4">
                    <label className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">Skill Name</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Enter Category"
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-3 mt-4">
                    <button
                        onClick={handleClear}
                        className="px-5 py-1 rounded-[4px] bg-[#EBEFF4] border border-[#E5EBF1] font-urbanist text-[14px] font-semibold text-[#64748B]"
                    >
                        Clear
                    </button>
                    <button
                        onClick={handleAddMoney}
                        className="bg-[#164E62] flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}

const AddTesmMemberModal = ({ isOpen, onClose, onSubmit }) => {
    const [reply, setReply] = useState("");


    if (!isOpen) return null;

    const handleClear = () => {
        onClose()
    };

    const handleAddMoney = () => {
        // onSubmit(amount);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-white rounded-xl w-full max-w-2xl p-6 relative shadow-lg">
                {/* Close Button */}
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-manrope text-[16px] font-bold text-[#000000]">Add Team Member</h2>
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
                            Name
                        </label>
                        <input
                            type="text"
                            id="title"
                            placeholder="Enter Name"
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>

                    <div>
                        <label htmlFor="title" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="title"
                            placeholder="Enter Email Address"
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                    <div>
                        <label htmlFor="title" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Phone Number
                        </label>
                        <input
                            type="number"
                            id="title"
                            placeholder="Phone Number"
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label htmlFor="category" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Role
                        </label>
                        <select id="category" className="w-full px-4 py-2 border rounded-lg">
                            <option>Select Role</option>
                        </select>
                    </div>

                    {/* Feature Image */}
                    <div>
                        <label htmlFor="title" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="title"
                            placeholder="Enter 8 Digit Password"
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-3 mt-4">
                    <button
                        onClick={handleClear}
                        className="px-5 py-1 rounded-[4px] bg-[#EBEFF4] border border-[#E5EBF1] font-urbanist text-[14px] font-semibold text-[#64748B]"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAddMoney}
                        className="bg-[#164E62] flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

const AddRoleModal = ({ isOpen, onClose, onSubmit }) => {


    if (!isOpen) return null;

    const handleClear = () => {
        onClose()
    };

    const handleAddMoney = () => {
        // onSubmit(amount);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-white rounded-xl w-full max-w-2xl p-6 relative shadow-lg">
                {/* Close Button */}
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-manrope text-[16px] font-bold text-[#000000]">Add Role</h2>
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
                            Role Name
                        </label>
                        <input
                            type="text"
                            id="title"
                            placeholder="Enter Role Name"
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>

                    <div>
                        <label htmlFor="title" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Allow Edit Access To
                        </label>
                        <select id="category" className="w-full px-4 py-2 border rounded-lg">
                            <option>Select</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="title" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Allow View Access To
                        </label>
                        <select id="category" className="w-full px-4 py-2 border rounded-lg">
                            <option>Select</option>
                        </select>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-3 mt-4">
                    <button
                        onClick={handleClear}
                        className="px-5 py-1 rounded-[4px] bg-[#EBEFF4] border border-[#E5EBF1] font-urbanist text-[14px] font-semibold text-[#64748B]"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAddMoney}
                        className="bg-[#164E62] flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

const AddBannerModal = ({ isOpen, onClose, onSubmit }) => {
    const [reply, setReply] = useState("");


    if (!isOpen) return null;

    const handleClear = () => {
        onClose()
    };

    const handleAddMoney = () => {
        // onSubmit(amount);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-white rounded-xl w-full max-w-2xl p-6 relative shadow-lg">
                {/* Close Button */}
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-manrope text-[16px] font-bold text-[#000000]">Add Banner</h2>
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
                    <div className="flex items-center gap-2">
                        <div className="w-full">
                            <label htmlFor="title" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                                From
                            </label>
                            <input
                                type="date"
                                id="title"
                                placeholder="Enter Role Name"
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="title" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                                To
                            </label>
                            <input
                                type="date"
                                id="title"
                                placeholder="Enter Role Name"
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="featureImage" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Feature Image
                        </label>
                        <div className="w-full px-4 py-2 border rounded-lg flex items-center justify-end">
                            <button
                                type="button"
                                className="bg-[#175CD3] flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white"
                            >
                                Select
                            </button>
                        </div>
                    </div>

                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-3 mt-4">
                    <button
                        onClick={handleClear}
                        className="px-5 py-1 rounded-[4px] bg-[#EBEFF4] border border-[#E5EBF1] font-urbanist text-[14px] font-semibold text-[#64748B]"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAddMoney}
                        className="bg-[#164E62] flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}


const ShareNotificationModal = ({ isOpen, onClose, onSubmit }) => {


    if (!isOpen) return null;

    const handleClear = () => {
        onClose()
    };

    const handleAddMoney = () => {
        // onSubmit(amount);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-white rounded-xl w-full max-w-2xl p-6 relative shadow-lg">
                {/* Close Button */}
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-manrope text-[16px] font-bold text-[#000000]">Share Notification</h2>
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
                            Notification
                        </label>
                        <input
                            type="text"
                            id="title"
                            defaultValue="Welcome Note"
                            placeholder="Enter Name"
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                    {/* Category */}
                    <div>
                        <label htmlFor="category" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            To
                        </label>
                        <select id="category" className="w-full px-4 py-2 border rounded-lg">
                            <option>Eg: Both</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="category" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                            Name
                        </label>
                        <select id="category" className="w-full px-4 py-2 border rounded-lg">
                            <option>Select Name</option>
                        </select>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-3 mt-4">
                    <button
                        onClick={handleClear}
                        className="px-5 py-1 rounded-[4px] bg-[#EBEFF4] border border-[#E5EBF1] font-urbanist text-[14px] font-semibold text-[#64748B]"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAddMoney}
                        className="bg-[#164E62] flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

const AddNotificationModal = ({ isOpen, onClose, onSubmit }) => {
    const [reply, setReply] = useState("");

    if (!isOpen) return null;

    const handleClear = () => {
        onClose()
    };

    const handleAddMoney = () => {
        // onSubmit(amount);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-white rounded-xl w-full max-w-2xl p-6 relative shadow-lg">
                {/* Close Button */}
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-manrope text-[16px] font-bold text-[#000000]">Notification</h2>
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
                            Title*
                        </label>
                        <input
                            type="text"
                            id="title"
                            defaultValue="Terms And Codition"
                            placeholder="Enter Name"
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                    <div className="mt-6">
                        <label className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">Content*</label>
                        <ReactQuill
                            value={reply}
                            onChange={setReply}
                            className="bg-white rounded-lg"
                            theme="snow"
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-3 mt-4">
                    <button
                        onClick={handleClear}
                        className="px-5 py-1 rounded-[4px] bg-[#EBEFF4] border border-[#E5EBF1] font-urbanist text-[14px] font-semibold text-[#64748B]"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAddMoney}
                        className="bg-[#164E62] flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

const AddTicketModal = ({ isOpen, onClose, onSubmit }) => {
    const [reply, setReply] = useState("");


    if (!isOpen) return null;

    const handleClear = () => {
        onClose()
    };

    const handleAddMoney = () => {
        // onSubmit(amount);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-white rounded-xl w-full max-w-2xl p-6 relative shadow-lg">
                {/* Close Button */}
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-manrope text-[16px] font-bold text-[#000000]">Add Ticket</h2>
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
                            Question
                        </label>
                        <input
                            type="text"
                            id="title"
                            defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem."
                            placeholder="Enter Name"
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                    <div className="mt-6">
                        <label className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">Reply</label>
                        <ReactQuill
                            value={reply}
                            onChange={setReply}
                            className="bg-white rounded-lg"
                            theme="snow"
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-3 mt-4">
                    <button
                        onClick={handleClear}
                        className="px-5 py-1 rounded-[4px] bg-[#EBEFF4] border border-[#E5EBF1] font-urbanist text-[14px] font-semibold text-[#64748B]"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAddMoney}
                        className="bg-[#164E62] flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white"
                    >
                        Save & Close
                    </button>
                    <button
                        onClick={handleAddMoney}
                        className="bg-[#164E62] flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

const EditTicketModal = ({ isOpen, onClose, onSubmit }) => {
    const [reply, setReply] = useState("");


    if (!isOpen) return null;

    const handleClear = () => {
        onClose()
    };

    const handleAddMoney = () => {
        // onSubmit(amount);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-white rounded-xl w-full max-w-2xl p-6 relative shadow-lg">
                {/* Close Button */}
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-manrope text-[16px] font-bold text-[#000000]">Edit Ticket</h2>
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
                            Question
                        </label>
                        <textarea
                            type="text"
                            id="title"
                            defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem."
                            placeholder="Enter Name"
                            className="w-full px-4 py-2 border rounded-lg"
                            rows={4}
                        ></textarea>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-full">
                            <label htmlFor="title" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                                Date
                            </label>
                            <input
                                type="date"
                                id="title"
                                placeholder="Enter Role Name"
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="title" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                                Posted By
                            </label>
                            <input
                                type="date"
                                id="title"
                                placeholder="Enter Role Name"
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                        </div>
                    </div>
                    <div className="mt-6">
                        <label className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">Reply</label>
                        <ReactQuill
                            value={reply}
                            onChange={setReply}
                            className="bg-white rounded-lg"
                            theme="snow"
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-3 mt-4">
                    <button
                        onClick={handleAddMoney}
                        className="bg-[#164E62] flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white"
                    >
                        Change to Open
                    </button>
                    <button
                        onClick={handleClear}
                        className="px-5 py-1 rounded-[4px] bg-[#EBEFF4] border border-[#E5EBF1] font-urbanist text-[14px] font-semibold text-[#64748B]"
                    >
                        Clear
                    </button>
                    <button
                        onClick={handleAddMoney}
                        className="bg-[#164E62] flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

const ViewTicketModal = ({ isOpen, onClose, onSubmit }) => {


    if (!isOpen) return null;

    const handleClear = () => {
        onClose()
    };

    const handleAddMoney = () => {
        // onSubmit(amount);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-white rounded-xl w-full max-w-2xl p-6 relative shadow-lg">
                {/* Close Button */}
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-manrope text-[16px] font-bold text-[#000000]">Ticket</h2>
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
                            Question
                        </label>
                        <textarea
                            type="text"
                            id="title"
                            defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem."
                            placeholder="Enter Name"
                            className="w-full px-4 py-2 border rounded-lg"
                            rows={4}
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
}

const AddFAQReplyModal = ({ isOpen, onClose, onSubmit }) => {
    const [reply, setReply] = useState("");


    if (!isOpen) return null;

    const handleClear = () => {
        onClose()
    };

    const handleAddMoney = () => {
        // onSubmit(amount);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-white rounded-xl w-full max-w-2xl p-6 relative shadow-lg">
                {/* Close Button */}
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-manrope text-[16px] font-bold text-[#000000]">Add FAQ Reply</h2>
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
                            Question
                        </label>
                        <textarea
                            type="text"
                            id="title"
                            defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem."
                            placeholder="Enter Name"
                            className="w-full px-4 py-2 border rounded-lg"
                            rows={4}
                        ></textarea>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-full">
                            <label htmlFor="title" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                                Date
                            </label>
                            <input
                                type="date"
                                id="title"
                                placeholder="Enter Role Name"
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="title" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                                Posted By
                            </label>
                            <input
                                type="date"
                                id="title"
                                placeholder="Enter Role Name"
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                        </div>
                    </div>
                    <div className="mt-6">
                        <label className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">Reply</label>
                        <ReactQuill
                            value={reply}
                            onChange={setReply}
                            className="bg-white rounded-lg"
                            theme="snow"
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-3 mt-4">
                    <button
                        onClick={handleClear}
                        className="px-5 py-1 rounded-[4px] bg-[#EBEFF4] border border-[#E5EBF1] font-urbanist text-[14px] font-semibold text-[#64748B]"
                    >
                        Clear
                    </button>
                    <button
                        onClick={handleAddMoney}
                        className="bg-[#164E62] flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}


const AddPageManagementModal = ({ isOpen, onClose, onSubmit }) => {
    const [reply, setReply] = useState("");


    if (!isOpen) return null;

    const handleClear = () => {
        onClose()
    };

    const handleAddMoney = () => {
        // onSubmit(amount);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-white rounded-xl w-full max-w-2xl p-6 relative shadow-lg">
                {/* Close Button */}
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-manrope text-[16px] font-bold text-[#000000]">Add Page Management</h2>
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
                            defaultValue="Terms And Codition"
                            placeholder="Enter Name"
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-full">
                            <label htmlFor="title" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                                Date
                            </label>
                            <input
                                type="date"
                                id="title"
                                placeholder="Enter Role Name"
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="title" className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">
                                Posted By
                            </label>
                            <input
                                type="date"
                                id="title"
                                placeholder="Enter Role Name"
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                        </div>
                    </div>
                    <div className="mt-6">
                        <label className="block font-manrope text-[14px] font-semibold text-[#000000] mb-1">Content</label>
                        <ReactQuill
                            value={reply}
                            onChange={setReply}
                            className="bg-white rounded-lg"
                            theme="snow"
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-3 mt-4">
                    <button
                        onClick={handleClear}
                        className="px-5 py-1 rounded-[4px] bg-[#EBEFF4] border border-[#E5EBF1] font-urbanist text-[14px] font-semibold text-[#64748B]"
                    >
                        Clear
                    </button>
                    <button
                        onClick={handleAddMoney}
                        className="bg-[#164E62] flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

const ReviewModal = ({ isOpen, onClose, onSubmit }) => {
    const [reason, setReason] = useState("condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem.");

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-white rounded-xl w-full max-w-lg p-6 relative shadow-lg">
                {/* Close Button */}

                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-manrope text-[16px] font-bold text-[#000000]">Review</h2>
                    <IoMdCloseCircleOutline color="#C12D34" size={25} className="cursor-pointer" onClick={onClose} />
                </div>

                {/* Input */}
                <div className="mb-4">
                    <textarea
                        type="text"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        rows={4}
                        readOnly
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>
            </div>
        </div>
    );
}





export {
    ConfirmModal,
    RechargeWalletModal,
    AddRejectReasonModal,
    RejectReasonModal,
    AddCancelReasonModal,
    SummaryModal,
    AddBlogModal,
    AddCategoryModal,
    AddSubCategoryModal,
    AddSkillModal,
    AddTesmMemberModal,
    AddRoleModal,
    AddBannerModal,
    ShareNotificationModal,
    AddNotificationModal,
    AddTicketModal,
    EditTicketModal,
    ViewTicketModal,
    AddFAQReplyModal,
    AddPageManagementModal,
    ReviewModal
}