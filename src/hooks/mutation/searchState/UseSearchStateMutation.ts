import { useMutation } from "react-query";
import Swal from "sweetalert2";
// import { search } from "../../../services/search";
import { adminSearch } from "../../../services/admin/adminSearch"; // مسیر صحیح

const UseSearchStateMutation = () => {
  return useMutation(
    async (data: Record<string, any>) => { // نوع پارامتر را مشخص کن
      return await adminSearch(data);
    },
    {
      onSuccess: async (response) => {
        console.log("✅ جستجو موفقیت‌آمیز بود", response);
          Swal.fire({
            title: "موفقیت",
            text: "✅ جستجو انجام شد",
            icon: "success",
            confirmButtonText: "باشه",
          });
      },
      onError: async (error: any) => {
        Swal.fire({
          title: "!خطا",
          text: error.response?.data?.message || "خطایی رخ داده است",
          icon: "error",
          confirmButtonText: "باشه",
        });
      },
    }
  );
};

export default UseSearchStateMutation;
