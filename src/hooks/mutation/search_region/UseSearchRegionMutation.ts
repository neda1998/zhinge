import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { searchRegion } from "../../../services/admin/search_region";

const UseSearchRegionMutation = (options?: { onSuccess?: (response?: any) => void, onError?: (error?: any) => void }) => {

  return useMutation(
    async (data: Record<string, any>) => {
      return await searchRegion(data);
    },
    {
      onSuccess: async (response) => {
        if (options?.onSuccess) {
          options.onSuccess(response);
        } else {
          console.log("✅ جستجو موفقیت‌آمیز بود", response);
          Swal.fire({
            title: "موفقیت",
            text: "✅ جستجو انجام شد",
            icon: "success",
            confirmButtonText: "باشه",
          });
        }
      },
      onError: async (error: any) => {
        if (options?.onError) {
          options.onError(error);
        } else {
          Swal.fire({
            title: "!خطا",
            text: error?.response?.data?.message || "خطایی رخ داده است",
            icon: "error",
            confirmButtonText: "باشه",
          });
        }
      },
    }
  );
};

export default UseSearchRegionMutation;

