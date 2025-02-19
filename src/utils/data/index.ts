import { IoMdNotificationsOutline } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import { IoEarth } from "react-icons/io5";
import edit from "../../assets/images/Edit.png";
import gallery from "../../assets/images/gallery.png";
import done from "../../assets/images/Done.png";
import deleteImg from "../../assets/images/Delete.png";
import eye from "../../assets/images/Eye.png";
import newHouse from "../../assets/images/newHouse.png";
import time from "../../assets/images/time.png";
import search from "../../assets/images/search.png";
import essential from "../../assets/images/essential.png";
import slider from "../../assets/images/slider-table.png";
import house from "../../assets/images/Home.png";
import close from "../../assets/images/Close-Circle.png";
import users from "../../assets/images/Users-Group-Rounded.png";
import request from "../../assets/images/Chat-Square-Arrow.png";
import trashbin from "../../assets/images/Trash-Bin.png";
import piechart from "../../assets/images/Pie-Chart.png";
import ChatRoundUnread from "../../assets/images/Chat-Round-Unread.png";
import houreGlass from "../../assets/images/Hourglass.png";
import { IoPerson } from "react-icons/io5";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { HiSquaresPlus } from "react-icons/hi2";
import { BsPersonFillDash } from "react-icons/bs";
import { FaRegAddressBook } from "react-icons/fa6";
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import { LuFolderMinus } from "react-icons/lu";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { PiUsersThree } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineFolderOpen } from "react-icons/hi2";
import { BsFilesAlt } from "react-icons/bs";
import { TbSmartHome } from "react-icons/tb";
import { VscFileSymlinkDirectory } from "react-icons/vsc";

