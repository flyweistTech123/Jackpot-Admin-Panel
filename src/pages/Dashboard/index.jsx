import React from 'react'
import DashbaordLayout from '../../components/DashbaordLayout'
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';

import { FaRegUser } from "react-icons/fa6";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { BsCreditCard } from "react-icons/bs";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { GoPackage } from "react-icons/go";
import { FaHourglassHalf, FaPhoneAlt, } from "react-icons/fa";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { MdOutlineCalendarToday } from "react-icons/md";
import { MdOutlineMessage } from "react-icons/md";
import { MdCallEnd } from "react-icons/md";
import { MdOutlineVideoChat } from "react-icons/md";

import img from '../../assets/images/Adviser1.png'
import img1 from '../../assets/images/Adviser2.png'
import img2 from '../../assets/images/Adviser3.png'
import img3 from '../../assets/images/Adviser4.png'
import { Link } from 'react-router-dom';



const lineData = [
    { name: 'Jan', value: 100 },
    { name: 'Feb', value: 150 },
    { name: 'Mar', value: 300 },
    { name: 'Apr', value: 600 },
    { name: 'May', value: 700 },
    { name: 'Jun', value: 500 },
    { name: 'Jul', value: 650 },
    { name: 'Aug', value: 800 },
    { name: 'Sep', value: 400 },
    { name: 'Oct', value: 700 },
    { name: 'Nov', value: 200 },
    { name: 'Dec', value: 50 },
];

const barData = [
    { name: 'Jan', Audio: 3000, Chat: 2000, Video: 1000 },
    { name: 'Feb', Audio: 2000, Chat: 2780, Video: 3908 },
    { name: 'Mar', Audio: 2780, Chat: 3908, Video: 2000 },
    { name: 'Apr', Audio: 1890, Chat: 4800, Video: 2181 },
    { name: 'May', Audio: 2390, Chat: 3800, Video: 2500 },
    { name: 'Jun', Audio: 3490, Chat: 4300, Video: 2100 },
    { name: 'Jul', Audio: 5490, Chat: 6300, Video: 4100 },
    { name: 'Aug', Audio: 3000, Chat: 7000, Video: 1500 },
    { name: 'Sep', Audio: 2780, Chat: 3000, Video: 4900 },
    { name: 'Oct', Audio: 1890, Chat: 2000, Video: 2100 },
    { name: 'Nov', Audio: 2390, Chat: 3500, Video: 2900 },
    { name: 'Dec', Audio: 3490, Chat: 1200, Video: 5000 },
];

const trendData = [
    { name: 'Jan', t1: 100, t2: 150, t3: 200 },
    { name: 'Feb', t1: 300, t2: 400, t3: 350 },
    { name: 'Mar', t1: 500, t2: 600, t3: 450 },
    { name: 'Apr', t1: 700, t2: 800, t3: 600 },
    { name: 'May', t1: 900, t2: 950, t3: 850 },
    { name: 'Jun', t1: 700, t2: 800, t3: 750 },
    { name: 'Jul', t1: 700, t2: 800, t3: 750 },
    { name: 'Aug', t1: 800, t2: 200, t3: 500 },
    { name: 'Sep', t1: 700, t2: 800, t3: 750 },
    { name: 'Oct', t1: 700, t2: 800, t3: 750 },
    { name: 'Nov', t1: 700, t2: 800, t3: 750 },
    { name: 'Dec', t1: 700, t2: 800, t3: 750 },
];

const pieData = [
    { name: 'c1', value: 35 },
    { name: 'c2', value: 25 },
    { name: 'c3', value: 13 },
    { name: 'c4', value: 18 },
];

const COLORS = ['#4EBABA', '#5C95E2', '#FEBA69', '#FE7D68'];


