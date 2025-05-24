import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { search } from "../../../services/search";
import Cookies from "js-cookie";

const useSearchMutation = () => {
  const uid = Cookies.get("Uid")
  return useMutation(
    async (data: any) => {
      return await search(data);
    },
    {
      onSuccess: async (response) => {
        if (Array.isArray(response) && response.length > 0) {
          Swal.fire({
            title: "موفقیت",
            text: "✅ جستجو انجام شد",
            icon: "success",
            confirmButtonText: "باشه",
          });
        } else {
          Swal.fire({
            title: "نتیجه‌ای یافت نشد",
            text: "هیچ نتیجه‌ای برای جستجوی شما پیدا نشد.",
            icon: "warning",
            confirmButtonText: "باشه",
          });
        }
      },
      onError: async (error: any) => {
        Swal.fire({
          title: "!خطا",
          text: "هیچ نتیجه‌ای برای جستجوی شما پیدا نشد.",
          icon: "error",
          confirmButtonText: "باشه",
        });
      },
    }
  );
};

export default useSearchMutation;
