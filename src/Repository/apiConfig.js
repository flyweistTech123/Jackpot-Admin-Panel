const endPoints = {
    loginAdmin: "admin/signin",
    getprivactpolicy: "api/v1/static/getPrivacy",
    getterms: "api/v1/static/getTerms",
    getprivactpolicybyid: (id) => `api/v1/static/privacy/${id}`,

    getallUser: (page, limit, search, status) =>
        `api/v1/admin/getProfileByType?page=${page}&limit=${limit}&search=${search ? search : ""}&status=${status ? status : ""}&userType=USER`,


   

    addMaincategory: "api/v1/admin/mainCategory/addCategory",




    updateMaincategory: (id) =>
        `api/v1/admin/mainCategory/updateCategory/${id}`,
   


    deleteuser: (id) =>
        `api/v1/admin/users/profile/delete/${id}`,
   


    getuserbyid: (id) =>
        `api/v1/admin/getProfileById?user=${id}`,

};

export default endPoints;