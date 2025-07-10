import React, { useEffect, useState } from 'react';
import { getApi, postApi } from '../../../Repository/Api';
import endPoints from '../../../Repository/apiConfig';
import DashbaordLayout from '../../../components/DashbaordLayout';

import { Settings, Layout, Users } from 'lucide-react';
import SectionCard from './components/SectionCard.jsx';
import PreviewModal from './components/PreviewModal.jsx';
import HeroPreview from './components/HeroPreview.jsx';
import HowItWorksPreview from './components/HowItWorksPreview.jsx';
import FooterPreview from './components/FooterPreview.jsx';
import { AddDataProtectionInLegalPageDataModal, EditPrivacyPolicyLegalModal, ConfirmModal, EditHeroSectionLegalPageModal, EditFooterInLegalPageModal } from '../../../components/Modals/Modal.jsx';
import PrivacyPolicyPreview from './components/PrivacyPolicyPreview.jsx';

const LegalPage = () => {
    const [homepageData, setHomepageData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [showModal4, setShowModal4] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);


    const [itemToDelete, setItemToDelete] = useState(null);
    const [sectionToDelete, setSectionToDelete] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);


    const fetchData = () => {
        getApi(endPoints.getAllLegalPage, {
            setResponse: (res) => setHomepageData(res?.data),
            errorMsg: 'Failed to fetch homepage data',
        });
    };

    useEffect(() => {
        fetchData();
    }, []);



    const [expandedSection, setExpandedSection] = useState(null);
    const [previewModalOpen, setPreviewModalOpen] = useState(false);
    const [selectedSection, setSelectedSection] = useState('');

    const data = homepageData || {};



    const openHeroEditModal = (item) => {
        setSelectedItem(item);
        setIsEditMode(true);
        setShowModal1(true);
    };

    const openDataProctetionAddModal = () => {
        setSelectedItem(null);
        setIsEditMode(false);
        setShowModal2(true);
    };

    const openPrivacyPolicyEditModal = (item) => {
        setSelectedItem(item);
        setIsEditMode(true);
        setShowModal3(true);
    };
    const openFooterEditModal = (item) => {
        setSelectedItem(item);
        setIsEditMode(true);
        setShowModal4(true);
    };




    const handleDeleteConfirm = async () => {
        if (!itemToDelete || !sectionToDelete) return;

        let endpoint = '';

        switch (sectionToDelete) {
            case 'dataprotection':
                endpoint = endPoints.deleteDataProtectionInLegalPage(itemToDelete);
                break;
            default:
                console.error('Unknown section:', sectionToDelete);
                return;
        }

        await postApi(endpoint, {
            setLoading: setDeleteLoading,
            successMsg: 'Item deleted successfully!',
            errorMsg: 'Failed to delete item!',
        });
        setShowModal(false)
        setItemToDelete(null);
        setSectionToDelete(null);
        fetchData()
    };



    const handleDeleteClick = (section, id) => {
        setItemToDelete(id);
        setSectionToDelete(section);
        setShowModal(true);
    };





    const sections = [
        {
            id: 'hero',
            title: 'Hero Section',
            description: 'Main landing area with title, image, and call-to-action button',
            itemCount: 1,
            icon: <Layout size={20} />,
            component: <HeroPreview data={data} />,
            onEdit: () => openHeroEditModal(data)
        },
        {
            id: 'dataprotection',
            title: 'Data Protection',
            description: 'Step-by-step process showing how users can get started',
            itemCount: data?.dataProtection?.length,
            icon: <Users size={20} />,
            component: (
                <HowItWorksPreview
                    data={data?.dataProtection}
                    title={data.dataProtectionTitle}
                    handleDelete={(id) => handleDeleteClick('dataprotection', id)}
                />
            ),
            openModal: openDataProctetionAddModal
        },
        {
            id: 'privacyPolicy',
            title: 'Privacy Policy',
            description: 'Main landing area with title, image, and call-to-action button',
            itemCount: 1,
            icon: <Layout size={20} />,
            component: <PrivacyPolicyPreview data={data} />,
            onEdit: () => openPrivacyPolicyEditModal(data)
        },
        {
            id: 'footer',
            title: 'Footer Section',
            description: 'Footer call-to-action with demo booking functionality',
            itemCount: 1,
            icon: <Layout size={20} />,
            component: <FooterPreview data={data} />,
            onEdit: () => openFooterEditModal(data)
        }
    ];

    const handlePreview = (sectionId) => {
        setSelectedSection(sectionId);
        setPreviewModalOpen(true);
    };

    const handleToggle = (sectionId) => {
        setExpandedSection(expandedSection === sectionId ? null : sectionId);
    };
    const currentSection = sections.find(s => s.id === selectedSection);

    return (
        <DashbaordLayout title="Legal Page" hedartitle={`Website > Legal Page`}>
            <ConfirmModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleDeleteConfirm}
                loading={deleteLoading}
                text="Delete"
            />
            <EditHeroSectionLegalPageModal
                isOpen={showModal1}
                onClose={() => setShowModal1(false)}
                fetchdata={fetchData}
                data={selectedItem}
                edit={isEditMode}
            />
            <AddDataProtectionInLegalPageDataModal
                isOpen={showModal2}
                onClose={() => setShowModal2(false)}
                fetchdata={fetchData}
                data={selectedItem}
                edit={isEditMode}
            />
            <EditPrivacyPolicyLegalModal
                isOpen={showModal3}
                onClose={() => setShowModal3(false)}
                fetchdata={fetchData}
                data={selectedItem}
                edit={isEditMode}
            />
            <EditFooterInLegalPageModal
                isOpen={showModal4}
                onClose={() => setShowModal4(false)}
                fetchdata={fetchData}
                data={selectedItem}
                edit={isEditMode}
            />

            <div className="min-h-screen bg-gray-100 mt-3">
                {/* Header */}
                <div className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-5">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center">
                                <Settings className="h-8 w-8 text-blue-600 mr-3" />
                                <h1 className="sm:text-2xl text-lg font-bold text-gray-900">Legal Page Content Management</h1>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-500">Last updated: {new Date(data.updatedAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2 py-5">
                    <div className="mb-5">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Legal Page Sections</h2>
                        <p className="text-gray-600">Manage and preview different sections of your website legal page. Click on any section to expand, preview, or edit.</p>
                    </div>

                    <div className="grid gap-4">
                        {sections.map((section) => (
                            <SectionCard
                                key={section.id}
                                title={section?.title}
                                description={section.description}
                                itemCount={section.itemCount}
                                onPreview={() => handlePreview(section.id)}
                                isExpanded={expandedSection === section.id}
                                onToggle={() => handleToggle(section.id)}
                                openAddModal={section.openModal}
                                onEdit={section.onEdit}
                            >
                                {section.component}
                            </SectionCard>
                        ))}
                    </div>
                </div>



                {/* Preview Modal */}
                <PreviewModal
                    isOpen={previewModalOpen}
                    onClose={() => setPreviewModalOpen(false)}
                    title={currentSection?.title || 'Section'}
                >
                    {currentSection?.component}
                </PreviewModal>
            </div>
        </DashbaordLayout>
    );
};

export default LegalPage;
