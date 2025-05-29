import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { rejectannounce } from "../../../services/admin/rejectannounce";

const UseRejectannounceMutatiojn = () => {
  return useMutation(
    async (data: Record<string, any>) => {
      return await rejectannounce({ ...data, permanentDelete: true }); // Ensure permanent deletion
    },
    {
      onSuccess: async (response) => {
        Swal.fire({
          title: "موفق",
          text: "ملک مورد نظر به طور دائمی حذف شد",
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

export default UseRejectannounceMutatiojn;
