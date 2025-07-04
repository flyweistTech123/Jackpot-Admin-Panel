import React, { useState } from 'react'
import DashbaordLayout from '../../components/DashbaordLayout'


import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";


import { useNavigate } from 'react-router-dom';
import { AddCategoryModal, AddSubCategoryModal, ConfirmModal } from '../../components/Modals/Modal';



const categoryData = [
    {
        number: 1,
        category: "Health",
    },
    {
        number: 2,
        category: "Entrepreneurship",

    },
    {
        number: 3,
        category: "Finance",

    },
    {
        number: 4,
        category: "Tourism",
    },
    {
        number: 5,
        category: "Medical",

    },
    {
        number: 6,
        category: "Astrology",

    },
    {
        number: 7,
        category: "Career",
    },
    {
        number: 8,
        category: "Startup Idea",

    },
    {
        number: 9,
        category: "Tip",

    },
];

const subcategoryData = [
    {
        number: 1,
        category: "Dietician",
    },
    {
        number: 2,
        category: "Phycologist",

    },
    {
        number: 3,
        category: "Fitness",

    },
    {
        number: 4,
        category: "Dermatologist",
    },
    {
        number: 5,
        category: "Sexologist",

    },
    {
        number: 6,
        category: "Homeopathy",

    },
    {
        number: 7,
        category: "Yoga",
    },
];







const Category = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);

    const handleConfirm = () => {
        console.log("Suspension confirmed!");
        setShowModal(false);
    };

    const [toggles, setToggles] = useState(
        categoryData.reduce((acc, category) => ({ ...acc, [category.id]: true }), {})
    );

    const handleToggle = (id) => {
        setToggles((prev) => ({ ...prev, [id]: !prev[id] }));
    };
    return (
        <DashbaordLayout title="Category"
            hedartitle="Category"
            headerAction={
                <div className='flex items-center gap-2'>
                    <button onClick={() => setShowModal1(true)} className='bg-[#164E62] flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white'>
                        Add Category
                    </button>
                    <button onClick={() => setShowModal2(true)} className='bg-[#164E62] flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white'>
                        Add Sub Category
                    </button>
                </div>
            }
        >
            <ConfirmModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleConfirm}
                text="Delete"
            />
            <AddCategoryModal
                isOpen={showModal1}
                onClose={() => setShowModal1(false)}
            />
            <AddSubCategoryModal
                isOpen={showModal2}
                onClose={() => setShowModal2(false)}
            />
            <div className="sm:mt-5 mt-2">
                <div className='overflow-x-auto'>
                    <div className='sm:flex gap-2 block'>
                        <div className='w-full'>
                            <table className="min-w-full border-collapse">
                                <thead>
                                    <tr className="bg-white text-left font-urbanist text-md font-semibold text-[#0A0E15]">
                                        <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[10px] rounded-bl-[10px]">#</th>
                                        <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Category</th>
                                        <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tr-[10px] rounded-br-[10px]">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="font-manrope text-[15px] font-[400] text-[#000000]">
                                    {categoryData.map((i, index) => (
                                        <tr key={index} className=" bg-white space-y-10 transition-all hover:bg-[#E1F7FF]">
                                            <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">{index + 1}</td>
                                            <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.category}</td>
                                            <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">
                                                <div className="flex items-center gap-2">
                                                    <div className='flex items-center gap-2'>
                                                        <p className='font-manrope text-[15px] font-[400] text-[#000000]'>50</p>
                                                        <label className="inline-flex items-center cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                className="sr-only"
                                                                checked={toggles[i.number]}
                                                                onChange={() => handleToggle(i.number)}
                                                            />
                                                            <div className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 duration-300 ${toggles[i.number] ? 'bg-green-400' : 'bg-gray-300'}`}>
                                                                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${toggles[i.number] ? 'translate-x-4' : ''}`}></div>
                                                            </div>
                                                        </label>
                                                    </div>

                                                    <button className="font-manrope text-[15px] font-[400] text-[#273143] flex items-center gap-1">
                                                        <FiEdit color='#273143' size={20} />
                                                        Edit
                                                    </button>
                                                    <button onClick={() => setShowModal(true)} className="font-manrope text-[15px] font-[400] text-[#C23A3A] flex items-center gap-1">
                                                        <RiDeleteBin6Line color='#C23A3A' size={20} />
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='w-full'>
                            <table className="min-w-full border-collapse">
                                <thead>
                                    <tr className="bg-white text-left font-urbanist text-md font-semibold text-[#0A0E15]">
                                        <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[10px] rounded-bl-[10px]">#</th>
                                        <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">Sub Category</th>
                                        <th className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tr-[10px] rounded-br-[10px]">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="font-manrope text-[15px] font-[400] text-[#000000]">
                                    {subcategoryData.map((i, index) => (
                                        <tr key={index} className=" bg-white space-y-10 transition-all hover:bg-[#E1F7FF]">
                                            <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">{index + 1}</td>
                                            <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0]">{i.category}</td>
                                            <td className="px-6 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">
                                                <div className="flex items-center gap-2">
                                                    <div className='flex items-center gap-2'>
                                                        <p className='font-manrope text-[15px] font-[400] text-[#000000]'>50</p>
                                                        <label className="inline-flex items-center cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                className="sr-only"
                                                                checked={toggles[i.number]}
                                                                onChange={() => handleToggle(i.number)}
                                                            />
                                                            <div className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 duration-300 ${toggles[i.number] ? 'bg-green-400' : 'bg-gray-300'}`}>
                                                                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${toggles[i.number] ? 'translate-x-4' : ''}`}></div>
                                                            </div>
                                                        </label>
                                                    </div>

                                                    <button className="font-manrope text-[15px] font-[400] text-[#273143] flex items-center gap-1">
                                                        <FiEdit color='#273143' size={20} />
                                                        Edit
                                                    </button>
                                                    <button onClick={() => setShowModal(true)} className="font-manrope text-[15px] font-[400] text-[#C23A3A] flex items-center gap-1">
                                                        <RiDeleteBin6Line color='#C23A3A' size={20} />
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </DashbaordLayout>
    )
}

export default Category