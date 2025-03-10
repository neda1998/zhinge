import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { search } from "../../../services/search";

const useSearchMutation = () => {
  return useMutation(
    async (data) => {
      return await search(data);
    },
    {
      onSuccess: async (response) => {
        console.log("✅ جستجو موفقیت‌آمیز بود", response);
        // Only show success alert if ads were found
        if (response?.announce_search_bodyUp && response.announce_search_bodyUp.length > 0) {
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
