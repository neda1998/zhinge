import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { promotToAdmin } from "../../../services/admin/promotToAdmin";

const UsePromotToAdminMutation = () => {
  return useMutation(
    async (data: any) => {
      const response = await promotToAdmin(data);
      return response;
    },
    {
      onSuccess: async (response) => {
        // Swal.fire({
        //   title: "موفق",
        //   text: response?.message || "عملیات با موفقیت انجام شد",
        //   icon: "success",
        //   confirmButtonText: "باشه",
        // });
      },
      onError: async (error: any) => {
        // Swal.fire({
        //   title: "خطا",
        //   text: error.response?.data?.message || "خطایی رخ داده است",
        //   icon: "error",
        //   confirmButtonText: "باشه",
        // });
      },
    }
  );
};

export default UsePromotToAdminMutation;
