import React, { useState } from 'react'
import DashbaordLayout from '../../components/DashbaordLayout'
import { AddRejectReasonModal } from '../../components/Modals/Modal';


import { IoArrowBack } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";


import img from '../../assets/images/user.png'
import { useNavigate } from 'react-router-dom';





const PendingAdviserDetails = () => {
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false);
    const [selectedDay, setSelectedDay] = useState("Mon");
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [activeTab, setActiveTab] = useState("Basic Details");

    const tabs = ["Basic Details", "Work Experience", "Social Links", "Working Time",];

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const slots = [
        "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
        "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
        "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"
    ];

    return (
        <DashbaordLayout title="Adviser Details"
            hedartitle={`Pending Request ${'>'} Adviser Profile`}
            titleAction={
                <IoArrowBack size={25} color='#1C1B1F' className='cursor-pointer' onClick={() => navigate('/adviser/pending')} />
            }
            headerAction={
                <div className='flex items-center gap-2'>
                    <button className='bg-[#164E62] flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white'>
                        Accept
                    </button>
                    <button onClick={()=>setShowModal(true)} className='bg-[#9C9C9C] flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-[#000000]'>
                        Reject
                    </button>
                </div>
            }
        >
            <AddRejectReasonModal
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


                    {activeTab === "Basic Details" && (
                        <div className="overflow-auto px-4 py-2.5">
                            <div className="rounded-[8px] border border-[#EDEDF2] p-2">
                                <h6 className='font-urbanist text-[15px] font-[600] text-[#000000] leading-[20px] p-2 mb-5'>Basic Details</h6>
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
                                        <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">Sub Category</label>
                                        <div className='border border-[#DDDDDD] px-6 py-1 rounded-[15px] flex items-center gap-2'>
                                            <div className=' px-2 py-2 rounded-[8px] font-urbanist text-[16px] font-[500] text-[#000000]'>
                                                Homeopathy
                                            </div>
                                        </div>
                                    </div>
                                    {/* skills */}
                                    <div>
                                        <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">Skills*</label>
                                        <div className='border border-[#DDDDDD] px-6 py-2 rounded-[15px] flex items-center gap-2'>
                                            {["Programming", "Design", "UX UI"].map(lang => (
                                                <div className='border border-[#DDDDDD] px-2 py-1 rounded-[8px] font-urbanist text-[16px] font-[500] text-[#000000]'>
                                                    {lang}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {/* respond */}
                                    <div>
                                        <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">Usual Respond*</label>
                                        <div className='border border-[#DDDDDD] px-6 py-1 rounded-[15px] flex items-center gap-2'>
                                            <div className=' px-2 py-2 rounded-[8px] font-urbanist text-[16px] font-[500] text-[#000000]'>
                                                In a Few Hour
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
                                    {/* bio */}
                                    <div>
                                        <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">Bio</label>
                                        <div className='border border-[#DDDDDD] px-6 py-1 rounded-[15px] flex items-center gap-2'>
                                            <div className=' px-2 py-2 rounded-[8px] font-urbanist text-[16px] font-[500] text-[#000000]'>
                                                I'm happy to help entrepreneurs with their growth journey
                                                and problem solving. D2C, Ecommerce, Fundraising, Pitching your Idea, Performance Marketing, Getting into y to help entrepreneurs with their growth
                                            </div>
                                        </div>
                                    </div>
                                    {/* introduction video */}
                                    <div>
                                        <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">Introduction Video</label>
                                        <div className='border border-[#DDDDDD] px-6 py-1 rounded-[15px] flex items-center gap-2'>
                                            <video src="" >

                                            </video>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                    {activeTab === "Work Experience" && (
                        <div className="overflow-auto px-4 py-2.5">
                            <div className="rounded-[8px] border border-[#EDEDF2] p-2">
                                <h6 className='font-urbanist text-[15px] font-[600] text-[#000000] leading-[20px] p-2 mb-5'>Work Experience</h6>
                                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    {/* Company */}
                                    <div>
                                        <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">Company Nmae</label>
                                        <div className='border border-[#DDDDDD] px-6 py-1 rounded-[15px] flex items-center gap-2'>
                                            <div className=' px-2 py-2 rounded-[8px] font-urbanist text-[16px] font-[500] text-[#000000]'>
                                                Flyweih Technology
                                            </div>
                                        </div>
                                    </div>

                                    {/* Designation */}
                                    <div>
                                        <label className="block font-urbanist text-[15px] font-[600] text-[#282727] leading-[20px] mb-2">Current Designation</label>
                                        <div className='border border-[#DDDDDD] px-6 py-1 rounded-[15px] flex items-center gap-2'>
                                            <div className=' px-2 py-2 rounded-[8px] font-urbanist text-[16px] font-[500] text-[#000000]'>
                                                Designer
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
                                </form>
                            </div>
                        </div>
                    )}
                    {activeTab === "Social Links" && (
                        <div className="overflow-auto px-4 py-2.5">
                            <div className="rounded-[8px] border border-[#EDEDF2] p-2">
                                <h6 className='font-urbanist text-[15px] font-[600] text-[#000000] leading-[20px] p-2 mb-5'>Social Links</h6>
                                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                                <FaFacebook color='#1976D2' size={20} />
                                                https://www.FACEBOOK/in.com/in/sd
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                    {activeTab === "Working Time" && (
                        <div className="overflow-auto px-4 py-2.5">
                            {/* Day Selector */}
                            <div className="mb-10">
                                <h6 className='font-urbanist text-[15px] font-[600] text-[#000000] leading-[20px]'>Day</h6>
                                <div className="flex gap-3 flex-wrap mt-5">
                                    {days.map((day) => (
                                        <button
                                            key={day}
                                            onClick={() => setSelectedDay(day)}
                                            className={`px-5 py-4 rounded-[10px] font-urbanist text-[15px] font-[500]  border
                ${selectedDay === day
                                                    ? "bg-[linear-gradient(161.63deg,_#002E78_15.02%,_#C8161A_146.66%)] text-white border-none"
                                                    : "bg-white text-black border-[#E9E9E9]"
                                                }`}
                                        >
                                            {day}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Slot Selector */}
                            <div>
                                <h6 className='font-urbanist text-[15px] font-[600] text-[#000000] leading-[20px]'>Slot</h6>
                                <div className="flex flex-wrap gap-3 mt-5">
                                    {slots.map((slot) => (
                                        <button
                                            key={slot}
                                            onClick={() => setSelectedSlot(slot)}
                                            className={`px-4 py-2.5 rounded-[8px] border font-urbanist text-[15px] font-[500] cursor-pointer transition-all
                ${selectedSlot === slot
                                                    ? "bg-[linear-gradient(161.63deg,_#002E78_15.02%,_#C8161A_146.66%)] text-white border-none"
                                                    : "bg-white text-[#18273B] border-[#E9E9E9]"
                                                }`}
                                        >
                                            {slot}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </DashbaordLayout>
    )
}

export default PendingAdviserDetails