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
        console.log("✅ جستجو موفقیت‌آمیز بود", response);
        if (Array.isArray(response) && response.length > 0) {
          Swal.fire({
            title: "موفقیت",
            text: "✅ جستجو انجام شد",
            icon: "success",
            confirmButtonText: "باشه",
          });
        }
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

export default useSearchMutation;
