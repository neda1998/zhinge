const apiRoutes = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    verify: "/auth/verify",
    logout: "/auth/logout",
    newcode: "/auth/newcode",
    forgetPass:"/auth/sendforgetpass",
    setnewpass: "/auth/setnewpass"
  },
  admin: {
    aboutUpdating: "/admin/aboutUpdating",
    allUsers: "/admin/alluseres",
    creatAnnouncement: "/admin/creatAnnouncement",
    creatVisit: "/admin/creatVisit",
    creatDeal: "/admin/creatdeal",
    creatSlider: "/admin/creatslider",
    creatTeam: "/admin/creatteam",
    dashboard: "/admin/dashboard",
    deleteVisit: "/admin/deleteVisit",
    deleteDeal: "/admin/deletedeal",
    deleteTeam: "/admin/deleteteam",
    getAllRequests: "/admin/getAllRequests",
    getAllSliders: "/admin/getAllSliders",
    getAllVisits: "/admin/getAllVisits",
    getAllDeals: "/admin/getAlldeals",
    getAllTeam: "/admin/getAllteam",
    getByUid: "/admin/getbyUid",
    getByStateCode: "/admin/getbystatecode",
    initiateSetting: "/admin/initiateSetting",
    inprogress: "/admin/inprogress",
    notconfirmed: "/admin/notconfirmed",
    notconfirmedannouncements: "/admin/notconfirmedannouncements",
    promotToAdmin: "/admin/promotToAdmin",
    rejectAnnounce: "/admin/rejectannounce",
    search: "/admin/search",
    updateVisits: "/admin/updateVisits",
    updateAnnoun: "/admin/updateannoun",
    updateDeal: "/admin/updatedeal",
    updateSlider: "/admin/updateslider",
    updateTeam: "/admin/updateteam",
    updateUser: "/admin/updateuser",
    uploadLogo: "/admin/uploadLogo",
    uploadPhotos: "/admin/uploadPhotos",
    uploadSliderPhotos: "/admin/uploadsliderPhotos",
    verifyAnnounce: "/admin/varifyannounce",
    deleteSlider: "/admin/deleteslider"
  },
  user: {
    myAnnouncements: "/auth/getAnnouncements",
    updateUser: "/auth/updateuser",
  },
  AllAnnounce: {
    creatAnnounce: "/announce/creatAnnounce",
    getAllAnnounce: "/announce/getallannounce",
    getByUid: "/announce/getbyUid",
    uploadFile: "/announce/uploadPhotos",
    search: "/announce/search"
  },
  request:{
    createRequest:"/request/creatrequest"
  }
};

export default apiRoutes;