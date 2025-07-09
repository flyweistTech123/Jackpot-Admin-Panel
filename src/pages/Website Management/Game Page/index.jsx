import React, { useEffect, useState } from 'react';
import { getApi, postApi } from '../../../Repository/Api';
import endPoints from '../../../Repository/apiConfig';
import DashbaordLayout from '../../../components/DashbaordLayout';

import { Settings, Layout, Users, Shield, Gamepad2, Trophy } from 'lucide-react';
import SectionCard from './components/SectionCard.jsx';
import PreviewModal from './components/PreviewModal.jsx';
import HeroPreview from './components/HeroPreview.jsx';
import HowItWorksPreview from './components/HowItWorksPreview.jsx';
import FeaturesPreview from './components/FeaturesPreview.jsx';
import SlotMasteryPreview from './components/SlotMasteryPreview.jsx';
import FooterPreview from './components/FooterPreview.jsx';
import EngagingSlotPreview from './components/EngagingSlotPriview .jsx';
import WhatYouGetPreview from './components/WhatYouGetPreview.jsx';
import { AddEngagingSlotsModal, AddFeaturesBenefitsModal, AddGameCategoriesModal, AddHowItWorkModal, AddSecurityAndComplianceModal, AddSlotMasteryModal, AddWhatWeGetModal, ConfirmModal, EditFooterModal, EditHeroSectionModal } from '../../../components/Modals/Modal.jsx';