const stats = [
    {
        label: "Total User",
        value: 360,
        icon: <FaRegUser className="text-[#C6E55E]" />,
        link: '/users'
    },
    {
        label: "Total Adviser",
        value: 120,
        icon: <LiaChalkboardTeacherSolid className="text-[#4986ED]" />,
        link: '/adviser/list'
    },
    {
        label: "Withdraw Request",
        value: 120,
        icon: <BsCreditCard className="text-[#AD2FE6]" />,
        link: '/withdrawal/request'
    },
    {
        label: "Pending Request",
        value: 50,
        icon: <FaHourglassHalf className="text-[#FFC107]" />,
        link: '/adviser/pending'
    },
    {
        label: "Total Completed Session",
        value: 360,
        icon: <IoMdCheckmarkCircleOutline className="text-[#FEDA7D]" />,
        link: '/completed-calls'
    },
    {
        label: "Appointment",
        value: 120,
        icon: <FaPhoneAlt className="text-[#38E894]" />,
        link: '/appointment'
    },
    {
        label: "Total Earning",
        value: 360,
        icon: <RiMoneyRupeeCircleLine className="text-[#C6E55E]" />,
        link: '/earning'
    },
    {
        label: "Package",
        value: 120,
        icon: <GoPackage className="text-[#AD2FE6]" />,
        link: '/package-earning'
    },
];
const categories = [
    {
        color: "bg-[#5C94E6]",
        name: "Career",
        session: 900,
        revenue: "₹95,500.00",
        rating: 4.4,
        sold: 800,
        growth: "+12%",
        growthColor: "text-green-500",
    },
    {
        color: "bg-[#71D3B2]",
        name: "Finance",
        session: 854,
        revenue: "₹90,500.00",
        rating: 4.4,
        sold: 700,
        growth: "+12%",
        growthColor: "text-[#37BC0C]",
    },
    {
        color: "bg-[#9AD9AA]",
        name: "Health",
        session: 745,
        revenue: "₹85,500.00",
        rating: 4.4,
        sold: 600,
        growth: "-8%",
        growthColor: "text-[#C82D30]",
    },
    {
        color: "bg-[#FF8F51]",
        name: "Astrology",
        session: 658,
        revenue: "₹80,500.00",
        rating: 4.4,
        sold: 500,
        growth: "+12%",
        growthColor: "text-[#37BC0C]",
    },
    {
        color: "bg-[#FC6F5D]",
        name: "Legal",
        session: 500,
        revenue: "₹75,500.00",
        rating: 4.4,
        sold: 500,
        growth: "+12%",
        growthColor: "text-[#37BC0C]",
    },
];
const adviser = [
    {
        number: 1,
        img: img, // make sure img is imported or defined elsewhere
        name: "Abhishek Sharma",
        contact: 7894561230,
        session: {
            msg: 100,
            call: 700,
            vc: 500,
        },
        language: ["Hindi", "English"],
    },
    {
        number: 2,
        img: img1, // make sure img is imported or defined elsewhere
        name: "Jane Cooper",
        contact: 7894561230,
        session: {
            msg: 100,
            call: 700,
            vc: 500,
        },
        language: ["Hindi", "English"],
    },
    {
        number: 3,
        img: img2, // make sure img is imported or defined elsewhere
        name: "Jenny Wilson",
        contact: 7894561230,
        session: {
            msg: 100,
            call: 700,
            vc: 500,
        },
        language: ["Hindi", "English"],
    },
    {
        number: 4,
        img: img3, // make sure img is imported or defined elsewhere
        name: "Cameron Williamson",
        contact: 7894561230,
        session: {
            msg: 100,
            call: 700,
            vc: 500,
        },
        language: ["Hindi", "English"],
    },
];



const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={14}
            fontWeight="bold"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};



