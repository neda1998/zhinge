import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { search } from "../../../services/search";


type FilterData = {
  type: string;
  region: string;
  minPrice: string;
  maxPrice: string;
  propertyCode: string;
};

const useSearchMutation = () => {
  return useMutation(
    async (data: FilterData) => {
      return await search(data); 
    },
    {
      onSuccess: async (response) => {
        console.log("✅ جستجو موفقیت‌آمیز بود", response);
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
