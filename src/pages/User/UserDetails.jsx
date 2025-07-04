import React, { useState } from 'react'
import DashbaordLayout from '../../components/DashbaordLayout'


import { IoArrowBack } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";


import img from '../../assets/images/user.png'
import img1 from '../../assets/images/Adviser2.png'
import img2 from '../../assets/images/Adviser3.png'
import { useNavigate } from 'react-router-dom';
import { RechargeWalletModal } from '../../components/Modals/Modal';





const UserDetails = () => {
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false);

    const [activeTab, setActiveTab] = useState("Appointment");
    const [walletactiveTab, setWalletActiveTab] = useState("Wallet Transaction");

    const tabs = ["Appointment", "Wallet", "Subscription"];
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
            "adviserName": "Suresh",
            "ratePerMin": "₹10",
            "duration": "10 min",
            "type": "Chat",
            "deductionAmount": 1000,
            "dateTime": "11.30.00 Am 12-Apr-2024",
            "method": "By Admin",
            "status": "Successful"
        },
        {
            "id": 2,
            "adviserName": "Ramesh",
            "ratePerMin": "₹10",
            "duration": "10 min",
            "type": "Chat",
            "deductionAmount": 1000,
            "dateTime": "11.30.00 Am 12-Apr-2024",
            "method": "Upi",
            "status": "Successful"
        },
        {
            "id": 3,
            "adviserName": "Ganesh",
            "ratePerMin": "₹10",
            "duration": "10 min",
            "type": "Chat",
            "deductionAmount": 1000,
            "dateTime": "11.30.00 Am 12-Apr-2024",
            "method": "Razor Pay",
            "status": "Successful"
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
            "status": "Activated",
            'statusColor': "text-[#008000]",
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
            "status": "Expired",
            'statusColor': "text-[#FF0000]",
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
            "status": "Expired",
            'statusColor': "text-[#FF0000]",
            "price": 1000
        }
    ]



    return (
        <DashbaordLayout title="Customer  Details"
            hedartitle={`User ${'>'} User Profile`}
            titleAction={
                <IoArrowBack size={25} color='#1C1B1F' className='cursor-pointer' onClick={() => navigate('/users')} />
            }
        >
            <RechargeWalletModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
            <div className="mt-5 overflow-x-auto min-h-screen bg-white rounded-[8px] px-6 py-2.5">
                <div className='flex justify-between flex-wrap mt-2'>
                    <div className='flex gap-5 sm:gap-10 flex-wrap'>
                        <div className='flex items-center gap-5'>
                            <div className='w-30 h-30 rounded-full'>
                                <img src={img} alt="" className='w-full h-full rounded-full object-cover' />
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

                        <button onClick={() => setShowModal(true)} className='px-2.5 py-2.5 rounded-[10px] bg-[linear-gradient(90deg,_rgba(200,45,48,0.7)_1.89%,_rgba(54,38,149,0.7)_67.23%,_rgba(177,47,49,0.7)_136.79%)] font-manrope text-[18px] font-[600] text-[#FFFFFF] leading-[21px] '>
                            Recharge
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
                    {activeTab === "Appointment" && (
                        <div className="overflow-auto px-4 py-2.5">
                            <table className="min-w-full text-left">
                                <thead className="">
                                    <tr>
                                        <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">#</th>
                                        <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Profile</th>
                                        <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Adviser Name</th>
                                        <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Per Min Rate</th>
                                        <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Type</th>
                                        <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Duration</th>
                                        <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Deduction</th>
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
                                                <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Adviser Name</th>
                                                <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Per Min /rate</th>
                                                <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Duration</th>
                                                <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Type</th>
                                                <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Deduction Amount</th>
                                                <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Date & Time</th>
                                                <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Stauts</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {walletdata.map((item, idx) => (
                                                <tr key={item.id} className="">
                                                    <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">{idx + 1}</td>
                                                    <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">{item.adviserName}</td>
                                                    <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">{item.ratePerMin}</td>
                                                    <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">{item.duration}</td>
                                                    <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">{item.type}</td>
                                                    <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">{item.deductionAmount}</td>
                                                    <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">{item.dateTime}</td>
                                                    <td className="p-3 font-manrope text-[15px] font-[600] leading-[20px]">
                                                        <span className="text-[#0A7324]">{item.status}</span>
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
                                                <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Transaction ID</th>
                                                <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Credited Amount</th>
                                                <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Method</th>
                                                <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Date & Time</th>
                                                <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Stauts</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {walletdata.map((item, idx) => (
                                                <tr key={item.id} className="">
                                                    <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">{idx + 1}</td>
                                                    <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">#23345346436</td>
                                                    <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">1000</td>
                                                    <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">{item.method}</td>
                                                    <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">{item.dateTime}</td>
                                                    <td className="p-3 font-manrope text-[15px] font-[600] leading-[20px]">
                                                        <span className="text-[#0A7324]">{item.status}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === "Subscription" && (
                        <div className="overflow-auto px-4 py-2.5">
                            <table className="min-w-full text-left">
                                <thead className="">
                                    <tr>
                                        <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">#</th>
                                        <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Profile</th>
                                        <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Adviser Name</th>
                                        <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Package</th>
                                        <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Session</th>
                                        <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Duration</th>
                                        <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Date & Time</th>
                                        <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Status</th>
                                        <th className="p-3 font-urbanist text-[16px] font-[500] text-[#0A0E15] leading-[28px]">Price</th>
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
                                            <td className="p-3 font-manrope text-[15px] font-[600] leading-[20px]">
                                                <span className={item.statusColor}>{item.status}</span>
                                            </td>
                                            <td className="p-3 font-manrope text-[15px] font-[400] text-[#000000] leading-[20px]">{item.price}</td>
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

export default UserDetails