import React from "react";
import { PiEyeBold } from "react-icons/pi";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import img from '../../assets/images/Adviser1.png'
import img1 from '../../assets/images/Adviser2.png'
import img2 from '../../assets/images/Adviser3.png'


const users = [
    {
        number: 1,
        img: img, 
        name: "Abhishek Sharma",
        contact: 9874578818,
        email: 'Abhisheksharma@gmail.com',
    },
    {
        number: 2,
        img: img1, 
        name: "Jane Cooper",
        contact: 987457452,
        email: 'janecooper@gmail.com',
    },
    {
        number: 3,
        img: img2,
        name: "Jenny Wilson",
        contact: 952524818,
        email: 'jennywilson@gmail.com',
    },
];


const UserTable = () => {
    return (
        <div className="min-h-screen">
            <div className="overflow-x-auto">
                {/* Table Header */}
                <div className="grid grid-cols-6 bg-white px-6 py-2.5 rounded-[8px]">
                    <div className="flex items-center gap-8">
                        <div className="font-urbanist text-md font-semibold text-[#0A0E15]">#</div>
                        <div className="font-urbanist text-md font-semibold text-[#0A0E15]">Profile</div>
                    </div>
                    <div className="font-urbanist text-md font-semibold text-[#0A0E15]">Name</div>
                    <div className="font-urbanist text-md font-semibold text-[#0A0E15]">Contact No.</div>
                    <div className="font-urbanist text-md font-semibold text-[#0A0E15]">EMAIL ID</div>
                    <div className="font-urbanist text-md font-semibold text-[#0A0E15]">Action</div>
                </div>

                {/* Table Rows */}
                {users.map((user, index) => (
                    <div
                        key={user.id}
                        className="grid grid-cols-6 items-center bg-white px-6 py-2.5 rounded-[8px] my-2"
                    >
                        <div className="flex items-center gap-8">
                            <div className="font-manrope text-[15px] font-[500] text-[#000000]">{index + 1}</div>
                            <div>
                                <img
                                    src={user.img}
                                    alt={user.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                            </div>
                        </div>
                        <div className="font-manrope text-[15px] font-[400] text-[#000000]">{user.name}</div>
                        <div className="font-manrope text-[15px] font-[400] text-[#000000]">{user.contact}</div>
                        <div className="font-manrope text-[15px] font-[400] text-[#000000]">{user.email}</div>
                        <div className="flex items-center gap-2">
                            <button className="font-manrope text-[15px] font-[400] text-[#11968A] flex items-center gap-1">
                                <PiEyeBold color='#11968A' size={20} />
                                View
                            </button>
                            <button className="font-manrope text-[15px] font-[400] text-[#273143] flex items-center gap-1">
                                <FiEdit color='#273143' size={20} />
                                Edit
                            </button>
                            <button className="font-manrope text-[15px] font-[400] text-[#C23A3A] flex items-center gap-1">
                                <RiDeleteBin6Line color='#C23A3A' size={20} />
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserTable;
