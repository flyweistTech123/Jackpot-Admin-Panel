const endPoints = {
    loginAdmin: "admin/signin",


    getallUser: (page, limit, search, status) =>
        `admin/userList?page=${page}&limit=${limit}&search=${search ? search : ""}&isKyc=${status ? status : ""}`,
    getallTransactionlist: (page, limit, search, status) =>
        `admin/allTransactionList?page=${page}&limit=${limit}&search=${search ? search : ""}&status=${status ? status : ""}`,

    getrules: "admin/allRule",
    getprivacypolicy: "static/getPrivacy",
    getTermsandConditions: "static/getTerms",
    getCoinSystem: "static/getCoinSystem",
    getHowToPlay: "static/getHowToPlay",
    getResponsibleGaming: "static/getResponsibleGaming",
    getpoweredbycompany: "static/getPoweredByCompanyn",
    getHelpAndSupport: "static/getHelpAndSupport",
    getRTP: "user/getRtp",
    getContactDetails: "static/viewContactDetails",



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




    updateRole: (id) =>
        `admin/updateRule/${id}`,



    deleteuser: (id) =>
        `admin/User/${id}`,
    deleterole: (id) =>
        `admin/deleteRule/${id}`,



};

export default endPoints;