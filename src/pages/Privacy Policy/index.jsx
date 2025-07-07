import React, { useCallback, useEffect, useState } from 'react'
import DashbaordLayout from '../../components/DashbaordLayout'

import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

import { useNavigate } from 'react-router-dom';
import endPoints from '../../Repository/apiConfig';
import { getApi, postApi } from '../../Repository/Api';


const PrivacyPolicy = () => {
    const navigate = useNavigate();
    const [privacypolicyData, setPrivacyPolicyData] = useState({});
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [editing, setEditing] = useState(false);

    const [content, setContent] = useState("")

    const fetchData = useCallback(async () => {
        setPrivacyPolicyData({})
        await getApi(endPoints.getprivacypolicy, {
            setResponse: setPrivacyPolicyData,
            setLoading: setLoading,
            errorMsg: "Failed to fetch data!",
        })
    }, []);


    useEffect(() => {
        setContent(privacypolicyData?.data?.description);
    }, [privacypolicyData]);


    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSubmit = async () => {
        if (!content) {
            toast.error("Please provide the content!");
            return;
        }

        const payload = {
            title: "Privacy Policy",
            description: content
        }

        await postApi(endPoints.addPrivacypolicy, payload, {
            setLoading:setLoading1,
            successMsg: "Privacy Policy Updated successfully!",
            errorMsg: "Failed to Update Privacy Policy!",
            additionalFunctions: [
                () => fetchData(),
            ],
        });
    };

    return (
        <DashbaordLayout title="Privacy Policy"
            hedartitle="Privacy Policy"
        >
            {loading ?
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#FFB000] border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-[#0A0E15] font-[600]">Loading...</p>
                </div>
                :
                <div className="sm:mt-5 mt-2">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Editor Section */}
                        <div className="flex-1 border p-4 rounded shadow bg-white">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">Privacy Policy Editor</h2>
                                <button
                                    onClick={() => setEditing(!editing)}
                                    className={`px-4 py-2 cursor-pointer rounded ${editing ? "bg-red-500" : "bg-green-500"} text-white`}
                                >
                                    {editing ? "Disable Editing" : "Enable Editing"}
                                </button>
                            </div>

                            <ReactQuill
                                theme="snow"
                                value={content}
                                onChange={setContent}
                                readOnly={!editing}
                                className={`${editing ? "opacity-100 border border-black" : "opacity-70"}`}
                            />

                            {editing && (
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading1}
                                    className="mt-4 px-4 py-2 bg-[#FFB000] cursor-pointer text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    {loading1 ? "Saving..." : "Save Changes"}
                                </button>
                            )}
                        </div>

                        {/* Preview Section */}
                        <div className="flex-1 border p-4 rounded shadow bg-white">
                            <h2 className="text-xl font-bold mb-4">Preview</h2>
                            <div
                                className="prose max-w-none"
                                dangerouslySetInnerHTML={{ __html: content }}
                            />
                        </div>
                    </div>
                </div>
            }
        </DashbaordLayout>
    )
}

export default PrivacyPolicy