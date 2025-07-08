import React, { useEffect, useState } from 'react';
import { getApi } from '../../../Repository/Api';
import endPoints from '../../../Repository/apiConfig';
import DashbaordLayout from '../../../components/DashbaordLayout';
import { ConfirmModal } from '../../../components/Modals/Modal';

import { Settings, Layout, Users, Shield, Gamepad2, Trophy } from 'lucide-react';
import SectionCard from './components/SectionCard.jsx';
import EditModal from './components/EditModal.jsx';
import PreviewModal from './components/PreviewModal.jsx';
import HeroPreview from './components/HeroPreview.jsx';
import HowItWorksPreview from './components/HowItWorksPreview.jsx';
import FeaturesPreview from './components/FeaturesPreview.jsx';
import SlotMasteryPreview from './components/SlotMasteryPreview.jsx';
import FooterPreview from './components/FooterPreview.jsx';

const HomePage = () => {
    const [homepageData, setHomepageData] = useState({});
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getApi(endPoints.getAllHomePage, {
            setResponse: (res) => setHomepageData(res?.data),
            errorMsg: 'Failed to fetch homepage data',
        });
    }, []);


    const [expandedSection, setExpandedSection] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [previewModalOpen, setPreviewModalOpen] = useState(false);
    const [selectedSection, setSelectedSection] = useState('');
    const [currentEditSection, setCurrentEditSection] = useState('');

    const data = homepageData || {};



    const sections = [
        {
            id: 'hero',
            title: 'Hero Section',
            description: 'Main landing area with title, image, and call-to-action button',
            itemCount: 1,
            icon: <Layout size={20} />,
            component: <HeroPreview data={data} />
        },
        {
            id: 'howItWorks',
            title: 'How It Works',
            description: 'Step-by-step process showing how users can get started',
            itemCount: data?.data?.length,
            icon: <Users size={20} />,
            component: <HowItWorksPreview data={data?.data} />
        },
        {
            id: 'slotMastery',
            title: 'Slot Mastery',
            description: 'Detailed information about slot gaming features and systems',
            itemCount: data?.slotMastery?.length,
            icon: <Gamepad2 size={20} />,
            component: <SlotMasteryPreview data={data?.slotMastery} />
        },
        {
            id: 'features',
            title: 'Features & Benefits',
            description: 'Core features and benefits of the platform',
            itemCount: data?.middleData?.length,
            icon: <Trophy size={20} />,
            component: <FeaturesPreview data={data?.middleData} title={data.middleTitle} />
        },
        {
            id: 'engagingSlots',
            title: 'Engaging Slot Experiences',
            description: 'Showcase of different slot gaming experiences available',
            itemCount: data?.engagingSlotExperiences?.length,
            icon: <Gamepad2 size={20} />,
            component: <FeaturesPreview data={data?.engagingSlotExperiences?.map(item => ({ ...item, image: item?.image }))} title={data.engagingSlotExperiencesTitle} />
        },
        {
            id: 'whatWeGet',
            title: 'What We Get',
            description: 'List of benefits and services provided to clients',
            itemCount: data?.whatWeGet?.length,
            icon: <Settings size={20} />,
            component: (
                <div className="bg-white p-8 rounded-lg">
                    <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">{data.whatWeGetTitle}</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {data?.whatWeGet?.map((item) => (
                            <div key={item._id} className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-gray-800 font-medium">{item.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )
        },
        {
            id: 'security',
            title: 'Security & Compliance',
            description: 'Security measures and compliance features',
            itemCount: data?.securityAndCompliance?.length,
            icon: <Shield size={20} />,
            component: <FeaturesPreview data={data?.securityAndCompliance} title={data?.securityAndComplianceTitle} />
        },
        {
            id: 'gameCategories',
            title: 'Game Categories',
            description: 'Different categories of games available on the platform',
            itemCount: data?.gameCategories?.length,
            icon: <Gamepad2 size={20} />,
            component: <FeaturesPreview data={data?.gameCategories} title={data?.gameCategoriesTitle} />
        },
        {
            id: 'footer',
            title: 'Footer Section',
            description: 'Footer call-to-action with demo booking functionality',
            itemCount: 1,
            icon: <Layout size={20} />,
            component: <FooterPreview data={data} />
        }
    ];

    const handleEdit = (sectionId) => {
        setCurrentEditSection(sectionId);
        setEditModalOpen(true);
    };

    const handlePreview = (sectionId) => {
        setSelectedSection(sectionId);
        setPreviewModalOpen(true);
    };

    const handleToggle = (sectionId) => {
        setExpandedSection(expandedSection === sectionId ? null : sectionId);
    };

    const handleSave = (data) => {
        console.log('Saving data for section:', currentEditSection, data);
        setEditModalOpen(false);
    };

    const currentSection = sections.find(s => s.id === selectedSection);
    const currentEditSectionData = sections.find(s => s.id === currentEditSection);

    return (
        <DashbaordLayout title="Home Page" hedartitle={`Website > Home Page`}>
            <div className="min-h-screen bg-gray-100 mt-3">
                {/* Header */}
                <div className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-5">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center">
                                <Settings className="h-8 w-8 text-blue-600 mr-3" />
                                <h1 className="sm:text-2xl text-lg font-bold text-gray-900">Home Page Content Management</h1>
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
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Home Page Sections</h2>
                        <p className="text-gray-600">Manage and preview different sections of your website home page. Click on any section to expand, preview, or edit.</p>
                    </div>

                    <div className="grid gap-4">
                        {sections.map((section) => (
                            <SectionCard
                                key={section.id}
                                title={section?.title}
                                description={section.description}
                                itemCount={section.itemCount}
                                onEdit={() => handleEdit(section.id)}
                                onPreview={() => handlePreview(section.id)}
                                isExpanded={expandedSection === section.id}
                                onToggle={() => handleToggle(section.id)}
                            >
                                {section.component}
                            </SectionCard>
                        ))}
                    </div>
                </div>

                {/* Edit Modal */}
                <EditModal
                    isOpen={editModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    title={`Edit ${currentEditSectionData?.title || 'Section'}`}
                    onSave={handleSave}
                >
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Section Title
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter section title"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter section description"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Image URL
                            </label>
                            <input
                                type="url"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter image URL"
                            />
                        </div>
                    </div>
                </EditModal>

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

export default HomePage;
