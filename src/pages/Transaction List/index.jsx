import React, { useCallback, useEffect, useState } from 'react'
import DashbaordLayout from '../../components/DashbaordLayout'


import { useNavigate } from 'react-router-dom';
import { ConfirmModal } from '../../components/Modals/Modal';
import endPoints from '../../Repository/apiConfig';
import { deleteApi, getApi } from '../../Repository/Api';
import { formatDate } from '../../utils/utils';
import Pagination from '../../components/Pagination/Pagination';



const TransactionList = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [transactionData, setTransactionData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('')
    const [searchQuery, setSearchQuery] = useState("");
    const [pagination, setPagination] = useState({
        limit: 10,
        totalPages: 1,
        page: 1,
        hasPrevPage: false,
        hasNextPage: false,
    });
    const [itemToDelete, setItemToDelete] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);


    const fetchData = useCallback(async () => {
        setTransactionData([])
        await getApi(endPoints.getallTransactionlist(pagination.page, pagination.limit, searchQuery), {
            setResponse: setTransactionData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch user data!",
        })
    }, [pagination.page, pagination.limit, searchQuery]);

    useEffect(() => {
        setPagination((prevPagination) => ({
            ...prevPagination,
            totalPages: transactionData?.data?.totalPages,
            hasPrevPage: transactionData?.data?.hasPrevPage,
            hasNextPage: transactionData?.data?.hasNextPage,
        }));
    }, [transactionData]);


    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);

        if (value === "") {
            setSearchQuery("");
            setPagination((prev) => ({ ...prev, page: 1 }));
        }
    };

    const handleSearch = () => {
        setSearchQuery(search);
        setPagination((prev) => ({ ...prev, page: 1 }));
    };

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleConfirm = async () => {
        if (!itemToDelete) return;
        await deleteApi(endPoints.deleteuser(itemToDelete), {
            setLoading: setDeleteLoading,
            successMsg: "User deleted successfully!",
            errorMsg: "Failed to delete user!",
            additionalFunctions: [
                () => setShowModal(false),
                () => fetchData(),
            ],
        });
    };


    const handleDeleteClick = (id) => {
        setItemToDelete(id);
        setShowModal(true);
    };


    return (
        <DashbaordLayout title="Transaction List"
            hedartitle="Transaction List"
        >
            <ConfirmModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleConfirm}
                loading={deleteLoading}
                text="Delete"
            />
            <div className="sm:mt-3 mt-2">
                <div className='overflow-x-auto'>
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-white text-left font-urbanist text-md font-semibold text-[#0A0E15]">
                                <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[10px] rounded-bl-[10px]">#</th>
                                <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">User Name</th>
                                <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">User Email</th>
                                <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">User Contact</th>
                                <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">Transaction Date</th>
                                <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">Amount</th>
                                <th className="px-4 py-2.5 border-b-10 border-[#E2E8F0] rounded-tr-[10px] rounded-br-[10px]">Type</th>
                            </tr>
                        </thead>
                        <tbody className="font-manrope text-[15px] font-[400] text-[#000000]">
                            {loading ?
                                <tr>
                                    <td colSpan="9">
                                        <div className="text-center">
                                            <div className="w-16 h-16 border-4 border-[#FFB000] border-t-transparent rounded-full animate-spin mx-auto"></div>
                                            <p className="mt-4 text-[#0A0E15] font-[600]">Loading...</p>
                                        </div>
                                    </td>
                                </tr>
                                :
                                (!transactionData?.data || transactionData?.data?.docs?.length === 0) ? (
                                    <tr>
                                        <td colSpan="9" className='text-center'>
                                            <p className='font-urbanist text-md font-semibold text-[#0A0E15]'>No data available!</p>
                                        </td>
                                    </tr>
                                ) :
                                    transactionData?.data?.docs?.map((i, index) => (
                                        <tr key={index} className=" bg-white space-y-10 transition-all hover:bg-[#E1F7FF]">
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0] rounded-tl-[8px] rounded-bl-[8px]">{index + 1}</td>
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">{i?.user?.fullName}</td>
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">{i?.user?.email}</td>
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">{i?.user?.mobileNumber}</td>
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">{formatDate(i?.date)}</td>
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">{i?.amount}</td>
                                            <td className="px-4 py-2.5 border-b-10 border-[#E2E8F0]">{i?.type}</td>
                                        </tr>
                                    ))}
                        </tbody>
                    </table>
                </div>
                {transactionData?.data?.docs?.length > 0 && (
                    <Pagination
                        currentPage={pagination.page}
                        totalPages={pagination.totalPages}
                        hasPrevPage={pagination.hasPrevPage}
                        hasNextPage={pagination.hasNextPage}
                        onPageChange={(newPage) => {
                            setPagination((prev) => ({ ...prev, page: newPage }));
                        }}
                    />
                )}
            </div>
        </DashbaordLayout>
    )
}

export default TransactionList