export const navItems = [
  { text: "صفحه اصلی", url: "/" },
  { text: "آگهی فروش", url: "/SellHouse" },
  { text: "آگهی اجاره", url: "/RentHouse" },
  { text: "خدمات", url: "/services" },
  // { text: "بازدید", url: "/ContactUssd" },
  { text: "درخواست ملک", url: "/ContactUs" },
];
export const itemsNavLeft = [
  { id: 1, icon: IoMdNotificationsOutline },
  { id: 2, icon: GoPlus },
  { id: 3, icon: IoEarth },
];
export const itemsSidebar = [
  {
    id: 1,
    item: "داشبورد مدیریتی",
    icon: TbSmartHome,
    path: "/panel-admin/dashboard/management-dashboard",
  },
  {
    id: 2,
    item: "مدیریت املاک",
    icon: LuFolderMinus,
    path: "/panel-admin/dashboard/estate-management",
  },
  {
    id: 3,
    item: "اطلاعات پایه املاک",
    icon: HiOutlineFolderOpen,
    path: "/panel-admin/dashboard/estate-management/basic-estate-information",
  },
  {
    id: 4,
    item: "ملک های درخواستی",
    icon: HiOutlineBuildingOffice2,
    path: "/panel-admin/dashboard/estate-management/requested-estate",
  },
  {
    id: 5,
    item: "ثبت بازدید",
    icon: HiOutlineDocumentPlus,
    path: "/panel-admin/dashboard/estate-management/regester-visit",
  },
  {
    id: 6,
    item: "مدیریت دفترچه تلفن",
    icon: FaRegAddressBook,
    path: "/panel-admin/dashboard/estate-management/phone-book-management",
  },
  {
    id: 7,
    item: "اسلایدرها",
    icon: BsFilesAlt,
    path: "/panel-admin/dashboard/estate-management/sliders",
  },
  {
    id: 8,
    item: "مدیریت معاملات",
    icon: VscFileSymlinkDirectory,
    path: "/panel-admin/dashboard/estate-management/transaction-management",
  },
  {
    id: 9,
    item: "مدیریت کاربران",
    icon: PiUsersThree,
    path: "/panel-admin/dashboard/estate-management/user-management",
  },
  {
    id: 10,
    item: "تنظیمات مدیریت",
    icon: IoSettingsOutline,
    path: "/panel-admin/dashboard/manage-setting/upload-logo",
  },
];
export const itemsProfile = [
  { id: 1, item: "اطلاعات حساب", icon: IoPerson, path: "/dashboard" },
  {
    id: 2,
    item: "آگهی های من",
    icon: HiBuildingOffice2,
    path: "/dashboard/my-advertise",
  },
  {
    id: 3,
    item: "ثبت آگهی جدید",
    icon: HiSquaresPlus,
    path: "/dashboard/register-new-advertise",
  },
  { id: 4, item: "خروج از حساب", icon: BsPersonFillDash },
];
export const pageAdmin = [
  { id: 1, item: "داشبورد" },
  { id: 2, item: "داشبورد مدیریتی" },
];
export const pageEstate = [
  { id: 1, item: "داشبورد" },
  { id: 2, item: "داشبورد مدیریت املاک" },
];
export const pageNewEstate = [
  { id: 1, item: "داشبورد" },
  { id: 2, item: "داشبورد مدیریت املاک" },
  { id: 3, item: "ثبت ملک جدید" },
];
export const pageUnderReview = [
  { id: 1, item: "داشبورد" },
  { id: 2, item: "داشبورد مدیریت املاک" },
  { id: 3, item: "ملک های در حال بررسی" },
];
export const pageImageRegistration = [
  { id: 1, item: "داشبورد" },
  { id: 2, item: "داشبورد مدیریت املاک" },
  { id: 3, item: "ملک های در حال بررسی" },
  { id: 4, item: "ثبت تصویر" },
];
export const pageFacilities = [
  { id: 1, item: "داشبورد" },
  { id: 2, item: "داشبورد مدیریت املاک" },
  { id: 3, item: "ملک های در حال بررسی" },
  { id: 4, item: "امکانات" },
];
export const pageBasicEstateInformation = [
  { id: 1, item: "داشبورد" },
  { id: 2, item: "داشبورد مدیریت املاک" },
  { id: 3, item: "اطلاعات پایه املاک" },
];
export const pageSearchForEstate = [
  { id: 1, item: "داشبورد" },
  { id: 2, item: "داشبورد مدیریت املاک" },
  { id: 3, item: "جستجو برای ملک" },
];
export const pageRequestEstate = [
  { id: 1, item: "داشبورد" },
  { id: 2, item: "داشبورد مدیریت املاک" },
  { id: 3, item: "ملک های درخواستی" },
];
export const pageRequestEstateNewHouse = [
  { id: 1, item: "داشبورد" },
  { id: 2, item: "داشبورد مدیریت املاک" },
  { id: 3, item: "ملک های درخواستی" },
  { id: 4, item: "ثبت ملک جدید" },
];
export const pageRegisterVisit = [
  { id: 1, item: "داشبورد" },
  { id: 2, item: "داشبورد مدیریت املاک" },
  { id: 3, item: "ثبت بازدید" },
];
export const pagePhoneBook = [
  { id: 1, item: "داشبورد" },
  { id: 2, item: "داشبورد مدیریت املاک" },
  { id: 3, item: "مدیریت دفترچه تلفن" },
];
export const pageSliders = [
  { id: 1, item: "داشبورد" },
  { id: 2, item: "داشبورد مدیریت املاک" },
  { id: 3, item: "ثبت اسلایدر" },
];
export const pageUserManagement = [
  { id: 1, item: "داشبورد" },
  { id: 2, item: "داشبورد مدیریت املاک" },
  { id: 3, item: "مدیریت کاربران" },
];
export const pageAdministrativeSettings = [
  { id: 1, item: "داشبورد" },
  { id: 2, item: "داشبورد مدیریت املاک" },
  { id: 3, item: "آپلود لوگوی ملک" },
];
export const pageUploadAttach = [
  { id: 1, item: "داشبورد" },
  { id: 2, item: "داشبورد مدیریت املاک" },
  { id: 3, item: "آپلود تصویر پیوستی ملک ها" },
];
export const pageUploadSiteLogo = [
  { id: 1, item: "داشبورد" },
  { id: 2, item: "داشبورد مدیریت املاک" },
  { id: 3, item: "آپلود لوگوی سایت" },
];
export const pageManagementAboutus = [
  { id: 1, item: "داشبورد" },
  { id: 2, item: "داشبورد مدیریت املاک" },
  { id: 3, item: "مدیریت درباره ما" },
];
export const pageJingeTeamManagement = [
  { id: 1, item: "داشبورد" },
  { id: 2, item: "داشبورد مدیریت املاک" },
  { id: 3, item: "مدیریت تیم ژینگه" },
];
export const pageTransactionManagement = [
  { id: 1, item: "داشبورد" },
  { id: 2, item: "داشبورد مدیریت املاک" },
  { id: 3, item: "مدیریت معاملات" },
];
export const newStates = [
  {
    id: 1,
    img: newHouse,
    text: "ثبت ملک جدید",
    path: "/panel-admin/dashboard/estate-management/new-state-registration",
  },
  {
    id: 2,
    img: time,
    text: "ملک های در حال بررسی",
    path: "/panel-admin/dashboard/estate-management/under-review",
  },
  {
    id: 3,
    img: essential,
    text: "ملک های تایید نشده",
    path: "/panel-admin/dashboard/estate-management/unverified-estate",
  },
  {
    id: 4,
    img: search,
    text: "جستجو برای ملک",
    path: "/panel-admin/dashboard/estate-management/search-for-estate",
  },
];
export const dataTable = [
  {
    ردیف: 1,
    "کد ملک": 1001,
    "نوع ملک": "آپارتمان",
    منطقه: "منطقه 1",
    "نام مالک": "علی احمدی",
    "شماره تماس": 9123456789,
    قیمت: 1200000,
    "مساحت کل زمین": 200,
    "تاریخ ثبت": new Date("2023-09-01"),
  },
  {
    ردیف: 2,
    "کد ملک": 1002,
    "نوع ملک": "ویلایی",
    منطقه: "منطقه 2",
    "نام مالک": "مینا رضایی",
    "شماره تماس": 9123456788,
    قیمت: 2200000,
    "مساحت کل زمین": 400,
    "تاریخ ثبت": new Date("2023-09-02"),
  },
  {
    ردیف: 3,
    "کد ملک": 1003,
    "نوع ملک": "تجاری",
    منطقه: "منطقه 3",
    "نام مالک": "محمد عباسی",
    "شماره تماس": 9123456787,
    قیمت: 3200000,
    "مساحت کل زمین": 500,
    "تاریخ ثبت": new Date("2023-09-03"),
  },
  {
    ردیف: 4,
    "کد ملک": 1004,
    "نوع ملک": "آپارتمان",
    منطقه: "منطقه 4",
    "نام مالک": "سارا نوری",
    "شماره تماس": 9123456786,
    قیمت: 1800000,
    "مساحت کل زمین": 300,
    "تاریخ ثبت": new Date("2023-09-04"),
  },
  {
    ردیف: 5,
    "کد ملک": 1005,
    "نوع ملک": "ویلایی",
    منطقه: "منطقه 5",
    "نام مالک": "حمید شریفی",
    "شماره تماس": 9123456785,
    قیمت: 2500000,
    "مساحت کل زمین": 600,
    "تاریخ ثبت": new Date("2023-09-05"),
  },
  {
    ردیف: 6,
    "کد ملک": 1006,
    "نوع ملک": "تجاری",
    منطقه: "منطقه 6",
    "نام مالک": "زهرا موسوی",
    "شماره تماس": 9123456784,
    قیمت: 2900000,
    "مساحت کل زمین": 700,
    "تاریخ ثبت": new Date("2023-09-06"),
  },
  {
    ردیف: 7,
    "کد ملک": 1007,
    "نوع ملک": "آپارتمان",
    منطقه: "منطقه 7",
    "نام مالک": "مهدی یوسفی",
    "شماره تماس": 9123456783,
    قیمت: 2000000,
    "مساحت کل زمین": 250,
    "تاریخ ثبت": new Date("2023-09-07"),
  },
  {
    ردیف: 8,
    "کد ملک": 1008,
    "نوع ملک": "ویلایی",
    منطقه: "منطقه 8",
    "نام مالک": "نرگس صفوی",
    "شماره تماس": 9123456782,
    قیمت: 2600000,
    "مساحت کل زمین": 450,
    "تاریخ ثبت": new Date("2023-09-08"),
  },
  {
    ردیف: 9,
    "کد ملک": 1009,
    "نوع ملک": "تجاری",
    منطقه: "منطقه 9",
    "نام مالک": "حسین مرادی",
    "شماره تماس": 9123456781,
    قیمت: 3300000,
    "مساحت کل زمین": 800,
    "تاریخ ثبت": new Date("2023-09-09"),
  },
];
export const operations = [
  {
    id: 1,
    img: gallery,
    text: "ثبت تصویر",
    path: "/panel-admin/dashboard/estate-management/under-review/image-registration",
  },
  {
    id: 2,
    img: done,
    text: "امکانات",
    path: "/panel-admin/dashboard/estate-management/under-review/facilities",
  },
  { id: 3, img: deleteImg, text: "حذف", path: null },
  { id: 4, img: eye, text: "نمایش آگهی", path: null },
  { id: 5, img: edit, text: "ویرایش ملک", path: null },
];
export const tableZone = [
  {
    ردیف: 1,
    "عنوان منطقه": 1001,
  },
  {
    ردیف: 2,
    "عنوان منطقه": 1001,
  },
  {
    ردیف: 3,
    "عنوان منطقه": 1001,
  },
];
export const JingeTeamTable = [
  {
    ردیف: 1,
    "نام عضو": "طاهر زاهدی",
    شغل: "مدیریت",
    "آدرس ایمیل": "example@gmail.com",
    "شماره موبایل": 9182345678,
  },
  {
    ردیف: 2,
    "نام عضو": "طاهر زاهدی",
    شغل: "مدیریت",
    "آدرس ایمیل": "example@gmail.com",
    "شماره موبایل": 9182345678,
  },
  {
    ردیف: 3,
    "نام عضو": "طاهر زاهدی",
    شغل: "مدیریت",
    "آدرس ایمیل": "example@gmail.com",
    "شماره موبایل": 9182345678,
  },
  {
    ردیف: 4,
    "نام عضو": "طاهر زاهدی",
    شغل: "مدیریت",
    "آدرس ایمیل": "example@gmail.com",
    "شماره موبایل": 9182345678,
  },
  {
    ردیف: 5,
    "نام عضو": "طاهر زاهدی",
    شغل: "مدیریت",
    "آدرس ایمیل": "example@gmail.com",
    "شماره موبایل": 9182345678,
  },
  {
    ردیف: 6,
    "نام عضو": "طاهر زاهدی",
    شغل: "مدیریت",
    "آدرس ایمیل": "example@gmail.com",
    "شماره موبایل": 9182345678,
  },
];
export const newHouseTable = [
  {
    id: 1,
    "نام درخواست کننده": "شکیلا محمدی",
    "حداقل مبلغ درخواستی": 2345,
    "حداکثر مبلغ درخواستی": 34678,
    "شماره تماس": 9182345678,
  },
  {
    id: 2,
    "نام درخواست کننده": "شکیلا محمدی",
    "حداقل مبلغ درخواستی": 2345,
    "حداکثر مبلغ درخواستی": 34678,
    "شماره تماس": 9182345678,
  },
  {
    id: 3,
    "نام درخواست کننده": "شکیلا محمدی",
    "حداقل مبلغ درخواستی": 2345,
    "حداکثر مبلغ درخواستی": 34678,
    "شماره تماس": 9182345678,
  },
  {
    id: 4,
    "نام درخواست کننده": "شکیلا محمدی",
    "حداقل مبلغ درخواستی": 2345,
    "حداکثر مبلغ درخواستی": 34678,
    "شماره تماس": 9182345678,
  },
];
export const requestedEstateTable = [
  {
    id: 1,
    "نام و نام خانوادگی": "شکیلا محمدی",
    "شماره تماس": 91823456789,
    "حداقل قیمت": 1000,
    "حداکثر قیمت": 20000,
    منطقه: 9123456789,
    "تاریخ درخواست": new Date("2023-09-01"),
  },
  {
    id: 2,
    "نام و نام خانوادگی": "شکیلا محمدی",
    "شماره تماس": 91823456789,
    "حداقل قیمت": 2000,
    "حداکثر قیمت": 20000,
    منطقه: 9123456788,
    "تاریخ درخواست": new Date("2023-09-02"),
  },
  {
    id: 3,
    "نام و نام خانوادگی": "شکیلا محمدی",
    "شماره تماس": 91823456789,
    "حداقل قیمت": 3000,
    "حداکثر قیمت": 20000,
    منطقه: 9123456787,
    "تاریخ درخواست": new Date("2023-09-03"),
  },
  {
    id: 4,
    "نام و نام خانوادگی": "شکیلا محمدی",
    "شماره تماس": 91823456789,
    "حداقل قیمت": 4000,
    "حداکثر قیمت": 20000,
    منطقه: 9123456786,
    "تاریخ درخواست": new Date("2023-09-04"),
  },
  {
    id: 5,
    "نام و نام خانوادگی": "شکیلا محمدی",
    "شماره تماس": 91823456789,
    "حداقل قیمت": 5000,
    "حداکثر قیمت": 20000,
    منطقه: 9123456785,
    "تاریخ درخواست": new Date("2023-09-05"),
  },
  {
    id: 6,
    "نام و نام خانوادگی": "شکیلا محمدی",
    "شماره تماس": 91823456789,
    "حداقل قیمت": 6000,
    "حداکثر قیمت": 20000,
    منطقه: 9123456784,
    "تاریخ درخواست": new Date("2023-09-06"),
  },
  {
    id: 7,
    "نام و نام خانوادگی": "شکیلا محمدی",
    "شماره تماس": 91823456789,
    "حداقل قیمت": 7000,
    "حداکثر قیمت": 20000,
    منطقه: 9123456783,
    "تاریخ درخواست": new Date("2023-09-07"),
  },
  {
    id: 8,
    "نام و نام خانوادگی": "شکیلا محمدی",
    "شماره تماس": 91823456789,
    "حداقل قیمت": 8000,
    "حداکثر قیمت": 20000,
    منطقه: 9123456782,
    "تاریخ درخواست": new Date("2023-09-08"),
  },
  {
    id: 9,
    "نام و نام خانوادگی": "شکیلا محمدی",
    "شماره تماس": 91823456789,
    "حداقل قیمت": 9000,
    "حداکثر قیمت": 20000,
    منطقه: 9123456781,
    "تاریخ درخواست": new Date("2023-09-09"),
  },
];
export const userManagementTable = [
  {
    id: 1,
    "نام کاربری": "شکیلا محمدی",
    "شماره موبایل": 91823456789,
    "آدرس ایمیل": "example@gmail.com",
    "تعداد ملک های ثبت شده": 20,
    "نحوه ثبت نام": "موبایل",
  },
  {
    id: 2,
    "نام کاربری": "شکیلا محمدی",
    "شماره موبایل": 91823456789,
    "آدرس ایمیل": "example@gmail.com",
    "تعداد ملک های ثبت شده": 20,
    "نحوه ثبت نام": "وب سایت",
  },
  {
    id: 3,
    "نام کاربری": "شکیلا محمدی",
    "شماره موبایل": 91823456789,
    "آدرس ایمیل": "example@gmail.com",
    "تعداد ملک های ثبت شده": 20,
    "نحوه ثبت نام": "موبایل",
  },
  {
    id: 4,
    "نام کاربری": "شکیلا محمدی",
    "شماره موبایل": 91823456789,
    "آدرس ایمیل": "example@gmail.com",
    "تعداد ملک های ثبت شده": 20,
    "نحوه ثبت نام": "وب سایت",
  },
  {
    id: 5,
    "نام کاربری": "شکیلا محمدی",
    "شماره موبایل": 91823456789,
    "آدرس ایمیل": "example@gmail.com",
    "تعداد ملک های ثبت شده": 20,
    "نحوه ثبت نام": "موبایل",
  },
  {
    id: 6,
    "نام کاربری": "شکیلا محمدی",
    "شماره موبایل": 91823456789,
    "آدرس ایمیل": "example@gmail.com",
    "تعداد ملک های ثبت شده": 20,
    "نحوه ثبت نام": "وب سایت",
  },
];
export const registerVisitTable = [
  {
    id: 1,
    "نام خریدار": "شکیلا محمدی",
    "شماره تماس خریدار": 91823456789,
    "نام فروشنده": "شکیلا محمدی",
    "شماره تماس فروشنده": 912346897,
    "قیمت ملک": 20,
    "کد ملک": 93232,
  },
  {
    id: 2,
    "نام خریدار": "شکیلا محمدی",
    "شماره تماس خریدار": 91823456789,
    "نام فروشنده": "شکیلا محمدی",
    "شماره تماس فروشنده": 912346897,
    "قیمت ملک": 20000,
    "کد ملک": 93232,
  },
  {
    id: 3,
    "نام خریدار": "شکیلا محمدی",
    "شماره تماس خریدار": 91823456789,
    "نام فروشنده": "شکیلا محمدی",
    "شماره تماس فروشنده": 912346897,
    "قیمت ملک": 20000,
    "کد ملک": 93232,
  },
  {
    id: 4,
    "نام خریدار": "شکیلا محمدی",
    "شماره تماس خریدار": 91823456789,
    "نام فروشنده": "شکیلا محمدی",
    "شماره تماس فروشنده": 912346897,
    "قیمت ملک": 20000,
    "کد ملک": 93232,
  },
  {
    id: 5,
    "نام خریدار": "شکیلا محمدی",
    "شماره تماس خریدار": 91823456789,
    "نام فروشنده": "شکیلا محمدی",
    "شماره تماس فروشنده": 912346897,
    "قیمت ملک": 20000,
    "کد ملک": 93232,
  },
  {
    id: 6,
    "نام خریدار": "شکیلا محمدی",
    "شماره تماس خریدار": 91823456789,
    "نام فروشنده": "شکیلا محمدی",
    "شماره تماس فروشنده": 912346897,
    "قیمت ملک": 20000,
    "کد ملک": 93232,
  },
  {
    id: 7,
    "نام خریدار": "شکیلا محمدی",
    "شماره تماس خریدار": 91823456789,
    "نام فروشنده": "شکیلا محمدی",
    "شماره تماس فروشنده": 912346897,
    "قیمت ملک": 20000,
    "کد ملک": 93232,
  },
  {
    id: 8,
    "نام خریدار": "شکیلا محمدی",
    "شماره تماس خریدار": 91823456789,
    "نام فروشنده": "شکیلا محمدی",
    "شماره تماس فروشنده": 912346897,
    "قیمت ملک": 20000,
    "کد ملک": 93232,
  },
];