const Dashboard = () => {
    return (
        <DashbaordLayout
            hedartitle="Dashboard"
        >
            <div className='mb-5'>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-5">
                    {stats.map((item, index) => (
                        <Link to={`${item.link}`}>
                            <div
                                key={index}
                                className="bg-white shadow-md rounded-[8px] px-4 py-3 flex flex-col items-start cursor-pointer"
                            >
                                <div className="text-2xl mb-1">{item.icon}</div>
                                <div>
                                    <h2 className="font-manrope text-lg sm:text-[24px] font-bold text-[#000000] m-0 mb-00.5">{item.value}</h2>
                                    <p className="font-manrope text-sm font-[400] text-[#000000] m-0">{item.label}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="space-y-5 mb-5">
                    <div className='2-full flex items-center sm:flex-row flex-col gap-5'>
                        <div className='w-full'>
                            <label htmlFor="" className='block font-manrope text-sm font-bold text-[#000000] m-0 mb-00.5'>Monthly Active Users</label>
                            <p className='block font-manrope text-sm font-[500] text-[#000000] m-0 mb-2'>Last 12 Months</p>
                            <div className="bg-white rounded-lg shadow p-4">
                                <ResponsiveContainer width="100%" height={250}>
                                    <LineChart data={lineData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="value" stroke="#37BC0C" name="Withdraw" dot={{ r: 4 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        {/* Monthly Report */}
                        <div className='w-full'>
                            <label htmlFor="" className='block font-manrope text-sm font-bold text-[#000000] m-0 mb-00.5'>Monthly Report</label>
                            <p className='block font-manrope text-sm font-[500] text-[#000000] m-0 mb-2'>Last 12 Months</p>
                            <div className="bg-white rounded-lg shadow p-4">
                                <ResponsiveContainer width="100%" height={250}>
                                    <BarChart data={barData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="Audio" fill="#AD2FE6" />
                                        <Bar dataKey="Chat" fill="#4986ED" />
                                        <Bar dataKey="Video" fill="#C6E55E" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                    <div className='2-full flex items-center sm:flex-row flex-col gap-5'>
                        {/* Category Trend */}
                        <div className='w-full sm:w-[70%]'>
                            <label htmlFor="" className='block font-manrope text-sm font-bold text-[#000000] m-0 mb-00.5'>Category Trend</label>
                            <p className='block font-manrope text-sm font-[500] text-[#000000] m-0 mb-2'>Sessions Booked</p>
                            <div className="bg-white rounded-lg shadow p-4">
                                <ResponsiveContainer width="100%" height={250}>
                                    <LineChart data={trendData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="t1" stroke="#5691DE" name="Trend 1" />
                                        <Line type="monotone" dataKey="t2" stroke="#359796" name="Trend 2" />
                                        <Line type="monotone" dataKey="t3" stroke="#F3B562" name="Trend 3" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        {/* Sessions Based */}
                        <div className='w-full sm:flex-1'>
                            <label htmlFor="" className='block font-manrope text-sm font-bold text-[#000000] m-0 mb-00.5'>Sessions Based </label>
                            <p className='block font-manrope text-sm font-[500] text-[#000000] m-0 mb-2'>Last 30 Days</p>
                            <div className="bg-white rounded-lg shadow p-4">
                                <ResponsiveContainer width="100%" height={250}>
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            dataKey="value"
                                            nameKey="name"
                                            outerRadius={90}
                                            label={renderCustomizedLabel}
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-5">
                    <div className='flex items-center justify-between mb-4'>
                        <label htmlFor="" className='block font-manrope text-sm font-bold text-[#000000] m-0'>Category Trends</label>
                        <button className='bg-[#164E62] flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white'>
                            Filter
                            <MdOutlineCalendarToday />
                        </button>
                    </div>
                    <div className='overflow-x-auto'>
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr className="bg-white text-left font-urbanist text-md font-semibold text-[#0A0E15]">
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">#</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Category</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Session</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Revenue</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Avg Rating</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Packages Sold</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tr-[8px] rounded-br-[8px]">Last 30 Days Growth</th>
                                </tr>
                            </thead>
                            <tbody className="font-manrope text-[15px] font-[400] text-[#000000]">
                                {categories.map((i, index) => (
                                    <tr key={index} className="bg-white space-y-10 transition-all hover:bg-[#E1F7FF]">
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">
                                            <div className={`w-5 h-5 rounded-full ${i.color}`}></div>
                                        </td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.name}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.session}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.revenue}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">
                                            <div className='flex items-center gap-1.5'>
                                                <span>{i.rating}</span>
                                                <MdOutlineStarPurple500 color='#FFB400' size={25} />
                                            </div>
                                        </td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.sold}</td>
                                        <td className={`px-6 py-2.5 border-b-10 border-[#E2E8F0] ${i.growthColor}`}>
                                            {i.growth}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="">
                    <div className='flex items-center justify-between mb-4'>
                        <label htmlFor="" className='block font-manrope text-sm font-bold text-[#000000] m-0'>Top Adviser</label>
                    </div>
                    <div className='overflow-x-auto'>
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr className="bg-white text-left font-urbanist text-md font-semibold text-[#0A0E15]">
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">#</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Profile</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Name</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Contract No</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Total  Session</th>
                                    <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tr-[8px] rounded-br-[8px]">Language</th>
                                </tr>
                            </thead>
                            <tbody className="font-manrope text-[15px] font-[400] text-[#000000]">
                                {adviser.map((i, index) => (
                                    <tr key={index} className=" bg-white space-y-10 transition-all hover:bg-[#E1F7FF]">
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{index + 1}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">
                                            <img
                                                src={i.img}
                                                alt="Profile"
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                        </td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.name}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.contact}</td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">
                                            <div className="flex items-center gap-2">
                                                <h6 className="font-manrope text-[15px] font-[400] text-[#707070] flex items-center gap-1">
                                                    <span><MdOutlineMessage color='#707070' size={20} /></span> {i.session.msg}
                                                </h6>
                                                <h6 className="font-manrope text-[15px] font-[400] text-[#707070] flex items-center gap-1">
                                                    <span><MdCallEnd color='#707070' size={20} /></span>{i.session.call}
                                                </h6>
                                                <h6 className="font-manrope text-[15px] font-[400] text-[#707070] flex items-center gap-1">
                                                    <span><MdOutlineVideoChat color='#707070' size={20} /></span> {i.session.vc}
                                                </h6>
                                            </div>
                                        </td>
                                        <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0] ">
                                            {i.language.flatMap((i) =>
                                                <span className='ml-2'>
                                                    {i}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashbaordLayout>
    )
}

export default Dashboard