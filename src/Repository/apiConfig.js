const endPoints = {
    loginAdmin: "admin/signin",
    getprivactpolicy: "api/v1/static/getPrivacy",
    getterms: "api/v1/static/getTerms",
    getprivactpolicybyid: (id) => `api/v1/static/privacy/${id}`,

    getallUser: (page, limit, search, status) =>
        `admin/userList?page=${page}&limit=${limit}&search=${search ? search : ""}&status=${status ? status : ""}&userType=USER`,


   

    
    getuserbyid: (id) =>
        `admin/User/${id}`,

    addMaincategory: "api/v1/admin/mainCategory/addCategory",




    updateMaincategory: (id) =>
        `api/v1/admin/mainCategory/updateCategory/${id}`,
   


    deleteuser: (id) =>
        `admin/User/${id}`,
   


};

export default endPoints;