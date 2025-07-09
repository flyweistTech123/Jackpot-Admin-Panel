import { buildQueryString } from "../utils/utils";

const endPoints = {
    loginAdmin: "admin/signin",


    getallUser: (page, limit, search, kycFilter) =>
        `admin/userList?page=${page}&limit=${limit}&search=${search ? search : ""}&isKyc=${kycFilter ? kycFilter : ""}`,
    getallTransactionlist: (page, limit, search, status) =>
        `admin/allTransactionList?page=${page}&limit=${limit}&search=${search ? search : ""}&status=${status ? status : ""}`,

    getallgameslogs: (query) => `admin/allPayoutList?${buildQueryString(query)}`,



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
    getAllCount: "admin/getDashboard",



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



};

export default endPoints;