export const sliderTable = [
  {
    ردیف: 1,
    تصویر: slider,
    "عنوان اسلایدر": "لورم ایپسوم ساختگی از",
    "متن کوتاه در مورد اسلایدر":
      "اگر شما یک طراح هستین و یا با طراحی های گرافیکی سروکار دارید به متن های برخورده اید که با نام لورم ایپسوم شناخته می‌شوند.",
  },
  {
    ردیف: 2,
    تصویر: slider,
    "عنوان اسلایدر": "لورم ایپسوم ساختگی از",
    "متن کوتاه در مورد اسلایدر":
      "اگر شما یک طراح هستین و یا با طراحی های گرافیکی سروکار دارید به متن های برخورده اید که با نام لورم ایپسوم شناخته می‌شوند.",
  },
  {
    ردیف: 3,
    تصویر: slider,
    "عنوان اسلایدر": "لورم ایپسوم ساختگی از",
    "متن کوتاه در مورد اسلایدر":
      "اگر شما یک طراح هستین و یا با طراحی های گرافیکی سروکار دارید به متن های برخورده اید که با نام لورم ایپسوم شناخته می‌شوند.",
  },
  {
    ردیف: 4,
    تصویر: slider,
    "عنوان اسلایدر": "لورم ایپسوم ساختگی از",
    "متن کوتاه در مورد اسلایدر":
      "اگر شما یک طراح هستین و یا با طراحی های گرافیکی سروکار دارید به متن های برخورده اید که با نام لورم ایپسوم شناخته می‌شوند.",
  },
];
export const phoneBookTable = [
  {
    ردیف: 1,
    "کاربر ثبت کننده": "شکیلا محمدی",
    "نام مخاطب": "شکیلا محمدی",
    "شماره موبایل": 91823456789,
    توضیحات: "-",
    "تاریخ ثبت": new Date("2023-09-09"),
  },
  {
    ردیف: 2,
    "کاربر ثبت کننده": "شکیلا محمدی",
    "نام مخاطب": "شکیلا محمدی",
    "شماره موبایل": 91823456789,
    توضیحات: "-",
    "تاریخ ثبت": new Date("2023-09-09"),
  },
  {
    ردیف: 3,
    "کاربر ثبت کننده": "شکیلا محمدی",
    "نام مخاطب": "شکیلا محمدی",
    "شماره موبایل": 91823456789,
    توضیحات: "-",
    "تاریخ ثبت": new Date("2023-09-09"),
  },
  {
    ردیف: 4,
    "کاربر ثبت کننده": "شکیلا محمدی",
    "نام مخاطب": "شکیلا محمدی",
    "شماره موبایل": 91823456789,
    توضیحات: "-",
    "تاریخ ثبت": new Date("2023-09-09"),
  },
  {
    ردیف: 5,
    "کاربر ثبت کننده": "شکیلا محمدی",
    "نام مخاطب": "شکیلا محمدی",
    "شماره موبایل": 91823456789,
    توضیحات: "-",
    "تاریخ ثبت": new Date("2023-09-09"),
  },
  {
    ردیف: 6,
    "کاربر ثبت کننده": "شکیلا محمدی",
    "نام مخاطب": "شکیلا محمدی",
    "شماره موبایل": 91823456789,
    توضیحات: "-",
    "تاریخ ثبت": new Date("2023-09-09"),
  },
  {
    ردیف: 7,
    "کاربر ثبت کننده": "شکیلا محمدی",
    "نام مخاطب": "شکیلا محمدی",
    "شماره موبایل": 91823456789,
    توضیحات: "-",
    "تاریخ ثبت": new Date("2023-09-09"),
  },
  {
    ردیف: 8,
    "کاربر ثبت کننده": "شکیلا محمدی",
    "نام مخاطب": "شکیلا محمدی",
    "شماره موبایل": 91823456789,
    توضیحات: "-",
    "تاریخ ثبت": new Date("2023-09-09"),
  },
];
export const estats = [
  {
    id: 1,
    count: 2218,
    text: "کل ملک های ثبت شده ژینگه",
    bgClass: "bg-[#FA8036]",
    img: house,
  },
  {
    id: 2,
    count: 0,
    text: "ملک های تایید نشده",
    bgClass: "bg-[#5096F7]",
    img: close,
  },
  {
    id: 3,
    count: 391,
    text: "کل کاربران ما در ژینگه",
    bgClass: "bg-[#17C3A5]",
    img: users,
  },
  {
    id: 4,
    count: 11,
    text: "درخواست ملک ژینگه",
    bgClass: "bg-[#EA5A92]",
    img: request,
  },
  {
    id: 5,
    count: 2,
    text: "ملک های در حال بررسی",
    bgClass: "bg-[#E95991]",
    img: houreGlass,
  },
  {
    id: 6,
    count: 10,
    text: "تعداد پیامک باقیمانده",
    bgClass: "bg-[#7DBCE3]",
    img: ChatRoundUnread,
  },
  {
    id: 7,
    count: 12,
    text: "درخواست حذف ملک های اضطراری",
    bgClass: "bg-[#FB7F35]",
    img: trashbin,
  },
  {
    id: 8,
    count: 2,
    text: "کل آمارهای ثبت شده پرسنل",
    bgClass: "bg-[#D186E2]",
    img: piechart,
  },
];
