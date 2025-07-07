import React, { useCallback, useEffect, useState } from 'react'
import DashbaordLayout from '../../components/DashbaordLayout'


import { useNavigate } from 'react-router-dom';
import endPoints from '../../Repository/apiConfig';
import { getApi } from '../../Repository/Api';

import { FaFacebook, FaGoogle, FaInstagram, FaYoutube, FaLinkedin, FaTiktok, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaFax, FaGlobe } from "react-icons/fa";

import { AddContactDetailsModal } from '../../components/Modals/Modal';


const ContactDetails = () => {
    const navigate = useNavigate();
    const [contactdetailsData, setContactDetailsData] = useState({});
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const fetchData = useCallback(async () => {
        setContactDetailsData({})
        await getApi(endPoints.getContactDetails, {
            setResponse: setContactDetailsData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch data!",
        })
    }, []);


    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <DashbaordLayout title="Contact Details"
            hedartitle="Contact Details"
            headerAction={
                <div className='flex items-center gap-2'>
                    <button onClick={() => setShowModal(true)} className='bg-primary cursor-pointer  flex items-center gap-2 shadow-2xl px-5 py-2 rounded-[4px] font-urbanist text-sm font-semibold text-white'>
                        Add New Contact Details
                    </button>
                </div>
            }
        >
            <AddContactDetailsModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                fetchdata={fetchData}
                data={contactdetailsData?.data}
            />
            {loading ?
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#FFB000] border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-[#0A0E15] font-[600]">Loading...</p>
                </div>
                :
                <div className="sm:mt-5 mt-2 bg-white rounded-2xl p-6 shadow-md flex flex-col gap-8">

                    {/* Row 1: Logo + Info */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">

                        {/* Logo + Name */}
                        <div className="flex flex-col items-center md:items-start">
                            <img
                                src={contactdetailsData?.data?.image}
                                alt={contactdetailsData?.data?.name}
                                className="w-24 h-24 object-contain mb-3"
                            />
                            <h2 className="text-2xl font-semibold text-gray-800">{contactdetailsData?.data?.name}</h2>
                        </div>

                        {/* Info Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
                            {/* Address */}
                            <div className="flex items-start gap-3">
                                <FaMapMarkerAlt size={24} className="text-[#FFB000]" />
                                <div>
                                    <p className="text-sm text-gray-500">Address</p>
                                    <p className="text-base font-medium text-gray-800 whitespace-pre-line">
                                        {contactdetailsData?.data?.address}
                                    </p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-center gap-3">
                                <FaPhoneAlt size={24} className="text-[#FFB000]" />
                                <div>
                                    <p className="text-sm text-gray-500">Customer Care</p>
                                    <p className="text-base font-medium text-gray-800">{contactdetailsData?.data?.customerCarePhone}</p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-center gap-3">
                                <FaEnvelope size={24} className="text-[#FFB000]" />
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="text-base font-medium text-gray-800">{contactdetailsData?.data?.email}</p>
                                </div>
                            </div>

                            {/* Map */}
                            <div className="flex items-center gap-3">
                                <FaGlobe size={24} className="text-[#FFB000]" />
                                <div>
                                    <p className="text-sm text-gray-500">Map</p>
                                    <a
                                        href={contactdetailsData?.data?.mapLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-base font-medium text-blue-600 underline"
                                    >
                                        {contactdetailsData?.data?.map}
                                    </a>
                                </div>
                            </div>

                            {/* Fax */}
                            {contactdetailsData?.data?.fax && (
                                <div className="flex items-center gap-3">
                                    <FaFax size={24} className="text-[#FFB000]" />
                                    <div>
                                        <p className="text-sm text-gray-500">Fax</p>
                                        <p className="text-base font-medium text-gray-800">{contactdetailsData?.data?.fax}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>

                    {/* Row 2: Social Links */}
                    <div className="flex flex-wrap gap-4 justify-between border-t pt-4">
                        {contactdetailsData?.data?.fb && (
                            <a
                                href={`https://${contactdetailsData?.data?.fb}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 hover:text-[#4267B2] transition"
                            >
                                <FaFacebook size={20} className="text-[#4267B2]" />
                                <span className="text-sm text-gray-700">{contactdetailsData?.data?.fb}</span>
                            </a>
                        )}
                        {contactdetailsData?.data?.google && (
                            <a
                                href={`https://${contactdetailsData?.data?.google}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 hover:text-[#DB4437] transition"
                            >
                                <FaGoogle size={20} className="text-[#DB4437]" />
                                <span className="text-sm text-gray-700">{contactdetailsData?.data?.google}</span>
                            </a>
                        )}
                        {contactdetailsData?.data?.instagram && (
                            <a
                                href={`https://${contactdetailsData?.data?.instagram}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 hover:text-[#C13584] transition"
                            >
                                <FaInstagram size={20} className="text-[#C13584]" />
                                <span className="text-sm text-gray-700">{contactdetailsData?.data?.instagram}</span>
                            </a>
                        )}
                        {contactdetailsData?.data?.youtube && (
                            <a
                                href={`https://${contactdetailsData?.data?.youtube}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 hover:text-[#FF0000] transition"
                            >
                                <FaYoutube size={20} className="text-[#FF0000]" />
                                <span className="text-sm text-gray-700">{contactdetailsData?.data?.youtube}</span>
                            </a>
                        )}
                        {contactdetailsData?.data?.linkedIn && (
                            <a
                                href={`https://${contactdetailsData?.data?.linkedIn}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 hover:text-[#0077B5] transition"
                            >
                                <FaLinkedin size={20} className="text-[#0077B5]" />
                                <span className="text-sm text-gray-700">{contactdetailsData?.data?.linkedIn}</span>
                            </a>
                        )}
                        {contactdetailsData?.data?.tikTok && (
                            <a
                                href={`https://${contactdetailsData?.data?.tikTok}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 hover:text-black transition"
                            >
                                <FaTiktok size={20} className="text-black" />
                                <span className="text-sm text-gray-700">{contactdetailsData?.data?.tikTok}</span>
                            </a>
                        )}
                    </div>

                </div>


            }
        </DashbaordLayout>
    )
}

export default ContactDetails