const GamePage = () => {
    const [homepageData, setHomepageData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [showModal4, setShowModal4] = useState(false);
    const [showModal5, setShowModal5] = useState(false);
    const [showModal6, setShowModal6] = useState(false);
    const [showModal7, setShowModal7] = useState(false);
    const [showModal8, setShowModal8] = useState(false);
    const [showModal9, setShowModal9] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);


    const [itemToDelete, setItemToDelete] = useState(null);
    const [sectionToDelete, setSectionToDelete] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);


    const fetchData = () => {
        getApi(endPoints.getAllHomePage, {
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


    const openHowItWorksAddModal = () => {
        setSelectedItem(null);
        setIsEditMode(false);
        setShowModal(true);
    };

    const openSlotMasteryAddModal = () => {
        setSelectedItem(null);
        setIsEditMode(false);
        setShowModal2(true);
    };


    const openFeaturesBenefitsAddModal = () => {
        setSelectedItem(null);
        setIsEditMode(false);
        setShowModal3(true);
    };

    const openEngagingSlotsAddModal = () => {
        setSelectedItem(null);
        setIsEditMode(false);
        setShowModal4(true);
    };

    const openWhatWeGetAddModal = () => {
        setSelectedItem(null);
        setIsEditMode(false);
        setShowModal5(true);
    };

    const openSecurityAndComplianceAddModal = () => {
        setSelectedItem(null);
        setIsEditMode(false);
        setShowModal6(true);
    };

    const openFooterEditModal = (item) => {
        setSelectedItem(item);
        setIsEditMode(true);
        setShowModal8(true);
    };

    const openHeroEditModal = (item) => {
        setSelectedItem(item);
        setIsEditMode(true);
        setShowModal9(true);
    };

    const openGameCategoriesAddModal = () => {
        setSelectedItem(null);
        setIsEditMode(false);
        setShowModal7(true);
    };




    const handleDeleteConfirm = async () => {
        if (!itemToDelete || !sectionToDelete) return;

        let endpoint = '';

        switch (sectionToDelete) {
            case 'howItWorks':
                endpoint = endPoints.deleteHowitWorks(itemToDelete);
                break;
            case 'slotMastery':
                endpoint = endPoints.deleteSlotMastery(itemToDelete);
                break;
            case 'features':
                endpoint = endPoints.deleteFeatures(itemToDelete);
                break;
            case 'engagingSlots':
                endpoint = endPoints.deleteEngagingSlots(itemToDelete);
                break;
            case 'whatWeGet':
                endpoint = endPoints.deletewhatWeGet(itemToDelete);
                break;
            case 'security':
                endpoint = endPoints.deleteSecurityAndCompliance(itemToDelete);
                break;
            case 'gameCategories':
                endpoint = endPoints.deleteGameCategories(itemToDelete);
                break;
            // ✅ add more sections here as needed:
            // case 'engagingSlots':
            //   endpoint = endPoints.deleteEngagingSlot(itemToDelete);
            //   break;
            default:
                console.error('Unknown section:', sectionToDelete);
                return;
        }

        await postApi(endpoint, {
            setLoading: setDeleteLoading,
            successMsg: 'Item deleted successfully!',
            errorMsg: 'Failed to delete item!',
        });
        setShowModal1(false)
        setItemToDelete(null);
        setSectionToDelete(null);
        fetchData()
    };



    const handleDeleteClick = (section, id) => {
        setItemToDelete(id);
        setSectionToDelete(section);
        setShowModal1(true);
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
            id: 'howItWorks',
            title: 'How It Works',
            description: 'Step-by-step process showing how users can get started',
            itemCount: data?.data?.length,
            icon: <Users size={20} />,
            component: (
                <HowItWorksPreview
                    data={data?.data}
                    handleDelete={(id) => handleDeleteClick('howItWorks', id)}
                />
            ),
            openModal: openHowItWorksAddModal
        },
        {
            id: 'slotMastery',
            title: 'Slot Mastery',
            description: 'Detailed information about slot gaming features and systems',
            itemCount: data?.slotMastery?.length,
            icon: <Gamepad2 size={20} />,
            component: (
                <SlotMasteryPreview
                    data={data?.slotMastery}
                    handleDelete={(id) => handleDeleteClick('slotMastery', id)}
                />
            ),
            openModal: openSlotMasteryAddModal
        },
        {
            id: 'features',
            title: 'Features & Benefits',
            description: 'Core features and benefits of the platform',
            itemCount: data?.middleData?.length,
            icon: <Trophy size={20} />,
            component: (
                <FeaturesPreview
                    data={data?.middleData}
                    title={data.middleTitle}
                    handleDelete={(id) => handleDeleteClick('features', id)}
                />
            ),
            openModal: openFeaturesBenefitsAddModal
        },
        {
            id: 'engagingSlots',
            title: 'Engaging Slot Experiences',
            description: 'Showcase of different slot gaming experiences available',
            itemCount: data?.engagingSlotExperiences?.length,
            icon: <Gamepad2 size={20} />,
            component: (
                <EngagingSlotPreview
                    data={data?.engagingSlotExperiences?.map(item => ({ ...item, image: item?.image }))}
                    title={data.engagingSlotExperiencesTitle}
                    handleDelete={(id) => handleDeleteClick('engagingSlots', id)}
                />
            ),
            openModal: openEngagingSlotsAddModal
        },
        {
            id: 'whatWeGet',
            title: 'What We Get',
            description: 'List of benefits and services provided to clients',
            itemCount: data?.whatWeGet?.length,
            icon: <Settings size={20} />,
            component: (
                <WhatYouGetPreview
                    data={data?.whatWeGet}
                    title={data.whatWeGetTitle}
                    handleDelete={(id) => handleDeleteClick('whatWeGet', id)}
                />
            ),
            openModal: openWhatWeGetAddModal
        },
        {
            id: 'security',
            title: 'Security & Compliance',
            description: 'Security measures and compliance features',
            itemCount: data?.securityAndCompliance?.length,
            icon: <Shield size={20} />,
            component: (
                <FeaturesPreview
                    data={data?.securityAndCompliance}
                    title={data?.securityAndComplianceTitle}
                    handleDelete={(id) => handleDeleteClick('security', id)}
                />
            ),
            openModal: openSecurityAndComplianceAddModal
        },
        {
            id: 'gameCategories',
            title: 'Game Categories',
            description: 'Different categories of games available on the platform',
            itemCount: data?.gameCategories?.length,
            icon: <Gamepad2 size={20} />,
            component: (
                <FeaturesPreview
                    data={data?.gameCategories}
                    title={data?.gameCategoriesTitle}
                    handleDelete={(id) => handleDeleteClick('gameCategories', id)}
                />
            ),
            openModal: openGameCategoriesAddModal
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
        <DashbaordLayout title="Game Page" hedartitle={`Website > Game Page`}>
            <AddHowItWorkModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                fetchdata={fetchData}
                data={selectedItem}
                edit={isEditMode}
            />
            <AddSlotMasteryModal
                isOpen={showModal2}
                onClose={() => setShowModal2(false)}
                fetchdata={fetchData}
                data={selectedItem}
                edit={isEditMode}
            />
            <AddFeaturesBenefitsModal
                isOpen={showModal3}
                onClose={() => setShowModal3(false)}
                fetchdata={fetchData}
                data={selectedItem}
                edit={isEditMode}
            />
            <AddEngagingSlotsModal
                isOpen={showModal4}
                onClose={() => setShowModal4(false)}
                fetchdata={fetchData}
                data={selectedItem}
                edit={isEditMode}
            />
            <AddWhatWeGetModal
                isOpen={showModal5}
                onClose={() => setShowModal5(false)}
                fetchdata={fetchData}
                data={selectedItem}
                edit={isEditMode}
            />
            <AddSecurityAndComplianceModal
                isOpen={showModal6}
                onClose={() => setShowModal6(false)}
                fetchdata={fetchData}
                data={selectedItem}
                edit={isEditMode}
            />
            <AddGameCategoriesModal
                isOpen={showModal7}
                onClose={() => setShowModal7(false)}
                fetchdata={fetchData}
                data={selectedItem}
                edit={isEditMode}
            />
            <EditFooterModal
                isOpen={showModal8}
                onClose={() => setShowModal8(false)}
                fetchdata={fetchData}
                data={selectedItem}
                edit={isEditMode}
            />
            <EditHeroSectionModal
                isOpen={showModal9}
                onClose={() => setShowModal9(false)}
                fetchdata={fetchData}
                data={selectedItem}
                edit={isEditMode}
            />
            <ConfirmModal
                isOpen={showModal1}
                onClose={() => setShowModal1(false)}
                onConfirm={handleDeleteConfirm}
                loading={deleteLoading}
                text="Delete"
            />

            <div className="min-h-screen bg-gray-100 mt-3">
                {/* Header */}
                <div className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-5">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center">
                                <Settings className="h-8 w-8 text-blue-600 mr-3" />
                                <h1 className="sm:text-2xl text-lg font-bold text-gray-900">Game Page Content Management</h1>
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
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Game Page Sections</h2>
                        <p className="text-gray-600">Manage and preview different sections of your website game page. Click on any section to expand, preview, or edit.</p>
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

export default GamePage;
