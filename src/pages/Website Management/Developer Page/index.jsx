import React, { useEffect, useState } from 'react';
import { getApi, postApi } from '../../../Repository/Api';
import endPoints from '../../../Repository/apiConfig';
import DashbaordLayout from '../../../components/DashbaordLayout';

import { Settings, Layout, Users, Gamepad2 } from 'lucide-react';
import SectionCard from './components/SectionCard.jsx';
import PreviewModal from './components/PreviewModal.jsx';
import HeroPreview from './components/HeroPreview.jsx';
import HowItWorksPreview from './components/HowItWorksPreview.jsx';
import FooterPreview from './components/FooterPreview.jsx';
import { AddDataInDeveloperPage, AddBannerDataModal, ConfirmModal, EditFooterDeveloperModal, EditHeroSectionDeveloperPageModal, AddBenefitsDataModal, EditaDeveloperCommunityModal } from '../../../components/Modals/Modal.jsx';
import DeveloperCommunityPriview from './components/DeveloperCommunityPriview.jsx';
import BannerDataPreview from './components/BannerDataPreview.jsx';
import BenefitsPreview from './components/BenefitsPreview.jsx';

const DeveloperPage = () => {
    const [homepageData, setHomepageData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [showModal4, setShowModal4] = useState(false);
    const [showModal5, setShowModal5] = useState(false);
    const [showModal6, setShowModal6] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);


    const [itemToDelete, setItemToDelete] = useState(null);
    const [sectionToDelete, setSectionToDelete] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);


    const fetchData = () => {
        getApi(endPoints.getAllDeveloperPage, {
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

    const openHowItWorksAddModal = () => {
        setSelectedItem(null);
        setIsEditMode(false);
        setShowModal2(true);
    };

    const openBannerDataAddModal = () => {
        setSelectedItem(null);
        setIsEditMode(false);
        setShowModal3(true);
    };

    const openBenefitsDataAddModal = () => {
        setSelectedItem(null);
        setIsEditMode(false);
        setShowModal4(true);
    };

    const openDeveloperCommunityModalEditModal = (item) => {
        setSelectedItem(item);
        setIsEditMode(true);
        setShowModal5(true);
    };

    const openFooterEditModal = (item) => {
        setSelectedItem(item);
        setIsEditMode(true);
        setShowModal6(true);
    };



    const handleDeleteConfirm = async () => {
        if (!itemToDelete || !sectionToDelete) return;

        let endpoint = '';

        switch (sectionToDelete) {
            case 'howItWorks':
                endpoint = endPoints.deleteHowitWorksDeveloper(itemToDelete);
                break;
            case 'bannerData':
                endpoint = endPoints.deleteBannerDataInDeveloperPage(itemToDelete);
                break;
            case 'benefits':
                endpoint = endPoints.deleteBenefitsDataInDeveloperPage(itemToDelete);
                break;
                endpoint = endPoints.deleteGameCategories(itemToDelete);
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
            description: 'The main landing section with a headline, image, and call-to-action button.',
            itemCount: 1,
            icon: <Layout size={20} />,
            component: <HeroPreview data={data} />,
            onEdit: () => openHeroEditModal(data)
        },
        {
            id: 'howItWorks',
            title: 'How It Works',
            description: 'A step-by-step walkthrough explaining how the platform works.',
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
            id: 'bannerData',
            title: 'Banner Data',
            description: 'Highlights key gaming features and systems with engaging banners.',
            itemCount: data?.bannerData?.length,
            icon: <Gamepad2 size={20} />,
            component: (
                <BannerDataPreview
                    data={data?.bannerData}
                    handleDelete={(id) => handleDeleteClick('bannerData', id)}
                />
            ),
            openModal: openBannerDataAddModal
        },
        {
            id: 'benefits',
            title: 'Benefits',
            description: 'Showcases the unique benefits and advantages of the gaming experience.',
            itemCount: data?.benefitsData?.length,
            icon: <Gamepad2 size={20} />,
            component: (
                <BenefitsPreview
                    data={data?.benefitsData?.map(item => ({ ...item, image: item?.image }))}
                    title={data.benefitsTitle}
                    handleDelete={(id) => handleDeleteClick('benefits', id)}
                />
            ),
            openModal: openBenefitsDataAddModal
        },
        {
            id: 'developerCommunity',
            title: 'Developer Community',
            description: 'A section to engage developers and encourage them to join the community.',
            itemCount: 1,
            icon: <Layout size={20} />,
            component: <DeveloperCommunityPriview data={data} />,
            onEdit: () => openDeveloperCommunityModalEditModal(data)
        },
        {
            id: 'footer',
            title: 'Footer Section',
            description: 'The footer area with contact details and demo booking options.',
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
        <DashbaordLayout title="Developer Page" hedartitle={`Website > Developer Page`}>
            <ConfirmModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleDeleteConfirm}
                loading={deleteLoading}
                text="Delete"
            />
            <EditHeroSectionDeveloperPageModal
                isOpen={showModal1}
                onClose={() => setShowModal1(false)}
                fetchdata={fetchData}
                data={selectedItem}
                edit={isEditMode}
            />
            <AddDataInDeveloperPage
                isOpen={showModal2}
                onClose={() => setShowModal2(false)}
                fetchdata={fetchData}
                data={selectedItem}
                edit={isEditMode}
            />
            <AddBannerDataModal
                isOpen={showModal3}
                onClose={() => setShowModal3(false)}
                fetchdata={fetchData}
                data={selectedItem}
                edit={isEditMode}
            />
            <AddBenefitsDataModal
                isOpen={showModal4}
                onClose={() => setShowModal4(false)}
                fetchdata={fetchData}
                data={selectedItem}
                edit={isEditMode}
            />
            <EditaDeveloperCommunityModal
                isOpen={showModal5}
                onClose={() => setShowModal5(false)}
                fetchdata={fetchData}
                data={selectedItem}
                edit={isEditMode}
            />
            <EditFooterDeveloperModal
                isOpen={showModal6}
                onClose={() => setShowModal6(false)}
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
                                <h1 className="sm:text-2xl text-lg font-bold text-gray-900">Developer Page Content Management</h1>
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
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Developer Page Sections</h2>
                        <p className="text-gray-600">Manage and preview different sections of your website developer page. Click on any section to expand, preview, or edit.</p>
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

export default DeveloperPage;
