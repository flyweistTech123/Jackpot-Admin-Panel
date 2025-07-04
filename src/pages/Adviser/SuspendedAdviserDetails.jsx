import React, { useState } from 'react'
import DashbaordLayout from '../../components/DashbaordLayout'


import { IoArrowBack } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { PiEyeBold } from "react-icons/pi";
import { FiEdit } from "react-icons/fi";
import { GrCircleInformation } from "react-icons/gr";


import img from '../../assets/images/user.png'
import { useNavigate } from 'react-router-dom';
import { RechargeWalletModal, RejectReasonModal } from '../../components/Modals/Modal';





const SuspendedAdviserDetails = () => {
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false);

    const [activeTab, setActiveTab] = useState("Appointment");
    const [walletactiveTab, setWalletActiveTab] = useState("Wallet Transaction");
    const [skills, setSkills] = useState(["Yoga", "Exercise"]);

    const tabs = ["Details", "Appointment", "Wallet", "Subscriber", "Package & Pricing", "Working Time"];
    const wallettabs = ["Wallet Transaction", "Payment Logs"];


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



    return (
        <DashbaordLayout title="Adviser Details"
             hedartitle={`Suspended List ${'>'} Adviser Profile`}
            titleAction={
                <IoArrowBack size={25} color='#1C1B1F' className='cursor-pointer' onClick={() => navigate('/adviser/list')} />
            }
            headerAction={
                <button onClick={() => setShowModal(true)} className="font-manrope text-[15px] font-[400] text-[#C23A3A] flex items-center gap-1">
                    <GrCircleInformation color='#C23A3A' size={20} />
                    Reason
                </button>
            }
        >
            <RejectReasonModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
            <div className="mt-5 overflow-x-auto min-h-screen bg-white rounded-[8px] px-6 py-2.5">
                <div className='flex justify-between flex-wrap mt-2'>
                    <div className='flex gap-5 sm:gap-10 flex-wrap'>
                        <div className='flex items-center gap-5'>
                            <div className='flex flex-col items-center gap-1'>
                                <div className='w-30 h-30 rounded-full'>
                                    <img src={img} alt="" className='w-full h-full rounded-full object-cover' />
                                </div>
                            </div>

                            <div className='space-y-1'>
                                <h6 className='font-manrope text-[20px] font-[600] text-[#000000] leading-[30px]'>Abhishek Sharma</h6>
                                <p className='font-manrope text-[16px] font-[600] text-[#000000] leading-[30px]'>27 Nov 1998</p>
                                <p className='font-manrope text-[16px] font-[600] text-[#000000]'>male</p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 ml-5'>
                            <h6 className='font-manrope text-[20px] font-[600] text-[#000000] leading-[20px]'>Contact  Details</h6>
                            <span className='font-manrope text-[15px] font-[400] text-[#000000] leading-[20px] flex items-center gap-1'>
                                <MdOutlineMailOutline size={20} />
                                abishek@gamil.com
                            </span>
                            <span className='font-manrope text-[15px] font-[400] text-[#000000] leading-[20px] flex items-center gap-1'>
                                <IoCallOutline size={20} />
                                9874578818
                            </span>
                            <span className='font-manrope text-[15px] font-[400] text-[#000000] leading-[20px] flex items-center gap-1'>
                                <IoLocationOutline size={20} />
                                123, main road ,613501
                            </span>
                        </div>
                    </div>
                    <div className='flex items-start gap-5 sm:gap-10 mt-5 sm:mt-0'>
                        <div>
                            <h6 className='font-manrope text-[20px] font-[600] text-[#000000] leading-[20px] mb-2'>Available Balance</h6>
                            <h4 className='font-manrope text-[24px] font-[500] text-[#000000] leading-[20px]'>₹45634.0</h4>
                        </div>
                        <button className='bg-[#164E62] flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white'>
                            De suspension
                        </button>
                    </div>
                </div>
                <div className="mt-8">
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

                    {/* Table */}


                    {activeTab === "Details" && (
                        <div className="overflow-auto px-4 py-2.5">
                            <div className="rounded-[8px] border border-[#EDEDF2] p-2">
                                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    {/* Category */}
                                    <div>
                                        <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">Category</label>
                                        <div className='border border-[#DDDDDD] px-6 py-2 rounded-[15px] flex items-center gap-2'>
                                            <div className='border border-[#DDDDDD] px-2 py-1 rounded-[8px] font-urbanist text-[16px] font-[500] text-[#000000]'>
                                                Health
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sub Category */}
                                    <div>
                                        <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">Sub Category </label>
                                        <div className='border border-[#DDDDDD] px-6 py-1 rounded-[15px] flex items-center gap-2'>
                                            <div className=' px-2 py-2 rounded-[8px] font-urbanist text-[16px] font-[500] text-[#000000]'>
                                                Homeopathy
                                            </div>
                                        </div>
                                    </div>

                                    {/* Languages */}
                                    <div>
                                        <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">Languages You Can Speak </label>
                                        <div className='border border-[#DDDDDD] px-6 py-2 rounded-[15px] flex items-center gap-2'>
                                            {["English", "Hindi", "Tamil"].map(lang => (
                                                <div className='border border-[#DDDDDD] px-2 py-1 rounded-[8px] font-urbanist text-[16px] font-[500] text-[#000000]'>
                                                    {lang}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Designation */}
                                    <div>
                                        <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">Current Designation</label>
                                        <div className='border border-[#DDDDDD] px-6 py-1 rounded-[15px] flex items-center gap-2'>
                                            <div className=' px-2 py-2 rounded-[8px] font-urbanist text-[16px] font-[500] text-[#000000]'>
                                                Doctor
                                            </div>
                                        </div>
                                    </div>

                                    {/* Company */}
                                    <div>
                                        <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">Current Company Name</label>
                                        <div className='border border-[#DDDDDD] px-6 py-1 rounded-[15px] flex items-center gap-2'>
                                            <div className=' px-2 py-2 rounded-[8px] font-urbanist text-[16px] font-[500] text-[#000000]'>
                                                Flyweih Technology
                                            </div>
                                        </div>
                                    </div>

                                    {/* Experience */}
                                    <div>
                                        <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">Years of Experience</label>
                                        <div className='border border-[#DDDDDD] px-6 py-1 rounded-[15px] flex items-center gap-2'>
                                            <div className=' px-2 py-2 rounded-[8px] font-urbanist text-[16px] font-[500] text-[#000000]'>
                                                5
                                            </div>
                                        </div>
                                    </div>

                                    {/* Expertise (Left) */}
                                    <div>
                                        <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">What Expertise You Can Offer</label>
                                        <div className='border border-[#DDDDDD] px-6 py-1 rounded-[15px] flex items-center gap-2'>
                                            <div className=' px-2 py-2 rounded-[8px] font-urbanist text-[16px] font-[500] text-[#000000]'>
                                                I'm happy to help entrepreneurs with their growth journey
                                                and problem solving. D2C, Ecommerce, Fundraising, Pitching your Idea, Performance Marketing, Getting into y to help entrepreneurs with their growth
                                            </div>
                                        </div>
                                    </div>

                                    {/* Expertise (Right) */}
                                    <div>
                                        <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">What Expertise You Can Offer</label>
                                        <div className='border border-[#DDDDDD] px-6 py-1 rounded-[15px] flex items-center gap-2'>
                                            <div className=' px-2 py-2 rounded-[8px] font-urbanist text-[16px] font-[500] text-[#000000]'>
                                                I'm happy to help entrepreneurs with their growth journey
                                                and problem solving. D2C, Ecommerce, Fundraising, Pitching your Idea, Performance Marketing, Getting into y to help entrepreneurs with their growth journey
                                                an Performance Marketing, Get VCPE,I'm happy to help entrepreneurs with their growth journey
                                                and problem solving. D2C, Ecommerce, Fundraising, Pitching your Idea, Performance Marketing, Getting into y to help entrepreneurs with their growth journey
                                                an Performance Marketing, Get VCPEI'm happy to help entrepreneurs with their growth journey
                                                and problem solving. D2C, Ecommerce, Fundraising, Pitching your Idea, Performance Marketing, Getting into y to help entrepreneurs with their growth journey
                                                an Performance Marketing, Get VCPE
                                            </div>
                                        </div>
                                    </div>

                                    {/* Skills */}
                                    <div>
                                        <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">Add Skills</label>
                                        <div className='border border-[#DDDDDD] px-6 py-2 rounded-[15px] flex items-center gap-2'>
                                            {skills.map(lang => (
                                                <div className='border border-[#DDDDDD] px-2 py-1 rounded-[8px] font-urbanist text-[16px] font-[500] text-[#000000]'>
                                                    {lang}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Supporting Document */}
                                    <div>
                                        <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">Supporting Document</label>
                                        <div className='border border-[#DDDDDD] px-6 py-1 rounded-[15px] flex items-center gap-2'>
                                            <div className=' px-2 py-2 rounded-[8px] font-urbanist text-[16px] font-[500] text-[#000000] flex items-center gap-2'>
                                                <IoDocumentTextOutline />
                                                Certificate.pdf
                                            </div>
                                        </div>
                                    </div>

                                    {/* Social Links */}
                                    <div>
                                        <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">Linkdin</label>
                                        <div className='border border-[#DDDDDD] px-6 py-1 rounded-[15px] flex items-center gap-2'>
                                            <div className=' px-2 py-2 rounded-[8px] font-urbanist text-[16px] font-[500] text-[#000000] flex items-center gap-2'>
                                                <FaLinkedin color='#0077B7' size={20} />
                                                https://www.linkedin.com/in/sd
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">Instagram</label>
                                        <div className='border border-[#DDDDDD] px-6 py-1 rounded-[15px] flex items-center gap-2'>
                                            <div className=' px-2 py-2 rounded-[8px] font-urbanist text-[16px] font-[500] text-[#000000] flex items-center gap-2'>
                                                <FaInstagramSquare color='#FFF' size={20} className='bg-[linear-gradient(49.12deg,_#FFDD55_6.62%,_#FF543E_50.06%,_#C837AB_93.5%)]' />
                                                https://www.instagram/in.com/in/sd
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">Twitter</label>
                                        <div className='border border-[#DDDDDD] px-6 py-1 rounded-[15px] flex items-center gap-2'>
                                            <div className=' px-2 py-2 rounded-[8px] font-urbanist text-[16px] font-[500] text-[#000000] flex items-center gap-2'>
                                                <BsTwitterX color='#000000' size={20} />
                                                https://www.x/in.com/in/sd
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">facebook</label>
                                        <div className='border border-[#DDDDDD] px-6 py-1 rounded-[15px] flex items-center gap-2'>
                                            <div className=' px-2 py-2 rounded-[8px] font-urbanist text-[16px] font-[500] text-[#000000] flex items-center gap-2'>
                                                <FaFacebook color='#    1976D2' size={20} />
                                                https://www.FACEBOOK/in.com/in/sd
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                    {activeTab === "Appointment" && (
                        <div className="overflow-auto px-4 py-2.5">
                            <table className="min-w-full text-left">
                                <thead className="">
                                    <tr>
                                        <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">#</th>
                                        <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Profile</th>
                                        <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">User  Name</th>
                                        <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Per Min Rate</th>
                                        <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Type</th>
                                        <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Duration</th>
                                        <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Credited</th>
                                        <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Date & Time</th>
                                        <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, idx) => (
                                        <tr key={item.id} className="">
                                            <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">{idx + 1}</td>
                                            <td className="p-3">
                                                <img
                                                    src={item.img}
                                                    alt="profile"
                                                    className="h-8 w-8 rounded-full object-cover"
                                                />
                                            </td>
                                            <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">{item.name}</td>
                                            <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">{item.rate}</td>
                                            <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">{item.type}</td>
                                            <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">{item.duration}</td>
                                            <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">{item.deduction}</td>
                                            <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">{item.dateTime}</td>
                                            <td className="p-3 font-manrope text-[15px] font-[600] leading-[20px]">
                                                <span className={item.statusColor}>{item.status}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === "Wallet" && (
                        <div className="overflow-auto px-4 py-2.5">
                            <div className=" px-4 py-2.5 flex items-center justify-between  overflow-hidden">
                                {wallettabs.map((tab) => (
                                    <div
                                        key={tab}
                                        onClick={() => setWalletActiveTab(tab)}
                                        className={`font-manrope text-[16px] leading-[20px] w-full flex items-center justify-center pt-[8px] pb-[8px] cursor-pointer
    ${walletactiveTab === tab
                                                ? `font-[700] text-transparent bg-clip-text
         bg-[linear-gradient(90deg,_#C82D30_1.89%,_#362695_67.23%,_#B12F31_136.79%)]
         border-b-[2px] border-solid
         [border-image-source:linear-gradient(90deg,#C82D30_1.89%,#362695_67.23%,#B12F31_136.79%)]
         [border-image-slice:1]`
                                                : "font-[400] text-[#000000]"}
    transition duration-300`}
                                    >
                                        {tab}
                                    </div>


                                ))}
                            </div>
                            {walletactiveTab === "Wallet Transaction" && (
                                <div className="overflow-auto px-4 py-2.5">
                                    <table className="min-w-full text-left">
                                        <thead className="">
                                            <tr>
                                                <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">#</th>
                                                <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Transaction ID</th>
                                                <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Amount</th>
                                                <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Method</th>
                                                <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Method</th>
                                                <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Date & Time</th>
                                                <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Stauts</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {walletdata.map((item, idx) => (
                                                <tr key={item.id} className="">
                                                    <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">{idx + 1}</td>
                                                    <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">{item.transactionID}</td>
                                                    <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">{item.amount}</td>
                                                    <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">{item.method}</td>
                                                    <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">{item.method1}</td>
                                                    <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">{item.dateTime}</td>
                                                    <td className="p-3 font-manrope text-[15px] font-[600] leading-[20px]">
                                                        <span className={item.statusColor}>{item.status}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                            {walletactiveTab === "Payment Logs" && (
                                <div className="overflow-auto px-4 py-2.5">
                                    <table className="min-w-full text-left">
                                        <thead className="">
                                            <tr>
                                                <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">#</th>
                                                <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">User Name</th>
                                                <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Credited Amount</th>
                                                <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Duration</th>
                                                <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Per Min/ Rate</th>
                                                <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Type</th>
                                                <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Date & Time</th>
                                                <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Stauts</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {walletdata.map((item, idx) => (
                                                <tr key={item.id} className="">
                                                    <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">{idx + 1}</td>
                                                    <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">Dianne Russell</td>
                                                    <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">1000</td>
                                                    <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">70 Min</td>
                                                    <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">₹10</td>
                                                    <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">Chat</td>
                                                    <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">{item.dateTime}</td>
                                                    <td className="p-3 font-manrope text-[15px] font-[600] leading-[20px]">
                                                        <span className={item.statusColor}>{item.status}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === "Subscriber" && (
                        <div className="overflow-auto px-4 py-2.5">
                            <table className="min-w-full text-left">
                                <thead className="">
                                    <tr>
                                        <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">#</th>
                                        <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Profile</th>
                                        <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Subscriber Name</th>
                                        <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Package</th>
                                        <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Session</th>
                                        <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Duration</th>
                                        <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Date & Time</th>
                                        <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Price</th>
                                        <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subscriptiondata.map((item, idx) => (
                                        <tr key={item.id} className="">
                                            <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">{idx + 1}</td>
                                            <td className="p-3">
                                                <img
                                                    src={item.profileImg}
                                                    alt="profile"
                                                    className="h-8 w-8 rounded-full object-cover"
                                                />
                                            </td>
                                            <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">{item.adviserName}</td>
                                            <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">{item.package}</td>
                                            <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">{item.session}</td>
                                            <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">{item.duration}</td>
                                            <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">{item.dateTime}</td>
                                            <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">{item.price}</td>
                                            <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">
                                                <button className="font-manrope text-[15px] font-[400] text-[#11968A] flex items-center gap-1">
                                                    <PiEyeBold color='#11968A' size={20} />
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === "Package & Pricing" && (
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

export default SuspendedAdviserDetails