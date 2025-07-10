import { buildQueryString } from "../utils/utils";

const endPoints = {
    loginAdmin: "admin/signin",


    getallUser: (page, limit, search, kycFilter) =>
        `admin/userList?page=${page}&limit=${limit}&search=${search ? search : ""}&isKyc=${kycFilter ? kycFilter : ""}`,
    getallTransactionlist: (page, limit, search, status) =>
        `admin/allTransactionList?page=${page}&limit=${limit}&search=${search ? search : ""}&status=${status ? status : ""}`,

    getallgameslogs: (query) => `admin/allPayoutList?${buildQueryString(query)}`,
    getallJobList: (page, limit, search, departmentId, locationId, employmentTypeId) =>
        `user/getAllJobs?page=${page}&limit=${limit}&search=${search ? search : ""}&departmentId=${departmentId ? departmentId : ""}&locationId=${locationId ? locationId : ""}&employmentTypeId=${employmentTypeId ? employmentTypeId : ""}`,


    getrules: (page, limit) =>
        `admin/getRuleByAdmin?page=${page}&limit=${limit}`,

    getprivacypolicy: "static/getPrivacy",
    getTermsandConditions: "static/getTerms",
    getCoinSystem: "static/getCoinSystem",
    getHowToPlay: "static/getHowToPlay",
    getResponsibleGaming: "static/getResponsibleGaming",
    getpoweredbycompany: "static/getPoweredByCompanyn",
    getHelpAndSupport: "static/getHelpAndSupport",
    getRTP: "user/getRtp",
    getContactDetails: "static/viewContactDetails",
    getAllHomePage: "user/getAllHomePage",
    getAllDeveloperPage: "user/getAllDeveloperPage",
    getAllGamePage: "user/getAllGamePage",
    getAllLegalPage: "user/getAllLegalPage",
    getAllCount: "admin/getDashboard",
    getAllDepartment: "user/getAllDepartment",
    getAllLocation: "user/getAllLocation",
    getAllEmploymentType: "user/getAllEmploymentType",



    getuserbyid: (id) =>
        `admin/User/${id}`,



    addRules: "admin/addRule",
    addPrivacypolicy: "static/createPrivacy",
    addTermsandConditions: "static/createTerms",
    addHowToPlay: "static/createHowToPlay",
    addResponsibleGaming: "static/createResponsibleGaming",
    addpoweredbycompany: "static/createPoweredByCompanyn",
    addHelpAndSupport: "static/createHelpAndSupport",
    addrtp: "static/createOverAllGame",
    addContactDetails: "static/addContactDetails",
    addHowItwork: "user/addDataInHomePage",
    addSlotMasteryInHomePage: "user/addSlotMasteryInHomePage",
    addMiddleDataInHomePage: "user/addMiddleDataInHomePage",
    addEngagingSlotExperiencesInHomePage: "user/addEngagingSlotExperiencesInHomePage",
    addWhatWeGetInHomePage: "user/addWhatWeGetInHomePage",
    addSecurityAndComplianceInHomePage: "user/addSecurityAndComplianceInHomePage",
    addGameCategoriesInHomePage: "user/addGameCategoriesInHomePage",
    addFooterInHomePage: "user/addFooterInHomePage",
    addHomePage: "user/createHomePage",
    addDeveloperPage: "user/createDeveloperPage",
    addDataInDeveloperPage: "user/addDataInDeveloperPage",
    addBannerDataInDeveloperPage: "user/addBannerDataInDeveloperPage",
    addBenefitsDataInDeveloperPage: "user/addBenefitsDataInDeveloperPage",
    addDeveloperCommunityInDeveloperPage: "user/addDeveloperCommunityInDeveloperPage",
    addFooterInDeveloperPage: "user/addFooterInDeveloperPage",
    addGamePage: "user/createGamePage",
    addDataInGamePage: "user/addDataInGamePage",
    addLegalPage: "user/createLegalPage",
    addDataProtectionInLegalPage: "user/addDataProtectionInLegalPage",
    addFooterInLegalPage: "user/addFooterInLegalPage",




    updateRole: (id) =>
        `admin/updateRule/${id}`,



    deleteuser: (id) =>
        `admin/User/${id}`,
    deleterole: (id) =>
        `admin/deleteRule/${id}`,

    deleteHowitWorks: (id) =>
        `user/deleteDataInHomePage/${id}`,
    deleteSlotMastery: (id) =>
        `user/deleteSlotMasteryInHomePage/${id}`,
    deleteFeatures: (id) =>
        `user/deleteMiddleDataInHomePage/${id}`,
    deleteEngagingSlots: (id) =>
        `user/deleteEngagingSlotExperiencesInHomePage/${id}`,
    deletewhatWeGet: (id) =>
        `user/deleteWhatWeGetInHomePage/${id}`,
    deleteSecurityAndCompliance: (id) =>
        `user/deleteSecurityAndComplianceInHomePage/${id}`,
    deleteGameCategories: (id) =>
        `user/deleteGameCategoriesInHomePage/${id}`,

    deleteHowitWorksDeveloper: (id) =>
        `user/deleteDataInDeveloperPage/${id}`,
    deleteBannerDataInDeveloperPage: (id) =>
        `user/deleteBannerDataInDeveloperPage/${id}`,
    deleteBenefitsDataInDeveloperPage: (id) =>
        `user/deleteBenefitsDataInDeveloperPage/${id}`,
    deleteDataInGamePage: (id) =>
        `user/deleteDataInGamePage/${id}`,
    deleteDataProtectionInLegalPage: (id) =>
        `user/deleteDataProtectionInLegalPage/${id}`,



};

export default endPoints;