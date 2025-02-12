import { AllRoutes } from "../@types/App/components.type";
import MainPage from "../Pages/MainPage";
import RentHouse from "../Pages/RentHouse";
import SellHouse from "../Pages/SellHouse";
import SellHouseId from "../Pages/SellHouseId";
import SignUp from "../Pages/signup";
import Otp from "../Pages/Otp";
import RentHouseId from "../Pages/RentHouseId";
import DetailsProperty from "../Pages/detailsProperty";
import PropertyFeatures from "../Pages/propertyFeatures";
import PropertyInfo from "../Pages/propertyInfo";
import PropertyImage from "../Pages/propertyImage";
import Services from "../Pages/services";
import Commission from "../Pages/Commission";
import Conditions from "../Pages/Conditions";
import LegalServices from "../Pages/LegalServices";
import RegionalInfoProperty from "../Pages/realState";
import MyAds from "../Pages/dashboard/myads";
import Realstate from "../Pages/dashboard/realState";
import DetailsPropertyDashboard from "../Pages/dashboard/detailsProperty";
import PropertyFeaturesDashboard from "../Pages/dashboard/propertyFeatures";
import PropertyInfoDashboard from "../Pages/dashboard/propertyInfo";
import PropertyImageDashboard from "../Pages/dashboard/propertyImage";
import SuccessfullyAddDashboard from "../Pages/dashboard/successfullyAdd";
import ManagementDashboard from "../panelAdmin/pages/managementDashboard";
import StateManagement from "../panelAdmin/pages/propertyManagement";
import NewEstateRegistration from "../panelAdmin/pages/newEstateRegistration";
import UnderReview from "../panelAdmin/pages/underReview";
import UnverifiedEstate from "../panelAdmin/pages/unverifiedEstate";
import SearchForEstate from "../panelAdmin/pages/searchForEstate";
import ImageRegistration from "../panelAdmin/pages/underReview/ImageRegistration";
import Facilities from "../panelAdmin/pages/underReview/Facilities";
import BasicEstateInformation from "../panelAdmin/pages/basicEstateInformation";
import RequestedEstate from "../panelAdmin/pages/requestedEstate";
import RegisterVisit from "../panelAdmin/pages/RegisterVisit";
import PhoneBookManagement from "../panelAdmin/pages/phoneBookManagement";
import Sliders from "../panelAdmin/pages/sliders";
import UserManagement from "../panelAdmin/pages/userManagement";
import TransactionManagement from "../panelAdmin/pages/transactionManagement";
import UploadLogoOfEstate from "../panelAdmin/pages/UploadLogoOfEstate";
import UploadAttach from "../panelAdmin/pages/UploadLogoOfEstate/UploadAttach";
import UploadSiteLogo from "../panelAdmin/pages/UploadLogoOfEstate/UploadSiteLogo";
import ManagementAboutUs from "../panelAdmin/pages/UploadLogoOfEstate/ManagementAboutUs";
import JingeTeamManagement from "../panelAdmin/pages/UploadLogoOfEstate/JingeTeamManagement";
import AccountInformation from "../components/profile/AccountInformation.tsx";
import RequestedEstateNewHouse from "../panelAdmin/pages/requestedEstate/RequestedEstateNewHouse";
import ManageSetting from "../panelAdmin/pages/manageSetting";
import Login from "../Pages/Login";

