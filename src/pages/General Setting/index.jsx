import React, { useState } from 'react'
import DashbaordLayout from '../../components/DashbaordLayout'
import { AddRejectReasonModal, ConfirmModal } from '../../components/Modals/Modal';


import { IoMdClose } from "react-icons/io";

import { FiEdit } from "react-icons/fi";

import { useNavigate } from 'react-router-dom';





const GeneralSetting = () => {
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);

    const [activeTab, setActiveTab] = useState("General");

    const tabs = ["General", "Payment", "Social Link", "Website Config", "Package"];


    const data = [
        {
            id: 1,
            name: "Abhishek Sharma",
            rate: "₹10/Min",
            type: "Audio",
            duration: "-",
            deduction: "-",
            dateTime: "11.30.00 Am 12-Apr-2024",
            status: "Upcoming",
            statusColor: "text-[#0000FF]",
            img: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        {
            id: 2,
            name: "Jane Cooper",
            rate: "₹10/Min",
            type: "Video",
            duration: "-",
            deduction: "-",
            dateTime: "11.30.00 Am 12-Apr-2024",
            status: "Pending",
            statusColor: "text-[#CC9A05]",
            img: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
            id: 3,
            name: "Jenny Wilson",
            rate: "₹10/Min",
            type: "Chat",
            duration: "70 Min",
            deduction: "150",
            dateTime: "11.30.00 Am 12-Apr-2024",
            status: "Completed",
            statusColor: "text-[#008000]",
            img: "https://randomuser.me/api/portraits/women/47.jpg",
        },
    ];

    const walletdata = [
        {
            "id": 1,
            "transactionID": "#23345346436",
            "amount": "₹1000",
            "method": "UPI",
            "method1": "UPI@123",
            "dateTime": "11.30.00 Am 12-Apr-2024",
            "status": "Successful",
            'statusColor': "text-[#0A7324]",
        },
        {
            "id": 2,
            "transactionID": "#23345346436",
            "amount": "₹1000",
            "method": "Bank",
            "method1": "Account Number IFSC CodeName",
            "dateTime": "11.30.00 Am 12-Apr-2024",
            "status": "Pending",
            'statusColor': "text-[#CC9A05]",
        },
        {
            "id": 3,
            "transactionID": "#23345346436",
            "amount": "₹1000",
            "method": "UPI",
            "method1": "UPI@123",
            "dateTime": "11.30.00 Am 12-Apr-2024",
            "status": "Successful",
            'statusColor': "text-[#0A7324]",
        }
    ]


    const subscriptiondata = [
        {
            "id": 1,
            "profileImg": "https://randomuser.me/api/portraits/men/1.jpg",
            "adviserName": "Dianne Russell",
            "package": "Pro",
            "session": "5/30",
            "duration": "150/300",
            "dateTime": "11.30.00 Am 12-Apr-2024",
            "price": 1500
        },
        {
            "id": 2,
            "profileImg": "https://randomuser.me/api/portraits/men/2.jpg",
            "adviserName": "Jacob Jones",
            "package": "Basic",
            "session": "5/10",
            "duration": "50/100",
            "dateTime": "11.30.00 Am 12-Apr-2024",
            "price": 750
        },
        {
            "id": 3,
            "profileImg": "https://randomuser.me/api/portraits/men/3.jpg",
            "adviserName": "Jerome Bell",
            "package": "Economy",
            "session": "5/20",
            "duration": "150/200",
            "dateTime": "11.30.00 Am 12-Apr-2024",
            "price": 1000
        }
    ]

    const handleConfirm = () => {
        console.log("Suspension confirmed!");
        setShowModal(false);
        setShowModal1(true)
    };



    return (
        <DashbaordLayout title="General Settings"
            hedartitle="General Settings"
        >
            <ConfirmModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleConfirm}
                text="Suspension"
            />
            <AddRejectReasonModal
                isOpen={showModal1}
                onClose={() => setShowModal1(false)}
            />
            <div className="mt-5 overflow-x-auto">
                <div className="">
                    {/* Tabs */}
                    <div className="bg-white shadow-[0px_1px_4px_0px_#00000080] px-4 py-2.5 rounded-tl-[8px] rounded-tr-[8px] flex items-center justify-around  overflow-hidden">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`font-manrope text-[16px] leading-[20px] ${activeTab === tab ? "font-[700] text-transparent bg-clip-text bg-[linear-gradient(90deg,_#C82D30_1.89%,_#362695_67.23%,_#B12F31_136.79%)]" : "font-[400] text-[#000000]"
                                    } transition duration-300`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    {activeTab === "General" && (
                        <div className="overflow-auto px-4 py-2.5 bg-white mt-1">
                            <form className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">User App Name</label>
                                        <input
                                            type="text"
                                            placeholder='Easy Advising'
                                            className='w-full border border-[#E6E6E6] px-2 py-2.5 rounded-[8px]'
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">Adviser App Name</label>
                                        <input
                                            type="text"
                                            placeholder='Easy Advising'
                                            className='w-full border border-[#E6E6E6] px-2 py-2.5 rounded-[8px]'
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">Currency</label>
                                        <input
                                            type="text"
                                            placeholder='₹'
                                            className='w-full border border-[#E6E6E6] px-2 py-2.5 rounded-[8px]'
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">Posted on</label>
                                        <input
                                            type="date"
                                            placeholder='₹'
                                            className='w-full border border-[#E6E6E6] px-2 py-2.5 rounded-[8px]'
                                        />
                                    </div>

                                </div>
                                <div>
                                    <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">App Language</label>
                                    <div className='border border-[#E6E6E6] px-2 py-2.5 rounded-[8px] flex items-center gap-2'>
                                        {["Tamil", "English", "Hindi", "Marathi"].map(lang => (
                                            <div className='px-2 py-1 bg-[#E4E4E4] rounded-[8px] font-inter text-[12px] font-[500] text-[#161616] flex items-center gap-2 cursor-pointer'>
                                                <IoMdClose />
                                                {lang}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="featureImage" className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">
                                        App Logo
                                    </label>
                                    <div className="w-full px-2 py-2.5 border border-[#E6E6E6] rounded-[8px] flex items-center justify-start">
                                        <button
                                            type="button"
                                            className="bg-[#175CD3] flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white"
                                        >
                                            Upload
                                        </button>
                                    </div>
                                </div>
                                <h6 className='font-manrope text-[15px] font-[700] text-[#000000] leading-[20px] mb-2'>Commission</h6>
                                <div>
                                    <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">Chat Commission</label>
                                    <input
                                        type="text"
                                        placeholder='Easy Advising'
                                        className='w-full border border-[#E6E6E6] px-2 py-2.5 rounded-[8px]'
                                    />
                                </div>
                                <div>
                                    <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">Video Call Commission</label>
                                    <input
                                        type="text"
                                        placeholder='₹'
                                        className='w-full border border-[#E6E6E6] px-2 py-2.5 rounded-[8px]'
                                    />
                                </div>
                                <div>
                                    <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">Chat Commission</label>
                                    <input
                                        type="text"
                                        placeholder='Easy Advising'
                                        className='w-full border border-[#E6E6E6] px-2 py-2.5 rounded-[8px]'
                                    />
                                </div>
                            </form>
                        </div>
                    )}
                    {activeTab === "Payment" && (
                        <div className="overflow-auto px-4 py-2.5 bg-white mt-1">
                            <form className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">GST Rate</label>
                                        <input
                                            type="text"
                                            placeholder='18%'
                                            className='w-full border border-[#E6E6E6] px-2 py-2.5 rounded-[8px]'
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">Adviser App Name</label>
                                        <input
                                            type="text"
                                            placeholder='Easing Advising App Partner '
                                            className='w-full border border-[#E6E6E6] px-2 py-2.5 rounded-[8px]'
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">Currency</label>
                                        <input
                                            type="text"
                                            placeholder='INR'
                                            className='w-full border border-[#E6E6E6] px-2 py-2.5 rounded-[8px]'
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">Currency Symbol</label>
                                        <input
                                            type="text"
                                            placeholder='₹'
                                            className='w-full border border-[#E6E6E6] px-2 py-2.5 rounded-[8px]'
                                        />
                                    </div>

                                </div>
                                <div>
                                    <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">Payment Method</label>
                                    <div className='border border-[#E6E6E6] px-2 py-2.5 rounded-[8px] flex items-center gap-2'>
                                        {["Bank Account", "UPI"].map(lang => (
                                            <div className='px-2 py-1 bg-[#E4E4E4] rounded-[8px] font-inter text-[12px] font-[500] text-[#161616] flex items-center gap-2 cursor-pointer'>
                                                <IoMdClose />
                                                {lang}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}

                    {activeTab === "Social Link" && (
                        <div className="overflow-auto px-4 py-2.5 bg-white mt-1">
                            <form className="space-y-4">
                                <div>
                                    <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">Apple link</label>
                                    <input
                                        type="text"
                                        placeholder='#'
                                        className='w-full border border-[#E6E6E6] px-2 py-2.5 rounded-[8px]'
                                    />
                                </div>
                                <div>
                                    <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">Website Link</label>
                                    <input
                                        type="text"
                                        placeholder='#'
                                        className='w-full border border-[#E6E6E6] px-2 py-2.5 rounded-[8px]'
                                    />
                                </div>
                                <div>
                                    <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">You tube Link</label>
                                    <input
                                        type="text"
                                        placeholder='#'
                                        className='w-full border border-[#E6E6E6] px-2 py-2.5 rounded-[8px]'
                                    />
                                </div>
                                <div>
                                    <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">Facebook</label>
                                    <input
                                        type="text"
                                        placeholder='#'
                                        className='w-full border border-[#E6E6E6] px-2 py-2.5 rounded-[8px]'
                                    />
                                </div>
                                <div>
                                    <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">LinkedIn link</label>
                                    <input
                                        type="text"
                                        placeholder='#'
                                        className='w-full border border-[#E6E6E6] px-2 py-2.5 rounded-[8px]'
                                    />
                                </div>
                                <div>
                                    <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">Instagram link</label>
                                    <input
                                        type="text"
                                        placeholder='#'
                                        className='w-full border border-[#E6E6E6] px-2 py-2.5 rounded-[8px]'
                                    />
                                </div>
                            </form>
                        </div>
                    )}

                    {activeTab === "Website Config" && (
                        <div className="overflow-auto px-4 py-2.5 bg-white mt-1">
                            <form className="space-y-4">
                                <h6 className='font-manrope text-[15px] font-[700] text-[#000000] leading-[20px] mb-4'>Fire Base</h6>
                                <div>
                                    <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">Apple link</label>
                                    <input
                                        type="text"
                                        placeholder='#'
                                        className='w-full border border-[#E6E6E6] px-2 py-2.5 rounded-[8px]'
                                    />
                                </div>
                                <div>
                                    <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">Firebase Api Key</label>
                                    <input
                                        type="text"
                                        placeholder='#'
                                        className='w-full border border-[#E6E6E6] px-2 py-2.5 rounded-[8px]'
                                    />
                                </div>
                                <div>
                                    <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">Firebase Database Url</label>
                                    <input
                                        type="text"
                                        placeholder='#'
                                        className='w-full border border-[#E6E6E6] px-2 py-2.5 rounded-[8px]'
                                    />
                                </div>
                                <div>
                                    <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">Firebase Auth Domain</label>
                                    <input
                                        type="text"
                                        placeholder='#'
                                        className='w-full border border-[#E6E6E6] px-2 py-2.5 rounded-[8px]'
                                    />
                                </div>
                                <div>
                                    <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">Firebase Project Id</label>
                                    <input
                                        type="text"
                                        placeholder='#'
                                        className='w-full border border-[#E6E6E6] px-2 py-2.5 rounded-[8px]'
                                    />
                                </div>
                                <div>
                                    <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">Firebase Storage Bucket</label>
                                    <input
                                        type="text"
                                        placeholder='#'
                                        className='w-full border border-[#E6E6E6] px-2 py-2.5 rounded-[8px]'
                                    />
                                </div>
                                <div>
                                    <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">Firebase Messaging Sender Id</label>
                                    <input
                                        type="text"
                                        placeholder='#'
                                        className='w-full border border-[#E6E6E6] px-2 py-2.5 rounded-[8px]'
                                    />
                                </div>
                                <div>
                                    <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">Firebase App Id</label>
                                    <input
                                        type="text"
                                        placeholder='#'
                                        className='w-full border border-[#E6E6E6] px-2 py-2.5 rounded-[8px]'
                                    />
                                </div>
                                <div>
                                    <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">Firebase Measurement Id</label>
                                    <input
                                        type="text"
                                        placeholder='#'
                                        className='w-full border border-[#E6E6E6] px-2 py-2.5 rounded-[8px]'
                                    />
                                </div>
                                <h6 className='font-manrope text-[15px] font-[700] text-[#000000] leading-[20px] mb-2'>Site Details</h6>
                                <div>
                                    <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">Site Address</label>
                                    <input
                                        type="text"
                                        placeholder='#'
                                        className='w-full border border-[#E6E6E6] px-2 py-2.5 rounded-[8px]'
                                    />
                                </div>
                                <div>
                                    <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">Site Email</label>
                                    <input
                                        type="text"
                                        placeholder='#'
                                        className='w-full border border-[#E6E6E6] px-2 py-2.5 rounded-[8px]'
                                    />
                                </div>
                                <div>
                                    <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">Site Mobile Number</label>
                                    <input
                                        type="text"
                                        placeholder='#'
                                        className='w-full border border-[#E6E6E6] px-2 py-2.5 rounded-[8px]'
                                    />
                                </div>
                            </form>
                        </div>
                    )}

                    {activeTab === "Package" && (
                        <div className="overflow-auto px-4 py-2.5 bg-white mt-1">
                            <form className="space-y-4">
                                <h6 className='font-manrope text-[15px] font-[700] text-[#000000] leading-[20px] mb-2'>Basic</h6>
                                <div className='flex items-center gap-4'>
                                    <div className='w-full'>
                                        <label className="block font-urbanist text-[15px] font-[500] text-[#282727] leading-[20px] mb-2">Session</label>
                                        <input
                                            type="text"
                                            placeholder='10'
                                            className='w-full border border-[#E6E6E6] px-2 py-2.5 rounded-[8px]'
                                        />
                                    </div>
                                    <div className='w-full'>
                                        <label className="block font-urbanist text-[15px] font-[500] text-[#282727] leading-[20px] mb-2">Duration</label>
                                        <input
                                            type="text"
                                            placeholder='300 Minutes'
                                            className='w-full border border-[#E6E6E6] px-2 py-2.5 rounded-[8px]'
                                        />
                                    </div>
                                </div>

                                <h6 className='font-manrope text-[15px] font-[700] text-[#000000] leading-[20px] mb-2'>Economy</h6>
                                <div className='flex items-center gap-4'>
                                    <div className='w-full'>
                                        <label className="block font-urbanist text-[15px] font-[500] text-[#282727] leading-[20px] mb-2">Session</label>
                                        <input
                                            type="text"
                                            placeholder='10'
                                            className='w-full border border-[#E6E6E6] px-2 py-2.5 rounded-[8px]'
                                        />
                                    </div>
                                    <div className='w-full'>
                                        <label className="block font-urbanist text-[15px] font-[500] text-[#282727] leading-[20px] mb-2">Duration</label>
                                        <input
                                            type="text"
                                            placeholder='300 Minutes'
                                            className='w-full border border-[#E6E6E6] px-2 py-2.5 rounded-[8px]'
                                        />
                                    </div>
                                </div>

                                <h6 className='font-manrope text-[15px] font-[700] text-[#000000] leading-[20px] mb-2'>Pro</h6>
                                <div className='flex items-center gap-4'>
                                    <div className='w-full'>
                                        <label className="block font-urbanist text-[15px] font-[500] text-[#282727] leading-[20px] mb-2">Session</label>
                                        <input
                                            type="text"
                                            placeholder='10'
                                            className='w-full border border-[#E6E6E6] px-2 py-2.5 rounded-[8px]'
                                        />
                                    </div>
                                    <div className='w-full'>
                                        <label className="block font-urbanist text-[15px] font-[500] text-[#282727] leading-[20px] mb-2">Duration</label>
                                        <input
                                            type="text"
                                            placeholder='300 Minutes'
                                            className='w-full border border-[#E6E6E6] px-2 py-2.5 rounded-[8px]'
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}
                    {activeTab === "Working Time" && (
                        <div className="overflow-auto px-4 py-2.5">
                            <table className="min-w-full text-left shadow-lg">
                                <thead className="">
                                    <tr>
                                        <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">#</th>
                                        <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Profile</th>
                                        <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Price</th>
                                        <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">User</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subscriptiondata.map((item, idx) => (
                                        <tr key={item.id} className="">
                                            <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">{idx + 1}</td>
                                            <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">{item.package}</td>
                                            <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">{item.price}</td>
                                            <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">{item.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <table className="min-w-full text-left mt-2  shadow-lg">
                                <thead className="">
                                    <tr>
                                        <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">#</th>
                                        <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Mode</th>
                                        <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Price/Per Minute</th>
                                        <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">
                                            <button className="font-urbanist text-[15px] font-[500] text-[#0A0E15] flex items-center gap-1">
                                                Commission
                                                <FiEdit color='#0A0E15' size={20} />
                                            </button>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subscriptiondata.map((item, idx) => (
                                        <tr key={item.id} className="">
                                            <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">{idx + 1}</td>
                                            <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">Audio</td>
                                            <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">10</td>
                                            <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">30%</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </DashbaordLayout>
    )
}

export default GeneralSetting