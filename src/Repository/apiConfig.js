const endPoints = {
    loginAdmin: "admin/signin",


    getallUser: (page, limit, search, status) =>
        `admin/userList?page=${page}&limit=${limit}&search=${search ? search : ""}&isKyc=${status ? status : ""}`,
    getallTransactionlist: (page, limit, search, status) =>
        `admin/allTransactionList?page=${page}&limit=${limit}&search=${search ? search : ""}&status=${status ? status : ""}`,

    getrules: "admin/allRule",



    getuserbyid: (id) =>
        `admin/User/${id}`,



    addRules: "admin/addRule",




    updateRole: (id) =>
        `admin/updateRule/${id}`,



    deleteuser: (id) =>
        `admin/User/${id}`,
    deleterole: (id) =>
        `admin/deleteRule/${id}`,



};

export default endPoints;