const routes: AllRoutes[] = [
  {
    type: "link",
    key: "home",
    name: "home",
    route: "/",
    component: <MainPage />,
  },
  {
    type: "link",
    key: "home",
    name: "home",
    route: "/SellHouse",
    component: <SellHouse />,
  },
  // {
  //     type: "link",
  //     key: "home",
  //     name: "home",
  //     route: "/ContactUssd",
  //     component: <ContactUssd />,
  //   },
  {
    type: "link",
    key: "home",
    name: "home",
    route: "/SellHouse/:id",
    component: <SellHouseId />,
  },
  {
    type: "link",
    key: "home",
    name: "home",
    route: "/RentHouse",
    component: <RentHouse />,
  },
  {
    type: "link",
    key: "home",
    name: "home",
    route: "/RentHouse/:id",
    component: <RentHouseId />,
  },
  {
    type: "link",
    key: "home",
    name: "home",
    route: "/SignUp",
    component: <SignUp />,
  },
  {
    type: "link",
    key: "home",
    name: "home",
    route: "/Login",
    component: <Login />,
  },
  {
    type: "link",
    key: "home",
    name: "home",
    route: "/Otp",
    component: <Otp />,
  },
  {
    type: "link",
    key: "myAdvertise",
    name: "myAdvertise",
    route: "/dashboard/my-advertise",
    component: <MyAds />,
  },
  {
    type: "link",
    key: "realState",
    name: "realState",
    route: "/realState",
    component: <RegionalInfoProperty />,
  },
  {
    type: "link",
    key: "realState",
    name: "realState",
    route: "/dashboard/realState",
    component: <Realstate />,
  },
  {
    type: "link",
    key: "detailsProperty",
    name: "detailsProperty",
    route: "/detailsProperty",
    component: <DetailsProperty />,
  },
  {
    type: "link",
    key: "detailsProperty",
    name: "detailsProperty",
    route: "/dashboard/detailsPropertyDashboard",
    component: <DetailsPropertyDashboard />,
  },
  {
    type: "link",
    key: "propertyFeatures",
    name: "propertyFeatures",
    route: "/propertyFeatures",
    component: <PropertyFeatures />,
  },
  {
    type: "link",
    key: "propertyFeatures",
    name: "propertyFeatures",
    route: "/dashboard/propertyFeaturesDashboard",
    component: <PropertyFeaturesDashboard />,
  },
  {
    type: "link",
    key: "propertyInfo",
    name: "propertyInfo",
    route: "/propertyInfo",
    component: <PropertyInfo />,
  },
  {
    type: "link",
    key: "propertyInfo",
    name: "propertyInfo",
    route: "/dashboard/propertyInfoDashboard",
    component: <PropertyInfoDashboard />,
  },
  {
    type: "link",
    key: "propertyImage",
    name: "propertyImage",
    route: "/propertyImage",
    component: <PropertyImage />,
  },
  {
    type: "link",
    key: "propertyImage",
    name: "propertyImage",
    route: "/dashboard/propertyImageDashboard",
    component: <PropertyImageDashboard />,
  },
  // {
  //   type: "link",
  //   key: "successfullyAdd",
  //   name: "successfullyAdd",
  //   route: "/successfullyAdd",
  //   component: <SuccessfullyAdd />,
  // },
  {
    type: "link",
    key: "successfullyAdd",
    name: "successfullyAdd",
    route: "/dashboard/successfullyAddDashboard",
    component: <SuccessfullyAddDashboard />,
  },
  {
    type: "link",
    key: "services",
    name: "services",
    route: "/services",
    component: <Services />,
  },
  {
    type: "link",
    key: "commission",
    name: "commission",
    route: "/services/commission",
    component: <Commission />,
  },
  {
    type: "link",
    key: "condition",
    name: "condition",
    route: "/services/condition",
    component: <Conditions />,
  },
  {
    type: "link",
    key: "service",
    name: "service",
    route: "/services/service",
    component: <LegalServices />,
  },
  {
    type: "link",
    key: "managementDashboard",
    name: "managementDashboard",
    route: "/panel-admin/dashboard/management-dashboard",
    component: <ManagementDashboard />,
  },
  {
    type: "link",
    key: "StateManagement",
    name: "StateManagement",
    route: "/panel-admin/dashboard/estate-management",
    component: <StateManagement />
  },
  {
    type: "link",
    key: "NewEstateRegistration",
    name: "NewEstateRegistration",
    route: "/panel-admin/dashboard/estate-management/new-state-registration",
    component: <NewEstateRegistration />
  },
  {
    type: "link",
    key: "StateUnderReview",
    name: "StateUnderReview",
    route: "/panel-admin/dashboard/estate-management/under-review",
    component: <UnderReview />
  },
  {
    type: "link",
    key: "ImageRegistration",
    name: "ImageRegistration",
    route: "/panel-admin/dashboard/estate-management/under-review/image-registration",
    component: <ImageRegistration />
  },
  {
    type: "link",
    key: "FAcilities",
    name: "FAcilities",
    route: "/panel-admin/dashboard/estate-management/under-review/facilities",
    component: <Facilities />
  },
  {
    type: "link",
    key: "UnverifiedState",
    name: "UnverifiedState",
    route: "/panel-admin/dashboard/estate-management/unverified-estate",
    component: <UnverifiedEstate />
  },
  {
    type: "link",
    key: "SearchForState",
    name: "SearchForState",
    route: "/panel-admin/dashboard/estate-management/search-for-estate",
    component: <SearchForEstate />
  },
  {
    type: "link",
    key: "BasicEstateInformation",
    name: "BasicEstateInformation",
    route: "/panel-admin/dashboard/estate-management/basic-estate-information",
    component: <BasicEstateInformation />
  },
  {
    type: "link",
    key: "RequestedEstate",
    name: "RequestedEstate",
    route: "/panel-admin/dashboard/estate-management/requested-estate",
    component: <RequestedEstate />
  },
  {
    type: "link",
    key: "RequestedEstate",
    name: "RequestedEstate",
    route: "/panel-admin/dashboard/estate-management/requested-estate/new-house",
    component: <RequestedEstateNewHouse />
  },
  {
    type: "link",
    key: "RegisterVisit",
    name: "RegisterVisit",
    route: "/panel-admin/dashboard/estate-management/regester-visit",
    component: <RegisterVisit />
  },
  {
    type: "link",
    key: "PhoneBookManagement",
    name: "PhoneBookManagement",
    route: "/panel-admin/dashboard/estate-management/phone-book-management",
    component: <PhoneBookManagement />
  },
  {
    type: "link",
    key: "Sliders",
    name: "Sliders",
    route: "/panel-admin/dashboard/estate-management/sliders",
    component: <Sliders />
  },
  {
    type: "link",
    key: "UserManagement",
    name: "UserManagement",
    route: "/panel-admin/dashboard/estate-management/user-management",
    component: <UserManagement />
  },
  {
    type: "link",
    key: "UploadLogoOfEstate",
    name: "UploadLogoOfEstate",
    route: "/panel-admin/dashboard/estate-management/upload-logo-estate",
    component: <UploadLogoOfEstate />
  },
  {
    type: "link",
    key: "UploadAttach",
    name: "UploadAttach",
    route: "/panel-admin/dashboard/estate-management/upload-attach",
    component: <UploadAttach />
  },
  {
    type: "link",
    key: "UploadSiteLogo",
    name: "UploadSiteLogo",
    route: "/panel-admin/dashboard/estate-management/upload-site-logo",
    component: <UploadSiteLogo />
  },
  {
    type: "link",
    key: "ManagementAboutUs",
    name: "ManagementAboutUs",
    route: "/panel-admin/dashboard/estate-management/management-about-us",
    component: <ManagementAboutUs />
  },
  {
    type: "link",
    key: "JingeTeamManagement",
    name: "JingeTeamManagement",
    route: "/panel-admin/dashboard/estate-management/jinge-team-management",
    component: <JingeTeamManagement />
  },
  {
    type: "link",
    key: "TransactionManagement",
    name: "TransactionManagement",
    route: "/panel-admin/dashboard/estate-management/transaction-management",
    component: <TransactionManagement />
  },
  {
    type: "link",
    key: "Profile",
    name: "Profile",
    route: "/dashboard",
    component: <AccountInformation />
  },
  {
    type: "link",
    key: "RegisterNewAd",
    name: "RegisterNewAd",
    route: "/dashboard/register-new-advertise",
    component: <Realstate />
  },
  {
    type: "link",
    key: "ManageSetting",
    name: "ManageSetting",
    route: "/panel-admin/dashboard/manage-setting/:id",
    component: <ManageSetting />
  },
];

export default routes;